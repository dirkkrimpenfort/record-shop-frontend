import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ignoreList = ['node_modules', 'package-lock.json', 'code.md', '.git', '.gitignore', 'README.md', 'code.js'];

const writeToFile = (filePath, content) => {
  fs.appendFileSync(filePath, content + '\n');
};

const readDirectory = (dir, level, filePath) => {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);

    if (ignoreList.includes(item)) {
      return;
    }

    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      writeToFile(filePath, `${'  '.repeat(level)}- ${item}/`);
      readDirectory(fullPath, level + 1, filePath);
    } else {
      writeToFile(filePath, `${'  '.repeat(level)}- ${item}`);
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      writeToFile(filePath, `\n\`\`\`javascript\n${fileContent}\n\`\`\`\n`);
    }
  });
};

const filePath = path.join(__dirname, 'code.md');
if (fs.existsSync(filePath)) {
  fs.unlinkSync(filePath);
}
readDirectory(__dirname, 0, filePath);
