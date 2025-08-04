// check-folder-case-conflicts.js
import fs from 'fs'
import path from 'path'


function walkDirs(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach(entry => {
    if (entry.isDirectory()) {
      const fullPath = path.join(dir, entry.name);
      list.push(fullPath);
      walkDirs(fullPath, list);
    }
  });
  return list;
}

function findConflicts(arr) {
  const map = new Map();
  arr.forEach(item => {
    const lower = item.toLowerCase();
    if (map.has(lower)) {
      map.get(lower).push(item);
    } else {
      map.set(lower, [item]);
    }
  });

  let found = false;
  map.forEach((vals) => {
    if (vals.length > 1) {
      found = true;
      console.log('Conflicto de carpeta (mayúsculas/minúsculas):');
      vals.forEach(v => console.log('  - ' + v));
      console.log('');
    }
  });
  if (!found) console.log('No se encontraron conflictos de carpeta.');
}

const allDirs = walkDirs('./src');
findConflicts(allDirs);
