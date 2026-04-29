const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) { 
      results.push(file);
    }
  });
  return results;
}
const files = walk('./src/pages').concat(walk('./src/components'));
let changedFiles = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('<main className=\"')) {
    const newContent = content.replace(/<main className=\"([^\"]*)bg-gray-50 dark:bg-\[#161616\]([^\"]*)\"/g, '<main className=\"$1bg-transparent$2\"');
    if (newContent !== content) {
      fs.writeFileSync(file, newContent);
      changedFiles++;
    }
  }
});
console.log('Replaced in ' + changedFiles + ' files.');
