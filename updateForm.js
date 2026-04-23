const fs = require('fs');
let content = fs.readFileSync('src/components/landing/LeadCaptureForm.tsx', 'utf8');

// 1. Remove all backdrop-blurs completely on mobile, leave on sm:
content = content.replace(/bg-card\/50 backdrop-blur-sm p/g, 'bg-card sm:bg-card/50 sm:backdrop-blur-sm p');
content = content.replace(/bg-card sm:bg-card\/50 sm:backdrop-blur-sm p-3/g, 'bg-card sm:bg-card/50 sm:backdrop-blur-sm p-2');

// 2. Reduce gaps and margins globally to compress the screen
content = content.replace(/mb-6/g, 'mb-2 sm:mb-6');
content = content.replace(/gap-3/g, 'gap-2 sm:gap-3');

// 3. Make Step 2, 3, 4, 5, 6 grid-cols-2 on Mobile to avoid 6-row heights
content = content.replace(/grid grid-cols-1 sm:grid-cols-2/g, 'grid grid-cols-2');

// 4. Shrink the main Zap explosion blur (mix-blend-screen and blur-xl are heavy)
content = content.replace(/bg-cyan-400 mix-blend-screen blur-xl/g, 'bg-cyan-400 sm:mix-blend-screen blur-md sm:blur-xl');
content = content.replace(/bg-teal-400 mix-blend-screen blur-md/g, 'bg-teal-400 sm:mix-blend-screen sm:blur-md');
content = content.replace(/bg-emerald-400 mix-blend-screen blur-lg/g, 'bg-emerald-400 sm:mix-blend-screen blur-sm sm:blur-lg');

// 5. Tone down RippleCard padding in step 1 that was missed
content = content.replace(/p-3 rounded-xl/g, 'p-2 sm:p-5 rounded-xl');

fs.writeFileSync('src/components/landing/LeadCaptureForm.tsx', content);
