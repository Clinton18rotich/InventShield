import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AnimatedCounter({ value, duration }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = Math.ceil(value / (duration / 30))
    const timer = setInterval(() => { start += step; if (start >= value) { setCount(value); clearInterval(timer) } else { setCount(start) } }, 30)
    return () => clearInterval(timer)
  }, [value])
  return <span>{count.toLocaleString()}</span>
}

export default function DashboardHub({ inventions, setInventions, lang, dark, auth }) {
  const nav = useNavigate()
  const [search, setSearch] = useState('')
  const [greeting, setGreeting] = useState('')
  const bg=dark?'#0f172a':'#f0fdf4'; const cb=dark?'#1e293b':'white'; const txt=dark?'#f1f5f9':'#111827'; const sub=dark?'#94a3b8':'#6b7280'
  
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 17) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])
  
  const flt = inventions.filter(i=>i.title?.toLowerCase().includes(search.toLowerCase())||i.tag?.toLowerCase().includes(search.toLowerCase()))
  const tf = inventions.reduce((s,i)=>s+parseInt(i.funding?.replace(/\D/g,'')||0),0)
  const tc = inventions.reduce((s,i)=>s+(i.contributors?.length||0),0)
  const tr = inventions.filter(i=>i.crowdfunding?.active).reduce((s,i)=>s+Math.floor((i.crowdfunding?.raised||0)*0.05),0)
  const recentActs = inventions.flatMap(i=>(i.activities||[]).map(a=>({...a,invention:i.title}))).sort((a,b)=>b.time?.localeCompare(a.time||'')).slice(0,5)
  const tips = ['Activate your Dead Man Switch for protection','Share your invention link to get contributors','Start a crowdfunding campaign to raise funds','Add documents to strengthen your vault','Apply for a fee waiver if needed']
  const randomTip = tips[Math.floor(Math.random()*tips.length)]
  
  const stats = [
    {icon:'💰',label:'Total Funding',value:tf,color:'#16a34a',gradient:'from-green-500 to-emerald-500'},
    {icon:'🔬',label:'Inventions',value:inventions.length,color:'#4f46e5',gradient:'from-indigo-500 to-purple-500'},
    {icon:'👥',label:'Contributors',value:tc,color:'#f59e0b',gradient:'from-amber-500 to-orange-500'},
    {icon:'💵',label:'Platform Revenue',value:tr,color:'#8b5cf6',gradient:'from-violet-500 to-purple-500'},
  ]
  
  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}>
    <div style={{maxWidth:1200,margin:'0 auto'}}>
      {auth.isLoggedIn && <div style={{background:'linear-gradient(135deg, #4f46e5, #7c3aed)',borderRadius:16,padding:24,marginBottom:20,color:'white',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:'bold',marginBottom:4}}>👋 {greeting}, {auth.user.name}!</h1>
          <p style={{opacity:0.9,fontSize:13}}>💡 {randomTip}</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <Link to="/add" style={{padding:'10px 20px',borderRadius:10,background:'white',color:'#4f46e5',textDecoration:'none',fontWeight:600,fontSize:13}}>+ New Invention</Link>
          <Link to="/protection" style={{padding:'10px 20px',borderRadius:10,background:'rgba(255,255,255,0.2)',color:'white',textDecoration:'none',fontWeight:600,fontSize:13}}>🛡️ Protect</Link>
        </div>
      </div>}
      
      {!auth.isLoggedIn && <div style={{background:'linear-gradient(135deg, #4f46e5, #7c3aed)',borderRadius:16,padding:24,marginBottom:20,color:'white',textAlign:'center'}}>
        <h1 style={{fontSize:22,fontWeight:'bold',marginBottom:4}}>🛡️ Welcome to InventShield</h1>
        <p style={{opacity:0.9,fontSize:13,marginBottom:12}}>Protect your ideas. Fund your inventions. Change the world.</p>
        <Link to="/login" style={{padding:'10px 30px',borderRadius:10,background:'white',color:'#4f46e5',textDecoration:'none',fontWeight:600,fontSize:14}}>Get Started</Link>
      </div>}
      
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))',gap:12,marginBottom:20}}>
        {stats.map((s,i) => <div key={i} style={{background:cb,borderRadius:16,padding:20,boxShadow:'0 4px 6px rgba(0,0,0,0.05)',cursor:'pointer',transition:'all 0.2s',border:'1px solid '+(dark?'#334155':'#e5e7eb')}}
          onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
            <span style={{fontSize:28,background:s.color+'20',padding:'8px 12px',borderRadius:12}}>{s.icon}</span>
          </div>
          <p style={{fontSize:26,fontWeight:'bold',color:txt,fontFamily:'monospace'}}>$<AnimatedCounter value={s.value} duration={1000} /></p>
          <p style={{fontSize:11,color:sub,marginTop:2}}>{s.label}</p>
        </div>)}
      </div>
      
      <div style={{display:'flex',gap:8,marginBottom:20}}>
        <input placeholder="Search your inventions..." value={search} onChange={e=>setSearch(e.target.value)} style={{flex:1,padding:12,borderRadius:12,border:'1px solid '+(dark?'#334155':'#d1d5db'),background:cb,color:txt,fontSize:13}} />
      </div>
      
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16}}>
        <div>
          <h3 style={{fontSize:15,fontWeight:'600',color:txt,marginBottom:10}}>🔬 Your Inventions</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:10}}>
            {flt.map(inv => <div key={inv.id} onClick={()=>nav(inv.status==='protected'?`/vault/${inv.id}`:`/draft/${inv.id}`)} style={{background:cb,borderRadius:14,padding:18,cursor:'pointer',border:'1px solid '+(dark?'#334155':'#e5e7eb'),transition:'all 0.2s',borderLeft:'3px solid '+(inv.status==='protected'?'#16a34a':'#f59e0b')}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 25px rgba(0,0,0,0.1)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <h4 style={{fontSize:15,fontWeight:600,color:txt}}>{inv.title}</h4>
                <span style={{padding:'3px 8px',borderRadius:9999,fontSize:9,fontWeight:'bold',background:inv.status==='protected'?'#dcfce7':'#fef9c3',color:inv.status==='protected'?'#15803d':'#a16207'}}>{inv.status}</span>
              </div>
              <p style={{fontSize:11,color:sub,marginBottom:6}}>{inv.tag} | {inv.inventorName}</p>
              <div style={{width:'100%',background:dark?'#334155':'#e5e7eb',borderRadius:9999,height:5,marginBottom:6}}>
                <div style={{background:inv.progress===100?'#16a34a':'#4f46e5',height:5,borderRadius:9999,width:inv.progress+'%',transition:'width 0.5s'}}></div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontSize:18,fontWeight:'bold',color:'#4f46e5'}}>{inv.funding}</span>
                <span style={{fontSize:10,color:sub}}>{inv.progress}% complete</span>
              </div>
              {inv.deadManSwitch?.active && <span style={{fontSize:9,color:'#16a34a',marginTop:4,display:'inline-block'}}>🛡️ DS Active</span>}
            </div>)}
          </div>
        </div>
        
        <div>
          <h3 style={{fontSize:15,fontWeight:'600',color:txt,marginBottom:10}}>📡 Recent Activity</h3>
          <div style={{background:cb,borderRadius:14,padding:16,border:'1px solid '+(dark?'#334155':'#e5e7eb')}}>
            {recentActs.length===0 ? <p style={{color:sub,fontSize:12,textAlign:'center',padding:20}}>No recent activity</p> :
            recentActs.map((a,i) => <div key={i} style={{padding:'8px 0',borderBottom:i<recentActs.length-1?'1px solid '+(dark?'#334155':'#e5e7eb'):'none',fontSize:11}}>
              <p style={{color:'#4f46e5',fontWeight:500,fontSize:10}}>{a.invention}</p>
              <p style={{color:sub}}>{a.text}</p>
              <span style={{fontSize:9,color:'#6b7280'}}>{a.time}</span>
            </div>)}
          </div>
          
          <h3 style={{fontSize:15,fontWeight:'600',color:txt,margin:'16px 0 10px'}}>⚡ Quick Actions</h3>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {[{icon:'➕',label:'New Invention',path:'/add',color:'#16a34a'},{icon:'🛡️',label:'Protection',path:'/protection',color:'#dc2626'},{icon:'💰',label:'Revenue',path:'/revenue',color:'#4f46e5'},{icon:'🤖',label:'AI Assistant',path:'/smartai',color:'#8b5cf6'}].map(q=>
              <Link key={q.path} to={q.path} style={{padding:12,borderRadius:10,background:q.color+'15',border:'1px solid '+q.color+'30',color:q.color,textDecoration:'none',fontSize:11,fontWeight:500,textAlign:'center',transition:'all 0.2s'}}>{q.icon} {q.label}</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
}
