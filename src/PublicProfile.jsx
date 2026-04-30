import React from 'react'
import { useParams, Link } from 'react-router-dom'

export default function PublicProfile({ inventions, users, dark }) {
  const { id } = useParams()
  const user = users.find(u => u.id === id)
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#9ca3af':'#6b7280'
  
  if (!user) return <div style={{minHeight:'100vh',background:bg,display:'flex',alignItems:'center',justifyContent:'center'}}><div><h1 style={{color:txt}}>Inventor not found</h1><Link to="/" style={{color:'#4f46e5'}}>Back</Link></div></div>
  
  const userInventions = inventions.filter(i => i.inventorId === user.id)
  const totalRaised = userInventions.reduce((s,i) => s + (i.crowdfunding?.raised || 0), 0)
  const profileUrl = window.location.origin + '/profile/' + user.id
  
  const share = (platform) => {
    const url = encodeURIComponent(profileUrl)
    const text = encodeURIComponent('Check out ' + user.name + ' on InventShield!')
    const links = {
      copy: () => { navigator.clipboard.writeText(profileUrl); alert('Link copied!') },
      whatsapp: 'https://wa.me/?text=' + text + '%20' + url,
      twitter: 'https://twitter.com/intent/tweet?text=' + text + '&url=' + url,
      linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + url,
      facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + url,
      telegram: 'https://t.me/share/url?url=' + url + '&text=' + text,
      email: 'mailto:?subject=' + encodeURIComponent(user.name + ' on InventShield') + '&body=' + url,
      reddit: 'https://www.reddit.com/submit?url=' + url + '&title=' + encodeURIComponent(user.name + ' inventions'),
    }
    if (platform === 'copy') links.copy()
    else window.open(links[platform], '_blank')
  }
  
  const socials = [
    {id:'copy', icon:'📋', label:'Copy Link', color:'#4f46e5'},
    {id:'whatsapp', icon:'💬', label:'WhatsApp', color:'#25D366'},
    {id:'twitter', icon:'𝕏', label:'Twitter', color:'#1d9bf0'},
    {id:'linkedin', icon:'🔗', label:'LinkedIn', color:'#0a66c2'},
    {id:'facebook', icon:'📘', label:'Facebook', color:'#1877f2'},
    {id:'telegram', icon:'📬', label:'Telegram', color:'#0088cc'},
    {id:'email', icon:'📧', label:'Email', color:'#6b7280'},
    {id:'reddit', icon:'💬', label:'Reddit', color:'#ff4500'},
  ]
  
  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:800,margin:'0 auto'}}>
    <div style={{background:cb,borderRadius:20,padding:32,textAlign:'center',marginBottom:20}}>
      <div style={{width:100,height:100,borderRadius:'50%',background:'linear-gradient(135deg, #4f46e5, #7c3aed)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:40,fontWeight:'bold',color:'white',margin:'0 auto 16px'}}>{user.avatar || user.name?.[0]}</div>
      <h1 style={{fontSize:26,fontWeight:'bold',color:txt,marginBottom:4}}>{user.name}</h1>
      <span style={{display:'inline-block',padding:'4px 14px',borderRadius:9999,fontSize:11,fontWeight:'bold',background:'#eef2ff',color:'#4f46e5',marginBottom:8}}>{user.role || 'Inventor'}</span>
      {user.bio && <p style={{color:sub,fontSize:13,marginBottom:8}}>"{user.bio}"</p>}
      <p style={{color:sub,fontSize:12}}>{user.expertise || 'Inventor'} | Joined {new Date(user.joinedAt).toLocaleDateString()}</p>
      
      <div style={{display:'flex',gap:6,justifyContent:'center',marginTop:16,flexWrap:'wrap'}}>
        {socials.map(s => <button key={s.id} onClick={() => share(s.id)} style={{padding:'8px 16px',borderRadius:20,background:s.color,color:'white',border:'none',cursor:'pointer',fontSize:11,fontWeight:600}}>{s.icon} {s.label}</button>)}
      </div>
    </div>
    
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))',gap:8,marginBottom:20}}>
      <div style={{background:cb,borderRadius:12,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#4f46e5'}}>{userInventions.length}</p><p style={{fontSize:9,color:sub}}>Inventions</p></div>
      <div style={{background:cb,borderRadius:12,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#16a34a'}}>${totalRaised.toLocaleString()}</p><p style={{fontSize:9,color:sub}}>Total Raised</p></div>
    </div>
    
    <h3 style={{fontSize:16,fontWeight:'600',color:txt,marginBottom:12}}>Inventions ({userInventions.length})</h3>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))',gap:10}}>
      {userInventions.map(i=><div key={i.id} style={{background:cb,borderRadius:12,padding:16,border:'1px solid '+(dark?'#374151':'#e5e7eb'),cursor:'pointer'}} onClick={()=>window.location.href='/vault/'+i.id}>
        <h4 style={{fontSize:14,fontWeight:600,color:txt}}>{i.title}</h4>
        <span style={{padding:'2px 7px',borderRadius:9999,fontSize:8,background:i.status==='protected'?'#dcfce7':'#fef9c3',color:i.status==='protected'?'#15803d':'#a16207'}}>{i.status}</span>
        <p style={{fontSize:11,color:sub,marginTop:4}}>{i.tag} | {i.funding}</p>
      </div>)}
    </div>
  </div></div>
}
