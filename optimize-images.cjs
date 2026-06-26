const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = path.resolve(__dirname, 'public/assets');

const ALLOWED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!ALLOWED_EXTS.has(ext)) return;

  const stats = fs.statSync(filePath);
  const sizeMB = stats.size / 1024 / 1024;

  // 只处理大于 300KB 的图片
  if (sizeMB < 0.3) {
    console.log(`  skip (<300KB): ${path.relative(ASSETS_DIR, filePath)}`);
    return;
  }

  try {
    const buf = fs.readFileSync(filePath);
    const image = sharp(buf);
    const metadata = await image.metadata();
    const maxDim = Math.max(metadata.width || 0, metadata.height || 0);

    let pipeline = image;

    // 限制最大边为 1600px（如果更大）
    if (maxDim > 1600) {
      pipeline = pipeline.resize(1600, 1600, { fit: 'inside', withoutEnlargement: true });
    }

    // 根据原格式输出，降低质量
    if (ext === '.png') {
      pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: 75, progressive: true, mozjpeg: true });
    }

    const buffer = await pipeline.toBuffer();
    const newSizeMB = buffer.length / 1024 / 1024;

    // 只有当压缩后更小才覆盖
    if (buffer.length < stats.size * 0.95) {
      fs.writeFileSync(filePath, buffer);
      console.log(
        `  ✓ ${path.relative(ASSETS_DIR, filePath)}: ${sizeMB.toFixed(1)}MB → ${newSizeMB.toFixed(1)}MB`
      );
    } else {
      console.log(`  skip (no gain): ${path.relative(ASSETS_DIR, filePath)}`);
    }
  } catch (err) {
    console.error(`  ✗ failed: ${path.relative(ASSETS_DIR, filePath)}`, err.message);
  }
}

async function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else {
      await optimizeImage(fullPath);
    }
  }
}

(async () => {
  console.log('Scanning public/assets...');
  await walk(ASSETS_DIR);
  console.log('Done.');
})();
