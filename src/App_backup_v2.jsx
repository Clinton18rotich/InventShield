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
  return (<nav style={{background:bg,boxShadow:'0 1px 3px rgba(0,0,0,0.1)',position:'sticky',top:0,zIndex:50,padding:'10px 16px'}}><div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between'}}><Link to="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}><img src="/logo.svg" alt="Logo" style={{width:32,height:32}} /></Link><div style={{display:'flex',alignItems:'center',gap:8}}><button onClick={()=>nav('/help')} style={{background:'none',border:'none',fontSize:16,cursor:'pointer'}}>📚</button><NotificationBell notifications={notifications} dark={dark} lang={lang} /><LanguageSelector lang={lang} setLang={setLang} dark={dark} /><button onClick={()=>setDark(!dark)} style={{background:'none',border:'none',fontSize:18,cursor:'pointer'}}>{dark?'☀️':'🌙'}</button>{auth.isLoggedIn?<><button onClick={()=>nav('/profile')} style={{background:'#eef2ff',border:'none',width:32,height:32,borderRadius:'50%',fontSize:14,fontWeight:'bold',color:'#4f46e5',cursor:'pointer'}}>{auth.user.avatar}</button><button onClick={()=>auth.logout()} style={{fontSize:11,background:'none',border:'none',color:'#ef4444',cursor:'pointer'}}>{T(lang,'logout')}</button></>:<Link to="/login" style={{padding:'6px 14px',borderRadius:8,background:'#4f46e5',color:'white',textDecoration:'none',fontSize:12}}>{T(lang,'login')}</Link>}<button onClick={()=>setOpen(!open)} style={{fontSize:22,background:'none',border:'none',color:txt,cursor:'pointer'}} className="mb">{open?'✕':'☰'}</button></div></div>{open&&<div style={{background:bg,padding:'4px 0',marginTop:8}}>{[{l:T(lang,'dashboard'),p:'/'},{l:T(lang,'discover'),p:'/discover'},{l:T(lang,'addInvention'),p:'/add'},{l:T(lang,'records'),p:'/records'},{l:T(lang,'revenue'),p:'/revenue'},{l:T(lang,'funding'),p:'/funding'},{l:T(lang,'mentors'),p:'/mentors'},{l:T(lang,'legal'),p:'/legal'},{l:T(lang,'certify'),p:'/certify'},{l:'Investors',p:'/invest'},{l:T(lang,'global'),p:'/global'}].map(i=><Link key={i.p} to={i.p} onClick={()=>setOpen(false)} style={{display:'block',padding:'14px 16px',color:txt,textDecoration:'none',fontSize:14}}>{i.l}</Link>)}</div>}<style>{`@media(min-width:1024px){.mb{display:none!important}}`}</style></nav>)
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
  return (<div style={{background:dark?'#1f2937':'#fef2f2',border:'1px solid #fecaca',borderRadius:10,padding:12,marginBottom:12}}><p style={{fontSize:12,fontWeight:600,color:'#dc2626',marginBottom:6}}>{T(lang,'protection')}</p><div style={{display:'flex',flexWrap:'wrap',gap:4}}><button onClick={()=>setInventions(prev=>prev.map(i=>i.id===invention.id?{...i,deadManSwitch:{active:!i.deadManSwitch?.active,lastCheckIn:new Date().toISOString()}}:i))} style={{padding:'5px 10px',borderRadius:6,background:invention.deadManSwitch?.active?'#16a34a':'#f3f4f6',color:invention.deadManSwitch?.active?'white':txt,border:'none',fontSize:10,cursor:'pointer',flex:1}}>{invention.deadManSwitch?.active?'DS ON':T(lang,'deadManSwitch')}</button>{!showPanic?<button onClick={()=>setShowPanic(true)} style={{padding:'5px 10px',borderRadius:6,background:'#dc2626',color:'white',border:'none',fontWeight:'bold',cursor:'pointer',fontSize:10,flex:1}}>{T(lang,'panicButton')}</button>:<div style={{display:'flex',gap:4,flex:1}}><button onClick={()=>{setInventions(prev=>prev.map(i=>i.id===invention.id?{...i,panicLocked:true}:i));setShowPanic(false)}} style={{flex:1,padding:5,borderRadius:6,background:'#dc2626',color:'white',border:'none',fontSize:9,cursor:'pointer'}}>YES</button><button onClick={()=>setShowPanic(false)} style={{flex:1,padding:5,borderRadius:6,background:'#f3f4f6',color:txt,border:'none',fontSize:9,cursor:'pointer'}}>No</button></div>}</div></div>)
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
    {showTour && <OnboardingTour lang={lang} dark={dark} onClose={()=>{setShowTour(false);localStorage.setItem('inventshield_onboarded','1')}} />}
    {showChecklist && <SetupChecklist lang={lang} dark={dark} auth={auth} inventions={inventions} onClose={()=>setShowChecklist(false)} />}
    <div style={{maxWidth:1200,margin:'0 auto'}}>
      {auth.isLoggedIn&&<p style={{color:sub,fontSize:14,marginBottom:4}}>{T(lang,'welcomeBack')} <b style={{color:txt}}>{auth.user.name}</b></p>}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
        <h1 style={{fontSize:26,fontWeight:'bold',color:txt}}>{T(lang,'myVault')}</h1>
        <div style={{display:'flex',gap:6}}>
          <button onClick={()=>setShowTour(true)} style={{padding:'6px 12px',borderRadius:20,background:'#eef2ff',border:'none',color:'#4f46e5',fontSize:11,cursor:'pointer'}}>{T(lang,'onboarding')}</button>
          <button onClick={()=>setShowChecklist(true)} style={{padding:'6px 12px',borderRadius:20,background:'#dcfce7',border:'none',color:'#15803d',fontSize:11,cursor:'pointer'}}>{T(lang,'checklist')}</button>
          <Link to="/add" style={{padding:'6px 16px',borderRadius:20,background:'#4f46e5',color:'white',textDecoration:'none',fontSize:11}}>{T(lang,'addInvention')}</Link>
        </div>
      </div>
      <div style={{margin:'12px 0'}}><input value={q} onChange={e=>setQ(e.target.value)} placeholder={T(lang,'search')} style={{width:'100%',padding:'10px 16px',borderRadius:12,border:dark?'1px solid #374151':'1px solid #d1d5db',background:cb,color:txt,fontSize:14,boxSizing:'border-box'}} /></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))',gap:8,marginBottom:16}}>{[{v:'$'+tf.toLocaleString(),l:T(lang,'totalFunding'),c:'#4f46e5'},{v:inventions.length,l:T(lang,'totalInventions'),c:'#4f46e5'},{v:tc,l:T(lang,'totalContributors'),c:'#4f46e5'},{v:'$'+tr,l:T(lang,'platformRevenue'),c:'#4338ca'}].map((x,i)=><div key={i} style={{background:cb,borderRadius:10,padding:12,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:x.c}}>{x.v}</p><p style={{fontSize:9,color:sub}}>{x.l}</p></div>)}</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:16}}>{flt.map(inv=><div key={inv.id} onClick={()=>nav(inv.status==='protected'?`/vault/${inv.id}`:`/draft/${inv.id}`)} style={{background:cb,borderRadius:12,padding:18,cursor:'pointer',border:`2px ${inv.status==='protected'?'solid #4ade80':'dashed #facc15'}`}}><h2 style={{fontSize:16,fontWeight:600,color:txt}}>{inv.title}</h2><span style={{display:'inline-block',padding:'2px 8px',borderRadius:9999,fontSize:10,fontWeight:'bold',background:inv.status==='protected'?'#dcfce7':'#fef9c3',color:inv.status==='protected'?'#15803d':'#a16207',marginBottom:6}}>{inv.status==='protected'?T(lang,'protected'):T(lang,'draft')}</span><p style={{color:sub,fontSize:11}}>{inv.tag} | {inv.inventorName}</p><p style={{fontSize:20,fontWeight:'bold',color:'#4f46e5',margin:'6px 0'}}>{inv.funding}</p></div>)}</div>
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
  return (<Router><Navbar lang={lang} setLang={setLang} dark={dark} setDark={setDark} notifications={notif} auth={auth} /><Routes><Route path="/login" element={<LoginPage users={users} setUsers={setUsers} lang={lang} dark={dark} auth={auth} />} /><Route path="/profile" element={<ProfilePage lang={lang} dark={dark} auth={auth} inventions={inv} users={users} setUsers={setUsers} />} /><Route path="/help" element={<HelpPage lang={lang} dark={dark} />} /><Route path="/" element={<Dashboard inventions={inv} setInventions={setInv} lang={lang} dark={dark} auth={auth} />} /><Route path="/discover" element={<DiscoverPage inventions={inv} setInventions={setInv} lang={lang} dark={dark} auth={auth} />} /><Route path="/add" element={<AddInventionPage inventions={inv} setInventions={setInv} lang={lang} dark={dark} auth={auth} />} /><Route path="/records" element={<RecordsPage inventions={inv} lang={lang} dark={dark} />} /><Route path="/revenue" element={<RevenueDashboard inventions={inv} lang={lang} dark={dark} />} /><Route path="/vault/:id" element={<VaultPage inventions={inv} setInventions={setInv} lang={lang} dark={dark} auth={auth} />} /><Route path="/draft/:id" element={<DraftPage inventions={inv} setInventions={setInv} lang={lang} dark={dark} auth={auth} />} /><Route path="/funding" element={<FundingPage lang={lang} dark={dark} />} /><Route path="/mentors" element={<MentorsPage lang={lang} dark={dark} />} /><Route path="/legal" element={<LegalPage lang={lang} dark={dark} />} /><Route path="/certify" element={<CertifyPage lang={lang} dark={dark} />} /><Route path="/invest" element={<InvestorPage inventions={inv} setInventions={setInv} lang={lang} dark={dark} auth={auth} />} /><Route path="/global" element={<GlobalPage lang={lang} dark={dark} />} /></Routes><MobileBottomNav lang={lang} dark={dark} /><AIChatbot lang={lang} dark={dark} /></Router>)
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
