const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        filelist.push(dir + '/' + file);
      }
    }
  });
  return filelist;
};

const mappings = [
  { match: 'bg-[#161616]', rep: 'bg-gray-50 dark:bg-[#161616]' },
  { match: 'bg-[#0e1016]', rep: 'bg-gray-50 dark:bg-[#0e1016]' },
  { match: 'bg-[#1e1e1e]', rep: 'bg-white dark:bg-[#1e1e1e]' },
  { match: 'bg-[#1a1a1a]', rep: 'bg-gray-50/50 dark:bg-[#1a1a1a]' },
  { match: 'bg-[#151515]', rep: 'bg-gray-100 dark:bg-[#151515]' },
  { match: 'bg-[#111]', rep: 'bg-gray-50 dark:bg-[#111]' },
  { match: 'bg-[#333]', rep: 'bg-gray-200 dark:bg-[#333]' },
  { match: 'border-[#2a2a2a]', rep: 'border-gray-200 dark:border-[#2a2a2a]' },
  { match: 'border-[#333]', rep: 'border-gray-200 dark:border-[#333]' },
  { match: 'text-gray-200', rep: 'text-gray-800 dark:text-gray-200' },
  { match: 'text-white', rep: 'text-gray-900 dark:text-white' },
  { match: 'text-gray-300', rep: 'text-gray-700 dark:text-gray-300' },
  { match: 'text-gray-400', rep: 'text-gray-600 dark:text-gray-400' },
  { match: 'hover:bg-[#2a2a2a]', rep: 'hover:bg-gray-200 dark:hover:bg-[#2a2a2a]' },
  { match: 'hover:bg-[#252525]', rep: 'hover:bg-gray-100 dark:hover:bg-[#252525]' },
  { match: 'bg-[#1c1c1c]', rep: 'bg-white dark:bg-[#1c1c1c]' },
  { match: 'border-gray-700', rep: 'border-gray-300 dark:border-gray-700' }
];

const files = walkSync('./src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  mappings.forEach(m => {
    const regexSource = `(?<!dark:)(?<!hover:)${m.match.replace(/\[/g, '\\[').replace(/\]/g, '\\]')}(?!\\w)`;
    let regex;
    if (m.match.startsWith('hover:')) {
      const baseMatch = m.match.replace('hover:', '');
      regex = new RegExp(`(?<!dark:hover:)hover:${baseMatch.replace(/\[/g, '\\[').replace(/\]/g, '\\]')}(?!\\w)`, 'g');
    } else {
      regex = new RegExp(regexSource, 'g');
    }
    
    newContent = newContent.replace(regex, m.rep);
  });
  
  newContent = newContent.replace(/text-gray-900 dark:text-gray-900 dark:text-white/g, 'text-gray-900 dark:text-white');
  newContent = newContent.replace(/text-gray-800 dark:text-gray-800 dark:text-gray-200/g, 'text-gray-800 dark:text-gray-200');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedCount++;
  }
});

console.log(`Changed ${changedCount} files.`);
