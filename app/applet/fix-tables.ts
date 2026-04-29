import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src/pages');

function walk(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      // Ensure tr in tbody has correct hover states
      const tbodyTrRegex = /<tr[^>]*key=[^>]*className="([^"]*(?:hover:bg-[^"]*))"[^>]*>/g;
      content = content.replace(tbodyTrRegex, (match, classNames) => {
        if (!match.includes('group')) return match;
        // let's just forcefully fix the commonly broken classname strings
        let newClasses = classNames
            .replace(/hover:bg-gray-50\/50/g, 'hover:bg-gray-50')
            .replace(/hover:bg-gray-50 /g, 'hover:bg-gray-50/50 ')
            .replace(/dark:hover:bg-gray-100/g, '')
            .replace(/dark:hover:bg-\[#252525\]\/30/g, 'dark:hover:bg-[#252525]/50')
            .replace(/\s+/g, ' ')
            .trim();
        // ensure default light hover state
        if (!newClasses.includes('hover:bg-gray')) {
            newClasses = newClasses.replace('transition-colors', 'hover:bg-gray-50 transition-colors');
        }
        return match.replace(classNames, newClasses);
      });

      // Update basic divide-gray-100 to divide-gray-200
      content = content.replace(/divide-gray-100 dark:divide-\[#1f232d\]\/60/g, 'divide-gray-200 dark:divide-[#1f232d]');
      content = content.replace(/divide-gray-100 dark:divide-\[#333\]/g, 'divide-gray-200 dark:divide-[#1f232d]');
      content = content.replace(/divide-\[#333\]/g, 'divide-[#1f232d]');
      content = content.replace(/border-\[#333\]/g, 'border-[#1f232d]');
      
      // Update th basic typography
      content = content.replace(/text-\[10px\] font-black tracking-tight text-gray-500/g, 'text-[10px] font-black tracking-widest uppercase text-gray-500');

      // Add bg to thead tr if not present
      const theadTrRegex = /<thead[^>]*>\s*<tr className="([^"]*)"/g;
      content = content.replace(theadTrRegex, (match, classNames) => {
          let newClasses = classNames;
          if (!newClasses.includes('bg-')) {
             newClasses = newClasses + " bg-gray-50/50 dark:bg-transparent";
          }
          newClasses = newClasses.replace('border-gray-100', 'border-gray-200');
          return match.replace(classNames, newClasses);
      });
      content = content.replace(/<thead className="bg-gray-50 dark:bg-\[#111\]"/g, '<thead className="bg-gray-50/50 dark:bg-transparent"');
      
      if (content !== fs.readFileSync(fullPath, 'utf-8')) {
          fs.writeFileSync(fullPath, content);
          console.log(`Updated tables in ${fullPath}`);
      }
    }
  }
}

walk(pagesDir);
