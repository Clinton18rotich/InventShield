import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BoostHub({ inventions, setInventions, lang, dark, setNotifications }) {
  const [tab, setTab] = useState('boost')
  const [selected, setSelected] = useState(null)
  const nav = useNavigate()
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#9ca3af':'#6b7280'
  
  const packages = [
    {id:'basic',name:'Basic Boost',price:25,color:'#4f46e5',features:['7 days on homepage','Basic analytics','Standard visibility'],icon:'⭐'},
    {id:'premium',name:'Premium Boost',price:49,color:'#7c3aed',features:['14 days featured','Priority listing','Detailed analytics','Investor notifications'],icon:'🌟'},
    {id:'ultimate',name:'Ultimate Boost',price:99,color:'#f59e0b',features:['30 days top placement','All homepage slots','Advanced analytics','Email blast to investors','Social media promotion'],icon:'💎'},
  ]
  
  const boostedInventions = inventions.filter(i=>i.featured)
  const totalBoostRevenue = boostedInventions.length * 25
  
  const applyBoost = (invId, pkg) => {
    if(!confirm(`Apply ${pkg.name} to this invention for $${pkg.price}?`)) return
    setInventions(prev=>prev.map(i=>i.id===invId?{...i,featured:true,featuredUntil:Date.now()+(pkg.id==='basic'?7:pkg.id==='premium'?14:30)*86400000,boostPackage:pkg.id}:i))
    setNotifications(prev=>[`${pkg.icon} Invention boosted with ${pkg.name}!`,...prev].slice(0,20))
    setSelected(null)
  }
  
  const boostStats = [
    {label:'Active Boosts',value:boostedInventions.length,color:'#4f46e5',icon:'⭐'},
    {label:'Boost Revenue',value:'$'+totalBoostRevenue,color:'#16a34a',icon:'💰'},
    {label:'Avg. Views Boost',value:'+340%',color:'#f59e0b',icon:'📈'},
    {label:'Conversion Rate',value:'12.5%',color:'#8b5cf6',icon:'🎯'},
  ]
  
  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:900,margin:'0 auto'}}>
    <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>⭐ Boost Center</h1>
    <p style={{color:sub,fontSize:13,marginBottom:16}}>Feature your invention and reach more investors</p>
    
    <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:16}}>
      {[{id:'boost',label:'🚀 Boost'},{id:'packages',label:'💎 Packages'},{id:'stats',label:'📊 Stats'},{id:'manage',label:'📋 Manage'}].map(t=>
        <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:'8px 16px',borderRadius:20,border:'none',background:tab===t.id?'#4f46e5':dark?'#1f2937':'white',color:tab===t.id?'white':txt,cursor:'pointer',fontSize:12}}>{t.label}</button>)}
    </div>
    
    {tab==='boost' && <div>
      <p style={{fontSize:12,color:sub,marginBottom:10}}>Select an invention to boost</p>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {inventions.map(inv=><div key={inv.id} style={{background:cb,borderRadius:12,padding:16,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8,border:'1px solid '+(dark?'#374151':'#e5e7eb')}}>
          <div>
            <h4 style={{fontSize:14,fontWeight:600,color:txt}}>{inv.title} {inv.featured?'⭐':''}</h4>
            <p style={{fontSize:10,color:sub}}>{inv.tag} | {inv.inventorName} | {inv.funding}</p>
            {inv.featured && <span style={{fontSize:9,color:'#92400e',background:'#fef3c7',padding:'2px 6px',borderRadius:9999}}>Featured until {new Date(inv.featuredUntil).toLocaleDateString()}</span>}
          </div>
          {!inv.featured ? (
            <button onClick={()=>setSelected(selected===inv.id?null:inv.id)} style={{padding:'6px 14px',borderRadius:8,background:'#fef3c7',color:'#92400e',border:'1px solid #fbbf24',cursor:'pointer',fontWeight:600,fontSize:11}}>{selected===inv.id?'Select Package →':'⭐ Boost'}</button>
          ) : <span style={{color:'#15803d',fontSize:11}}>✅ Active</span>}
          {selected===inv.id && <div style={{width:'100%',display:'flex',gap:6,flexWrap:'wrap',padding:8,background:dark?'#0f172a':'#fefce8',borderRadius:8}}>
            {packages.map(p=><button key={p.id} onClick={()=>applyBoost(inv.id,p)} style={{flex:1,minWidth:100,padding:8,borderRadius:8,background:p.color,color:'white',border:'none',cursor:'pointer',fontSize:10,fontWeight:600}}>{p.icon} {p.name}<br/>${p.price}</button>)}
          </div>}
        </div>)}
      </div>
    </div>}
    
    {tab==='packages' && <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))',gap:12}}>
      {packages.map(p=><div key={p.id} style={{background:cb,borderRadius:14,padding:20,textAlign:'center',border:'2px solid '+p.color,borderTop:'4px solid '+p.color}}>
        <span style={{fontSize:40,display:'block',marginBottom:8}}>{p.icon}</span>
        <h3 style={{fontSize:18,fontWeight:'bold',color:txt,marginBottom:4}}>{p.name}</h3>
        <p style={{fontSize:28,fontWeight:'bold',color:p.color,marginBottom:12}}>${p.price}<span style={{fontSize:12,color:sub}}>/period</span></p>
        <div style={{textAlign:'left',marginBottom:16}}>
          {p.features.map((f,i)=><div key={i} style={{padding:'4px 0',fontSize:11,color:sub}}>✅ {f}</div>)}
        </div>
        <button onClick={()=>setTab('boost')} style={{width:'100%',padding:10,borderRadius:8,background:p.color,color:'white',border:'none',cursor:'pointer',fontWeight:600,fontSize:12}}>Get Started</button>
      </div>)}
    </div>}
    
    {tab==='stats' && <div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(150px, 1fr))',gap:8,marginBottom:16}}>
        {boostStats.map((s,i)=><div key={i} style={{background:cb,borderRadius:12,padding:14,textAlign:'center'}}><span style={{fontSize:24}}>{s.icon}</span><p style={{fontSize:18,fontWeight:'bold',color:s.color}}>{s.value}</p><p style={{fontSize:9,color:sub}}>{s.label}</p></div>)}
      </div>
      <div style={{background:cb,borderRadius:12,padding:16}}>
        <h3 style={{fontSize:14,fontWeight:'600',color:txt,marginBottom:12}}>📈 Boost Performance</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:8}}>
          {boostedInventions.map(inv=><div key={inv.id} style={{background:dark?'#111827':'#f9fafb',borderRadius:10,padding:14}}>
            <h4 style={{fontSize:12,fontWeight:600,color:txt}}>{inv.title}</h4>
            <p style={{fontSize:10,color:sub,marginBottom:6}}>{inv.boostPackage||'basic'} plan</p>
            <div style={{width:'100%',background:dark?'#374151':'#e5e7eb',borderRadius:9999,height:4,marginBottom:4}}>
              <div style={{background:'#4f46e5',height:4,borderRadius:9999,width:'85%'}}></div></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:sub}}><span>+340% views</span><span>{Math.ceil((new Date(inv.featuredUntil)-Date.now())/(86400000))} days left</span></div>
          </div>)}
          {boostedInventions.length===0 && <p style={{color:sub,fontSize:12,textAlign:'center',padding:20}}>No active boosts. Boost an invention to see stats!</p>}
        </div>
      </div>
    </div>}
    
    {tab==='manage' && <div style={{background:cb,borderRadius:12,padding:16}}>
      <h3 style={{fontSize:14,fontWeight:'600',color:txt,marginBottom:12}}>📋 Manage Active Boosts</h3>
      {boostedInventions.length===0 ? <p style={{color:sub,fontSize:12,textAlign:'center',padding:20}}>No active boosts</p> :
      boostedInventions.map(inv=><div key={inv.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid '+(dark?'#374151':'#e5e7eb')}}>
        <div><span style={{fontWeight:600,fontSize:12,color:txt}}>{inv.title}</span><span style={{fontSize:10,color:sub,marginLeft:8}}>Expires: {new Date(inv.featuredUntil).toLocaleDateString()}</span></div>
        <button onClick={()=>{if(confirm('Cancel this boost?')){setInventions(prev=>prev.map(i=>i.id===inv.id?{...i,featured:false,featuredUntil:null,boostPackage:null}:i));setNotifications(prev=>['Boost cancelled for '+inv.title,...prev].slice(0,20))}}} style={{padding:'5px 12px',borderRadius:6,background:'#fee2e2',color:'#dc2626',border:'none',cursor:'pointer',fontSize:10}}>Cancel Boost</button>
      </div>)}
    </div>}
  </div></div>
}
