// generate-index.js
const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'posts');
const outputFile = path.join(postsDir, 'index.json');

function extractMeta(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const yaml = match[1];
  const lines = yaml.split('\n');
  const meta = {};
  lines.forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      meta[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });
  return meta;
}

const files = fs.readdirSync(postsDir)
  .filter(file => file.endsWith('.md') && file !== 'index.json');

const posts = files.map(file => {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
  const meta = extractMeta(content);
  return {
    file,
    title: meta.title || file.replace(/\.md$/, ''),
    date: meta.date || ''
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log('✅ Đã tạo index.json từ thư mục posts/');
