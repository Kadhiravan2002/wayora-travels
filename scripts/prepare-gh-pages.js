const fs = require('fs');
const path = require('path');

const browserDir = path.join(__dirname, '..', 'dist', 'wayora-travels', 'browser');
const indexPath = path.join(browserDir, 'index.html');
const notFoundPath = path.join(browserDir, '404.html');
const noJekyllPath = path.join(browserDir, '.nojekyll');

if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
  fs.writeFileSync(noJekyllPath, '');
  console.log('Successfully prepared 404.html and .nojekyll in', browserDir);
} else {
  console.error('Error: index.html not found in', browserDir);
  process.exit(1);
}
