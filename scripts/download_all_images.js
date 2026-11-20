const fs = require('fs');
const path = require('path');
const https = require('https');

const CATEGORIES_PATH = path.join(__dirname, '../data/categories.ts');
const OUTPUT_DIR = path.join(__dirname, '../public/products');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const content = fs.readFileSync(CATEGORIES_PATH, 'utf8');
const urlMatches = content.match(/https:\/\/customboxesmarket\.co\.uk\/wp-content\/uploads\/[^\s"']+\.webp/g) || [];
const uniqueUrls = Array.from(new Set(urlMatches));

console.log(`Found ${uniqueUrls.length} unique images to download.`);

function downloadImage(url, destPath) {
  return new Promise((resolve) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      return resolve({ url, status: 'already_exists' });
    }

    const file = fs.createWriteStream(destPath);
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 15000 }, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        try { fs.unlinkSync(destPath); } catch {}
        return resolve({ url, status: 'failed_status_' + res.statusCode });
      }

      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          resolve({ url, status: 'downloaded', size: fs.statSync(destPath).size });
        });
      });
    });

    req.on('error', (err) => {
      file.close();
      try { fs.unlinkSync(destPath); } catch {}
      resolve({ url, status: 'error_' + err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      file.close();
      try { fs.unlinkSync(destPath); } catch {}
      resolve({ url, status: 'timeout' });
    });
  });
}

async function run() {
  const queue = [...uniqueUrls];
  const CONCURRENCY = 12;
  let completed = 0;
  let successful = 0;

  async function worker() {
    while (queue.length > 0) {
      const url = queue.shift();
      const fileName = path.basename(new URL(url).pathname);
      const destPath = path.join(OUTPUT_DIR, fileName);

      const result = await downloadImage(url, destPath);
      completed++;
      if (result.status === 'downloaded' || result.status === 'already_exists') {
        successful++;
      }
      if (completed % 10 === 0 || completed === uniqueUrls.length) {
        console.log(`Progress: ${completed}/${uniqueUrls.length} (${successful} ready)`);
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);
  console.log(`Done! ${successful}/${uniqueUrls.length} images saved in ${OUTPUT_DIR}`);
}

run();
