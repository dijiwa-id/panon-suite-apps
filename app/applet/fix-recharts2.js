import fs from 'fs';
import path from 'path';

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('minWidth={0} minHeight={0}')) {
        content = content.replace(/minWidth=\{0\} minHeight=\{0\}/g, 'minWidth={1} minHeight={1}');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
      if (content.includes('<ResponsiveContainer>')) { // for no props
         content = content.replace(/<ResponsiveContainer>/g, '<ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>');
         fs.writeFileSync(fullPath, content, 'utf8');
         console.log(`Updated empty ResponsiveContainer in ${fullPath}`);
      }
      if (content.includes('width="100%" height="100%"') && !content.includes('minWidth')) {
         content = content.replace(/width="100%" height="100%"/g, 'width="100%" height="100%" minWidth={1} minHeight={1}');
         fs.writeFileSync(fullPath, content, 'utf8');
         console.log(`Added minWidth/height in ${fullPath}`);
      }
    }
  }
}

// Check what the current directory is named
let srcPath = path.join(process.cwd(), 'src');
processDir(srcPath);
