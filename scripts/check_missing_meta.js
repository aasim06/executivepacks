const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../data/categoriesMeta.ts');
const code = fs.readFileSync(file, 'utf8');
const matches = code.match(/https:\/\/[^\s"']+/g) || [];
console.log('URLs in categoriesMeta:', matches);
