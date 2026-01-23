const fs = require("fs");
const path = require("path");

// Function to fix a single file
function fixFileImports(filePath) {
  console.log(`Checking: ${filePath}`);

  let content = fs.readFileSync(filePath, "utf8");
  const originalContent = content;

  // Fix @radix-ui imports
  content = content.replace(
    /from ['"]@radix-ui\/(react-[^@'"]+)@[^'"]+['"]/g,
    'from "@radix-ui/$1"'
  );

  // Fix other package imports
  content = content.replace(
    /from ['"](sonner|next-themes|lucide-react|class-variance-authority|clsx|tailwind-merge|cmdk|embla-carousel-react|input-otp|react-day-picker|react-hook-form|react-resizable-panels|recharts|vaul)@[^'"]+['"]/g,
    'from "$1"'
  );

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`  ✅ Fixed imports in ${path.basename(filePath)}`);
    return true;
  }

  console.log(`  ✓ No issues in ${path.basename(filePath)}`);
  return false;
}

// Scan and fix directory
function scanAndFix(directory) {
  let fixedCount = 0;

  const items = fs.readdirSync(directory);

  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      fixedCount += scanAndFix(itemPath);
    } else if (item.endsWith(".tsx") || item.endsWith(".ts")) {
      if (fixFileImports(itemPath)) {
        fixedCount++;
      }
    }
  }

  return fixedCount;
}

// Main execution
console.log("🚀 Starting import fix...\n");

const uiDir = path.join(__dirname, "src", "components", "ui");
console.log(`📁 Fixing UI components in: ${uiDir}`);
const uiFixed = scanAndFix(uiDir);

const componentsDir = path.join(__dirname, "src", "components");
console.log(`\n📁 Fixing other components in: ${componentsDir}`);
const componentsFixed = scanAndFix(componentsDir);

console.log(`\n🎉 Fix complete!`);
console.log(`- Fixed ${uiFixed} UI component files`);
console.log(`- Fixed ${componentsFixed - uiFixed} other component files`);
console.log(`- Total files fixed: ${componentsFixed}`);
