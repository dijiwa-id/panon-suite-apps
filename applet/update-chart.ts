import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src/components/ChartCards.tsx');
let config = fs.readFileSync(file, 'utf-8');

config = config.replace(
  /<YAxis[\s\S]*?\/>/,
  `<YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#888', fontWeight: 500}} tickFormatter={(val) => val === 0 ? '0' : \`\${val / 1000}K\`} ticks={[0, 1500, 3000, 4500, 6000]} domain={[0, 6000]} />`
);

config = config.replace(
  /<XAxis[\s\S]*?\/>/,
  `<XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#888', fontWeight: 500}} dy={15} />`
);

config = config.replace(
    `<span className="text-[10px] font-bold tracking-tight text-gray-500 bg-gray-100 dark:bg-[#252525] px-2 py-1 rounded">Week</span>`,
    `<span className="text-[11px] font-medium tracking-tight text-gray-500 bg-[#151515] hover:bg-[#1a1a1a] transition-colors cursor-pointer px-3 py-1.5 rounded-lg border border-[#222]">Week</span>`
);

config = config.replace(
    `const [data] = useState([`,
    `const [data] = useState([\n    { name: 'Mar 11', value: 1600 },`
)

fs.writeFileSync(file, config);
console.log('Updated axes in ChartCards');
