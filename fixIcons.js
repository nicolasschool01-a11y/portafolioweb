const fs = require('fs');
let content = fs.readFileSync('src/components/landing/LeadCaptureForm.tsx', 'utf8');

// Replace {Icon && <Icon ... />} pattern where Icon is not defined or messy
content = content.replace(/\{Icon && <Icon className={\`w-5 h-5 \${isSelected \? "text-emerald-400" : "text-muted-foreground"}\`} \/>\}/g, 
                          '{opt.icon && <opt.icon className={`w-5 h-5 ${isSelected ? "text-emerald-400" : "text-muted-foreground"}`} />}');

content = content.replace(/\{!Icon && opt\.emoji && <span className="text-xl">{opt\.emoji}<\/span>\}/g, 
                          '{!opt.icon && opt.emoji && <span className="text-xl">{opt.emoji}</span>}');

content = content.replace(/\{Icon && <Icon className={\`w-5 h-5 \${isSelected \? "text-teal-400" : "text-slate-400"}\`} \/>\}/g, 
                          '{opt.icon && <opt.icon className={`w-5 h-5 ${isSelected ? "text-teal-400" : "text-slate-400"}`} />}');

// In case some loops don't define opt.icon as a component reference properly
// we make sure to provide Icon if we use it
content = content.replace(/\{problemOptions\.map\(\(opt\) => \{/g, '{problemOptions.map((opt) => {\n                    const Icon = opt.icon;');
content = content.replace(/\{targetUsersOptions\.map\(\(opt\) => \{/g, '{targetUsersOptions.map((opt) => {\n                    const Icon = opt.icon;');

fs.writeFileSync('src/components/landing/LeadCaptureForm.tsx', content);
