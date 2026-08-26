import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();
const SVG_PATH = path.join(ROOT_DIR, 'public', 'icon.svg');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

async function generateIcons() {
  console.log('🎨 Generating high-fidelity app icons from public/icon.svg...');

  if (!fs.existsSync(SVG_PATH)) {
    console.error('❌ public/icon.svg not found!');
    process.exit(1);
  }

  const svgBuffer = fs.readFileSync(SVG_PATH);

  // 1. Generate 512x512 Master App Icon
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'icon.png'));
  console.log('✅ Generated public/icon.png (512x512)');

  // 2. Generate 192x192 Favicon / PWA Icon
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon.png'));
  console.log('✅ Generated public/favicon.png (192x192)');

  // 3. Generate 180x180 Apple Touch Icon
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  console.log('✅ Generated public/apple-touch-icon.png (180x180)');

  // 4. Generate 32x32 Web Favicon
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon-32x32.png'));
  console.log('✅ Generated public/favicon-32x32.png (32x32)');

  // 5. Generate Android Native Mipmaps if Android folder exists
  const androidResDir = path.join(ROOT_DIR, 'android', 'app', 'src', 'main', 'res');
  if (fs.existsSync(androidResDir)) {
    const mipmaps = [
      { dir: 'mipmap-mdpi', size: 48 },
      { dir: 'mipmap-hdpi', size: 72 },
      { dir: 'mipmap-xhdpi', size: 96 },
      { dir: 'mipmap-xxhdpi', size: 144 },
      { dir: 'mipmap-xxxhdpi', size: 192 },
    ];

    for (const { dir, size } of mipmaps) {
      const targetDir = path.join(androidResDir, dir);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(targetDir, 'ic_launcher.png'));

      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(targetDir, 'ic_launcher_round.png'));

      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(targetDir, 'ic_launcher_foreground.png'));

      console.log(`📱 Generated Android ${dir} icons (${size}x${size})`);
    }
  }

  console.log('🎉 App icons generation completed successfully!');
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
