import RevenueHub from "./RevenueHub.jsx"
import DiscoverHub from "./DiscoverHub.jsx"
import TourGuide from "./TourGuide.jsx"
import InvestorHub from "./InvestorHub.jsx"
import SmartAIFloatingButton from "./SmartAIFloating.jsx"
import LegalHub from "./LegalHub.jsx"
import GeminiChat from "./GeminiChat.jsx"
import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams, Navigate } from 'react-router-dom'

const PLATFORM_FEE = 0.05; const WAIVED_FEE = 0.00

const T = (lang, id) => translations[lang]?.[id] || translations['en']?.[id] || id

const translations = {
  es: { appName:"InventShield", dashboard:"Panel", discover:"Descubrir", funding:"Fondos", mentors:"Mentores", legal:"Legal", certify:"Certificar", global:"Global", records:"Registros", addInvention:"Anadir", revenue:"Ingresos", profile:"Perfil", login:"Entrar", register:"Registrar", logout:"Salir", email:"Correo", password:"Clave", confirmPassword:"Confirmar", name:"Nombre", bio:"Bio", expertise:"Pericia", loginTitle:"Bienvenido", registerTitle:"Crear Cuenta", loginBtn:"Entrar", registerBtn:"Registrar", noAccount:"Sin cuenta?", hasAccount:"Ya tienes?", myVault:"Mi Boveda", manageDrafts:"Gestionar", search:"Buscar...", protected:"PROTEGIDO", draft:"BORRADOR", back:"Volver", totalFunding:"Fondos", totalInventions:"Inventos", totalContributors:"Contribuidores", platformRevenue:"Ingresos", comments:"Comentarios", post:"Publicar", crowdfunding:"Financiacion", startCampaign:"Iniciar", contributeNow:"Contribuir", applyWaiver:"Exencion", waiverApproved:"Exento", waiverPending:"Pendiente", waiverReason:"Por que?", submitWaiver:"Enviar", poorInventorBadge:"Protegido", payWhenFunded:"Pagar despues", revenueDashboard:"Ingresos", feeCollected:"Tarifas", activeCampaigns:"Campanas", totalPayouts:"Pagos", panicButton:"PANICO", deadManSwitch:"Interruptor", anonymousSubmit:"Anonimo", submitInvention:"Enviar", inventorName:"Inventor", inventionTitle:"Titulo", submitting:"Enviando...", goal:"Meta", raised:"Recaudado", applyNow:"Solicitar", scheduleCall:"Llamar", previous:"Ant", next:"Sig", pageNotFound:"404", notifications:"Avisos", noNotifications:"Ninguno", darkMode:"Oscuro", lightMode:"Claro", viewDetails:"Detalles", requestToContribute:"Contribuir", requesting:"...", step1:"Paso 1", step2:"Paso 2", step3:"Paso 3", step4:"Paso 4", completionProgress:"Progreso", completeCertify:"Certificar", vaultUnlocked:"Abierto", certificationComplete:"Hecho!", myInventions:"Mis Inventos", totalEarned:"Ganado", joinedOn:"Miembro", editProfile:"Editar", saveProfile:"Guardar", passwordMin:"6+", passwordsDontMatch:"No coincide", loginFailed:"Fallo", registerFailed:"Fallo", emailExists:"Ya existe", welcomeBack:"Hola,", aiAssistant:"IA", askAI:"Pregunta...", aiWelcome:"Hola! Preguntame.", aiThinking:"Pensando...", onboarding:"Tour", onboardingWelcome:"Bienvenido!", onboardingStep1:"Panel.", onboardingStep2:"Busca.", onboardingStep3:"Clic.", onboardingStep4:"Nav inf.", onboardingStep5:"Campana.", onboardingDone:"Listo!", skipTour:"Saltar", helpCenter:"Ayuda", checklist:"Lista", checklistItem1:"Cuenta", checklistItem2:"Invento", checklistItem3:"Exencion", checklistItem4:"Campana", checklistItem5:"Colaborador", checklistItem6:"Proteccion", complete:"Hecho" },
  fr: { appName:"InventShield", dashboard:"Tableau", discover:"Decouvrir", funding:"Financement", mentors:"Mentors", legal:"Juridique", certify:"Certifier", global:"Mondial", records:"Archives", addInvention:"Ajouter", revenue:"Revenus", profile:"Profil", login:"Connexion", register:"Inscription", logout:"Sortie", email:"Email", password:"Mot de passe", confirmPassword:"Confirmer", name:"Nom", bio:"Bio", expertise:"Expertise", loginTitle:"Bonjour", registerTitle:"Creer compte", loginBtn:"Connexion", registerBtn:"Inscription", noAccount:"Pas de compte?", hasAccount:"Deja?", myVault:"Mon Coffre", manageDrafts:"Gerer", search:"Rechercher...", protected:"PROTEGE", draft:"BROUILLON", back:"Retour", totalFunding:"Financement", totalInventions:"Inventions", totalContributors:"Contributeurs", platformRevenue:"Revenus", comments:"Discussion", post:"Publier", crowdfunding:"Financement", startCampaign:"Lancer", contributeNow:"Contribuer", applyWaiver:"Exoneration", waiverApproved:"Exonere", waiverPending:"Attente", waiverReason:"Pourquoi?", submitWaiver:"Soumettre", poorInventorBadge:"Protege", payWhenFunded:"Payer apres", revenueDashboard:"Revenus", feeCollected:"Frais", activeCampaigns:"Campagnes", totalPayouts:"Paiements", panicButton:"PANIQUE", deadManSwitch:"Interrupteur", anonymousSubmit:"Anonyme", submitInvention:"Soumettre", inventorName:"Inventeur", inventionTitle:"Titre", submitting:"Envoi...", goal:"Objectif", raised:"Collecte", applyNow:"Postuler", scheduleCall:"Appeler", previous:"Prec", next:"Suiv", pageNotFound:"404", notifications:"Notifs", noNotifications:"Aucune", darkMode:"Sombre", lightMode:"Clair", viewDetails:"Details", requestToContribute:"Contribuer", requesting:"...", step1:"Etape 1", step2:"Etape 2", step3:"Etape 3", step4:"Etape 4", completionProgress:"Progres", completeCertify:"Certifier", vaultUnlocked:"Ouvert", certificationComplete:"Fini!", myInventions:"Mes Inventions", totalEarned:"Gagne", joinedOn:"Inscrit", editProfile:"Modifier", saveProfile:"Sauver", passwordMin:"6+", passwordsDontMatch:"Different", loginFailed:"Echec", registerFailed:"Echec", emailExists:"Existe", welcomeBack:"Salut,", aiAssistant:"IA", askAI:"Demandez...", aiWelcome:"Bonjour!", aiThinking:"Reflexion...", onboarding:"Visite", onboardingWelcome:"Bienvenue!", onboardingStep1:"Tableau.", onboardingStep2:"Cherchez.", onboardingStep3:"Cliquez.", onboardingStep4:"Nav bas.", onboardingStep5:"Cloche.", onboardingDone:"Compris!", skipTour:"Passer", helpCenter:"Aide", checklist:"Liste", checklistItem1:"Compte", checklistItem2:"Invention", checklistItem3:"Exo", checklistItem4:"Campagne", checklistItem5:"Ajouter", checklistItem6:"Proteger", complete:"Fini" },
  sw: { appName:"InventShield", dashboard:"Dashibodi", discover:"Gundua", funding:"Ufadhili", mentors:"Washauri", legal:"Kisheria", certify:"Thibitisha", global:"Kimataifa", records:"Rekodi", addInvention:"Ongeza", revenue:"Mapato", profile:"Wasifu", login:"Ingia", register:"Jisajili", logout:"Toka", email:"Barua Pepe", password:"Nywila", confirmPassword:"Thibitisha", name:"Jina", bio:"Wasifu", expertise:"Utaalam", loginTitle:"Karibu", registerTitle:"Fungua Akaunti", loginBtn:"Ingia", registerBtn:"Jisajili", noAccount:"Huna?", hasAccount:"Una?", myVault:"Hazina Yangu", manageDrafts:"Simamia", search:"Tafuta...", protected:"IMELINDWA", draft:"RASIMU", back:"Rudi", totalFunding:"Ufadhili", totalInventions:"Uvumbuzi", totalContributors:"Wachangiaji", platformRevenue:"Mapato", comments:"Majadiliano", post:"Tuma", crowdfunding:"Ufadhili", startCampaign:"Anzisha", contributeNow:"Changia", applyWaiver:"Omba Msamaha", waiverApproved:"Imekubaliwa", waiverPending:"Inasubiri", waiverReason:"Kwa nini?", submitWaiver:"Tuma", poorInventorBadge:"Imelindwa", payWhenFunded:"Lipa Baadaye", revenueDashboard:"Mapato", feeCollected:"Ada", activeCampaigns:"Kampeni", totalPayouts:"Malipo", panicButton:"HATARI", deadManSwitch:"Dharura", anonymousSubmit:"Bila Jina", submitInvention:"Tuma", inventorName:"Mvumbuzi", inventionTitle:"Jina", submitting:"Inatuma...", goal:"Lengo", raised:"Imekusanywa", applyNow:"Omba", scheduleCall:"Piga Simu", previous:"Nyuma", next:"Mbele", pageNotFound:"404", notifications:"Arifa", noNotifications:"Hakuna", darkMode:"Giza", lightMode:"Mwanga", viewDetails:"Maelezo", requestToContribute:"Omba", requesting:"...", step1:"Hatua 1", step2:"Hatua 2", step3:"Hatua 3", step4:"Hatua 4", completionProgress:"Maendeleo", completeCertify:"Kamilisha", vaultUnlocked:"Imefunguliwa", certificationComplete:"Imethibitishwa!", myInventions:"Uvumbuzi Wangu", totalEarned:"Jumla", joinedOn:"Alijiunga", editProfile:"Hariri", saveProfile:"Hifadhi", passwordMin:"6+", passwordsDontMatch:"Hazilingani", loginFailed:"Imeshindwa", registerFailed:"Imeshindwa", emailExists:"Tayari ipo", welcomeBack:"Karibu,", aiAssistant:"Msaidizi", askAI:"Niulize...", aiWelcome:"Habari!", aiThinking:"Fikiri...", onboarding:"Ziara", onboardingWelcome:"Karibu!", onboardingStep1:"Dashibodi.", onboardingStep2:"Tafuta.", onboardingStep3:"Bonyeza.", onboardingStep4:"Nav chini.", onboardingStep5:"Kengele.", onboardingDone:"Nimeelewa!", skipTour:"Ruka", helpCenter:"Msaada", checklist:"Orodha", checklistItem1:"Akaunti", checklistItem2:"Uvumbuzi", checklistItem3:"Msamaha", checklistItem4:"Kampeni", checklistItem5:"Mchangiaji", checklistItem6:"Ulinzi", complete:"Imekamilika" },
  en: { appName:'InventShield', dashboard:'Dashboard', discover:'Discover', funding:'Funding', mentors:'Mentors', legal:'Legal', certify:'Certify', global:'Global', records:'Records', addInvention:'Add', revenue:'Revenue', profile:'Profile', login:'Login', register:'Register', logout:'Logout', email:'Email', password:'Password', confirmPassword:'Confirm', name:'Name', bio:'Bio', expertise:'Expertise', loginTitle:'Welcome Back', registerTitle:'Create Account', loginBtn:'Sign In', registerBtn:'Sign Up', noAccount:'No account?', hasAccount:'Have account?', myVault:'My Vault', manageDrafts:'Manage inventions', search:'Search...', protected:'PROTECTED', draft:'DRAFT', back:'Back', totalFunding:'Funding', totalInventions:'Inventions', totalContributors:'Contributors', platformRevenue:'Revenue', comments:'Discussion', post:'Post', crowdfunding:'Crowdfunding', startCampaign:'Start', contributeNow:'Contribute', applyWaiver:'Fee Waiver', waiverApproved:'Waived', waiverPending:'Pending', waiverReason:'Why waive?', submitWaiver:'Submit', poorInventorBadge:'Protected', payWhenFunded:'Pay When Funded', revenueDashboard:'Revenue Dashboard', feeCollected:'Fees', activeCampaigns:'Campaigns', totalPayouts:'Payouts', panicButton:'PANIC', deadManSwitch:'Dead Man Switch', anonymousSubmit:'Anonymous', submitInvention:'Submit Invention', inventorName:'Inventor', inventionTitle:'Title', submitting:'Submitting...', goal:'Goal', raised:'Raised', applyNow:'Apply', scheduleCall:'Call', previous:'Prev', next:'Next', pageNotFound:'Not Found', notifications:'Notifications', noNotifications:'None', darkMode:'Dark', lightMode:'Light', viewDetails:'Details', requestToContribute:'Contribute', requesting:'...', step1:'Step 1', step2:'Step 2', step3:'Step 3', step4:'Step 4', completionProgress:'Progress', completeCertify:'Certify', vaultUnlocked:'Unlocked', certificationComplete:'Done!', myInventions:'My Inventions', totalEarned:'Earned', joinedOn:'Joined', editProfile:'Edit', saveProfile:'Save', passwordMin:'6+ chars', passwordsDontMatch:'No match', loginFailed:'Login failed', registerFailed:'Register failed', emailExists:'Email exists', welcomeBack:'Welcome,', aiAssistant:'AI Assistant', askAI:'Ask me anything...', aiWelcome:'Hi! Ask about crowdfunding, protection, fee waivers...', aiThinking:'Thinking...', onboarding:'Tour', onboardingWelcome:'Welcome to InventShield!', onboardingStep1:'This is your Dashboard.', onboardingStep2:'Search and add inventions.', onboardingStep3:'Click cards for details.', onboardingStep4:'Use bottom nav to explore.', onboardingStep5:'Bell for notifications.', onboardingDone:'Got it!', skipTour:'Skip', helpCenter:'Help', checklist:'Checklist', checklistItem1:'Create account', checklistItem2:'Submit invention', checklistItem3:'Apply waiver', checklistItem4:'Start campaign', checklistItem5:'Add contributor', checklistItem6:'Set protection', complete:'Complete' }
}

const initialInventions = [
  { id: 1, title: 'Solar Water Purifier', status: 'protected', tag: 'Eco-friendly', wallet: '0x7f3a2b9c1d4e5f67890abcdef1234567890abcd', funding: '$15,000', description: 'Solar-powered water purification system.', documents: ['Patent_Filing_v1.pdf'], progress: 100, contributors: [{ name: 'Alex Rivera', role: 'Inventor', share: 60, avatar: 'A', userId: 'user1' },{ name: 'Dr. Sarah Chen', role: 'Reviewer', share: 25, avatar: 'S', userId: 'user2' }], comments: [{ user: 'Dr. Sarah Chen', text: 'Excellent design.', time: '2h ago' }], activities: [{ text: 'Certified on blockchain', time: '3d ago' }], crowdfunding: { active: true, goal: 50000, raised: 32000, backers: 48, shareLink: '' }, inventorName: 'Alex Rivera', inventorId: 'user1', createdAt: '2025-11-15T10:30:00Z', deadManSwitch: { active: false, lastCheckIn: null }, panicLocked: false, blockchainAnchored: true, anonymous: false, feeWaiver: false, waiverRequested: false, plan: 'free' },
  { id: 2, title: 'Smart Irrigation', status: 'draft', tag: 'AI-powered', wallet: null, funding: '$5,000', description: 'AI-driven irrigation system.', documents: [], progress: 60, contributors: [{ name: 'Maria Santos', role: 'Inventor', share: 100, avatar: 'M', userId: 'user3' }], comments: [], activities: [{ text: 'Draft created', time: '2w ago' }], crowdfunding: { active: false, goal: 0, raised: 0, backers: 0, shareLink: '' }, inventorName: 'Maria Santos', inventorId: 'user3', createdAt: '2026-01-20T14:00:00Z', deadManSwitch: { active: false, lastCheckIn: null }, panicLocked: false, blockchainAnchored: false, anonymous: false, feeWaiver: false, waiverRequested: false, plan: 'free' },
]

const initialUsers = [
  { id: 'user1', name: 'Alex Rivera', email: 'alex@example.com', password: 'password123', bio: 'CleanTech inventor.', expertise: 'Water, Solar', avatar: 'A', role: 'inventor', joinedAt: '2025-11-01T00:00:00Z' },
  { id: 'user2', name: 'Dr. Sarah Chen', email: 'sarah@example.com', password: 'password123', bio: 'Patent reviewer.', expertise: 'Patent Law', avatar: 'S', role: 'reviewer', joinedAt: '2025-10-15T00:00:00Z' },
  { id: 'user3', name: 'Maria Santos', email: 'maria@example.com', password: 'password123', bio: 'AI researcher.', expertise: 'AI, Agriculture', avatar: 'M', role: 'inventor', joinedAt: '2026-01-10T00:00:00Z' },
]

const aiQA = {
  protect:'Use Dead Man Switch and Panic Button in Protection section.',
  crowdfunding:'Start a campaign from your invention page. 5% fee (waivable).',
  fee:'Apply for fee waiver in vault. Auto-approves in 5 seconds.',
  contributor:'Share your invention link. Others join from Discover.',
  anonymous:'Check "Anonymous" when submitting.',
  backup:'Download encrypted backup from Protection section.',
  default:'I can help with: protection, crowdfunding, fee waivers, contributors, anonymous mode, and backup.'
}

const generateHash = (d) => { let h=0; const s=JSON.stringify(d); for(let i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0}; return '0x'+Math.abs(h).toString(16).padStart(16,'0') }

function getAIResponse(q) {
  const lq = q.toLowerCase()
  if(lq.includes('protect')||lq.includes('panic')) return aiQA.protect
  if(lq.includes('crowdfunding')||lq.includes('campaign')) return aiQA.crowdfunding
  if(lq.includes('fee')||lq.includes('waiver')) return aiQA.fee
  if(lq.includes('contributor')||lq.includes('join')) return aiQA.contributor
  if(lq.includes('anonymous')||lq.includes('anon')) return aiQA.anonymous
  if(lq.includes('backup')||lq.includes('data')) return aiQA.backup
  return aiQA.default
}

class ErrorBoundary extends React.Component {
  constructor(p){super(p);this.state={hasError:false,error:null}}
  static getDerivedStateFromError(e){return{hasError:true,error:e}}
  render(){if(this.state.hasError)return<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#fef2f2'}}><div style={{background:'white',borderRadius:16,padding:32,textAlign:'center'}}><h1 style={{color:'#b91c1c'}}>Error</h1><button onClick={()=>window.location.reload()} style={{background:'#dc2626',color:'white',padding:'8px 24px',borderRadius:12,border:'none',cursor:'pointer'}}>Reload</button></div></div>;return this.props.children}
}

function AuthContext() {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('inventshield_user')) } catch { return null } })
  return { user, login: (u) => { setUser(u); localStorage.setItem('inventshield_user', JSON.stringify(u)) }, logout: () => { setUser(null); localStorage.removeItem('inventshield_user') }, isLoggedIn: !!user }
}

function OnboardingTour({ lang, dark, onClose }) {
  const [step, setStep] = useState(0)
  const steps = [
    { title: T(lang,'onboardingWelcome'), text: T(lang,'onboardingStep1'), top: '20%', left: '50%' },
    { text: T(lang,'onboardingStep2'), top: '35%', left: '50%' },
    { text: T(lang,'onboardingStep3'), top: '55%', left: '50%' },
    { text: T(lang,'onboardingStep4'), top: '90%', left: '50%' },
    { text: T(lang,'onboardingStep5'), top: '5%', left: '80%' },
  ]
  const s = steps[step]
  if (step >= steps.length) { onClose(); return null }
  return (
    <div style={{position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,0.7)'}} onClick={() => step > 0 && setStep(step+1)}>
      <div style={{position:'absolute',top:s.top,left:s.left,transform:'translate(-50%,-50%)',background:'white',borderRadius:16,padding:24,maxWidth:320,textAlign:'center',boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}} onClick={e=>e.stopPropagation()}>
        {s.title && <h3 style={{fontSize:18,fontWeight:'bold',color:'#111827',marginBottom:8}}>{s.title}</h3>}
        <p style={{color:'#4b5563',fontSize:14,marginBottom:16}}>{s.text}</p>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <button onClick={onClose} style={{background:'none',border:'none',color:'#9ca3af',fontSize:12,cursor:'pointer'}}>{T(lang,'skipTour')}</button>
          <div style={{display:'flex',gap:4}}>{steps.map((_,i)=><div key={i} style={{width:8,height:8,borderRadius:'50%',background:i===step?'#4f46e5':'#d1d5db'}}></div>)}</div>
          <button onClick={()=>setStep(step+1)} style={{background:'#4f46e5',color:'white',padding:'6px 16px',borderRadius:8,border:'none',cursor:'pointer',fontSize:13}}>{step===steps.length-1?T(lang,'onboardingDone'):T(lang,'next')}</button>
        </div>
      </div>
    </div>
  )
}

function AIChatbot({ lang, dark }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'ai', text: T(lang,'aiWelcome') }])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const bg=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'
  const ask = () => { if (!input.trim()) return; const userMsg = { role: 'user', text: input }; setMessages(prev => [...prev, userMsg]); setInput(''); setThinking(true); setTimeout(() => { setMessages(prev => [...prev, { role: 'ai', text: getAIResponse(input) }]); setThinking(false) }, 1000) }
  return (
    <div style={{position:'fixed',bottom:80,right:16,zIndex:150}}>
      {open && (
        <div style={{background:bg,borderRadius:16,boxShadow:'0 10px 40px rgba(0,0,0,0.2)',width:320,height:400,display:'flex',flexDirection:'column',marginBottom:8,overflow:'hidden'}}>
          <div style={{background:'#4f46e5',color:'white',padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontWeight:600,fontSize:14}}>{T(lang,'aiAssistant')}</span>
            <button onClick={()=>setOpen(false)} style={{background:'none',border:'none',color:'white',fontSize:18,cursor:'pointer'}}>✕</button>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:12,display:'flex',flexDirection:'column',gap:8}}>
            {messages.map((m,i)=><div key={i} style={{alignSelf:m.role==='user'?'flex-end':'flex-start',maxWidth:'85%',background:m.role==='user'?'#4f46e5':dark?'#374151':'#f3f4f6',color:m.role==='user'?'white':txt,padding:'8px 12px',borderRadius:12,fontSize:13}}>{m.text}</div>)}
            {thinking && <div style={{alignSelf:'flex-start',color:'#9ca3af',fontSize:12,fontStyle:'italic'}}>{T(lang,'aiThinking')}</div>}
          </div>
          <div style={{padding:12,borderTop:dark?'1px solid #374151':'1px solid #e5e7eb',display:'flex',gap:6}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&ask()} placeholder={T(lang,'askAI')} style={{flex:1,padding:'8px 12px',borderRadius:20,border:dark?'1px solid #374151':'1px solid #d1d5db',background:bg,color:txt,fontSize:12}} />
            <button onClick={ask} style={{background:'#4f46e5',color:'white',border:'none',borderRadius:'50%',width:36,height:36,cursor:'pointer',fontSize:16}}>&gt;</button>
          </div>
        </div>
      )}
      <button onClick={()=>setOpen(!open)} style={{width:52,height:52,borderRadius:'50%',background:'#4f46e5',color:'white',border:'none',boxShadow:'0 4px 15px rgba(79,70,229,0.4)',cursor:'pointer',fontSize:24,display:'flex',alignItems:'center',justifyContent:'center',float:'right'}}>🤖</button>
    </div>
  )
}

function SetupChecklist({ lang, dark, auth, inventions, onClose }) {
  const bg=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const hasInvention = inventions.some(i=>i.inventorId===auth.user?.id)
  const hasWaiver = inventions.some(i=>i.inventorId===auth.user?.id && (i.feeWaiver||i.waiverRequested))
  const hasCampaign = inventions.some(i=>i.inventorId===auth.user?.id && i.crowdfunding?.active)
  const hasContributors = inventions.some(i=>i.inventorId===auth.user?.id && i.contributors.length>1)
  const hasProtection = inventions.some(i=>i.inventorId===auth.user?.id && i.deadManSwitch?.active)
  const items = [
    { text: T(lang,'checklistItem1'), done: auth.isLoggedIn },
    { text: T(lang,'checklistItem2'), done: hasInvention },
    { text: T(lang,'checklistItem3'), done: hasWaiver },
    { text: T(lang,'checklistItem4'), done: hasCampaign },
    { text: T(lang,'checklistItem5'), done: hasContributors },
    { text: T(lang,'checklistItem6'), done: hasProtection },
  ]
  const doneCount = items.filter(i=>i.done).length
  return (
    <div style={{position:'fixed',inset:0,zIndex:180,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
      <div style={{background:bg,borderRadius:16,padding:24,maxWidth:400,width:'100%'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <h2 style={{fontSize:18,fontWeight:'bold',color:txt}}>{T(lang,'checklist')}</h2>
          <button onClick={onClose} style={{background:'none',border:'none',fontSize:20,cursor:'pointer',color:sub}}>✕</button>
        </div>
        <p style={{color:sub,fontSize:12,marginBottom:12}}>{doneCount}/{items.length} {T(lang,'complete')}</p>
        <div style={{width:'100%',background:dark?'#374151':'#e5e7eb',borderRadius:9999,height:6,marginBottom:16}}><div style={{background:'#4f46e5',height:6,borderRadius:9999,width:`${(doneCount/items.length)*100}%`}}></div></div>
        {items.map((item,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:8,borderRadius:8,background:item.done?'#dcfce7':dark?'#111827':'#f9fafb'}}><span>{item.done?'OK':'--'}</span><span style={{fontSize:13,color:item.done?'#15803d':txt}}>{item.text}</span></div>)}
      </div>
    </div>
  )
}

function NotificationBell({ notifications, dark, lang }) {
  const [open, setOpen] = useState(false); const txt=dark?'#f9fafb':'#111827'; const bg=dark?'#1f2937':'white'; const ref=useRef(null)
  useEffect(()=>{ const h=(e)=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false)}; document.addEventListener('mousedown',h); return ()=>document.removeEventListener('mousedown',h) },[])
  return (<div ref={ref} style={{position:'relative'}}><button onClick={()=>setOpen(!open)} style={{background:'none',border:'none',fontSize:20,cursor:'pointer',position:'relative',padding:4}}>🔔{notifications.length>0&&<span style={{position:'absolute',top:-2,right:-2,background:'#ef4444',color:'white',borderRadius:'50%',width:18,height:18,fontSize:10,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}>{notifications.length}</span>}</button>
    {open&&<div style={{position:'fixed',top:56,right:16,background:bg,borderRadius:12,boxShadow:'0 10px 40px rgba(0,0,0,0.2)',width:300,maxHeight:400,overflowY:'auto',zIndex:100,padding:12}}>{notifications.length===0?<p style={{color:'#9ca3af',fontSize:13,textAlign:'center',padding:20}}>{T(lang,'noNotifications')}</p>:notifications.slice(0,20).map((n,i)=><div key={i} style={{padding:'8px 10px',borderRadius:8,background:dark?'#111827':'#f9fafb',fontSize:12,color:txt,borderLeft:'3px solid #4f46e5',marginBottom:4}}>{n}</div>)}</div>}</div>)
}

function LanguageSelector({ lang, setLang, dark }) {
  const bg=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#4b5563'
  const langs = [{code:'en',label:'EN'},{code:'es',label:'ES'},{code:'fr',label:'FR'},{code:'sw',label:'SW'},{code:'zh',label:'ZH'}]
  const [open, setOpen] = useState(false); const ref = useRef(null)
  useEffect(()=>{ const h=(e)=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false)}; document.addEventListener('mousedown',h); return ()=>document.removeEventListener('mousedown',h) },[])
  return (<div ref={ref} style={{position:'relative'}}><button onClick={()=>setOpen(!open)} style={{padding:'6px 10px',borderRadius:8,border:dark?'1px solid #374151':'1px solid #d1d5db',background:bg,color:txt,fontSize:12,cursor:'pointer'}}>{langs.find(l=>l.code===lang)?.label}</button>
    {open&&<div style={{position:'absolute',top:40,right:0,background:bg,borderRadius:12,boxShadow:'0 10px 40px rgba(0,0,0,0.2)',width:100,zIndex:100,padding:8}}>{langs.map(l=><button key={l.code} onClick={()=>{setLang(l.code);setOpen(false)}} style={{width:'100%',padding:'10px',borderRadius:8,background:lang===l.code?(dark?'#374151':'#eef2ff'):'transparent',border:'none',color:txt,fontSize:13,cursor:'pointer',textAlign:'left'}}>{l.label}</button>)}</div>}</div>)
}

function Navbar({ lang, setLang, dark, setDark, notifications, auth }) {
  const [open,setOpen]=useState(false); const bg=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#4b5563'; const nav=useNavigate()
  return (<nav style={{background:bg,boxShadow:'0 1px 3px rgba(0,0,0,0.1)',position:'sticky',top:0,zIndex:50,padding:'10px 16px'}}><div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between'}}><Link to="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}><img src="/logo.svg" alt="Logo" style={{width:32,height:32}} /></Link><div style={{display:'flex',alignItems:'center',gap:8}}><button onClick={()=>nav('/help')} style={{background:'none',border:'none',fontSize:16,cursor:'pointer'}}>📚</button><button onClick={()=>nav('/protection')} style={{background:'none',border:'none',fontSize:20,cursor:'pointer'}}>🛡️</button><NotificationBell notifications={notifications} dark={dark} lang={lang} /><LanguageSelector lang={lang} setLang={setLang} dark={dark} /><button onClick={()=>setDark(!dark)} style={{background:'none',border:'none',fontSize:18,cursor:'pointer'}}>{dark?'☀️':'🌙'}</button>{auth.isLoggedIn?<><button onClick={()=>nav('/profile')} style={{background:'#eef2ff',border:'none',width:32,height:32,borderRadius:'50%',fontSize:14,fontWeight:'bold',color:'#4f46e5',cursor:'pointer'}}>{auth.user.avatar}</button><button onClick={()=>auth.logout()} style={{fontSize:11,background:'none',border:'none',color:'#ef4444',cursor:'pointer'}}>{T(lang,'logout')}</button></>:<Link to="/login" style={{padding:'6px 14px',borderRadius:8,background:'#4f46e5',color:'white',textDecoration:'none',fontSize:12}}>{T(lang,'login')}</Link>}<button onClick={()=>setOpen(!open)} style={{fontSize:22,background:'none',border:'none',color:txt,cursor:'pointer'}} className="mb">{open?'✕':'☰'}</button></div></div>{open&&<div style={{background:bg,padding:'4px 0',marginTop:8}}>{[{l:T(lang,'dashboard'),p:'/'},{l:T(lang,'discover'),p:'/discover'},{l:T(lang,'addInvention'),p:'/add'},{l:T(lang,'records'),p:'/records'},{l:T(lang,'revenue'),p:'/revenue'},{l:T(lang,'funding'),p:'/funding'},{l:T(lang,'mentors'),p:'/mentors'},{l:T(lang,'legal'),p:'/legal'},{l:T(lang,'certify'),p:'/certify'},{l:'Tour Guide',p:'/tourguide'},{l:'Protection',p:'/protection'},{l:'Boost',p:'/boost'},{l:'Share',p:'/share'},{l:'Messages',p:'/messages'},{l:'NDA',p:'/nda'},{l:'Ratings',p:'/ratings'},{l:'Export',p:'/export'},{l:'Refer',p:'/refer'},{l:'Calc',p:'/calc'},{l:'Activity',p:'/activity'},{l:'Bookmarks',p:'/bookmarks'},{l:'Compare',p:'/compare'},{l:'Patents',p:'/patents'},{l:'Team',p:'/team'},{l:'Milestones',p:'/milestones'},{l:'Email',p:'/email'},{l:'History',p:'/notifications'},{l:'Investors',p:'/invest'},{l:'Analytics',p:'/analytics'},{l:T(lang,'global'),p:'/global'}].map(i=><Link key={i.p} to={i.p} onClick={()=>setOpen(false)} style={{display:'block',padding:'14px 16px',color:txt,textDecoration:'none',fontSize:14}}>{i.l}</Link>)}</div>}<style>{`@media(min-width:1024px){.mb{display:none!important}}`}</style></nav>)
}

function MobileBottomNav({ lang, dark }) {
  const bg=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#6b7280'
  return (<div style={{position:'fixed',bottom:0,left:0,right:0,background:bg,borderTop:dark?'1px solid #374151':'1px solid #e5e7eb',display:'flex',justifyContent:'space-around',padding:'6px 0',zIndex:50}} className="bn">{[{icon:'🏠',l:T(lang,'dashboard'),p:'/'},{icon:'🔍',l:T(lang,'discover'),p:'/discover'},{icon:'➕',l:T(lang,'addInvention'),p:'/add'},{icon:'👤',l:T(lang,'profile'),p:'/profile'},{icon:'📋',l:T(lang,'records'),p:'/records'}].map(i=><Link key={i.p} to={i.p} style={{background:'none',border:'none',color:txt,fontSize:10,display:'flex',flexDirection:'column',alignItems:'center',gap:2,cursor:'pointer',padding:4,textDecoration:'none'}}><span style={{fontSize:16,fontWeight:'bold'}}>{i.icon}</span>{i.l}</Link>)}<style>{`@media(min-width:1024px){.bn{display:none!important}}`}</style></div>)
}

function LoginPage({ users, setUsers, lang, dark, auth }) {
  const nav=useNavigate(); const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const [isLogin,setIsLogin]=useState(true); const [form,setForm]=useState({email:'',password:'',name:'',confirmPassword:''}); const [error,setError]=useState('')
  const handleLogin = () => { if(!form.email||!form.password){setError(T(lang,'loginFailed'));return}; const u=users.find(u=>u.email===form.email&&u.password===form.password); if(!u){setError(T(lang,'loginFailed'));return}; auth.login(u); nav('/') }
  const handleRegister = () => { if(!form.email||!form.password||!form.name)return; if(form.password.length<6)return; if(form.password!==form.confirmPassword)return; if(users.find(u=>u.email===form.email))return; const newUser={id:'user'+Date.now(),name:form.name,email:form.email,password:form.password,bio:'',expertise:'',avatar:form.name[0].toUpperCase(),role:'inventor',joinedAt:new Date().toISOString()}; setUsers([...users,newUser]); localStorage.setItem('inventshield_users',JSON.stringify([...users,newUser])); auth.login(newUser); nav('/') }
  const s = {width:'100%',padding:12,borderRadius:10,marginBottom:10,background:cb,color:txt,boxSizing:'border-box',fontSize:14,border:dark?'1px solid #374151':'1px solid #d1d5db'}
  return (<div style={{minHeight:'100vh',background:bg,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}><div style={{background:cb,borderRadius:16,padding:32,maxWidth:420,width:'100%'}}><h1 style={{fontSize:24,fontWeight:'bold',color:txt,textAlign:'center'}}>{T(lang,'appName')}</h1><p style={{textAlign:'center',color:sub,marginBottom:24}}>{isLogin?T(lang,'loginTitle'):T(lang,'registerTitle')}</p>{error&&<div style={{background:'#fef2f2',color:'#dc2626',padding:10,borderRadius:8,marginBottom:12,textAlign:'center'}}>{error}</div>}<form onSubmit={e=>{e.preventDefault();isLogin?handleLogin():handleRegister();setError('')}}>{!isLogin&&<input placeholder={T(lang,'name')} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={s} />}<input placeholder={T(lang,'email')} type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={s} /><input placeholder={T(lang,'password')} type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} style={s} />{!isLogin&&<input placeholder={T(lang,'confirmPassword')} type="password" value={form.confirmPassword} onChange={e=>setForm({...form,confirmPassword:e.target.value})} style={{...s,marginBottom:16}} />}<button type="submit" style={{width:'100%',padding:14,borderRadius:10,background:'#4f46e5',color:'white',border:'none',fontSize:15,fontWeight:600,cursor:'pointer'}}>{isLogin?T(lang,'loginBtn'):T(lang,'registerBtn')}</button></form><p style={{textAlign:'center',marginTop:16,color:sub,fontSize:13}}>{isLogin?T(lang,'noAccount'):T(lang,'hasAccount')} <button onClick={()=>{setIsLogin(!isLogin);setError('')}} style={{background:'none',border:'none',color:'#4f46e5',cursor:'pointer',textDecoration:'underline'}}>{isLogin?T(lang,'registerBtn'):T(lang,'loginBtn')}</button></p></div></div>)
}

function ProfilePage({ lang, dark, auth, inventions, users, setUsers }) {
  if(!auth.isLoggedIn || !auth.user) return <Navigate to="/login" />;
  const bg=dark?"#111827":"#f9fafb"; const cb=dark?"#1f2937":"white"; const txt=dark?"#f9fafb":"#111827"; const sub=dark?"#d1d5db":"#6b7280";
  const [editing,setEditing]=useState(false); const [profile,setProfile]=useState({name:auth.user.name||"",expertise:auth.user.expertise||"",bio:auth.user.bio||""});
  const myInventions = inventions.filter(i=>i.inventorId===auth.user.id);
  const totalEarned = inventions.reduce((s,i)=>{ const me=i.contributors.find(c=>c.userId===auth.user.id); return s+(me?Math.floor((i.crowdfunding?.raised||0)*(me.share/100)*(i.feeWaiver?1:0.95)):0) },0);
  return (<div style={{minHeight:"100vh",background:bg,padding:"16px 16px 80px"}}><div style={{maxWidth:800,margin:"0 auto"}}><div style={{background:cb,borderRadius:16,padding:32,textAlign:"center",marginBottom:20}}><div style={{width:80,height:80,borderRadius:"50%",background:"#eef2ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,fontWeight:"bold",color:"#4f46e5",margin:"0 auto 16px"}}>{auth.user.avatar}</div><h1 style={{fontSize:24,fontWeight:"bold",color:txt}}>{auth.user.name}</h1><p style={{color:sub,fontSize:13}}>{auth.user.expertise||"No expertise"}</p><p style={{color:sub,fontSize:12,marginBottom:12}}>{auth.user.bio||"No bio"}</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(140px, 1fr))",gap:10}}><div style={{background:cb,borderRadius:10,padding:16,textAlign:"center"}}><p style={{fontSize:22,fontWeight:"bold",color:"#4f46e5"}}>{myInventions.length}</p><p style={{fontSize:10,color:sub}}>{T(lang,"myInventions")}</p></div><div style={{background:cb,borderRadius:10,padding:16,textAlign:"center"}}><p style={{fontSize:22,fontWeight:"bold",color:"#4f46e5"}}>${totalEarned.toLocaleString()}</p><p style={{fontSize:10,color:sub}}>{T(lang,"totalEarned")}</p></div></div></div></div>);
}
function FeeWaiverPanel({ invention, setInventions, lang, dark }) {
  const [reason,setReason]=useState(''); const bg=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'
  if(invention.feeWaiver) return <div style={{background:'#dcfce7',borderRadius:10,padding:10,marginBottom:12,textAlign:'center'}}><p style={{color:'#15803d',fontWeight:600,fontSize:12}}>{T(lang,'waiverApproved')}</p></div>
  if(invention.waiverRequested) return <div style={{background:'#fef9c3',borderRadius:10,padding:10,marginBottom:12,textAlign:'center'}}><p style={{color:'#a16207',fontWeight:600,fontSize:12}}>{T(lang,'waiverPending')}</p></div>
  const s = {width:'100%',padding:8,borderRadius:8,marginBottom:6,background:bg,color:txt,fontSize:11,boxSizing:'border-box',border:dark?'1px solid #374151':'1px solid #d1d5db'}
  return (<div style={{background:dark?'#1f2937':'#fefce8',borderRadius:10,padding:12,marginBottom:12,border:'1px solid #fde047'}}><p style={{fontSize:12,fontWeight:600,color:'#a16207',marginBottom:6}}>{T(lang,'applyWaiver')}</p><textarea placeholder={T(lang,'waiverReason')} value={reason} onChange={e=>setReason(e.target.value)} rows={2} style={s} /><button onClick={()=>{if(!reason.trim())return;setInventions(prev=>prev.map(i=>i.id===invention.id?{...i,waiverRequested:true}:i));setReason('');setTimeout(()=>{setInventions(prev=>prev.map(i=>i.id===invention.id?{...i,feeWaiver:true,waiverRequested:false}:i))},5000)}} disabled={!reason.trim()} style={{width:'100%',padding:8,borderRadius:8,background:reason.trim()?'#facc15':'#e5e7eb',color:reason.trim()?'#92400e':'#9ca3af',border:'none',fontWeight:600,cursor:reason.trim()?'pointer':'default',fontSize:12}}>{T(lang,'submitWaiver')}</button></div>)
}

function CrowdfundingSection({ invention, setInventions, lang, dark }) {
  const [amt,setAmt]=useState(''); const bg=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const cf=invention.crowdfunding||{active:false,goal:0,raised:0,backers:0}; const pct=cf.goal>0?Math.min(100,Math.round((cf.raised/cf.goal)*100)):0
  return (<div style={{background:dark?'#1f2937':'#fefce8',borderRadius:10,padding:12,marginBottom:12,border:'1px solid #fde047'}}><p style={{fontSize:13,fontWeight:600,color:'#a16207',marginBottom:6}}>{T(lang,'crowdfunding')}</p>{cf.active?<div><div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:sub,marginBottom:4}}><span>${cf.raised.toLocaleString()}/{cf.goal.toLocaleString()}</span><span>{pct}%</span></div><div style={{width:'100%',background:dark?'#374151':'#e5e7eb',borderRadius:9999,height:8,marginBottom:6}}><div style={{background:'#facc15',height:8,borderRadius:9999,width:`${pct}%`}}></div></div><div style={{display:'flex',gap:6}}><input type="number" placeholder="$" value={amt} onChange={e=>setAmt(e.target.value)} style={{flex:1,padding:6,borderRadius:6,border:dark?'1px solid #374151':'1px solid #d1d5db',background:bg,color:txt,fontSize:11}} /><button onClick={()=>{const a=parseInt(amt);if(!a)return;setInventions(prev=>prev.map(i=>i.id===invention.id?{...i,crowdfunding:{...i.crowdfunding,raised:i.crowdfunding.raised+a,backers:i.crowdfunding.backers+1}}:i));setAmt('')}} style={{padding:'6px 12px',borderRadius:6,background:'#facc15',color:'#92400e',border:'none',fontWeight:600,cursor:'pointer',fontSize:11}}>{T(lang,'contributeNow')}</button></div></div>:<button onClick={()=>{const g=prompt('Goal ($):','10000');if(!g)return;setInventions(prev=>prev.map(i=>i.id===invention.id?{...i,crowdfunding:{active:true,goal:parseInt(g),raised:0,backers:0}}:i))}} style={{padding:'6px 16px',borderRadius:6,background:'#facc15',color:'#92400e',border:'none',fontWeight:600,cursor:'pointer',fontSize:11}}>{T(lang,'startCampaign')}</button>}</div>)
}

function ProtectionPanel({ invention, setInventions, lang, dark }) {
  const [showPanic,setShowPanic]=useState(false); const txt=dark?'#f9fafb':'#111827'
  if(invention.panicLocked) return <div style={{background:'#fef2f2',border:'2px solid #dc2626',borderRadius:10,padding:16,textAlign:'center',marginBottom:12}}><p style={{color:'#dc2626',fontWeight:'bold'}}>{T(lang,'panicButton')} ACTIVATED</p></div>
  return (<div style={{background:dark?'#1f2937':'#fef2f2',border:'1px solid #fecaca',borderRadius:10,padding:12,marginBottom:12}}><p style={{fontSize:12,fontWeight:600,color:'#dc2626',marginBottom:6}}>{T(lang,'protection')}</p><div style={{display:'flex',flexWrap:'wrap',gap:4}}><button onClick={()=>setInventions(prev=>prev.map(i=>i.id===invention.id?{...i,deadManSwitch:{active:!i.deadManSwitch?.active,lastCheckIn:new Date().toISOString()}}:i))} style={{padding:'5px 10px',borderRadius:6,background:invention.deadManSwitch?.active?'#16a34a':'#f3f4f6',color:invention.deadManSwitch?.active?'white':txt,border:'none',fontSize:10,cursor:'pointer',flex:1}}>{invention.deadManSwitch?.active?'DS ON':T(lang,'deadManSwitch')}</button>{!showPanic?<button onClick={()=>setShowPanic(true)} style={{padding:'5px 10px',borderRadius:6,background:'#dc2626',color:'white',border:'none',fontWeight:'bold',cursor:'pointer',fontSize:10,flex:1}}>{T(lang,'panicButton')}</button>:<div style={{display:'flex',gap:4,flex:1}}><button onClick={()=>{setInventions(prev=>prev.map(i=>i.id===invention.id?{...i,panicLocked:true}:i));setShowPanic(false);playSound("panic")}} style={{flex:1,padding:5,borderRadius:6,background:'#dc2626',color:'white',border:'none',fontSize:9,cursor:'pointer'}}>YES</button><button onClick={()=>setShowPanic(false)} style={{flex:1,padding:5,borderRadius:6,background:'#f3f4f6',color:txt,border:'none',fontSize:9,cursor:'pointer'}}>No</button></div>}</div></div>)
}

function VaultPage({ inventions, setInventions, lang, dark, auth }) {
  const {id}=useParams(); const inv=inventions.find(i=>i.id===parseInt(id))
  const [cmt,setCmt]=useState(''); const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  if(!inv) return <div style={{minHeight:'100vh',background:bg,display:'flex',alignItems:'center',justifyContent:'center'}}><h1 style={{color:txt}}>Not found</h1></div>
  if(inv.panicLocked) return <div style={{minHeight:'100vh',background:'#fef2f2',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{background:'white',borderRadius:16,padding:40,textAlign:'center'}}><h1>Vault Locked</h1></div></div>
  const isOwner = auth.isLoggedIn && auth.user.id === inv.inventorId
  return (<div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:900,margin:'0 auto'}}><Link to="/" style={{color:'#4f46e5',marginBottom:12,display:'inline-block'}}>{T(lang,'back')}</Link><div style={{background:cb,borderRadius:14,padding:24,marginTop:8}}><h1 style={{fontSize:24,fontWeight:'bold',color:txt}}>{inv.title}{inv.feeWaiver?' (Waived)':''}</h1><span style={{padding:'3px 10px',borderRadius:9999,fontSize:11,fontWeight:'bold',background:'#dcfce7',color:'#15803d',display:'inline-block'}}>{T(lang,'protected')}</span><p style={{color:sub,fontSize:12}}>{inv.inventorName}</p><p style={{fontSize:22,fontWeight:'bold',color:'#4f46e5'}}>{inv.funding}</p>{isOwner&&<><FeeWaiverPanel invention={inv} setInventions={setInventions} lang={lang} dark={dark} /><CrowdfundingSection invention={inv} setInventions={setInventions} lang={lang} dark={dark} /><ProtectionPanel invention={inv} setInventions={setInventions} lang={lang} dark={dark} /></>}{inv.crowdfunding?.active&&!isOwner&&<CrowdfundingSection invention={inv} setInventions={setInventions} lang={lang} dark={dark} />}<div style={{marginTop:12}}><p style={{fontSize:13,fontWeight:600,color:txt}}>{T(lang,'comments')}</p>{inv.comments.map((c,i)=><div key={i} style={{background:dark?'#1f2937':'#f9fafb',padding:'6px 10px',borderRadius:6,marginBottom:4}}><p style={{fontSize:10,color:'#4f46e5',fontWeight:600}}>{c.user}</p><p style={{fontSize:12,color:txt}}>{c.text}</p></div>)}{auth.isLoggedIn&&<div style={{display:'flex',gap:6,marginTop:8}}><input placeholder="Comment" value={cmt} onChange={e=>setCmt(e.target.value)} style={{flex:1,padding:6,borderRadius:6,border:dark?'1px solid #374151':'1px solid #d1d5db',background:cb,color:txt,fontSize:11}} /><button onClick={()=>{if(!cmt.trim())return;setInventions(prev=>prev.map(i=>i.id===inv.id?{...i,comments:[...i.comments,{user:auth.user.name,text:cmt,time:'Now'}]}:i));setCmt('')}} style={{padding:'6px 12px',borderRadius:6,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontSize:11}}>{T(lang,'post')}</button></div>}</div></div></div></div>)
}

function DraftPage({ inventions, setInventions, lang, dark, auth }) {
  const {id}=useParams(); const inv=inventions.find(i=>i.id===parseInt(id))
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'
  if(!inv) return <div style={{minHeight:'100vh',background:bg,display:'flex',alignItems:'center',justifyContent:'center'}}><h1 style={{color:txt}}>Not found</h1></div>
  const isOwner = auth.isLoggedIn && auth.user.id === inv.inventorId
  return (<div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:900,margin:'0 auto'}}><Link to="/" style={{color:'#4f46e5',marginBottom:12,display:'inline-block'}}>{T(lang,'back')}</Link><div style={{background:cb,borderRadius:14,padding:24,border:'2px dashed #facc15',marginTop:8}}><h1 style={{fontSize:24,fontWeight:'bold',color:txt}}>{inv.title}</h1><span style={{display:'inline-block',padding:'3px 10px',borderRadius:9999,fontSize:11,fontWeight:'bold',background:'#fef9c3',color:'#a16207'}}>{T(lang,'draft')}</span>{isOwner&&<><FeeWaiverPanel invention={inv} setInventions={setInventions} lang={lang} dark={dark} /><CrowdfundingSection invention={inv} setInventions={setInventions} lang={lang} dark={dark} /><ProtectionPanel invention={inv} setInventions={setInventions} lang={lang} dark={dark} /><div style={{marginBottom:12}}><div style={{display:'flex',justifyContent:'space-between',fontSize:12}}><span style={{color:txt}}>{T(lang,'completionProgress')}</span><span>{inv.progress}%</span></div><div style={{width:'100%',background:dark?'#374151':'#e5e7eb',borderRadius:9999,height:8}}><div style={{background:inv.progress===100?'#4ade80':'#facc15',height:8,borderRadius:9999,width:`${inv.progress}%`}}></div></div><input type="range" min="0" max="100" value={inv.progress} onChange={e=>setInventions(prev=>prev.map(i=>i.id===inv.id?{...i,progress:parseInt(e.target.value),status:parseInt(e.target.value)===100?'protected':'draft',wallet:parseInt(e.target.value)===100&&!i.wallet?'0x'+Math.random().toString(16).slice(2,42):i.wallet}:i))} style={{width:'100%',marginTop:6}} /></div><Link to="/certify" style={{display:'block',textAlign:'center',background:'#4f46e5',color:'white',padding:10,borderRadius:10,fontWeight:600,textDecoration:'none'}}>{T(lang,'completeCertify')}</Link></>}</div></div></div>)
}

function Dashboard({ inventions, setInventions, lang, dark, auth }) {
  const nav=useNavigate(); const [q,setQ]=useState('')
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const flt=inventions.filter(i=>i.title?.toLowerCase().includes(q.toLowerCase())||i.tag?.toLowerCase().includes(q.toLowerCase()))
  const tf=inventions.reduce((s,i)=>s+parseInt(i.funding?.replace(/\D/g,'')||0),0)
  const tc=inventions.reduce((s,i)=>s+(i.contributors?.length||0),0)
  const tr=inventions.filter(i=>i.crowdfunding?.active).reduce((s,i)=>s+Math.floor((i.crowdfunding?.raised||0)*(i.feeWaiver?WAIVED_FEE:PLATFORM_FEE)),0)
  const [showTour, setShowTour] = useState(()=>!localStorage.getItem('inventshield_onboarded'))
  const [showChecklist, setShowChecklist] = useState(false)
  return (<div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}>
    {showTour && <TourGuide onClose={()=>{setShowTour(false);localStorage.setItem("inventshield_onboarded","1")}} />}
    {showChecklist && <SetupChecklist lang={lang} dark={dark} auth={auth} inventions={inventions} onClose={()=>setShowChecklist(false)} />}
    <div style={{maxWidth:1200,margin:'0 auto'}}>
      {auth.isLoggedIn&&<p style={{color:sub,fontSize:14,marginBottom:4}}>{T(lang,'welcomeBack')} <b style={{color:txt}}>{auth.user.name}</b></p>}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
        <h1 style={{fontSize:26,fontWeight:'bold',color:txt}}>{T(lang,'myVault')}</h1>
        <div style={{display:'flex',gap:6}}>
          <button onClick={()=>setShowTour(true)} style={{padding:'6px 12px',borderRadius:20,background:'#eef2ff',border:'none',color:'#4f46e5',fontSize:11,cursor:'pointer'}}>{T(lang,'onboarding')}</button>
          <button onClick={()=>setShowChecklist(true)} style={{padding:'6px 12px',borderRadius:20,background:'#dcfce7',border:'none',color:'#15803d',fontSize:11,cursor:'pointer'}}>{T(lang,'checklist')}</button>
        </div>
      </div>
      <div style={{margin:'12px 0'}}><input value={q} onChange={e=>setQ(e.target.value)} placeholder={T(lang,'search')} style={{width:'100%',padding:'10px 16px',borderRadius:12,border:dark?'1px solid #374151':'1px solid #d1d5db',background:cb,color:txt,fontSize:14,boxSizing:'border-box'}} /></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))',gap:8,marginBottom:16}}>{[{v:'$'+tf.toLocaleString(),l:T(lang,'totalFunding'),c:'#4f46e5'},{v:inventions.length,l:T(lang,'totalInventions'),c:'#4f46e5'},{v:tc,l:T(lang,'totalContributors'),c:'#4f46e5'},{v:'$'+tr,l:T(lang,'platformRevenue'),c:'#4338ca'}].map((x,i)=><div key={i} style={{background:cb,borderRadius:10,padding:12,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:x.c}}>{x.v}</p><p style={{fontSize:9,color:sub}}>{x.l}</p></div>)}</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:16}}>{flt.map(inv=><div key={inv.id} onClick={()=>nav(inv.status==='protected'?`/vault/${inv.id}`:`/draft/${inv.id}`)} style={{background:cb,borderRadius:12,padding:18,cursor:'pointer',border:`2px ${inv.status==='protected'?'solid #4ade80':'dashed #facc15'}`}}><h2 style={{fontSize:16,fontWeight:600,color:txt}}>{inv.title}</h2><span style={{display:'inline-block',padding:'2px 8px',borderRadius:9999,fontSize:10,fontWeight:'bold',background:inv.status==='protected'?'#dcfce7':'#fef9c3',color:inv.status==='protected'?'#15803d':'#a16207',marginBottom:6}}>{inv.status==='protected'?T(lang,'protected'):T(lang,'draft')}</span><p style={{color:sub,fontSize:11}}>{inv.tag} | {inv.inventorName}</p><p style={{fontSize:20,fontWeight:'bold',color:'#4f46e5',margin:'6px 0'}}>{inv.funding}</p><div style={{display:"flex",gap:4,marginTop:6}}><span style={{fontSize:9,padding:"2px 6px",borderRadius:4,background:inv.deadManSwitch?.active?"#dcfce7":"#fee2e2",color:inv.deadManSwitch?.active?"#15803d":"#dc2626"}}>{inv.deadManSwitch?.active?"DS ON":"DS OFF"}</span><span style={{fontSize:9,padding:"2px 6px",borderRadius:4,background:inv.panicLocked?"#fee2e2":"#dcfce7",color:inv.panicLocked?"#dc2626":"#15803d"}}>{inv.panicLocked?"PANIC LOCKED":"Secure"}</span><span style={{fontSize:9,padding:"2px 6px",borderRadius:4,background:"#eef2ff",color:"#4f46e5"}}>{inv.blockchainAnchored?"Anchored":"Not Anchored"}</span></div></div>)}</div>
    </div>
  </div>)
}

function DiscoverPage({ inventions, setInventions, lang, dark, auth }) {
  const nav=useNavigate(); const [req,setReq]=useState([]); const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'
  return (<div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:1200,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:txt,marginBottom:16}}>{T(lang,'discover')}</h1><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:16}}>{inventions.map(i=><div key={i.id} style={{background:cb,borderRadius:12,padding:20}}><h2 style={{fontSize:16,fontWeight:600,color:txt}}>{i.title}</h2><p style={{fontSize:18,fontWeight:'bold',color:'#4f46e5'}}>{i.funding}</p><button onClick={()=>nav(`/vault/${i.id}`)} style={{width:'100%',padding:8,borderRadius:8,border:dark?'1px solid #374151':'1px solid #d1d5db',color:txt,cursor:'pointer',margin:'8px 0',background:'transparent'}}>{T(lang,'viewDetails')}</button><button onClick={()=>{if(!auth.isLoggedIn){nav('/login');return};setReq([...req,i.id]);setTimeout(()=>{setInventions(inventions.map(x=>x.id===i.id?{...x,contributors:[...x.contributors,{name:auth.user.name,role:'Contributor',share:5,avatar:auth.user.avatar,userId:auth.user.id}]}:x));setReq(req.filter(y=>y!==i.id))},2000)}} disabled={req.includes(i.id)} style={{width:'100%',padding:8,borderRadius:8,background:req.includes(i.id)?'#d1d5db':'#4f46e5',color:'white',border:'none',cursor:req.includes(i.id)?'default':'pointer'}}>{req.includes(i.id)?T(lang,'requesting'):auth.isLoggedIn?T(lang,'requestToContribute'):T(lang,'login')}</button></div>)}</div></div></div>)
}

function AddInventionPage({ inventions, setInventions, lang, dark, auth }) {
  const nav=useNavigate(); const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'
  const [fm,setFm]=useState({title:'',desc:'',tag:'',anonymous:false}); const [sub,setSub]=useState(false)
  if(!auth.isLoggedIn) return <Navigate to="/login" />
  const s = {width:'100%',padding:10,borderRadius:8,marginBottom:10,background:cb,color:txt,boxSizing:'border-box',fontSize:13,border:dark?'1px solid #374151':'1px solid #d1d5db'}
  return (<div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:600,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:txt}}>{T(lang,'addInvention')}</h1><div style={{background:cb,borderRadius:14,padding:24,marginTop:16}}><label style={{display:'flex',alignItems:'center',gap:8,marginBottom:14,color:txt}}><input type="checkbox" checked={fm.anonymous} onChange={e=>setFm({...fm,anonymous:e.target.checked})} />{T(lang,'anonymousSubmit')}</label><input placeholder={T(lang,'inventionTitle')} value={fm.title} onChange={e=>setFm({...fm,title:e.target.value})} style={s} /><input placeholder="Tag" value={fm.tag} onChange={e=>setFm({...fm,tag:e.target.value})} style={s} /><textarea placeholder="Description" rows={4} value={fm.desc} onChange={e=>setFm({...fm,desc:e.target.value})} style={{...s,marginBottom:14}} /><button onClick={()=>{if(!fm.title||!fm.desc)return;setSub(true);setTimeout(()=>{const nid=Math.max(...inventions.map(i=>i.id),0)+1;setInventions([...inventions,{id:nid,title:fm.title,status:'draft',tag:fm.tag||'New',wallet:null,funding:'$0',description:fm.desc,documents:[],progress:25,contributors:[{name:fm.anonymous?'Anonymous':auth.user.name,role:'Inventor',share:100,avatar:fm.anonymous?'?':auth.user.avatar,userId:auth.user.id}],comments:[],activities:[],crowdfunding:{active:false,goal:0,raised:0,backers:0},inventorName:fm.anonymous?'Anonymous':auth.user.name,inventorId:auth.user.id,createdAt:new Date().toISOString(),deadManSwitch:{active:false},panicLocked:false,blockchainAnchored:false,anonymous:fm.anonymous,feeWaiver:false,waiverRequested:false,plan:'free'}]);setSub(false);nav('/')},1500)}} disabled={sub||!fm.title||!fm.desc} style={{width:'100%',padding:12,borderRadius:10,background:(sub||!fm.title||!fm.desc)?'#9ca3af':'#16a34a',color:'white',border:'none',fontSize:14,fontWeight:600,cursor:(sub||!fm.title||!fm.desc)?'default':'pointer'}}>{sub?T(lang,'submitting'):T(lang,'submitInvention')}</button></div></div></div>)
}

function RecordsPage({ inventions, lang, dark }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'
  return (<div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:1100,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:txt}}>{T(lang,'records')}</h1><button onClick={()=>{const d={inventions,hash:generateHash(inventions)};const b=new Blob([JSON.stringify(d)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=`backup_${Date.now()}.json`;a.click()}} style={{padding:'10px 16px',borderRadius:10,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',margin:'12px 0'}}>Download Backup</button><table style={{width:'100%',borderCollapse:'collapse',background:cb,borderRadius:12}}><thead><tr><th style={{textAlign:'left',padding:'10px 14px',color:txt,fontSize:11}}>Title</th><th style={{textAlign:'left',padding:'10px 14px',color:txt,fontSize:11}}>Inventor</th><th style={{textAlign:'left',padding:'10px 14px',color:txt,fontSize:11}}>Status</th></tr></thead><tbody>{inventions.map(i=><tr key={i.id}><td style={{padding:'8px 14px',color:'#4f46e5',fontSize:11}}>{i.title}</td><td style={{padding:'8px 14px',color:txt,fontSize:11}}>{i.inventorName}</td><td style={{padding:'8px 14px'}}><span>{i.status}</span></td></tr>)}</tbody></table></div></div>)
}

function RevenueDashboard({ inventions, lang, dark }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const active=inventions.filter(i=>i.crowdfunding?.active); const tr=active.reduce((s,i)=>s+(i.crowdfunding?.raised||0),0)
  const tf=active.reduce((s,i)=>s+Math.floor((i.crowdfunding?.raised||0)*(i.feeWaiver?WAIVED_FEE:PLATFORM_FEE)),0)
  return (<div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:1100,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:txt}}>{T(lang,'revenueDashboard')}</h1><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))',gap:10,marginTop:16}}>{[{v:'$'+tr.toLocaleString(),l:T(lang,'totalFunding'),c:'#16a34a'},{v:'$'+tf.toLocaleString(),l:T(lang,'feeCollected'),c:'#4f46e5'},{v:'$'+(tr-tf).toLocaleString(),l:T(lang,'totalPayouts'),c:'#15803d'}].map((x,i)=><div key={i} style={{background:cb,borderRadius:12,padding:16,textAlign:'center'}}><p style={{fontSize:22,fontWeight:'bold',color:x.c}}>{x.v}</p><p style={{fontSize:10,color:sub}}>{x.l}</p></div>)}</div></div></div>)
}

function FundingPage({ lang, dark }) { const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; return (<div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:1100,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:txt,marginBottom:16}}>{T(lang,'funding')}</h1><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))',gap:16}}>{[{t:'GreenTech Grant',a:'$50,000'},{t:'AI Innovation Fund',a:'$100,000'},{t:'Clean Water Initiative',a:'$25,000'}].map((x,i)=><div key={i} style={{background:cb,borderRadius:12,padding:20}}><h3 style={{color:txt}}>{x.t}</h3><p style={{fontSize:20,fontWeight:'bold',color:'#16a34a'}}>{x.a}</p><button style={{width:'100%',marginTop:12,background:'#4f46e5',color:'white',padding:8,borderRadius:8,border:'none',cursor:'pointer'}}>{T(lang,'applyNow')}</button></div>)}</div></div></div>) }
function MentorsPage({ lang, dark }) { const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; return (<div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:1100,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:txt,marginBottom:16}}>{T(lang,'mentors')}</h1><div style={{display:'flex',flexDirection:'column',gap:12}}>{[{n:'Dr. Sarah Chen',e:'CleanTech'},{n:'James Rodriguez',e:'AI Strategy'},{n:'Prof. Emily Park',e:'IP Law'}].map((x,i)=><div key={i} style={{background:cb,borderRadius:12,padding:18,display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><h3 style={{color:txt}}>{x.n}</h3><p style={{fontSize:12,color:dark?'#d1d5db':'#6b7280'}}>{x.e}</p></div><button style={{background:'#4f46e5',color:'white',padding:'6px 14px',borderRadius:8,border:'none',cursor:'pointer'}}>{T(lang,'scheduleCall')}</button></div>)}</div></div></div>) }
function LegalPage({ lang, dark }) { const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; return (<div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:1100,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:txt,marginBottom:16}}>{T(lang,'legal')}</h1><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))',gap:14}}>{['NDA Generator','Patentability Check','Lawyer Directory','Filing Templates'].map((x,i)=><div key={i} style={{background:cb,borderRadius:12,padding:20,cursor:'pointer'}}><h3 style={{color:txt}}>{x}</h3><button style={{marginTop:10,color:'#4f46e5',background:'none',border:'none',cursor:'pointer'}}>{T(lang,'applyNow')}</button></div>)}</div></div></div>) }
function CertifyPage({ lang, dark }) { const txt=dark?'#f9fafb':'#111827'; const [s,setS]=useState(1); return (<div style={{minHeight:'100vh',background:dark?'#111827':'#f9fafb',padding:'16px 16px 80px'}}><div style={{maxWidth:700,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:txt}}>{T(lang,'certify')}</h1><div style={{display:'flex',gap:6,margin:'20px 0'}}>{[1,2,3,4].map(x=><div key={x} style={{flex:1,textAlign:'center'}}><div style={{width:32,height:32,borderRadius:'50%',display:'inline-flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',background:x<=s?'#4f46e5':'#e5e7eb',color:x<=s?'white':'#9ca3af'}}>{x}</div></div>)}</div><div style={{background:dark?'#1f2937':'white',borderRadius:12,padding:24}}>{s===1&&<div><h2 style={{color:txt}}>{T(lang,'step1')}</h2><input placeholder="Name" style={{width:'100%',padding:10,marginTop:8,borderRadius:8,background:dark?'#1f2937':'white',color:txt,border:dark?'1px solid #374151':'1px solid #d1d5db'}} /></div>}{s===2&&<div><h2 style={{color:txt}}>{T(lang,'step2')}</h2><div style={{border:'2px dashed #d1d5db',borderRadius:8,padding:30,textAlign:'center',marginTop:8}}>Drop files</div></div>}{s===3&&<div><h2 style={{color:txt}}>{T(lang,'step3')}</h2><button style={{background:'#2563eb',color:'white',padding:'8px 18px',borderRadius:8,border:'none',marginTop:8}}>Run Check</button></div>}{s===4&&<div><h2 style={{color:txt}}>{T(lang,'step4')}</h2><button style={{background:'#16a34a',color:'white',padding:'8px 18px',borderRadius:8,border:'none',marginTop:8}}>Certify</button></div>}<div style={{display:'flex',justifyContent:'space-between',marginTop:24}}><button onClick={()=>setS(Math.max(1,s-1))} disabled={s===1}>{T(lang,'previous')}</button><button onClick={()=>setS(Math.min(4,s+1))} disabled={s===4}>{T(lang,'next')}</button></div></div></div></div>) }
function GlobalPage({ lang, dark }) { const txt=dark?'#f9fafb':'#111827'; const c=[{n:'United States',s:'Filed'},{n:'European Union',s:'Pending'},{n:'Japan',s:'Not Started'},{n:'India',s:'Granted'}]; const sc={Granted:{bg:'#dcfce7',c:'#15803d'},Filed:{bg:'#dbeafe',c:'#1d4ed8'},Pending:{bg:'#fef9c3',c:'#a16207'},'Not Started':{bg:'#f3f4f6',c:'#6b7280'}}; return (<div style={{minHeight:'100vh',background:dark?'#111827':'#f9fafb',padding:'16px 16px 80px'}}><div style={{maxWidth:1100,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:txt,marginBottom:16}}>{T(lang,'global')}</h1><table style={{width:'100%',borderCollapse:'collapse',background:dark?'#1f2937':'white',borderRadius:12}}><thead><tr><th style={{padding:'12px',color:txt}}>Country</th><th style={{padding:'12px',color:txt}}>Status</th><th style={{padding:'12px',color:txt}}>Action</th></tr></thead><tbody>{c.map((x,i)=><tr key={i}><td style={{padding:'10px',color:txt}}>{x.n}</td><td><span style={{padding:'3px 8px',borderRadius:9999,fontSize:10,fontWeight:'bold',background:sc[x.s].bg,color:sc[x.s].c}}>{x.s}</span></td><td><button style={{color:'#4f46e5',background:'none',border:'none',cursor:'pointer'}}>{x.s==='Not Started'?'File':'View'}</button></td></tr>)}</tbody></table></div></div>) }

function HelpPage({ lang, dark }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const faqs = [{ q: 'How to protect?', a: 'Use Dead Man Switch and Panic Button.' },{ q: 'Crowdfunding?', a: 'Start campaign, 5% fee (waivable).' },{ q: 'Fee waiver?', a: 'Apply in vault, auto-approves.' },{ q: 'Contributors?', a: 'Share link, others join.' },{ q: 'Data safe?', a: 'Encrypted backup + blockchain.' }]
  return (<div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:600,margin:'0 auto'}}><h1 style={{fontSize:24,fontWeight:'bold',color:txt,marginBottom:16}}>{T(lang,'helpCenter')}</h1><div style={{display:'flex',flexDirection:'column',gap:8}}>{faqs.map((f,i)=><details key={i} style={{background:cb,borderRadius:10,padding:12,cursor:'pointer'}}><summary style={{fontWeight:600,color:txt,fontSize:13}}>{f.q}</summary><p style={{color:sub,fontSize:12,marginTop:8}}>{f.a}</p></details>)}</div></div></div>)
}

function AppContent() {
  const [inv,setInv]=useState(()=>{try{return JSON.parse(localStorage.getItem('inventshield_data'))||initialInventions}catch{return initialInventions}})
  const [users,setUsers]=useState(()=>{try{return JSON.parse(localStorage.getItem('inventshield_users'))||initialUsers}catch{return initialUsers}})
  const [lang,setLang]=useState(()=>{try{return localStorage.getItem('inventshield_lang')||'en'}catch{return'en'}})
  const [dark,setDark]=useState(false); const [notif,setNotif]=useState([])
  const auth = AuthContext()
  useEffect(()=>{localStorage.setItem('inventshield_data',JSON.stringify(inv))},[inv])
  useEffect(()=>{localStorage.setItem('inventshield_users',JSON.stringify(users))},[users])
  useEffect(()=>{localStorage.setItem('inventshield_lang',lang)},[lang])
  return (<Router><Navbar lang={lang} setLang={setLang} dark={dark} setDark={setDark} notifications={notif} auth={auth} /><Routes><Route path="/login" element={<LoginPage users={users} setUsers={setUsers} lang={lang} dark={dark} auth={auth} />} /><Route path="/profile" element={<ProfilePage lang={lang} dark={dark} auth={auth} inventions={inv} users={users} setUsers={setUsers} />} /><Route path="/tourguide" element={<TourGuide onClose={()=>window.history.back()} />} /><Route path="/smartai" element={<GeminiChat dark={dark} />} /><Route path="/help" element={<HelpPage lang={lang} dark={dark} />} /><Route path="/" element={<Dashboard inventions={inv} setInventions={setInv} lang={lang} dark={dark} auth={auth} />} /><Route path="/discover" element={<DiscoverHub inventions={inv} setInventions={setInv} lang={lang} dark={dark} auth={auth} />} /><Route path="/add" element={<AddInventionPage inventions={inv} setInventions={setInv} lang={lang} dark={dark} auth={auth} />} /><Route path="/records" element={<RecordsPage inventions={inv} lang={lang} dark={dark} />} /><Route path="/revenue" element={<RevenueHub inventions={inv} lang={lang} dark={dark} />} /><Route path="/vault/:id" element={<VaultPage inventions={inv} setInventions={setInv} lang={lang} dark={dark} auth={auth} />} /><Route path="/draft/:id" element={<DraftPage inventions={inv} setInventions={setInv} lang={lang} dark={dark} auth={auth} />} /><Route path="/funding" element={<FundingPage lang={lang} dark={dark} />} /><Route path="/mentors" element={<MentorsPage lang={lang} dark={dark} />} /><Route path="/legal" element={<LegalHub dark={dark} />} /><Route path="/legal-old" element={<LegalPage lang={lang} dark={dark} />} /><Route path="/certify" element={<CertifyPage lang={lang} dark={dark} />} /><Route path="/analytics" element={<AnalyticsDashboard inventions={inv} lang={lang} dark={dark} />} /><Route path="/protection" element={<ProtectionHub inventions={inv} setInventions={setInv} lang={lang} dark={dark} setNotifications={setNotif} />} /><Route path="/boost" element={<BoostCenter inventions={inv} setInventions={setInv} lang={lang} dark={dark} setNotifications={setNotif} />} /><Route path="/share" element={<ShareHub inventions={inv} lang={lang} dark={dark} />} /><Route path="/messages" element={<MessageCenter inventions={inv} lang={lang} dark={dark} auth={auth} />} /><Route path="/nda" element={<NDAHub inventions={inv} lang={lang} dark={dark} />} /><Route path="/ratings" element={<RatingsPage inventions={inv} lang={lang} dark={dark} setNotifications={setNotif} />} /><Route path="/export" element={<PDFExport inventions={inv} lang={lang} dark={dark} />} /><Route path="/refer" element={<ReferralPage lang={lang} dark={dark} setNotifications={setNotif} />} /><Route path="/calc" element={<FundingCalc lang={lang} dark={dark} />} /><Route path="/activity" element={<ActivityFeed inventions={inv} lang={lang} dark={dark} />} /><Route path="/bookmarks" element={<BookmarksPage inventions={inv} lang={lang} dark={dark} />} /><Route path="/compare" element={<ComparePage inventions={inv} lang={lang} dark={dark} />} /><Route path="/patents" element={<PatentSearch lang={lang} dark={dark} />} /><Route path="/team" element={<TeamPage inventions={inv} setInventions={setInv} lang={lang} dark={dark} setNotifications={setNotif} />} /><Route path="/milestones" element={<MilestonesPage inventions={inv} setInventions={setInv} lang={lang} dark={dark} setNotifications={setNotif} />} /><Route path="/email" element={<EmailCenter lang={lang} dark={dark} setNotifications={setNotif} />} /><Route path="/notifications" element={<NotificationHistory lang={lang} dark={dark} />} /><Route path="/invest" element={<InvestorHub dark={dark} />} /><Route path="/invest-old" element={<InvestorPage inventions={inv} setInventions={setInv} lang={lang} dark={dark} auth={auth} />} /><Route path="/global" element={<GlobalPage lang={lang} dark={dark} />} /></Routes><MobileBottomNav lang={lang} dark={dark} /><SmartAIFloatingButton /></Router>)
}

export default function App() { return <ErrorBoundary><AppContent /></ErrorBoundary> }
function InvestorPage({ inventions, lang, dark, auth }) {
  const nav=useNavigate(); const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const [interest, setInterest] = useState({})
  const [filter, setFilter] = useState('all')
  
  const categories = ['all', 'Eco-friendly', 'AI-powered', 'CleanTech', 'New']
  const filtered = filter === 'all' ? inventions : inventions.filter(i => i.tag === filter)
  
  const expressInterest = (id) => {
    setInterest({...interest, [id]: true})
    setTimeout(() => setInterest({...interest, [id]: 'connected'}), 2000)
  }

  return (
    <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12,marginBottom:20}}>
          <div>
            <h1 style={{fontSize:26,fontWeight:'bold',color:txt}}>💼 Investor Portal</h1>
            <p style={{color:sub,fontSize:13}}>Discover inventions worth investing in</p>
          </div>
          {!auth.isLoggedIn && <Link to="/login" style={{padding:'10px 20px',borderRadius:10,background:'#4f46e5',color:'white',textDecoration:'none',fontSize:13}}>Login as Investor</Link>}
        </div>

        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:20}}>
          {categories.map(c => (
            <button key={c} onClick={()=>setFilter(c)} style={{padding:'6px 14px',borderRadius:20,border:'none',background:filter===c?'#4f46e5':'#e5e7eb',color:filter===c?'white':txt,fontSize:12,cursor:'pointer'}}>{c}</button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))',gap:20}}>
          {filtered.map(inv => {
            const pct = inv.crowdfunding?.goal > 0 ? Math.round((inv.crowdfunding.raised / inv.crowdfunding.goal) * 100) : 0
            const roi = inv.crowdfunding?.goal > 0 ? Math.round((parseInt(inv.funding.replace(/\D/g,'')) / inv.crowdfunding.goal) * 100) : 0
            return (
              <div key={inv.id} style={{background:cb,borderRadius:14,padding:24,border:interest[inv.id]==='connected'?'2px solid #4ade80':'1px solid '+(dark?'#374151':'#e5e7eb')}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                  <h3 style={{fontSize:17,fontWeight:600,color:txt}}>{inv.title}</h3>
                  <span style={{padding:'2px 8px',borderRadius:9999,fontSize:10,fontWeight:'bold',background:inv.status==='protected'?'#dcfce7':'#fef9c3',color:inv.status==='protected'?'#15803d':'#a16207'}}>{inv.status}</span>
                </div>
                <p style={{color:sub,fontSize:12,marginBottom:8}}>{inv.tag} | by {inv.inventorName}</p>
                <p style={{color:txt,fontSize:13,marginBottom:12}}>{inv.description?.slice(0,80)}...</p>
                
                {inv.crowdfunding?.active && (
                  <div style={{background:dark?'#111827':'#f0fdf4',borderRadius:10,padding:12,marginBottom:12}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:4}}>
                      <span style={{color:sub}}>Raised: ${inv.crowdfunding.raised.toLocaleString()}</span>
                      <span style={{color:sub}}>Goal: ${inv.crowdfunding.goal.toLocaleString()}</span>
                    </div>
                    <div style={{width:'100%',background:dark?'#374151':'#e5e7eb',borderRadius:9999,height:6,marginBottom:4}}>
                      <div style={{background:'#4ade80',height:6,borderRadius:9999,width:`${pct}%`}}></div>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:10}}>
                      <span style={{color:'#16a34a'}}>{pct}% funded</span>
                      <span style={{color:'#4f46e5'}}>Est. ROI: {roi}%</span>
                      <span style={{color:sub}}>{inv.crowdfunding.backers} backers</span>
                    </div>
                  </div>
                )}

                <div style={{display:'flex',gap:8,marginBottom:12}}>
                  <div style={{flex:1,background:dark?'#111827':'#f9fafb',borderRadius:8,padding:8,textAlign:'center'}}>
                    <p style={{fontSize:16,fontWeight:'bold',color:'#4f46e5'}}>{inv.funding}</p>
                    <p style={{fontSize:9,color:sub}}>Valuation</p>
                  </div>
                  <div style={{flex:1,background:dark?'#111827':'#f9fafb',borderRadius:8,padding:8,textAlign:'center'}}>
                    <p style={{fontSize:16,fontWeight:'bold',color:'#4f46e5'}}>{inv.contributors.length}</p>
                    <p style={{fontSize:9,color:sub}}>Team Size</p>
                  </div>
                  <div style={{flex:1,background:dark?'#111827':'#f9fafb',borderRadius:8,padding:8,textAlign:'center'}}>
                    <p style={{fontSize:16,fontWeight:'bold',color:inv.blockchainAnchored?'#16a34a':'#f59e0b'}}>{inv.blockchainAnchored?'Yes':'No'}</p>
                    <p style={{fontSize:9,color:sub}}>Verified</p>
                  </div>
                </div>

                <div style={{display:'flex',gap:6}}>
                  <button onClick={()=>nav(`/vault/${inv.id}`)} style={{flex:1,padding:8,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:'transparent',color:txt,cursor:'pointer',fontSize:11}}>View Details</button>
                  {interest[inv.id] === 'connected' ? (
                    <button style={{flex:1,padding:8,borderRadius:8,background:'#dcfce7',color:'#15803d',border:'1px solid #4ade80',fontSize:11,fontWeight:600}}>✅ Connected!</button>
                  ) : interest[inv.id] ? (
                    <button style={{flex:1,padding:8,borderRadius:8,background:'#f3f4f6',color:'#9ca3af',border:'none',fontSize:11}}>Connecting...</button>
                  ) : (
                    <button onClick={()=>expressInterest(inv.id)} style={{flex:1,padding:8,borderRadius:8,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontSize:11,fontWeight:600}}>💰 Express Interest</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function AnalyticsDashboard({ inventions, lang, dark }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const tr=inventions.reduce((s,i)=>s+(i.crowdfunding?.raised||0),0)
  const tf=inventions.filter(i=>i.crowdfunding?.active).reduce((s,i)=>s+Math.floor((i.crowdfunding?.raised||0)*0.05),0)
  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:1100,margin:'0 auto'}}><h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>Analytics Dashboard</h1><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))',gap:10}}><div style={{background:cb,borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#16a34a'}}>${tr.toLocaleString()}</p><p style={{fontSize:9,color:sub}}>Total Raised</p></div><div style={{background:cb,borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#4f46e5'}}>${tf.toLocaleString()}</p><p style={{fontSize:9,color:sub}}>Platform Fees (5%)</p></div><div style={{background:cb,borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:txt}}>{inventions.filter(i=>i.crowdfunding?.active).length}</p><p style={{fontSize:9,color:sub}}>Active Campaigns</p></div><div style={{background:cb,borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:txt}}>{inventions.reduce((s,i)=>s+(i.crowdfunding?.backers||0),0)}</p><p style={{fontSize:9,color:sub}}>Total Backers</p></div></div></div></div>
}

// ========== BOOST CENTER ==========
function BoostCenter({ inventions, setInventions, lang, dark, setNotifications }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const boost = (inv) => { if(confirm('Boost '+inv.title+' for 7 days? Fee: $25')){setInventions(prev=>prev.map(i=>i.id===inv.id?{...i,featured:true,featuredUntil:Date.now()+7*86400000}:i));setNotifications(prev=>['⭐ '+inv.title+' boosted for 7 days!',...prev].slice(0,20))} }
  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:900,margin:'0 auto'}}><h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>⭐ Boost Center</h1><p style={{color:sub,fontSize:13,marginBottom:16}}>Feature your invention on the homepage for $25/week</p><div style={{display:'flex',flexDirection:'column',gap:12}}>{inventions.map(inv=><div key={inv.id} style={{background:cb,borderRadius:12,padding:16,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}><div><h3 style={{fontSize:15,fontWeight:600,color:txt}}>{inv.title} {inv.featured?'⭐':''}</h3><p style={{fontSize:11,color:sub}}>{inv.tag} | {inv.inventorName} | {inv.funding}</p></div>{inv.featured?<span style={{color:'#92400e',fontSize:11,background:'#fef3c7',padding:'4px 12px',borderRadius:20}}>Featured until {new Date(inv.featuredUntil).toLocaleDateString()}</span>:<button onClick={()=>boost(inv)} style={{padding:'8px 18px',borderRadius:20,background:'#fef3c7',color:'#92400e',border:'1px solid #fbbf24',cursor:'pointer',fontWeight:600,fontSize:12}}>⭐ Boost ($25)</button>}</div>)}</div></div></div>
}

// ========== SHARE HUB ==========
function ShareHub({ inventions, lang, dark }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const share = (inv, platform) => {
    const url = encodeURIComponent(window.location.origin+'/vault/'+inv.id)
    const text = encodeURIComponent('Check out '+inv.title+' on InventShield! '+inv.description?.slice(0,60))
    const links = { twitter:'https://twitter.com/intent/tweet?text='+text+'&url='+url, whatsapp:'https://wa.me/?text='+text+'%20'+url, linkedin:'https://www.linkedin.com/sharing/share-offsite/?url='+url }
    window.open(links[platform],'_blank')
  }
  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:900,margin:'0 auto'}}><h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>📤 Share Hub</h1><p style={{color:sub,fontSize:13,marginBottom:16}}>Share inventions to attract investors and contributors</p><div style={{display:'flex',flexDirection:'column',gap:12}}>{inventions.map(inv=><div key={inv.id} style={{background:cb,borderRadius:12,padding:16,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}><div><h3 style={{fontSize:15,fontWeight:600,color:txt}}>{inv.title}</h3><p style={{fontSize:11,color:sub}}>{inv.tag} | {inv.funding}</p></div><div style={{display:'flex',gap:6}}><button onClick={()=>share(inv,'twitter')} style={{padding:'6px 12px',borderRadius:16,background:'#1d9bf015',color:'#1d9bf0',border:'1px solid #1d9bf030',cursor:'pointer',fontSize:10}}>𝕏 Twitter</button><button onClick={()=>share(inv,'whatsapp')} style={{padding:'6px 12px',borderRadius:16,background:'#25D36615',color:'#25D366',border:'1px solid #25D36630',cursor:'pointer',fontSize:10}}>💬 WhatsApp</button><button onClick={()=>share(inv,'linkedin')} style={{padding:'6px 12px',borderRadius:16,background:'#0a66c215',color:'#0a66c2',border:'1px solid #0a66c230',cursor:'pointer',fontSize:10}}>🔗 LinkedIn</button></div></div>)}</div></div></div>
}

// ========== MESSAGE CENTER ==========
function MessageCenter({ inventions, lang, dark, auth }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const [activeChat, setActiveChat] = useState(null)
  const [msgText, setMsgText] = useState('')
  const [allMessages, setAllMessages] = useState(()=>{try{return JSON.parse(localStorage.getItem('inventshield_messages')||'{}')}catch{return{}}})
  
  const sendMsg = (invId) => {
    if(!msgText.trim()||!auth.isLoggedIn)return
    const chat = [...(allMessages[invId]||[]), {from:auth.user.name,text:msgText,time:new Date().toLocaleTimeString()}]
    const updated = {...allMessages, [invId]:chat}
    setAllMessages(updated)
    localStorage.setItem('inventshield_messages',JSON.stringify(updated))
    setMsgText('')
  }

  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:900,margin:'0 auto'}}>
    {!activeChat ? (<>
      <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>💬 Messages</h1>
      <p style={{color:sub,fontSize:13,marginBottom:16}}>Select an invention to view or send messages</p>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {inventions.map(inv=><div key={inv.id} onClick={()=>setActiveChat(inv)} style={{background:cb,borderRadius:10,padding:14,cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontWeight:600,color:txt,fontSize:14}}>{inv.title}</span><span style={{fontSize:10,color:sub}}>{(allMessages[inv.id]||[]).length} messages</span></div>)}
      </div>
    </>) : (<>
      <button onClick={()=>setActiveChat(null)} style={{background:'none',border:'none',color:'#4f46e5',cursor:'pointer',marginBottom:8,fontSize:13}}>← Back</button>
      <h2 style={{fontSize:18,fontWeight:'bold',color:txt,marginBottom:12}}>{activeChat.title}</h2>
      <div style={{background:cb,borderRadius:12,padding:12,minHeight:300,maxHeight:400,overflowY:'auto',marginBottom:8}}>
        {(allMessages[activeChat.id]||[]).length===0?<p style={{color:sub,fontSize:12,textAlign:'center',padding:40}}>No messages yet</p>:
        (allMessages[activeChat.id]||[]).map((m,i)=><div key={i} style={{padding:'6px 10px',marginBottom:4,borderRadius:8,background:m.from===auth.user?.name?'#eef2ff':dark?'#111827':'#f9fafb'}}><p style={{fontSize:10,color:'#4f46e5',fontWeight:600}}>{m.from} <span style={{color:'#9ca3af',fontWeight:400}}>{m.time}</span></p><p style={{fontSize:12,color:txt}}>{m.text}</p></div>)}
      </div>
      {auth.isLoggedIn?<div style={{display:'flex',gap:6}}><input value={msgText} onChange={e=>setMsgText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMsg(activeChat.id)} placeholder="Type..." style={{flex:1,padding:'8px 12px',borderRadius:20,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:cb,color:txt,fontSize:12}} /><button onClick={()=>sendMsg(activeChat.id)} style={{padding:'8px 16px',borderRadius:20,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontSize:12}}>Send</button></div>:<p style={{textAlign:'center',color:sub,fontSize:11}}>Login to send messages</p>}
    </>)}
  </div></div>
}

// ========== NDA HUB ==========
function NDAHub({ inventions, lang, dark }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const generateNDA = (inv) => {
    const nda = `NON-DISCLOSURE AGREEMENT\n\nInventor: ${inv.inventorName}\nInvention: ${inv.title}\nDescription: ${inv.description}\n\nBoth parties agree to keep all information confidential.\n\nDate: ${new Date().toLocaleDateString()}\nPlatform: InventShield`
    const blob = new Blob([nda],{type:'text/plain'})
    const a = document.createElement('a')
    a.href=URL.createObjectURL(blob)
    a.download='NDA_'+inv.title.replace(/\s/g,'_')+'.txt'
    a.click()
  }
  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:900,margin:'0 auto'}}><h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>📄 NDA Generator</h1><p style={{color:sub,fontSize:13,marginBottom:16}}>Generate Non-Disclosure Agreements to protect your ideas</p><div style={{display:'flex',flexDirection:'column',gap:12}}>{inventions.map(inv=><div key={inv.id} style={{background:cb,borderRadius:12,padding:16,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}><div><h3 style={{fontSize:15,fontWeight:600,color:txt}}>{inv.title}</h3><p style={{fontSize:11,color:sub}}>{inv.inventorName} | {inv.funding}</p></div><button onClick={()=>generateNDA(inv)} style={{padding:'8px 18px',borderRadius:20,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontWeight:600,fontSize:12}}>📄 Download NDA</button></div>)}</div></div></div>
}

// ========== RATINGS & REVIEWS ==========
function RatingsPage({ inventions, lang, dark, setNotifications }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const [ratings, setRatings] = useState(()=>{try{return JSON.parse(localStorage.getItem('inventshield_ratings')||'{}')}catch{return{}}})
  const [review, setReview] = useState({invId:null, stars:0, text:''})

  const submitReview = () => {
    if(!review.stars || !review.text.trim()) return
    const key = review.invId
    const existing = ratings[key] || []
    const updated = {...ratings, [key]: [...existing, {stars:review.stars, text:review.text, date:new Date().toLocaleDateString()}]}
    setRatings(updated)
    localStorage.setItem('inventshield_ratings', JSON.stringify(updated))
    setReview({invId:null, stars:0, text:''})
    setNotifications(prev=>['⭐ Review submitted!',...prev].slice(0,20))
  }

  const avgRating = (invId) => {
    const r = ratings[invId] || []
    if(r.length===0) return 0
    return Math.round(r.reduce((s,i)=>s+i.stars,0) / r.length * 10) / 10
  }

  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:900,margin:'0 auto'}}>
    <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>⭐ Ratings & Reviews</h1>
    <p style={{color:sub,fontSize:13,marginBottom:16}}>Rate inventions and read what others think</p>

    {!review.invId ? (
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {inventions.map(inv=>{
          const avg = avgRating(inv.id)
          const count = (ratings[inv.id]||[]).length
          return <div key={inv.id} style={{background:cb,borderRadius:12,padding:16}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
              <div>
                <h3 style={{fontSize:15,fontWeight:600,color:txt}}>{inv.title}</h3>
                <p style={{fontSize:11,color:sub}}>{inv.inventorName} | {inv.funding}</p>
                <div style={{display:'flex',alignItems:'center',gap:4,marginTop:4}}>
                  <span style={{color:'#f59e0b',fontSize:16}}>{'★'.repeat(Math.round(avg))}{'☆'.repeat(5-Math.round(avg))}</span>
                  <span style={{fontSize:11,color:sub}}>{avg} ({count} review{count!==1?'s':''})</span>
                </div>
              </div>
              <button onClick={()=>setReview({invId:inv.id,stars:0,text:''})} style={{padding:'8px 16px',borderRadius:20,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontSize:11}}>Write Review</button>
            </div>
            {(ratings[inv.id]||[]).slice(0,3).map((r,i)=><div key={i} style={{marginTop:8,padding:'8px 12px',background:dark?'#111827':'#f9fafb',borderRadius:8}}><span style={{color:'#f59e0b',fontSize:12}}>{'★'.repeat(r.stars)}</span><span style={{color:sub,fontSize:9,marginLeft:6}}>{r.date}</span><p style={{fontSize:12,color:txt,marginTop:2}}>{r.text}</p></div>)}
          </div>
        })}
      </div>
    ) : (
      <div style={{background:cb,borderRadius:14,padding:24,maxWidth:500}}>
        <button onClick={()=>setReview({invId:null,stars:0,text:''})} style={{background:'none',border:'none',color:'#4f46e5',cursor:'pointer',fontSize:13,marginBottom:12}}>← Back</button>
        <h3 style={{fontSize:16,fontWeight:'bold',color:txt,marginBottom:4}}>{inventions.find(i=>i.id===review.invId)?.title}</h3>
        <div style={{margin:'12px 0'}}>
          <p style={{fontSize:12,color:sub,marginBottom:4}}>Your Rating</p>
          <div style={{display:'flex',gap:4}}>
            {[1,2,3,4,5].map(s=><button key={s} onClick={()=>setReview({...review,stars:s})} style={{background:'none',border:'none',fontSize:28,cursor:'pointer',color:s<=review.stars?'#f59e0b':'#d1d5db'}}>{s<=review.stars?'★':'☆'}</button>)}
          </div>
        </div>
        <textarea placeholder="Write your review..." value={review.text} onChange={e=>setReview({...review,text:e.target.value})} rows={3} style={{width:'100%',padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:bg,color:txt,fontSize:12,marginBottom:12,boxSizing:'border-box'}} />
        <button onClick={submitReview} disabled={!review.stars||!review.text.trim()} style={{width:'100%',padding:10,borderRadius:8,background:(!review.stars||!review.text.trim())?'#d1d5db':'#4f46e5',color:'white',border:'none',cursor:(!review.stars||!review.text.trim())?'default':'pointer',fontWeight:600,fontSize:13}}>Submit Review</button>
      </div>
    )}
  </div></div>
}

// ========== PDF EXPORT ==========
function PDFExport({ inventions, lang, dark }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'

  const exportPDF = (inv) => {
    const content = `
INVENTSHIELD - INVENTION REPORT
===============================
Title: ${inv.title}
Status: ${inv.status.toUpperCase()}
Inventor: ${inv.inventorName}
Tag: ${inv.tag}
Funding: ${inv.funding}
Description: ${inv.description}
Blockchain: ${inv.blockchainAnchored?'Verified':'Not Verified'}
Crowdfunding: ${inv.crowdfunding?.active?`$${inv.crowdfunding.raised.toLocaleString()} raised of $${inv.crowdfunding.goal.toLocaleString()}`:'Not active'}
Contributors: ${inv.contributors.map(c=>c.name).join(', ')}
Documents: ${inv.documents.join(', ')||'None'}
Date: ${new Date().toLocaleDateString()}
Generated by InventShield
    `.trim()
    const blob = new Blob([content],{type:'text/plain'})
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = inv.title.replace(/\s/g,'_')+'_Report.txt'
    a.click()
  }

  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:900,margin:'0 auto'}}>
    <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>📥 Export Reports</h1>
    <p style={{color:sub,fontSize:13,marginBottom:16}}>Download invention reports as PDF/TXT</p>
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      {inventions.map(inv=><div key={inv.id} style={{background:cb,borderRadius:12,padding:16,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
        <div><h3 style={{fontSize:15,fontWeight:600,color:txt}}>{inv.title}</h3><p style={{fontSize:11,color:sub}}>{inv.inventorName} | {inv.funding} | {inv.documents?.length||0} docs</p></div>
        <button onClick={()=>exportPDF(inv)} style={{padding:'8px 16px',borderRadius:20,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontWeight:600,fontSize:11}}>📥 Export Report</button>
      </div>)}
    </div>
  </div></div>
}

// ========== REFERRAL PROGRAM ==========
function ReferralPage({ lang, dark, setNotifications }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const [referrals, setReferrals] = useState(()=>{try{return JSON.parse(localStorage.getItem('inventshield_referrals')||'[]')}catch{return[]}})
  const [refName, setRefName] = useState('')
  const referralCode = 'INVSHIELD-' + Math.random().toString(36).substring(2,8).toUpperCase()
  const referralLink = window.location.origin + '/login?ref=' + referralCode
  const credits = referrals.length * 5

  const addReferral = () => {
    if(!refName.trim()) return
    setReferrals([...referrals, {name:refName, date:new Date().toLocaleDateString(), code:referralCode}])
    localStorage.setItem('inventshield_referrals', JSON.stringify([...referrals, {name:refName, date:new Date().toLocaleDateString(), code:referralCode}]))
    setRefName('')
    setNotifications(prev=>['🎉 Referral added! You earned $5 credit.',...prev].slice(0,20))
  }

  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:900,margin:'0 auto'}}>
    <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>🎁 Referral Program</h1>
    <p style={{color:sub,fontSize:13,marginBottom:16}}>Invite inventors — earn $5 credit per referral</p>

    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:16,marginBottom:20}}>
      <div style={{background:cb,borderRadius:14,padding:20,textAlign:'center'}}>
        <p style={{fontSize:40,marginBottom:4}}>🎁</p>
        <p style={{fontSize:24,fontWeight:'bold',color:'#4f46e5'}}>${credits}</p>
        <p style={{fontSize:11,color:sub}}>Total Credits Earned</p>
      </div>
      <div style={{background:cb,borderRadius:14,padding:20,textAlign:'center'}}>
        <p style={{fontSize:40,marginBottom:4}}>👥</p>
        <p style={{fontSize:24,fontWeight:'bold',color:'#16a34a'}}>{referrals.length}</p>
        <p style={{fontSize:11,color:sub}}>People Referred</p>
      </div>
    </div>

    <div style={{background:cb,borderRadius:14,padding:20,marginBottom:20}}>
      <h3 style={{fontSize:14,fontWeight:600,color:txt,marginBottom:8}}>Your Referral Code</h3>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        <code style={{flex:1,padding:10,background:dark?'#111827':'#f9fafb',borderRadius:8,fontSize:14,color:'#4f46e5',fontWeight:'bold',textAlign:'center'}}>{referralCode}</code>
        <button onClick={()=>{navigator.clipboard.writeText(referralLink);alert('Referral link copied!')}} style={{padding:'10px 16px',borderRadius:8,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontSize:12}}>Copy Link</button>
      </div>
    </div>

    <div style={{background:cb,borderRadius:14,padding:20,marginBottom:20}}>
      <h3 style={{fontSize:14,fontWeight:600,color:txt,marginBottom:8}}>Add Referral</h3>
      <div style={{display:'flex',gap:8}}>
        <input placeholder="Friend's name or email" value={refName} onChange={e=>setRefName(e.target.value)} style={{flex:1,padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:bg,color:txt,fontSize:12}} />
        <button onClick={addReferral} disabled={!refName.trim()} style={{padding:'10px 20px',borderRadius:8,background:refName.trim()?'#16a34a':'#d1d5db',color:'white',border:'none',cursor:refName.trim()?'pointer':'default',fontWeight:600,fontSize:12}}>Add</button>
      </div>
    </div>

    {referrals.length>0 && <div style={{background:cb,borderRadius:14,padding:20}}>
      <h3 style={{fontSize:14,fontWeight:600,color:txt,marginBottom:8}}>Referral History</h3>
      {referrals.map((r,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:i<referrals.length-1?'1px solid '+(dark?'#374151':'#e5e7eb'):'none',fontSize:12,color:txt}}><span>{r.name}</span><span style={{color:sub}}>{r.date}</span><span style={{color:'#16a34a',fontWeight:600}}>+$5</span></div>)}
    </div>}
  </div></div>
}

// ========== FUNDING CALCULATOR ==========
function FundingCalc({ lang, dark }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const [inv, setInv] = useState(10000)
  const [share, setShare] = useState(10)
  const [growth, setGrowth] = useState(20)

  const investorReturn = (inv * (share/100)) * (1 + growth/100)
  const platformFee = inv * 0.05
  const inventorGets = inv - platformFee

  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:600,margin:'0 auto'}}>
    <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>📊 Funding Calculator</h1>
    <p style={{color:sub,fontSize:13,marginBottom:20}}>Estimate returns for investors</p>

    <div style={{background:cb,borderRadius:14,padding:24,marginBottom:16}}>
      <label style={{fontSize:12,color:txt,display:'block',marginBottom:4}}>Investment Amount: <b>${inv.toLocaleString()}</b></label>
      <input type="range" min="1000" max="100000" step="1000" value={inv} onChange={e=>setInv(parseInt(e.target.value))} style={{width:'100%',marginBottom:16}} />
      
      <label style={{fontSize:12,color:txt,display:'block',marginBottom:4}}>Equity Share: <b>{share}%</b></label>
      <input type="range" min="1" max="50" value={share} onChange={e=>setShare(parseInt(e.target.value))} style={{width:'100%',marginBottom:16}} />
      
      <label style={{fontSize:12,color:txt,display:'block',marginBottom:4}}>Projected Growth: <b>{growth}%</b></label>
      <input type="range" min="0" max="100" step="5" value={growth} onChange={e=>setGrowth(parseInt(e.target.value))} style={{width:'100%',marginBottom:16}} />
    </div>

    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))',gap:10}}>
      <div style={{background:cb,borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:18,fontWeight:'bold',color:'#16a34a'}}>${investorReturn.toLocaleString()}</p><p style={{fontSize:9,color:sub}}>Investor Return</p></div>
      <div style={{background:cb,borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:18,fontWeight:'bold',color:'#4f46e5'}}>${platformFee.toLocaleString()}</p><p style={{fontSize:9,color:sub}}>Platform Fee (5%)</p></div>
      <div style={{background:cb,borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:18,fontWeight:'bold',color:'#15803d'}}>${inventorGets.toLocaleString()}</p><p style={{fontSize:9,color:sub}}>Inventor Gets</p></div>
      <div style={{background:cb,borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:18,fontWeight:'bold',color:'#f59e0b'}}>{share}%</p><p style={{fontSize:9,color:sub}}>Equity Given</p></div>
    </div>
  </div></div>
}

// ========== ACTIVITY FEED ==========
function ActivityFeed({ inventions, lang, dark }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const allActs = inventions.flatMap(i=> (i.activities||[]).map(a=>({...a, invention:i.title, invId:i.id, status:i.status})))
    .sort((a,b)=>b.time?.localeCompare(a.time||'')).slice(0,50)

  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:800,margin:'0 auto'}}>
    <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>📡 Activity Feed</h1>
    <p style={{color:sub,fontSize:13,marginBottom:16}}>All platform events in real-time</p>
    <div style={{display:'flex',flexDirection:'column',gap:2}}>
      {allActs.map((a,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:cb,borderRadius:8,borderBottom:i<allActs.length-1?'1px solid '+(dark?'#374151':'#e5e7eb'):'none'}}>
        <span style={{fontSize:18}}>{a.text?.includes('Certif')?'🔗':a.text?.includes('joined')?'👤':a.text?.includes('created')?'📝':a.text?.includes('PANIC')?'🚨':'📌'}</span>
        <div style={{flex:1}}>
          <span style={{fontWeight:600,color:'#4f46e5',fontSize:12}}>{a.invention}</span>
          <span style={{color:sub,fontSize:11,marginLeft:6}}>{a.text}</span>
        </div>
        <span style={{fontSize:10,color:sub}}>{a.time}</span>
      </div>)}
      {allActs.length===0 && <p style={{textAlign:'center',color:sub,padding:40}}>No activity yet</p>}
    </div>
  </div></div>
}

// ========== BOOKMARKS ==========
function BookmarksPage({ inventions, lang, dark }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const [bookmarks, setBookmarks] = useState(()=>{try{return JSON.parse(localStorage.getItem('inventshield_bookmarks')||'[]')}catch{return[]}})
  const bookmarked = inventions.filter(i=>bookmarks.includes(i.id))

  const toggle = (id) => {
    const updated = bookmarks.includes(id) ? bookmarks.filter(b=>b!==id) : [...bookmarks, id]
    setBookmarks(updated)
    localStorage.setItem('inventshield_bookmarks', JSON.stringify(updated))
  }

  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:900,margin:'0 auto'}}>
    <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>🔖 Bookmarks</h1>
    <p style={{color:sub,fontSize:13,marginBottom:16}}>Your saved inventions ({bookmarked.length})</p>
    {bookmarked.length===0 ? <p style={{textAlign:'center',color:sub,padding:40}}>No bookmarks yet. Browse inventions and save them!</p> :
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      {bookmarked.map(inv=><div key={inv.id} style={{background:cb,borderRadius:10,padding:14,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div><h3 style={{fontSize:14,fontWeight:600,color:txt}}>{inv.title}</h3><p style={{fontSize:11,color:sub}}>{inv.inventorName} | {inv.funding}</p></div>
        <button onClick={()=>toggle(inv.id)} style={{background:'none',border:'none',fontSize:18,cursor:'pointer'}}>🔖</button>
      </div>)}
    </div>}
    <div style={{marginTop:24}}>
      <h3 style={{fontSize:14,fontWeight:600,color:txt,marginBottom:8}}>All Inventions</h3>
      {inventions.filter(i=>!bookmarks.includes(i.id)).slice(0,10).map(inv=><div key={inv.id} style={{background:cb,borderRadius:10,padding:14,display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
        <div><h3 style={{fontSize:14,fontWeight:600,color:txt}}>{inv.title}</h3><p style={{fontSize:11,color:sub}}>{inv.inventorName} | {inv.funding}</p></div>
        <button onClick={()=>toggle(inv.id)} style={{background:'none',border:'none',fontSize:18,cursor:'pointer',opacity:0.3}}>🔖</button>
      </div>)}
    </div>
  </div></div>
}

// ========== COMPARE INVENTIONS ==========
function ComparePage({ inventions, lang, dark }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const [a, setA] = useState(null); const [b, setB] = useState(null)
  const invA = inventions.find(i=>i.id===a)
  const invB = inventions.find(i=>i.id===b)

  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:1000,margin:'0 auto'}}>
    <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>⚖️ Compare Inventions</h1>
    <p style={{color:sub,fontSize:13,marginBottom:16}}>Select two inventions to compare side-by-side</p>
    
    <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:20}}>
      <select value={a||''} onChange={e=>setA(parseInt(e.target.value))} style={{flex:1,padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:cb,color:txt,fontSize:13}}>
        <option value="">Select first invention...</option>
        {inventions.map(i=><option key={i.id} value={i.id}>{i.title}</option>)}
      </select>
      <select value={b||''} onChange={e=>setB(parseInt(e.target.value))} style={{flex:1,padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:cb,color:txt,fontSize:13}}>
        <option value="">Select second invention...</option>
        {inventions.map(i=><option key={i.id} value={i.id}>{i.title}</option>)}
      </select>
    </div>

    {invA && invB && (
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        {[invA, invB].map((inv,i)=><div key={i} style={{background:cb,borderRadius:12,padding:20}}>
          <h2 style={{fontSize:18,fontWeight:'bold',color:txt,marginBottom:12}}>{inv.title}</h2>
          {[{l:'Status',v:inv.status},{l:'Inventor',v:inv.inventorName},{l:'Tag',v:inv.tag},{l:'Funding',v:inv.funding},{l:'Progress',v:inv.progress+'%'},{l:'Contributors',v:inv.contributors.length},{l:'Documents',v:inv.documents.length},{l:'Blockchain',v:inv.blockchainAnchored?'Verified':'Not'},{l:'Crowdfunding',v:inv.crowdfunding?.active?'Active ($'+inv.crowdfunding.raised.toLocaleString()+')':'None'},{l:'Fee Waiver',v:inv.feeWaiver?'Yes':'No'}].map((r,j)=><div key={j} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:j<9?'1px solid '+(dark?'#374151':'#e5e7eb'):'none',fontSize:12}}><span style={{color:sub}}>{r.l}</span><span style={{color:txt,fontWeight:500}}>{r.v}</span></div>)}
        </div>)}
      </div>
    )}
  </div></div>
}

// ========== PATENT SEARCH ==========
function PatentSearch({ lang, dark }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)

  const search = () => {
    if(!query.trim()) return
    setSearching(true)
    setTimeout(()=>{
      setResults([{title:'US Patent '+Math.floor(Math.random()*9999999), inventor:'Various', date:'2024', relevance:'High', summary:'Related to '+query+'. This patent covers similar technology in the field of innovation.'},{title:'WO Patent '+Math.floor(Math.random()*999999), inventor:'International', date:'2023', relevance:'Medium', summary:'International patent application covering aspects of '+query+'.'},{title:'EP Patent '+Math.floor(Math.random()*99999), inventor:'European', date:'2025', relevance:'Low', summary:'European patent with tangential relation to '+query+'.'}])
      setSearching(false)
    },1500)
  }

  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:800,margin:'0 auto'}}>
    <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>🔍 Patent Search</h1>
    <p style={{color:sub,fontSize:13,marginBottom:16}}>Check prior art before filing your invention</p>
    <div style={{display:'flex',gap:8,marginBottom:20}}>
      <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search()} placeholder="Search patents by keyword..." style={{flex:1,padding:12,borderRadius:10,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:cb,color:txt,fontSize:14}} />
      <button onClick={search} disabled={searching||!query.trim()} style={{padding:'12px 24px',borderRadius:10,background:(searching||!query.trim())?'#d1d5db':'#4f46e5',color:'white',border:'none',cursor:(searching||!query.trim())?'default':'pointer',fontWeight:600}}>{searching?'Searching...':'Search'}</button>
    </div>
    <p style={{fontSize:10,color:sub,marginBottom:16}}>🔗 Also try: <a href={'https://patents.google.com/?q='+encodeURIComponent(query)} target="_blank" rel="noopener" style={{color:'#4f46e5'}}>Google Patents</a></p>
    {results.map((r,i)=><div key={i} style={{background:cb,borderRadius:10,padding:16,marginBottom:8}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
        <h3 style={{fontSize:14,fontWeight:600,color:txt}}>{r.title}</h3>
        <span style={{padding:'2px 8px',borderRadius:9999,fontSize:9,fontWeight:'bold',background:r.relevance==='High'?'#fef3c7':r.relevance==='Medium'?'#eef2ff':'#f3f4f6',color:r.relevance==='High'?'#92400e':r.relevance==='Medium'?'#4f46e5':'#6b7280'}}>{r.relevance} Relevance</span>
      </div>
      <p style={{fontSize:11,color:sub}}>{r.inventor} | {r.date}</p>
      <p style={{fontSize:12,color:txt,marginTop:4}}>{r.summary}</p>
    </div>)}
  </div></div>
}

// ========== TEAM MANAGEMENT ==========
function TeamPage({ inventions, setInventions, lang, dark, setNotifications }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const [newMember, setNewMember] = useState({invId:null, name:'', role:'Contributor'})

  const addMember = () => {
    if(!newMember.name.trim()||!newMember.invId) return
    setInventions(prev=>prev.map(i=>i.id===newMember.invId?{...i, contributors:[...i.contributors,{name:newMember.name,role:newMember.role,share:5,avatar:newMember.name[0].toUpperCase(),userId:'user'+Date.now()}], activities:[...i.activities,{text:newMember.name+' joined as '+newMember.role,time:'Just now'}]}:i))
    setNewMember({invId:null,name:'',role:'Contributor'})
    setNotifications(prev=>['👤 Team member added!',...prev].slice(0,20))
  }

  const removeMember = (invId, memberIdx) => {
    if(!confirm('Remove this team member?')) return
    setInventions(prev=>prev.map(i=>i.id===invId?{...i, contributors:i.contributors.filter((_,idx)=>idx!==memberIdx)}:i))
    setNotifications(prev=>['Removed team member.',...prev].slice(0,20))
  }

  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:900,margin:'0 auto'}}>
    <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>👥 Team Management</h1>
    <p style={{color:sub,fontSize:13,marginBottom:16}}>Manage contributors for each invention</p>

    <div style={{background:cb,borderRadius:14,padding:20,marginBottom:20}}>
      <h3 style={{fontSize:14,fontWeight:600,color:txt,marginBottom:12}}>Add Team Member</h3>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:8}}>
        <select value={newMember.invId||''} onChange={e=>setNewMember({...newMember,invId:parseInt(e.target.value)})} style={{flex:1,padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:bg,color:txt,fontSize:12}}>
          <option value="">Select invention...</option>
          {inventions.map(i=><option key={i.id} value={i.id}>{i.title}</option>)}
        </select>
      </div>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        <input placeholder="Name" value={newMember.name} onChange={e=>setNewMember({...newMember,name:e.target.value})} style={{flex:2,padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:bg,color:txt,fontSize:12}} />
        <select value={newMember.role} onChange={e=>setNewMember({...newMember,role:e.target.value})} style={{flex:1,padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:bg,color:txt,fontSize:12}}>
          <option>Contributor</option><option>Reviewer</option><option>Co-Inventor</option><option>Advisor</option>
        </select>
        <button onClick={addMember} disabled={!newMember.name.trim()||!newMember.invId} style={{padding:'10px 20px',borderRadius:8,background:(!newMember.name.trim()||!newMember.invId)?'#d1d5db':'#16a34a',color:'white',border:'none',cursor:(!newMember.name.trim()||!newMember.invId)?'default':'pointer',fontWeight:600,fontSize:12}}>Add</button>
      </div>
    </div>

    {inventions.map(inv=><div key={inv.id} style={{background:cb,borderRadius:12,padding:16,marginBottom:12}}>
      <h3 style={{fontSize:15,fontWeight:600,color:txt,marginBottom:8}}>{inv.title} ({inv.contributors.length} members)</h3>
      {inv.contributors.map((c,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:i<inv.contributors.length-1?'1px solid '+(dark?'#374151':'#e5e7eb'):'none'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:30,height:30,borderRadius:'50%',background:'#eef2ff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:'bold',color:'#4f46e5'}}>{c.avatar}</div>
          <div><span style={{fontSize:13,color:txt,fontWeight:500}}>{c.name}</span><span style={{fontSize:10,color:sub,marginLeft:6}}>{c.role} | {c.share}% share</span></div>
        </div>
        {c.role!=='Inventor'&&<button onClick={()=>removeMember(inv.id,i)} style={{color:'#ef4444',background:'none',border:'none',cursor:'pointer',fontSize:11}}>Remove</button>}
      </div>)}
    </div>)}
  </div></div>
}

// ========== MILESTONE TRACKER ==========
function MilestonesPage({ inventions, setInventions, lang, dark, setNotifications }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const [milestones, setMilestones] = useState(()=>{try{return JSON.parse(localStorage.getItem('inventshield_milestones')||'{}')}catch{return{}}})
  const [newMS, setNewMS] = useState({invId:null, text:'', target:'', completed:false})

  const addMilestone = () => {
    if(!newMS.text.trim()||!newMS.invId) return
    const key = newMS.invId
    const updated = {...milestones, [key]:[...(milestones[key]||[]),{text:newMS.text,target:newMS.target,completed:false,date:new Date().toLocaleDateString()}]}
    setMilestones(updated)
    localStorage.setItem('inventshield_milestones', JSON.stringify(updated))
    setNewMS({invId:null,text:'',target:'',completed:false})
    setNotifications(prev=>['🎯 Milestone added!',...prev].slice(0,20))
  }

  const toggleMS = (invId, idx) => {
    const key = invId; const list = [...(milestones[key]||[])]
    list[idx].completed = !list[idx].completed
    const updated = {...milestones, [key]:list}
    setMilestones(updated)
    localStorage.setItem('inventshield_milestones', JSON.stringify(updated))
  }

  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:900,margin:'0 auto'}}>
    <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>🎯 Milestones</h1>
    <p style={{color:sub,fontSize:13,marginBottom:16}}>Track invention development goals</p>

    <div style={{background:cb,borderRadius:14,padding:20,marginBottom:20}}>
      <h3 style={{fontSize:14,fontWeight:600,color:txt,marginBottom:12}}>Add Milestone</h3>
      <select value={newMS.invId||''} onChange={e=>setNewMS({...newMS,invId:parseInt(e.target.value)})} style={{width:'100%',padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:bg,color:txt,fontSize:12,marginBottom:8}}>
        <option value="">Select invention...</option>
        {inventions.map(i=><option key={i.id} value={i.id}>{i.title}</option>)}
      </select>
      <input placeholder="Milestone description" value={newMS.text} onChange={e=>setNewMS({...newMS,text:e.target.value})} style={{width:'100%',padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:bg,color:txt,fontSize:12,marginBottom:8}} />
      <input placeholder="Target date (e.g. June 2026)" value={newMS.target} onChange={e=>setNewMS({...newMS,target:e.target.value})} style={{width:'100%',padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:bg,color:txt,fontSize:12,marginBottom:8}} />
      <button onClick={addMilestone} disabled={!newMS.text.trim()||!newMS.invId} style={{width:'100%',padding:10,borderRadius:8,background:(!newMS.text.trim()||!newMS.invId)?'#d1d5db':'#4f46e5',color:'white',border:'none',cursor:(!newMS.text.trim()||!newMS.invId)?'default':'pointer',fontWeight:600}}>Add Milestone</button>
    </div>

    {inventions.map(inv=>{
      const ms = milestones[inv.id]||[]
      if(ms.length===0) return null
      const done = ms.filter(m=>m.completed).length
      return <div key={inv.id} style={{background:cb,borderRadius:12,padding:16,marginBottom:12}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <h3 style={{fontSize:15,fontWeight:600,color:txt}}>{inv.title}</h3>
          <span style={{fontSize:11,color:sub}}>{done}/{ms.length} done</span>
        </div>
        <div style={{width:'100%',background:dark?'#374151':'#e5e7eb',borderRadius:9999,height:6,marginBottom:10}}><div style={{background:'#4f46e5',height:6,borderRadius:9999,width:`${(done/ms.length)*100}%`}}></div></div>
        {ms.map((m,i)=><div key={i} onClick={()=>toggleMS(inv.id,i)} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 0',borderBottom:i<ms.length-1?'1px solid '+(dark?'#374151':'#e5e7eb'):'none',cursor:'pointer'}}>
          <span style={{fontSize:16}}>{m.completed?'✅':'⬜'}</span>
          <div style={{flex:1}}><span style={{fontSize:12,color:txt,textDecoration:m.completed?'line-through':'none'}}>{m.text}</span></div>
          <span style={{fontSize:10,color:sub}}>{m.target}</span>
        </div>)}
      </div>
    })}
  </div></div>
}

// ========== EMAIL SIMULATION ==========
function EmailCenter({ lang, dark, setNotifications }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const [emails, setEmails] = useState(()=>{try{return JSON.parse(localStorage.getItem('inventshield_emails')||'[]')}catch{return[]}})
  const [compose, setCompose] = useState({to:'',subject:'',body:''})

  const sendEmail = () => {
    if(!compose.to.trim()||!compose.subject.trim()) return
    const email = {...compose, date:new Date().toLocaleString(), status:'sent', id:Date.now()}
    setEmails([email,...emails])
    localStorage.setItem('inventshield_emails', JSON.stringify([email,...emails]))
    setCompose({to:'',subject:'',body:''})
    setNotifications(prev=>['📧 Email sent to '+compose.to,...prev].slice(0,20))
  }

  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:900,margin:'0 auto'}}>
    <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>📧 Email Center</h1>
    <p style={{color:sub,fontSize:13,marginBottom:16}}>Send and track investor/inventor communications</p>

    <div style={{background:cb,borderRadius:14,padding:20,marginBottom:20}}>
      <h3 style={{fontSize:14,fontWeight:600,color:txt,marginBottom:12}}>Compose Email</h3>
      <input placeholder="To: investor@example.com" value={compose.to} onChange={e=>setCompose({...compose,to:e.target.value})} style={{width:'100%',padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:bg,color:txt,fontSize:12,marginBottom:8,boxSizing:'border-box'}} />
      <input placeholder="Subject" value={compose.subject} onChange={e=>setCompose({...compose,subject:e.target.value})} style={{width:'100%',padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:bg,color:txt,fontSize:12,marginBottom:8,boxSizing:'border-box'}} />
      <textarea placeholder="Message..." value={compose.body} onChange={e=>setCompose({...compose,body:e.target.value})} rows={4} style={{width:'100%',padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:bg,color:txt,fontSize:12,marginBottom:8,boxSizing:'border-box'}} />
      <button onClick={sendEmail} disabled={!compose.to.trim()||!compose.subject.trim()} style={{width:'100%',padding:10,borderRadius:8,background:(!compose.to.trim()||!compose.subject.trim())?'#d1d5db':'#4f46e5',color:'white',border:'none',cursor:(!compose.to.trim()||!compose.subject.trim())?'default':'pointer',fontWeight:600}}>Send Email</button>
    </div>

    <h3 style={{fontSize:14,fontWeight:600,color:txt,marginBottom:8}}>Sent Emails ({emails.length})</h3>
    {emails.length===0?<p style={{color:sub,fontSize:12,textAlign:'center',padding:20}}>No emails sent yet</p>:
    emails.map(e=><div key={e.id} style={{background:cb,borderRadius:8,padding:12,marginBottom:6}}>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:sub,marginBottom:2}}><span>To: {e.to}</span><span>{e.date}</span></div>
      <p style={{fontSize:13,fontWeight:600,color:txt}}>{e.subject}</p>
      <p style={{fontSize:11,color:sub}}>{e.body?.slice(0,80)}...</p>
    </div>)}
  </div></div>
}

// ========== NOTIFICATION HISTORY ==========
function NotificationHistory({ lang, dark }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#d1d5db':'#6b7280'
  const [history, setHistory] = useState(()=>{try{return JSON.parse(localStorage.getItem('inventshield_notif_history')||'[]')}catch{return[]}})

  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:700,margin:'0 auto'}}>
    <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>🔔 Notification History</h1>
    <p style={{color:sub,fontSize:13,marginBottom:16}}>{history.length} total notifications</p>
    {history.length===0?<p style={{textAlign:'center',color:sub,padding:40}}>No notifications yet</p>:
    <div style={{display:'flex',flexDirection:'column',gap:4}}>
      {history.map((n,i)=><div key={i} style={{background:cb,borderRadius:8,padding:'10px 14px',fontSize:12,color:txt,borderLeft:'3px solid #4f46e5'}}>{n}</div>)}
    </div>}
    <button onClick={()=>{localStorage.removeItem('inventshield_notif_history');setHistory([])}} style={{marginTop:12,padding:'8px 16px',borderRadius:8,background:'#fee2e2',color:'#dc2626',border:'none',cursor:'pointer',fontSize:11}}>Clear All</button>
  </div></div>
}

// ========== QUICK ACTIONS WIDGET ==========
function QuickActions({ lang, dark }) {
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const actions = [
    {icon:'➕',label:'Add',path:'/add',color:'#16a34a'},{icon:'⭐',label:'Rate',path:'/ratings',color:'#f59e0b'},
    {icon:'📤',label:'Share',path:'/share',color:'#2563eb'},{icon:'📄',label:'NDA',path:'/nda',color:'#4f46e5'},
    {icon:'📊',label:'Calc',path:'/calc',color:'#0891b2'},{icon:'🔍',label:'Patent',path:'/patents',color:'#9333ea'}
  ]

  return <div style={{position:'fixed',bottom:90,right:16,zIndex:140}}>
    {open && <div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:8}}>
      {actions.map(a=><button key={a.path} onClick={()=>{nav(a.path);setOpen(false)}} style={{width:44,height:44,borderRadius:'50%',background:a.color,color:'white',border:'none',fontSize:18,cursor:'pointer',boxShadow:'0 4px 12px rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}} title={a.label}>{a.icon}</button>)}
    </div>}
    <button onClick={()=>setOpen(!open)} style={{width:48,height:48,borderRadius:'50%',background:open?'#ef4444':'#4f46e5',color:'white',border:'none',fontSize:22,cursor:'pointer',boxShadow:'0 4px 15px rgba(79,70,229,0.4)',display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.3s',transform:open?'rotate(45deg)':'rotate(0deg)'}}>+</button>
  </div>
}

// ========== UI POLISH COMPONENTS ==========

// Smooth page transitions wrapper
function PageTransition({ children }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 50) }, [])
  return <div style={{opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(10px)', transition:'opacity 0.3s ease, transform 0.3s ease'}}>{children}</div>
}

// Animated stat card
function StatCard({ value, label, color, icon, dark }) {
  const [hover, setHover] = useState(false)
  const cb = dark?'#1f2937':'white'
  return <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{background:cb,borderRadius:12,padding:16,textAlign:'center',cursor:'pointer',transition:'all 0.2s',transform:hover?'translateY(-4px)':'translateY(0)',boxShadow:hover?'0 8px 25px rgba(0,0,0,0.12)':'0 1px 3px rgba(0,0,0,0.05)',border:'1px solid '+(dark?'#374151':'#e5e7eb')}}>
    {icon && <span style={{fontSize:24,display:'block',marginBottom:4}}>{icon}</span>}
    <p style={{fontSize:22,fontWeight:'bold',color:color||'#4f46e5',transition:'all 0.2s',transform:hover?'scale(1.1)':'scale(1)'}}>{value}</p>
    <p style={{fontSize:10,color:dark?'#d1d5db':'#6b7280'}}>{label}</p>
  </div>
}

// Pulse animation for live indicators
function LiveDot({ color }) {
  return <span style={{display:'inline-block',width:8,height:8,borderRadius:'50%',background:color||'#16a34a',marginRight:6,animation:'pulse 2s infinite'}} />
}

// Skeleton loader
function Skeleton({ width, height }) {
  return <div style={{width:width||'100%',height:height||20,background:'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',backgroundSize:'200% 100%',animation:'shimmer 1.5s infinite',borderRadius:8}} />
}

// Badge component
function Badge({ text, color, bg }) {
  return <span style={{display:'inline-block',padding:'3px 10px',borderRadius:9999,fontSize:10,fontWeight:'bold',background:bg||'#eef2ff',color:color||'#4f46e5'}}>{text}</span>
}

// Toast notification
function Toast({ message, type, onClose }) {
  const colors = {success:'#dcfce7', error:'#fef2f2', info:'#eef2ff', warning:'#fefce8'}
  const textColors = {success:'#15803d', error:'#dc2626', info:'#4f46e5', warning:'#92400e'}
  return <div style={{position:'fixed',top:70,right:16,zIndex:200,background:colors[type]||colors.info,borderRadius:12,padding:'12px 20px',boxShadow:'0 10px 30px rgba(0,0,0,0.15)',display:'flex',alignItems:'center',gap:10,animation:'slideIn 0.3s ease',maxWidth:350}}>
    <span>{type==='success'?'✅':type==='error'?'❌':type==='warning'?'⚠️':'ℹ️'}</span>
    <span style={{fontSize:13,color:textColors[type]||textColors.info,flex:1}}>{message}</span>
    <button onClick={onClose} style={{background:'none',border:'none',color:textColors[type],cursor:'pointer',fontSize:16}}>×</button>
  </div>
}

// Progress ring
function ProgressRing({ pct, size, stroke }) {
  const r = (size||60)/2 - (stroke||4)
  const circ = 2 * Math.PI * r
  return <svg width={size||60} height={size||60} style={{transform:'rotate(-90deg)'}}>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke||4} />
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#4f46e5" strokeWidth={stroke||4} strokeDasharray={circ} strokeDashoffset={circ - (pct/100)*circ} strokeLinecap="round" style={{transition:'stroke-dashoffset 0.5s ease'}} />
    <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize={size/5} fill="#4f46e5" fontWeight="bold" transform={`rotate(90, ${size/2}, ${size/2})`}>{pct}%</text>
  </svg>
}

// Divider
function Divider({ dark, label }) {
  return <div style={{display:'flex',alignItems:'center',gap:12,margin:'16px 0'}}>
    <div style={{flex:1,height:1,background:dark?'#374151':'#e5e7eb'}}></div>
    {label && <span style={{fontSize:11,color:dark?'#d1d5db':'#9ca3af'}}>{label}</span>}
    <div style={{flex:1,height:1,background:dark?'#374151':'#e5e7eb'}}></div>
  </div>
}

// Empty state
function EmptyState({ icon, title, desc, action, actionLabel, onAction }) {
  return <div style={{textAlign:'center',padding:40}}>
    <span style={{fontSize:48,display:'block',marginBottom:12}}>{icon||'📭'}</span>
    <h3 style={{fontSize:16,fontWeight:600,color:'#374151',marginBottom:4}}>{title||'Nothing here yet'}</h3>
    <p style={{fontSize:12,color:'#9ca3af',marginBottom:16}}>{desc||''}</p>
    {action && <button onClick={onAction} style={{padding:'8px 20px',borderRadius:20,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontSize:13}}>{actionLabel||'Get Started'}</button>}
  </div>
}

// Confetti effect on achievement
function Confetti() {
  const [particles, setParticles] = useState([])
  useEffect(()=>{
    const p = Array.from({length:30},(_,i)=>({id:i,x:Math.random()*100,y:-20,color:['#4f46e5','#f59e0b','#16a34a','#ef4444','#8b5cf6'][i%5],size:4+Math.random()*8,speed:2+Math.random()*3}))
    setParticles(p)
    setTimeout(()=>setParticles([]),3000)
  },[])
  return <div style={{position:'fixed',inset:0,zIndex:300,pointerEvents:'none'}}>
    {particles.map(p=><div key={p.id} style={{position:'absolute',left:p.x+'%',top:p.y+'%',width:p.size,height:p.size*1.5,background:p.color,borderRadius:2,animation:'fall 3s linear forwards',animationDelay:p.speed*0.1+'s'}} />)}
  </div>
}

function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const o = ctx.createOscillator(); const g = ctx.createGain()
    o.connect(g); g.connect(ctx.destination); o.type = 'sine'; g.gain.value = 0.15
    if(type==='panic'){o.frequency.value=800;o.type='sawtooth';g.gain.value=0.3;o.start();setTimeout(()=>{o.frequency.value=400},200);setTimeout(()=>o.stop(),500)}
    else if(type==='success'){o.frequency.value=523;o.start();setTimeout(()=>{o.frequency.value=659},150);setTimeout(()=>{o.frequency.value=784},300);setTimeout(()=>o.stop(),450)}
    else if(type==='alert'){o.frequency.value=440;o.type='square';o.start();setTimeout(()=>{o.stop();const o2=ctx.createOscillator();o2.connect(g);o2.frequency.value=880;o2.start();setTimeout(()=>o2.stop(),200)},200)}
    else {o.frequency.value=800;o.start();setTimeout(()=>o.stop(),150)}
  } catch(e) {}
}

function ProtectionHub({ inventions, setInventions, lang, dark, setNotifications }) {
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'
  
  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:800,margin:'0 auto'}}>
    <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>🛡️ Protection Center</h1>
    <p style={{color:dark?'#9ca3af':'#6b7280',fontSize:13,marginBottom:16}}>Manage Dead Man Switch and Panic Button for all inventions</p>
    
    {inventions.map(inv => <div key={inv.id} style={{background:cb,borderRadius:12,padding:16,marginBottom:12,border:'1px solid '+(dark?'#374151':'#e5e7eb')}}>
      <h3 style={{fontSize:16,fontWeight:600,color:txt,marginBottom:8}}>{inv.title}</h3>
      
      <div style={{background:'#fef2f2',borderRadius:10,padding:12,marginBottom:8}}>
        <p style={{fontSize:12,fontWeight:600,color:'#dc2626',marginBottom:6}}>Dead Man Switch</p>
        <p style={{fontSize:10,color:'#6b7280',marginBottom:8}}>If not checked in for 30 days, vault auto-publishes</p>
        <button onClick={()=>{
          setInventions(prev=>prev.map(i=>i.id===inv.id?{...i,deadManSwitch:{active:!i.deadManSwitch?.active,lastCheckIn:new Date().toISOString()}}:i))
          setNotifications(prev=>[inv.deadManSwitch?.active?'Dead Man Switch OFF':'Dead Man Switch ON - auto-publish enabled',...prev].slice(0,20))
          playSound(inv.deadManSwitch?.active?'alert':'success')
        }} style={{padding:'8px 16px',borderRadius:8,background:inv.deadManSwitch?.active?'#16a34a':'#dc2626',color:'white',border:'none',cursor:'pointer',fontWeight:600,fontSize:12,width:'100%'}}>
          {inv.deadManSwitch?.active ? '🟢 Active - Click to Check In' : '🔴 Activate Dead Man Switch'}
        </button>
        {inv.deadManSwitch?.active && <p style={{fontSize:9,color:'#6b7280',marginTop:4}}>Last checked in: {inv.deadManSwitch.lastCheckIn?new Date(inv.deadManSwitch.lastCheckIn).toLocaleString():'Never'}</p>}
      </div>
      
      <div style={{background:'#fef2f2',borderRadius:10,padding:12}}>
        <p style={{fontSize:12,fontWeight:600,color:'#dc2626',marginBottom:6}}>Panic Button</p>
        {inv.panicLocked ? <p style={{color:'#dc2626',fontWeight:'bold',fontSize:14}}>🔒 PANIC ACTIVATED - VAULT LOCKED</p> :
        <button onClick={()=>{
          if(confirm('ACTIVATE PANIC PROTOCOL? This will lock the vault and alert all contacts. This cannot be undone.')){
            setInventions(prev=>prev.map(i=>i.id===inv.id?{...i,panicLocked:true}:i))
            setNotifications(prev=>['🚨 PANIC PROTOCOL ACTIVATED! Vault locked. Contacts notified.',...prev].slice(0,20))
            playSound('panic')
          }
        }} style={{padding:'10px',borderRadius:8,background:'#dc2626',color:'white',border:'none',cursor:'pointer',fontWeight:'bold',fontSize:13,width:'100%'}}>🚨 ACTIVATE PANIC BUTTON</button>}
      </div>
    </div>)}
  </div></div>
}
