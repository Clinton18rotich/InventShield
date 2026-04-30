import React, { useState } from 'react'

function ROICalculator({ dark }) {
  const [amount, setAmount] = useState(10000)
  const [equity, setEquity] = useState(10)
  const [growth, setGrowth] = useState(25)
  const [years, setYears] = useState(3)
  const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#9ca3af':'#6b7280'
  
  const projectedValue = amount * Math.pow(1 + growth/100, years)
  const investorReturn = projectedValue * (equity/100)
  const roi = Math.round(((investorReturn - amount) / amount) * 100)
  
  return <div style={{background:cb,borderRadius:14,padding:20,marginBottom:16}}>
    <h3 style={{fontSize:16,fontWeight:'bold',color:txt,marginBottom:12}}>📊 ROI Calculator</h3>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
      <div><label style={{fontSize:10,color:sub}}>Investment (KES)</label><input type="range" min="1000" max="100000" step="1000" value={amount} onChange={e=>setAmount(parseInt(e.target.value))} style={{width:'100%'}} /><span style={{fontSize:12,color:txt}}>KES {amount.toLocaleString()}</span></div>
      <div><label style={{fontSize:10,color:sub}}>Equity (%)</label><input type="range" min="1" max="49" value={equity} onChange={e=>setEquity(parseInt(e.target.value))} style={{width:'100%'}} /><span style={{fontSize:12,color:txt}}>{equity}%</span></div>
      <div><label style={{fontSize:10,color:sub}}>Annual Growth (%)</label><input type="range" min="5" max="100" step="5" value={growth} onChange={e=>setGrowth(parseInt(e.target.value))} style={{width:'100%'}} /><span style={{fontSize:12,color:txt}}>{growth}%</span></div>
      <div><label style={{fontSize:10,color:sub}}>Years</label><input type="range" min="1" max="10" value={years} onChange={e=>setYears(parseInt(e.target.value))} style={{width:'100%'}} /><span style={{fontSize:12,color:txt}}>{years} years</span></div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,textAlign:'center'}}>
      <div style={{background:dark?'#111827':'#f0fdf4',borderRadius:8,padding:12}}><p style={{fontSize:18,fontWeight:'bold',color:'#16a34a'}}>KES {Math.round(projectedValue).toLocaleString()}</p><p style={{fontSize:9,color:sub}}>Projected Value</p></div>
      <div style={{background:dark?'#111827':'#eef2ff',borderRadius:8,padding:12}}><p style={{fontSize:18,fontWeight:'bold',color:'#4f46e5'}}>KES {Math.round(investorReturn).toLocaleString()}</p><p style={{fontSize:9,color:sub}}>Your Return</p></div>
      <div style={{background:dark?'#111827':'#fef3c7',borderRadius:8,padding:12}}><p style={{fontSize:18,fontWeight:'bold',color:'#92400e'}}>{roi}%</p><p style={{fontSize:9,color:sub}}>ROI</p></div>
    </div>
    <div style={{marginTop:10,background:roi>0?'#dcfce7':'#fee2e2',borderRadius:8,padding:10,textAlign:'center'}}>
      <p style={{fontSize:13,fontWeight:'bold',color:roi>0?'#15803d':'#dc2626'}}>{roi>0?'✅ Profitable investment!':'⚠️ May not be profitable'}</p>
    </div>
  </div>
}

function InvestorSignup({ dark }) {
  const [form, setForm] = useState({name:'',email:'',interests:'',budget:''})
  const [done, setDone] = useState(false)
  const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'
  const s = {width:'100%',padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),marginBottom:8,background:cb,color:txt,fontSize:13,boxSizing:'border-box'}
  return <div style={{background:cb,borderRadius:14,padding:20,marginBottom:16}}>
    <h3 style={{fontSize:16,fontWeight:'bold',color:txt,marginBottom:12}}>💼 Investor Profile</h3>
    {!done ? <>
      <input placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={s} />
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={s} />
      <input placeholder="Investment Interests (e.g., CleanTech, AI)" value={form.interests} onChange={e=>setForm({...form,interests:e.target.value})} style={s} />
      <input placeholder="Budget Range (e.g., KES 50K-500K)" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})} style={s} />
      <button onClick={()=>setDone(true)} disabled={!form.name||!form.email} style={{width:'100%',padding:12,borderRadius:8,background:(!form.name||!form.email)?'#d1d5db':'#4f46e5',color:'white',border:'none',cursor:(!form.name||!form.email)?'default':'pointer',fontWeight:600}}>Create Investor Profile</button>
    </> : <div style={{textAlign:'center'}}>
      <span style={{fontSize:40}}>✅</span>
      <p style={{fontWeight:'bold',color:'#15803d'}}>Profile Created!</p>
      <p style={{fontSize:12,color:'#6b7280'}}>We will match you with relevant inventions.</p>
      <button onClick={()=>setDone(false)} style={{marginTop:8,padding:'8px 16px',borderRadius:8,background:'#e5e7eb',border:'none',cursor:'pointer',fontSize:12}}>Edit Profile</button>
    </div>}
  </div>
}

function InvestmentTracker({ dark }) {
  const [investments] = useState(()=>{try{return JSON.parse(localStorage.getItem('inv_investments')||'[]')}catch{return[]}})
  const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'
  return <div style={{background:cb,borderRadius:14,padding:20,marginBottom:16}}>
    <h3 style={{fontSize:16,fontWeight:'bold',color:txt,marginBottom:12}}>📈 Investment Tracker</h3>
    {investments.length===0 ? <p style={{textAlign:'center',color:'#6b7280',padding:20}}>No investments yet. Express interest in inventions to start tracking!</p> :
    investments.map((inv,i)=><div key={i} style={{background:dark?'#111827':'#f9fafb',borderRadius:10,padding:12,marginBottom:6}}>
      <div style={{display:'flex',justifyContent:'space-between'}}><span style={{fontWeight:600,fontSize:13,color:txt}}>{inv.title}</span><span style={{color:'#16a34a',fontWeight:'bold'}}>KES {inv.amount?.toLocaleString()}</span></div>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'#6b7280',marginTop:4}}><span>{inv.date}</span><span style={{padding:'2px 6px',borderRadius:9999,background:'#dcfce7',color:'#15803d'}}>{inv.status||'Active'}</span></div>
    </div>)}
  </div>
}

function EmailAlerts({ dark }) {
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState([])
  const [done, setDone] = useState(false)
  const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'
  const categories = ['Eco-friendly','AI-powered','CleanTech','AgriTech','HealthTech','FinTech']
  const toggle = (cat) => setInterests(interests.includes(cat)?interests.filter(c=>c!==cat):[...interests,cat])
  return <div style={{background:cb,borderRadius:14,padding:20,marginBottom:16}}>
    <h3 style={{fontSize:16,fontWeight:'bold',color:txt,marginBottom:12}}>🔔 Email Alerts</h3>
    {!done ? <>
      <input placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),marginBottom:8,background:cb,color:txt,fontSize:13,boxSizing:'border-box'}} />
      <p style={{fontSize:11,color:dark?'#9ca3af':'#6b7280',marginBottom:6}}>Select interests:</p>
      <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:12}}>
        {categories.map(c=><button key={c} onClick={()=>toggle(c)} style={{padding:'6px 12px',borderRadius:16,border:'1px solid '+(interests.includes(c)?'#4f46e5':'#d1d5db'),background:interests.includes(c)?'#eef2ff':'transparent',color:interests.includes(c)?'#4f46e5':txt,fontSize:10,cursor:'pointer'}}>{c}</button>)}
      </div>
      <button onClick={()=>setDone(true)} disabled={!email||interests.length===0} style={{width:'100%',padding:10,borderRadius:8,background:(!email||interests.length===0)?'#d1d5db':'#4f46e5',color:'white',border:'none',cursor:(!email||interests.length===0)?'default':'pointer',fontWeight:600}}>Subscribe to Alerts</button>
    </> : <div style={{textAlign:'center'}}>
      <span style={{fontSize:40}}>✅</span>
      <p style={{fontWeight:'bold',color:'#15803d'}}>Subscribed!</p>
      <p style={{fontSize:12,color:'#6b7280'}}>You will receive alerts for {interests.join(', ')}.</p>
    </div>}
  </div>
}

export default function InvestorHub({ dark }) {
  const bg=dark?'#111827':'#f9fafb'; const txt=dark?'#f9fafb':'#111827'
  const [tab, setTab] = useState('roi')
  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}>
    <div style={{maxWidth:800,margin:'0 auto'}}>
      <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>💼 Investor Portal</h1>
      <p style={{color:dark?'#9ca3af':'#6b7280',fontSize:13,marginBottom:16}}>ROI Calculator | Investor Profile | Portfolio Tracker | Alerts</p>
      <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:16}}>
        {[{id:'roi',label:'📊 ROI Calc'},{id:'profile',label:'💼 Profile'},{id:'tracker',label:'📈 Tracker'},{id:'alerts',label:'🔔 Alerts'}].map(t=>
          <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:'8px 16px',borderRadius:20,border:'none',background:tab===t.id?'#4f46e5':dark?'#1f2937':'white',color:tab===t.id?'white':txt,cursor:'pointer',fontSize:12}}>{t.label}</button>
        )}
      </div>
      {tab==='roi' && <ROICalculator dark={dark} />}
      {tab==='profile' && <InvestorSignup dark={dark} />}
      {tab==='tracker' && <InvestmentTracker dark={dark} />}
      {tab==='alerts' && <EmailAlerts dark={dark} />}
    </div>
  </div>
}
