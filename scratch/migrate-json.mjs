import fs from 'fs';
import path from 'path';

const caseStudiesDir = path.join(process.cwd(), 'src/content/case-studies');
const files = fs.readdirSync(caseStudiesDir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const filePath = path.join(caseStudiesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (data.leftContent) {
    data.leftContent = data.leftContent.map(block => {
      // If it's already in the new format, skip
      if (block.discriminant) return block;
      
      const { type, ...value } = block;
      return {
        discriminant: type,
        value: value
      };
    });
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${file}`);
  }
}
