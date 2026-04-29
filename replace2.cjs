const fs = require('fs');
let file = 'src/pages/ImageAnnotation.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/(?<!dark:)bg-\[#2a2a2a\]/g, 'bg-gray-200 dark:bg-[#2a2a2a]');
content = content.replace(/(?<!dark:hover:)hover:bg-\[#202020\]/g, 'hover:bg-gray-100 dark:hover:bg-[#202020]');
fs.writeFileSync(file, content, 'utf8');

let appContent = fs.readFileSync('src/pages/Applications.tsx', 'utf8');
appContent = appContent.replace(/(?<!dark:hover:)hover:bg-\[#202020\]/g, 'hover:bg-gray-100 dark:hover:bg-[#202020]');
fs.writeFileSync('src/pages/Applications.tsx', appContent, 'utf8');

let dsContent = fs.readFileSync('src/pages/DataSet.tsx', 'utf8');
dsContent = dsContent.replace(/(?<!dark:hover:)hover:bg-\[#202020\]/g, 'hover:bg-gray-100 dark:hover:bg-[#202020]');
fs.writeFileSync('src/pages/DataSet.tsx', dsContent, 'utf8');

let nceContent = fs.readFileSync('src/pages/NoCodeEditor.tsx', 'utf8');
nceContent = nceContent.replace(/(?<!dark:hover:)hover:bg-\[#202020\]/g, 'hover:bg-gray-100 dark:hover:bg-[#202020]');
fs.writeFileSync('src/pages/NoCodeEditor.tsx', nceContent, 'utf8');

let aimContent = fs.readFileSync('src/pages/AIModels.tsx', 'utf8');
aimContent = aimContent.replace(/(?<!dark:)bg-\[#2a2a2a\]/g, 'bg-gray-200 dark:bg-[#2a2a2a]');
fs.writeFileSync('src/pages/AIModels.tsx', aimContent, 'utf8');

let cssContent = fs.readFileSync('src/index.css', 'utf8');
cssContent = cssContent.replace(/(?<!dark:)bg-\[#202020\]/g, 'bg-gray-100 dark:bg-[#202020]');
fs.writeFileSync('src/index.css', cssContent, 'utf8');
