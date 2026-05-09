import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/pages/SetupGuide.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Title section
content = content.replace(
  '<h1 className="text-2xl font-black',
  '<h1 className="text-[18px] font-black'
);

content = content.replace(
  '<p className="text-sm text-gray-500 mt-1 font-medium">Enterprise-grade deployment wizard</p>',
  '<p className="text-xs text-gray-500 mt-1 font-medium">Enterprise-grade deployment wizard</p>'
);

// H2 titles
content = content.replace(/<h2 className="text-xl font-bold/g, '<h2 className="text-base font-bold');

// P descriptions under H2
content = content.replace(/<p className="text-sm text-gray-500">/g, '<p className="text-xs text-gray-500">');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Styles updated.');
