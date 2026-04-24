const fs = require('fs');
let content = fs.readFileSync('src/components/landing/LeadCaptureForm.tsx', 'utf8');

// 1. Fix truncate in option titles to allow multiline
content = content.replace(/font-semibold block truncate/g, 'font-semibold block leading-tight pb-0.5');

// 2. Fix the scale/jank on active/select
// Is there a scale transform in RippleCard?
// We will replace "whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}" with "whileTap={{ scale: 0.98 }}"
content = content.replace(/whileHover=\{\{ scale: 1\.02 \}\} whileTap=\{\{ scale: 0\.95 \}\}/g, 'whileTap={{ scale: 0.98 }}');

// Check if any className has hover:-translate-y-1 or similar scale causing jumping
content = content.replace(/hover:-translate-y-1 /g, '');

fs.writeFileSync('src/components/landing/LeadCaptureForm.tsx', content);
