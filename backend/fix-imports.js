import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith(".js")) {
      let content = fs.readFileSync(fullPath, "utf-8");

      // Arregla los imports y exports relativos
      content = content.replace(
        /(import\s+[\s\S]+?\s+from\s+|export\s+[\s\S]+?\s+from\s+)['"](\.[^'"]+)['"]/g,
        (match, prefix, importPath) => {
          if (
            importPath.endsWith(".js") ||
            importPath.endsWith(".json") ||
            !importPath.startsWith(".")
          ) {
            return match; // ya tiene extensión o es externo
          }

          const filePath = path.resolve(path.dirname(fullPath), importPath);

          if (fs.existsSync(filePath + ".js")) {
            return `${prefix}'${importPath}.js'`;
          }

          if (fs.existsSync(path.join(filePath, "index.js"))) {
            return `${prefix}'${importPath}/index.js'`;
          }

          console.warn("❌ Import no resuelto:", importPath, "en", fullPath);
          return match; // deja igual si no se encuentra
        }
      );

      fs.writeFileSync(fullPath, content, "utf-8");
      console.log(`✅ Fixed imports in ${fullPath}`);
    }
  }
}

walk(distDir);
