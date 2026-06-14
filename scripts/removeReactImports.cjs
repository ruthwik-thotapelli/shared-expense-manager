const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (full.endsWith('.jsx')) {
      let text = fs.readFileSync(full, 'utf8');
      const orig = text;
      text = text.replace(/^import React, \{([^\n]*)\} from "react";\n/gm, 'import {$1} from "react";\n');
      text = text.replace(/^import React from "react";\n/gm, '');
      if (text !== orig) {
        fs.writeFileSync(full, text, 'utf8');
        console.log('Fixed', path.relative(root, full));
      }
    }
  }
}
walk(root);
