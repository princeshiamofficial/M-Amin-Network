/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputImage = path.join(__dirname, '../public/xlogo.png');
const outputDir = path.join(__dirname, '../public/favicon');

// Create favicon directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateFavicons() {
  try {
    console.log("Generating favicons from:", inputImage);

    // 1. favicon-16x16.png
    await sharp(inputImage)
      .resize(16, 16)
      .toFile(path.join(outputDir, 'favicon-16x16.png'));
    console.log("Generated favicon-16x16.png");

    // 2. favicon-32x32.png
    await sharp(inputImage)
      .resize(32, 32)
      .toFile(path.join(outputDir, 'favicon-32x32.png'));
    console.log("Generated favicon-32x32.png");

    // 3. favicon.ico (We save it as 32x32 png, modern browsers support this perfectly)
    await sharp(inputImage)
      .resize(32, 32)
      .toFile(path.join(outputDir, 'favicon.ico'));
    console.log("Generated favicon.ico in /favicon");

    // Also overwrite the fallback app/favicon.ico
    await sharp(inputImage)
      .resize(32, 32)
      .toFile(path.join(__dirname, '../src/app/favicon.ico'));
    console.log("Generated fallback favicon.ico in src/app");

    // 4. apple-touch-icon.png
    await sharp(inputImage)
      .resize(180, 180)
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    console.log("Generated apple-touch-icon.png");

    // 5. android-chrome-192x192.png
    await sharp(inputImage)
      .resize(192, 192)
      .toFile(path.join(outputDir, 'android-chrome-192x192.png'));
    console.log("Generated android-chrome-192x192.png");

    // 6. android-chrome-512x512.png
    await sharp(inputImage)
      .resize(512, 512)
      .toFile(path.join(outputDir, 'android-chrome-512x512.png'));
    console.log("Generated android-chrome-512x512.png");

    console.log("All favicons successfully generated!");
  } catch (error) {
    console.error("Error generating favicons:", error);
    process.exit(1);
  }
}

generateFavicons();
