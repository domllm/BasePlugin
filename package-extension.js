const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'extension.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Set the compression level
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Add the entire dist directory to the archive
archive.directory('dist/', false);

archive.finalize();