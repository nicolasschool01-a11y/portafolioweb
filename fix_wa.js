const fs = require('fs');
const glob = require('glob'); // Note: glob might not be installed or we can just scan src manually

const filesToCheck = [
    'src/components/landing/StickyCTA.tsx',
    'src/components/landing/Footer.tsx',
    'src/components/landing/WhatsAppWidget.tsx',
    'src/components/landing/QuickContactBar.tsx'
];

filesToCheck.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // Replace all variations of wa.me/number
        let newContent = content.replace(/wa\.me\/\d+/g, 'wa.me/59893836619');
        if (content !== newContent) {
            fs.writeFileSync(file, newContent);
            console.log(`Updated ${file}`);
        }
    }
});
