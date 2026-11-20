const fs = require('fs');
const https = require('https');
const path = require('path');

const urls = [
  'https://customboxesmarket.co.uk/wp-content/uploads/2026/01/custom-rigid-setup-boxes-01.webp',
  'https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Presentation-boxes.webp',
  'https://customboxesmarket.co.uk/wp-content/uploads/2026/01/custom-rigid-slide-boxes-01.webp',
  'https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-T-shirt-Boxes.webp',
  'https://customboxesmarket.co.uk/wp-content/uploads/2024/01/custom-mailer-boxes.webp',
  'https://customboxesmarket.co.uk/wp-content/uploads/2024/01/custom-corrugated-boxes.webp',
  'https://customboxesmarket.co.uk/wp-content/uploads/2026/01/custom-two-piece-rigid-boxes-01.webp',
  'https://customboxesmarket.co.uk/wp-content/uploads/2026/01/custom-rigid-boxes-with-inserts-01.webp',
  'https://customboxesmarket.co.uk/wp-content/uploads/2024/01/custom-pyramid-boxes-01.webp',
  'https://customboxesmarket.co.uk/wp-content/uploads/2024/01/custom-cube-boxes-01.webp',
  'https://customboxesmarket.co.uk/wp-content/uploads/2026/01/custom-flip-top-boxes-01.webp'
];

const destDir = path.join(__dirname, '../public/products');

urls.forEach(u => {
  const file = path.join(destDir, path.basename(u));
  if (fs.existsSync(file) && fs.statSync(file).size > 1000) {
    console.log('Already exists:', path.basename(u));
    return;
  }
  const ws = fs.createWriteStream(file);
  https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, res => {
    res.pipe(ws);
    ws.on('finish', () => console.log('Downloaded:', path.basename(u)));
  }).on('error', e => console.log('Err:', e.message));
});
