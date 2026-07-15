const fs = require('fs');
const file = 'c:\\Transfer\\Project 2026\\M-Amin Network\\src\\app\\admin\\(dashboard)\\dashboard\\page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /const \[isAuthenticated,\s*setIsAuthenticated\]\s*=\s*useState\(false\);/,
  'const [isAuthenticated, setIsAuthenticated] = useState(false);\n  const [isLoadingData, setIsLoadingData] = useState(true);'
);

content = content.replace(
  /if \(!mounted\s*\|\|\s*!isAuthenticated\)\s*\{/,
  'if (!mounted || !isAuthenticated || isLoadingData) {'
);

content = content.replace(
  /function loadDatabase\(\)\s*\{\s*if \(typeof window === "undefined"\) return;\s*/,
  'async function loadDatabase() {\n    if (typeof window === "undefined") return;\n    setIsLoadingData(true);\n    await Promise.all([\n      '
);

content = content.replace(
  /setCountCustomers\(3\);\s*\}\s*\}\);\s*\}/,
  'setCountCustomers(3);\n      }\n    })\n    ]);\n    setIsLoadingData(false);\n  }'
);

content = content.replace(/\}\);\s*getSetting\(/g, '}),\n      getSetting(');

fs.writeFileSync(file, content);
console.log('Regex fix applied successfully.');
