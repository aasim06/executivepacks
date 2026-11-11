const fs = require('fs');
const html = fs.readFileSync('scripts/site_dump.html', 'utf8');

// Regex to match every:
// <a href="([^"]+)">[\s\S]*?product-card[\s\S]*?src="([^"]+)"[\s\S]*?<h[2-4][^>]*>([^<]+)<\/h[2-4]>
const productCardRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>[\s\S]*?<div[^>]*class=["'][^"']*product-card[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*<\/a>/gi;

const products = [];
let match;
while ((match = productCardRegex.exec(html)) !== null) {
  const link = match[1];
  const cardBody = match[2];

  // Title
  const titleMatch = cardBody.match(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  // Primary image
  const imgMatch1 = cardBody.match(/class=["'][^"']*img-1[^"']*["'][\s\S]*?<img[^>]+src=["']([^"']+)["']/i) || cardBody.match(/<img[^>]+src=["']([^"']+)["']/i);
  const img1 = imgMatch1 ? imgMatch1[1] : '';

  // Secondary/hover image (if any)
  const imgMatch2 = cardBody.match(/class=["'][^"']*img-2[^"']*["'][\s\S]*?<img[^>]+src=["']([^"']+)["']/i);
  const img2 = imgMatch2 ? imgMatch2[1] : '';

  if (title && (img1 || img2)) {
    // Determine category based on title/url
    let category = 'custom-boxes';
    const lower = (title + ' ' + link).toLowerCase();
    
    if (lower.includes('food') || lower.includes('cereal') || lower.includes('burger') || lower.includes('sandwich') || lower.includes('cake') || lower.includes('pie') || lower.includes('donut') || lower.includes('pizza') || lower.includes('candy') || lower.includes('chocolate') || lower.includes('bakery') || lower.includes('coffee') || lower.includes('ice cream')) {
      category = 'food-bakery';
    } else if (lower.includes('cosmetic') || lower.includes('soap') || lower.includes('lip') || lower.includes('eyelash') || lower.includes('bath bomb') || lower.includes('perfume') || lower.includes('serum') || lower.includes('oil')) {
      category = 'cosmetics-beauty';
    } else if (lower.includes('apparel') || lower.includes('shirt') || lower.includes('tie') || lower.includes('socks') || lower.includes('lingerie') || lower.includes('belt') || lower.includes('shoe') || lower.includes('sunglasses')) {
      category = 'apparel-fashion';
    } else if (lower.includes('rigid') || lower.includes('gift') || lower.includes('presentation') || lower.includes('slide') || lower.includes('flip')) {
      category = 'rigid-luxury';
    } else if (lower.includes('mailer') || lower.includes('shipping') || lower.includes('corrugated') || lower.includes('carton')) {
      category = 'shipping-mailers';
    } else if (lower.includes('mylar') || lower.includes('bag') || lower.includes('pouch')) {
      category = 'mylar-bags';
    } else if (lower.includes('kraft') || lower.includes('eco')) {
      category = 'kraft-eco';
    }

    products.push({
      title,
      link,
      primaryImage: img1 || img2,
      hoverImage: img2 || img1,
      category
    });
  }
}

console.log('Total extracted product cards:', products.length);
// Deduplicate by title
const uniqueMap = new Map();
for (const p of products) {
  if (!uniqueMap.has(p.title.toLowerCase())) {
    uniqueMap.set(p.title.toLowerCase(), p);
  }
}

const uniqueProducts = Array.from(uniqueMap.values());
console.log('Unique product cards:', uniqueProducts.length);
fs.writeFileSync('scripts/all_extracted_cards.json', JSON.stringify(uniqueProducts, null, 2));

// Print summary by category
const categoryCounts = {};
uniqueProducts.forEach(p => {
  categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
});
console.log('Products per category:', categoryCounts);
console.log('Sample products:', uniqueProducts.slice(0, 10));
