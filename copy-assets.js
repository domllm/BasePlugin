const fs = require('fs');
const path = require('path');

// define a function to copy files recursively
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName),
                              path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// copy all files in the public directory to dist directory
const sourceDir = path.join(__dirname, 'public');
const distDir = path.join(__dirname, 'dist');
copyRecursiveSync(sourceDir, path.join(distDir, 'public'));

// copy icons directory to dist directory
const iconsDir = path.join(__dirname, 'icons');
copyRecursiveSync(iconsDir, path.join(distDir, 'icons'));

// copy manifest.json to dist directory
fs.copyFileSync(path.join(__dirname, 'manifest.json'), path.join(distDir, 'manifest.json'));

console.log('Assets have been copied successfully.');