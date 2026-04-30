import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function PublicProfile({ inventions, users, dark }) {
  const { id } = useParams()
  const user = users.find(u => u.id === id)
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#9ca3af':'#6b7280'
  
  if (!user) return <div style={{minHeight:'100vh',background:bg,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{textAlign:'center'}}><h1 style={{color:txt}}>Inventor not found</h1><Link to="/" style={{color:'#4f46e5'}}>Back to home</Link></div></div>
  
  const userInventions = inventions.filter(i => i.inventorId === user.id)
  const totalRaised = userInventions.reduce((s,i) => s + (i.crowdfunding?.raised || 0), 0)
  const totalContributors = userInventions.reduce((s,i) => s + (i.contributors?.length || 0), 0)
  const profileUrl = window.location.origin + '/profile/' + user.id
  
  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl)
    alert('Profile link copied! Share it anywhere.')
  }
  
  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=Check out ${user.name} on InventShield! ${profileUrl}`,'_blank')
  }
  
  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=Check out ${encodeURIComponent(user.name)}'s inventions on InventShield!&url=${encodeURIComponent(profileUrl)}`,'_blank')
  }
  
  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:800,margin:'0 auto'}}>
    <div style={{background:cb,borderRadius:20,padding:32,textAlign:'center',marginBottom:20,boxShadow:'0 4px 20px rgba(0,0,0,0.08)'}}>
      <div style={{width:100,height:100,borderRadius:'50%',background:'linear-gradient(135deg, #4f46e5, #7c3aed)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:40,fontWeight:'bold',color:'white',margin:'0 auto 16px'}}>{user.avatar || user.name?.[0]}</div>
      <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>{user.name}</h1>
      <span style={{display:'inline-block',padding:'4px 14px',borderRadius:9999,fontSize:11,fontWeight:'bold',background:'#eef2ff',color:'#4f46e5',marginBottom:8}}>{user.role || 'Inventor'}</span>
      {user.bio && <p style={{color:sub,fontSize:13,marginBottom:8,fontStyle:'italic'}}>"{user.bio}"</p>}
      <p style={{color:sub,fontSize:12}}>📍 {user.expertise || 'Inventor'} | 🗓 Joined {new Date(user.joinedAt).toLocaleDateString()}</p>
      
      <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:16,flexWrap:'wrap'}}>
        <button onClick={copyLink} style={{padding:'8px 18px',borderRadius:20,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontSize:11,fontWeight:600}}>📋 Copy Profile Link</button>
        <button onClick={shareWhatsApp} style={{padding:'8px 18px',borderRadius:20,background:'#25D366',color:'white',border:'none',cursor:'pointer',fontSize:11,fontWeight:600}}>💬 WhatsApp</button>
        <button onClick={shareTwitter} style={{padding:'8px 18px',borderRadius:20,background:'#1d9bf0',color:'white',border:'none',cursor:'pointer',fontSize:11,fontWeight:600}}>𝕏 Twitter</button>
      </div>
    </div>
    
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))',gap:8,marginBottom:20}}>
      <div style={{background:cb,borderRadius:12,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#4f46e5'}}>{userInventions.length}</p><p style={{fontSize:9,color:sub}}>Inventions</p></div>
      <div style={{background:cb,borderRadius:12,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#16a34a'}}>${totalRaised.toLocaleString()}</p><p style={{fontSize:9,color:sub}}>Total Raised</p></div>
      <div style={{background:cb,borderRadius:12,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#4f46e5'}}>{totalContributors}</p><p style={{fontSize:9,color:sub}}>Contributors</p></div>
      <div style={{background:cb,borderRadius:12,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#f59e0b'}}>{userInventions.filter(i=>i.blockchainAnchored).length}</p><p style={{fontSize:9,color:sub}}>Anchored</p></div>
    </div>
    
    <h3 style={{fontSize:16,fontWeight:'600',color:txt,marginBottom:12}}>🔬 Inventions ({userInventions.length})</h3>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))',gap:10}}>
      {userInventions.map(i=><div key={i.id} style={{background:cb,borderRadius:12,padding:16,border:'1px solid '+(dark?'#374151':'#e5e7eb'),cursor:'pointer'}} onClick={()=>window.location.href='/vault/'+i.id}>
        <h4 style={{fontSize:14,fontWeight:600,color:txt,marginBottom:4}}>{i.title}</h4>
        <span style={{padding:'2px 7px',borderRadius:9999,fontSize:8,fontWeight:'bold',background:i.status==='protected'?'#dcfce7':'#fef9c3',color:i.status==='protected'?'#15803d':'#a16207'}}>{i.status}</span>
        <p style={{fontSize:11,color:sub,marginTop:4}}>{i.tag} | {i.funding}</p>
        {i.crowdfunding?.active && <div style={{width:'100%',background:dark?'#374151':'#e5e7eb',borderRadius:9999,height:4,marginTop:6}}><div style={{background:'#facc15',height:4,borderRadius:9999,width:Math.min(100,Math.round((i.crowdfunding.raised/i.crowdfunding.goal)*100))+'%'}}></div></div>}
        {i.featured && <span style={{display:'inline-block',marginTop:4,fontSize:9,color:'#92400e'}}>⭐ Featured</span>}
      </div>)}
    </div>
  </div></div>
}
