
const fs = require('fs');
const path = require('path');

const packageJson = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8');
const version = JSON.parse(packageJson).version;
const filePath = path.join(__dirname, '../src/index.ts');

fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    const result = data.replace(/export const version = ".+";/, `export const version = "${version}";`);
    
    fs.writeFile(filePath, result, 'utf8', function (err) {
        if (err) return console.log(err);
        // mostrar mensaje de éxito
        console.log('Version updated to ' + version);
    });
});

