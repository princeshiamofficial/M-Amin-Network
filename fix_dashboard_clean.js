const fs = require('fs');
const file = 'src/app/admin/(dashboard)/dashboard/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add isLoadingData if not present
if (!content.includes('const [isLoadingData')) {
  content = content.replace(
    /const \[isAuthenticated,\s*setIsAuthenticated\]\s*=\s*useState\(false\);/,
    'const [isAuthenticated, setIsAuthenticated] = useState(false);\n  const [isLoadingData, setIsLoadingData] = useState(true);'
  );
}

// 2. Add isLoadingData to render condition
content = content.replace(
  /if \(!mounted\s*\|\|\s*!isAuthenticated\)\s*\{/,
  'if (!mounted || !isAuthenticated || isLoadingData) {'
);

// 3. Make loadDatabase async and add Promise.all wrapper
content = content.replace(
  /function loadDatabase\(\)\s*\{\s*if \(typeof window === "undefined"\) return;\s*/,
  'async function loadDatabase() {\n    if (typeof window === "undefined") return;\n    setIsLoadingData(true);\n    await Promise.all([\n      '
);

// 4. Close the Promise.all wrapper at the end of loadDatabase
content = content.replace(
  /setCountCustomers\(3\);\s*\}\s*\}\);\s*\}/,
  'setCountCustomers(3);\n      }\n    })\n    ]);\n    setIsLoadingData(false);\n  }'
);

// 5. Replace `});\n\n    getSetting(` with `}),\n      getSetting(`
content = content.replace(/\}\);\s*getSetting\(/g, '}),\n      getSetting(');

fs.writeFileSync(file, content);
console.log('Clean fix applied successfully.');
