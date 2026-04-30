import React, { useState, useRef } from 'react'

function HeartAnimation() {
  return <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',fontSize:80,animation:'heartPop 1s ease forwards',pointerEvents:'none',zIndex:10}}>❤️</div>
}

export default function VideoFeed({ inventions, dark, compact }) {
  const [videos, setVideos] = useState(()=>{try{return JSON.parse(localStorage.getItem('inv_videos')||'[]')}catch{return[]}})
  const [recording, setRecording] = useState(false)
  const [caption, setCaption] = useState('')
  const [selectedInvention, setSelectedInvention] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [currentVideo, setCurrentVideo] = useState(0)
  const [liked, setLiked] = useState({})
  const [saved, setSaved] = useState(()=>{try{return JSON.parse(localStorage.getItem('inv_saved_videos')||'[]')}catch{return[]}})
  const [comments, setComments] = useState({})
  const [commentText, setCommentText] = useState('')
  const [showComments, setShowComments] = useState(null)
  const [following, setFollowing] = useState({})
  const [heartAnim, setHeartAnim] = useState(null)
  const touchStartY = useRef(null)
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'
  
  const demoVideos = [
    {id:1, title:'Solar Water Purifier Demo', inventor:'Alex Rivera', invention:'Solar Water Purifier', inventionId:1, views:234, likes:45, thumbnail:'💧', hashtags:['CleanTech','Water','Solar'], sound:'Original Audio - Alex Rivera'},
    {id:2, title:'How Smart Irrigation Works', inventor:'Maria Santos', invention:'Smart Irrigation', inventionId:2, views:189, likes:32, thumbnail:'🌱', hashtags:['AI','Agriculture','Smart'], sound:'Original Audio - Maria Santos'},
    {id:3, title:'Avocado Farm Tour', inventor:'Grace Akinyi', invention:'Avocados', inventionId:4, views:567, likes:98, thumbnail:'🥑', hashtags:['Organic','Farming','Tour'], sound:'Original Audio - Grace Akinyi'},
  ]
  
  const allVideos = [...demoVideos, ...videos]
  
  const addVideo = () => {
    if(!caption.trim()||!selectedInvention) return
    const tags = hashtags.split(',').map(t=>t.trim()).filter(t=>t)
    const inv = inventions.find(i=>i.id===parseInt(selectedInvention))
    const newVideo = {id:Date.now(), title:caption, inventor:'You', invention:inv?.title||'Invention', inventionId:parseInt(selectedInvention), views:0, likes:0, thumbnail:'🎬', hashtags:tags.length?tags:['Invention'], sound:'Original Audio'}
    const updated = [newVideo, ...videos]
    setVideos(updated); localStorage.setItem('inv_videos', JSON.stringify(updated))
    setCaption(''); setSelectedInvention(''); setHashtags(''); setRecording(false)
  }
  
  const toggleLike = (id) => { setLiked({...liked, [id]: !liked[id]}); setHeartAnim(id); setTimeout(()=>setHeartAnim(null), 1000) }
  const toggleSave = (id) => { const u = saved.includes(id)?saved.filter(s=>s!==id):[...saved,id]; setSaved(u); localStorage.setItem('inv_saved_videos', JSON.stringify(u)) }
  const addComment = (vidId) => { if(!commentText.trim())return; const ex=comments[vidId]||[]; setComments({...comments,[vidId]:[...ex,{user:'You',text:commentText,time:'Now'}]}); setCommentText('') }
  const toggleFollow = (inv) => { setFollowing({...following, [inv]: !following[inv]}) }
  const goNext = () => { if(currentVideo<allVideos.length-1) setCurrentVideo(currentVideo+1) }
  const goPrev = () => { if(currentVideo>0) setCurrentVideo(currentVideo-1) }
  
  const onTouchStart = (e) => { if(e.target.tagName==='BUTTON'||e.target.tagName==='INPUT'||e.target.tagName==='A') return; touchStartY.current = e.touches[0].clientY }
  const onTouchEnd = (e) => {
    if(!touchStartY.current) return
    const diff = touchStartY.current - e.changedTouches[0].clientY
    if(Math.abs(diff) > 40) { diff > 0 ? goNext() : goPrev() }
    touchStartY.current = null
  }
  
  if (compact) {
    return <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:10}}>
      {allVideos.map(v=><div key={v.id} style={{background:cb,borderRadius:14,overflow:'hidden'}}>
        <div style={{height:200,background:'linear-gradient(135deg, #1e293b, #0f172a)',display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{fontSize:50}}>{v.thumbnail}</span></div>
        <div style={{padding:8}}><p style={{fontSize:11,fontWeight:600,color:txt}}>{v.title}</p></div>
      </div>)}
    </div>
  }
  
  if (!allVideos.length) return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:500,margin:'0 auto'}}><h1 style={{color:txt}}>🎬 Videos</h1>
    {recording ? <div style={{background:cb,borderRadius:14,padding:20}}>
      <select value={selectedInvention} onChange={e=>setSelectedInvention(e.target.value)} style={{width:'100%',padding:10,borderRadius:8,marginBottom:8,background:cb,color:txt,border:'1px solid #d1d5db'}}><option value="">Select invention</option>{inventions.map(i=><option key={i.id} value={i.id}>{i.title}</option>)}</select>
      <input placeholder="Caption" value={caption} onChange={e=>setCaption(e.target.value)} style={{width:'100%',padding:10,borderRadius:8,marginBottom:8,background:cb,color:txt,border:'1px solid #d1d5db',boxSizing:'border-box'}} />
      <input placeholder="Hashtags" value={hashtags} onChange={e=>setHashtags(e.target.value)} style={{width:'100%',padding:10,borderRadius:8,marginBottom:8,background:cb,color:txt,border:'1px solid #d1d5db',boxSizing:'border-box'}} />
      <button onClick={addVideo} disabled={!caption.trim()||!selectedInvention} style={{width:'100%',padding:12,borderRadius:8,background:(!caption.trim()||!selectedInvention)?'#d1d5db':'#dc2626',color:'white',border:'none',cursor:(!caption.trim()||!selectedInvention)?'default':'pointer',fontWeight:600}}>📹 Post</button>
    </div> : <button onClick={()=>setRecording(true)} style={{width:'100%',padding:14,borderRadius:12,background:'#dc2626',color:'white',border:'none',cursor:'pointer',fontWeight:600,fontSize:15,marginBottom:20}}>📹 + Post Video</button>}
  </div></div>
  
  const v = allVideos[currentVideo]
  
  return <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{position:'fixed',inset:0,zIndex:300,background:'#000'}}>
    <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg, #1e293b, #0f172a)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <span style={{fontSize:100,opacity:0.4}}>{v.thumbnail}</span>
      </div>
      {heartAnim===v.id && <HeartAnimation />}
    </div>
    
    {/* Top */}
    <a href="/" style={{position:'absolute',top:12,right:12,zIndex:5,background:'rgba(0,0,0,0.5)',color:'white',padding:'6px 14px',borderRadius:20,textDecoration:'none',fontSize:12}}>✕</a>
    <span style={{position:'absolute',top:12,left:12,zIndex:5,background:'rgba(0,0,0,0.5)',color:'white',padding:'5px 10px',borderRadius:20,fontSize:11}}>{currentVideo+1}/{allVideos.length}</span>
    
    {/* RIGHT SIDE - action buttons */}
    <div style={{position:'absolute',right:8,bottom:'30%',display:'flex',flexDirection:'column',gap:14,alignItems:'center',zIndex:5}}>
      <div onClick={(e)=>{e.stopPropagation();toggleLike(v.id)}} style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer'}}>
        <span style={{fontSize:30}}>{liked[v.id]?'❤️':'🤍'}</span>
        <span style={{color:'white',fontSize:11,fontWeight:'bold',marginTop:2}}>{v.likes}</span>
      </div>
      <div onClick={(e)=>{e.stopPropagation();setShowComments(showComments===v.id?null:v.id)}} style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer'}}>
        <span style={{fontSize:26}}>💬</span>
        <span style={{color:'white',fontSize:11,marginTop:2}}>{(comments[v.id]||[]).length}</span>
      </div>
      <div onClick={(e)=>{e.stopPropagation();toggleSave(v.id)}} style={{cursor:'pointer'}}>
        <span style={{fontSize:24}}>{saved.includes(v.id)?'⭐':'☆'}</span>
      </div>
      <a href={'/vault/'+v.inventionId} onClick={e=>e.stopPropagation()} target="_blank" style={{textDecoration:'none'}}>
        <span style={{fontSize:24}}>🔬</span>
      </a>
    </div>
    
    {/* BOTTOM */}
    <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'12px 12px 6px',background:'linear-gradient(transparent, rgba(0,0,0,0.85))',zIndex:5}}>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
        <span style={{fontSize:18,background:'rgba(255,255,255,0.2)',width:36,height:36,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{v.thumbnail}</span>
        <div style={{flex:1,minWidth:0}}>
          <p style={{color:'white',fontWeight:'bold',fontSize:13}}>@{v.inventor}</p>
          <p style={{color:'#9ca3af',fontSize:10}}>{v.invention}</p>
        </div>
        <button onClick={(e)=>{e.stopPropagation();toggleFollow(v.inventor)}} style={{padding:'5px 14px',borderRadius:16,background:following[v.inventor]?'rgba(255,255,255,0.2)':'#dc2626',color:'white',border:'none',cursor:'pointer',fontSize:10,fontWeight:600,flexShrink:0}}>{following[v.inventor]?'Following':'+ Follow'}</button>
      </div>
      <p style={{color:'white',fontSize:12,marginBottom:3}}>{v.title}</p>
      <div style={{display:'flex',gap:6,fontSize:10,color:'#9ca3af',marginBottom:2,alignItems:'center'}}>
        <span>👁️ {v.views}</span>
        <span>🎵 {v.sound}</span>
      </div>
      {v.hashtags && <div style={{display:'flex',gap:4,flexWrap:'wrap',marginBottom:2}}>{v.hashtags.map(t=><span key={t} style={{color:'#818cf8',fontSize:9,fontWeight:600}}>#{t}</span>)}</div>}
      
      {showComments===v.id && <div style={{background:'rgba(0,0,0,0.95)',borderRadius:10,padding:8,marginTop:4,maxHeight:140,overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
        {(comments[v.id]||[]).length===0 && <p style={{color:'#6b7280',fontSize:10,textAlign:'center',padding:8}}>No comments yet</p>}
        {(comments[v.id]||[]).map((c,i)=><div key={i} style={{padding:'3px 0'}}><p style={{color:'white',fontSize:10,fontWeight:600}}>{c.user}</p><p style={{color:'#d1d5db',fontSize:10}}>{c.text}</p></div>)}
        <div style={{display:'flex',gap:4,marginTop:4}}><input placeholder="Add comment" value={commentText} onChange={e=>setCommentText(e.target.value)} style={{flex:1,padding:6,borderRadius:14,border:'1px solid #333',background:'#111',color:'white',fontSize:10}} /><button onClick={()=>addComment(v.id)} style={{padding:'6px 12px',borderRadius:14,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontSize:10}}>Post</button></div>
      </div>}
      
      <div style={{display:'flex',justifyContent:'center',gap:4,padding:'4px 0'}}>
        {allVideos.map((_,i)=><div key={i} style={{width:i===currentVideo?22:6,height:3,borderRadius:2,background:i===currentVideo?'white':'rgba(255,255,255,0.3)',transition:'all 0.3s'}}></div>)}
      </div>
    </div>
  </div>
}
