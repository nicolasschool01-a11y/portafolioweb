const fs = require('fs');
let content = fs.readFileSync('src/components/landing/LeadCaptureForm.tsx', 'utf8');

// Remove double const Icon = opt.icon;
content = content.replace(/const Icon = opt\.icon;\n\s+const Icon = opt\.icon;/g, 'const Icon = opt.icon;');

// Also remove the pattern {opt.icon && <opt.icon ... />} because we have Icon now
// content = content.replace(/\{opt\.icon && <opt\.icon ([\s\S]*?) \/>\}/g, '{Icon && <Icon $1 />}');
// Actually, using opt.icon is safer if Icon is not defined.

fs.writeFileSync('src/components/landing/LeadCaptureForm.tsx', content);
