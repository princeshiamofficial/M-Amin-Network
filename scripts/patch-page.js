// patch-page.js - Applies dynamic service cards & network features to page.tsx
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "src/app/page.tsx");
let code = fs.readFileSync(filePath, "utf8");

// 1. Add lucide-react wildcard import after useTranslation
if (!code.includes("import * as Lucide from")) {
  code = code.replace(
    `import { useTranslation } from "@/hooks/useTranslation";`,
    `import { useTranslation } from "@/hooks/useTranslation";\nimport * as Lucide from "lucide-react";`
  );
  console.log("✅ Added Lucide wildcard import");
}

// 2. Add ServiceCard and NetworkFeature interfaces after last existing interface
if (!code.includes("interface ServiceCard")) {
  const insertAfter = `interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}`;
  code = code.replace(insertAfter, `${insertAfter}

interface NetworkFeature {
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  iconName: string;
}

interface ServiceCard {
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  badgeEn: string;
  badgeBn: string;
  iconName: string;
}
`);
  console.log("✅ Added NetworkFeature and ServiceCard interfaces");
}

// 3. Add state declarations inside Home() component
if (!code.includes("const [serviceCards, setServiceCards]")) {
  // Find the useTranslation hook call inside Home()
  code = code.replace(
    `  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);`,
    `  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  const [features, setFeatures] = React.useState<NetworkFeature[]>([]);
  const [serviceCards, setServiceCards] = React.useState<ServiceCard[]>([]);`
  );
  console.log("✅ Added features and serviceCards state");
}

// 4. Add useEffect to load from localStorage
if (!code.includes("m_amin_service_cards")) {
  // Find first useEffect and insert a new one before it
  const firstEffect = `  useEffect(() => {`;
  const idx = code.indexOf(firstEffect);
  if (idx !== -1) {
    const loaderEffect = `  useEffect(() => {
    // Load network features
    const savedFeatures = localStorage.getItem("m_amin_network_features");
    if (savedFeatures) {
      try { setFeatures(JSON.parse(savedFeatures)); } catch {}
    }
    // Load service cards
    const savedCards = localStorage.getItem("m_amin_service_cards");
    if (savedCards) {
      try { setServiceCards(JSON.parse(savedCards)); } catch {}
    }
  }, []);

`;
    code = code.slice(0, idx) + loaderEffect + code.slice(idx);
    console.log("✅ Added localStorage loading useEffect");
  }
}

fs.writeFileSync(filePath, code, "utf8");
console.log("✅ page.tsx patched successfully");
