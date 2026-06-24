import fs from 'fs';
import path from 'path';

const dir = './src/pages';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.tsx')) {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    
    // We are looking for this broken signature:
    // <main className="flex-1 overflow-y-auto...">
    //   <div className="max-w-[1600px] mx-auto min-h-full flex flex-col   md: justify-between ...">
    //
    // The correct wrapper should be:
    // <main className="...">
    //   <div className="max-w-[1600px] mx-auto min-h-full flex flex-col gap-4">
    //      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
    
    // A regex to match the broken wrapper:
    const regex = /<main([^>]*)>\s*<div className="max-w-\[1600px\] mx-auto min-h-full flex flex-col   md: justify-between items-start md:items-center mb-4 gap-4">/g;
    
    let modified = false;
    content = content.replace(regex, (match, mainArgs) => {
        modified = true;
        return `<main${mainArgs}>\n      <div className="max-w-[1600px] mx-auto min-h-full flex flex-col gap-4">\n        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">`;
    });
    
    // BUT we also need to add a closing </div> at the end of the <main> block!
    if (modified) {
        // Find </main>
        content = content.replace(/(<\/main>)/, '  </div>\n    $1');
        fs.writeFileSync(path.join(dir, file), content, 'utf-8');
        console.log(`Fixed ${file}`);
    }
  }
}
