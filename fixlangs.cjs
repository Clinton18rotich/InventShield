const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');
if (!code.includes('import translations')) {
  code = code.replace('import { BrowserRouter', "import translations from './translations.js'\nimport { BrowserRouter");
  code = code.replace(/const translations = \{[\s\S]*?\n\};/, '');
  code = code.replace(/const langs = \[\{code:'en'.*?\];/, "const langs = [{code:'en',label:'EN'},{code:'es',label:'ES'},{code:'fr',label:'FR'},{code:'sw',label:'SW'}];");
  fs.writeFileSync('src/App.jsx', code);
  console.log('Updated App.jsx');
} else {
  console.log('Already updated');
}
