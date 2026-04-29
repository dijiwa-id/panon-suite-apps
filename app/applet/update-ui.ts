import fs from 'fs';
import path from 'path';

const files = [
  'src/pages/Roles.tsx',
  'src/pages/Users.tsx',
  'src/pages/RoleModules.tsx',
];

const primaryBtnRegex = /<button className="bg-white dark:bg-\[#1c1c1c\] border border-gray-300 dark:border-gray-700 h-8 text-gray-900 dark:text-white rounded-full[^\"]+"([^>]*)>/g;
const primaryBtnReplacement = '<button className="bg-[#1c1c1c] border border-gray-700 h-8 text-white rounded-full text-xs font-bold tracking-wide px-6 leading-[12px] hover:bg-[#2a2a2a] transition-colors flex items-center justify-center gap-1.5"$1>';

const filterBtnRegex = /<button className="bg-transparent border border-gray-300 dark:border-\[#2a2a2a\] h-8 text-gray-700 dark:text-gray-300 rounded-full[^\"]+"([^>]*)>/g;
const filterBtnReplacement = '<button className="bg-transparent border border-gray-300 dark:border-[#2a2a2a] h-8 text-gray-700 dark:text-gray-300 rounded-full text-xs font-bold px-4 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors leading-[12px] flex items-center justify-center gap-1.5"$1>';

for (const relPath of files) {
  const fullPath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) continue;
  
  let content = fs.readFileSync(fullPath, 'utf8');

  // Change background wrapper
  content = content.replace(/dark:bg-\[#161616\]/g, 'dark:bg-[#0e1016]');
  
  // Update primary button
  content = content.replace(primaryBtnRegex, primaryBtnReplacement);
  
  // Update filter button
  content = content.replace(filterBtnRegex, filterBtnReplacement);
  
  // Make sure table headers have uppercase styling if needed or keep it minimal
  content = content.replace(/className="py-3 text-\[10px\] font-black tracking-tight text-gray-500 whitespace-nowrap/g, 'className="py-3 text-[10px] font-black tracking-widest uppercase text-gray-500 whitespace-nowrap');

  // Also replace text-[10px] inside primary buttons specifically if the regex misses
  
  fs.writeFileSync(fullPath, content);
  console.log('Updated ' + relPath);
}
