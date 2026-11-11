const fs = require('fs');
const html = fs.readFileSync('scripts/site_dump.html', 'utf8');

// Find all img tags in the html
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
let match;
const allImgs = [];
while ((match = imgRegex.exec(html)) !== null) {
  const fullTag = match[0];
  const src = match[1];
  const altMatch = fullTag.match(/alt=["']([^"']*)["']/i);
  const alt = altMatch ? altMatch[1] : '';
  allImgs.push({ src, alt, fullTag });
}

console.log('Total images found in HTML:', allImgs.length);

// Filter images that look like product boxes (not icons, logos, flags, payment icons, social icons)
const boxImages = allImgs.filter(item => {
  const s = item.src.toLowerCase();
  const a = item.alt.toLowerCase();
  if (s.includes('logo') || s.includes('icon') || s.includes('flag') || s.includes('payment') || s.includes('trustpilot') || s.includes('star') || s.includes('badge') || s.includes('svgrepo') || s.includes('arrow') || s.includes('phone') || s.includes('email') || s.includes('bg-') || s.includes('pattern') || s.includes('banner')) {
    return false;
  }
  return s.includes('box') || s.includes('boxes') || s.includes('packaging') || a.includes('box') || a.includes('boxes') || a.includes('packaging');
});

console.log('Filtered box product images:', boxImages.length);
console.log('Sample 10:');
console.log(boxImages.slice(0, 10));
