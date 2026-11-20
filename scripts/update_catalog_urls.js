const fs = require('fs');
const path = require('path');

const targetFiles = [
  path.join(__dirname, '../data/categories.ts'),
  path.join(__dirname, '../data/categoriesMeta.ts'),
  path.join(__dirname, '../scripts/all_extracted_cards.json'),
  path.join(__dirname, '../components/CategoryShowcase.tsx'),
  path.join(__dirname, '../components/CategoryModal.tsx'),
  path.join(__dirname, '../app/[slug]/CategoryDetailClient.tsx'),
  path.join(__dirname, '../lib/adminStore.ts')
];

const productsDir = path.join(__dirname, '../public/products');
const localFiles = fs.readdirSync(productsDir);
const lowerMap = new Map();
localFiles.forEach(f => lowerMap.set(f.toLowerCase(), f));

for (const filePath of targetFiles) {
  if (!fs.existsSync(filePath)) continue;
  let code = fs.readFileSync(filePath, 'utf8');
  let replaced = 0;

  code = code.replace(/https:\/\/customboxesmarket\.co\.uk\/wp-content\/uploads\/[^\s"']+\/([^\s"']+\.(?:webp|jpg|png))/gi, (match, filename) => {
    const localMatch = lowerMap.get(filename.toLowerCase());
    if (localMatch) {
      replaced++;
      return '/products/' + localMatch;
    }
    return match;
  });

  fs.writeFileSync(filePath, code, 'utf8');
  console.log(`Updated ${path.basename(filePath)}: replaced ${replaced} URLs`);
}
