const fs=require('fs');
let c=fs.readFileSync('src/App.jsx','utf8');
if (c.includes('TourGuide')) {
  console.log('TourGuide already imported');
} else {
  c = 'import TourGuide from "./TourGuide.jsx"\n' + c;
}
c = c.replace(/<OnboardingTour[^>]*\/>/g, '<TourGuide onClose={()=>{setShowTour(false);localStorage.setItem("inventshield_onboarded","1")}} />');
fs.writeFileSync('src/App.jsx',c);
console.log('TourGuide wired!');
