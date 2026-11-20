const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const res = await fetchUrl('https://packwire.com/');
    console.log('Status:', res.status);
    const html = res.body;
    
    // Extract title & meta description
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    
    console.log('Title:', titleMatch ? titleMatch[1].trim() : 'N/A');
    console.log('Description:', descMatch ? descMatch[1].trim() : 'N/A');
    
    // Extract navigation links / box types
    const navLinks = [];
    const linkRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    while ((match = linkRegex.exec(html)) !== null) {
      const href = match[1];
      const text = match[2].replace(/<[^>]+>/g, '').trim();
      if (text && (href.includes('box') || href.includes('mailer') || href.includes('shipping') || href.includes('folding') || href.includes('rigid'))) {
        navLinks.push({ text, href });
      }
    }
    console.log('Relevant Box Links:', navLinks.slice(0, 15));

    // Extract H1, H2 tags
    const headings = [];
    const hRegex = /<(h[1-3])[^>]*>([\s\S]*?)<\/\1>/gi;
    while ((match = hRegex.exec(html)) !== null) {
      const tag = match[1];
      const text = match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
      if (text) headings.push({ tag, text });
    }
    console.log('Headings:', headings.slice(0, 12));

  } catch (err) {
    console.error('Error fetching Packwire:', err.message);
  }
}

run();
