const fs = require('fs');
const path = require('path');

function patchFile(filePath, target, replacement) {
    if (fs.existsSync(filePath)) {
        console.log(`Patching ${path.basename(filePath)}...`);
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes(target) && !content.includes(replacement)) {
            content = content.replace(target, replacement);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`${path.basename(filePath)} patched successfully!`);
        } else {
            console.log(`${path.basename(filePath)} is already patched or target pattern not found.`);
        }
    } else {
        console.warn(`File not found to patch: ${filePath}`);
    }
}

// Patch index.js (CommonJS)
const jsFile = path.join(__dirname, 'node_modules', 'vosk-koffi', 'lib', 'index.js');
patchFile(
    jsFile,
    'l.default.resolve(__dirname',
    "l.default.resolve(__dirname.replace('app.asar', 'app.asar.unpacked')"
);

// Patch index.mjs (ESM)
const mjsFile = path.join(__dirname, 'node_modules', 'vosk-koffi', 'lib', 'index.mjs');
patchFile(
    mjsFile,
    'let s=l.resolve(t',
    "let s=l.resolve(t.replace('app.asar', 'app.asar.unpacked')"
);
