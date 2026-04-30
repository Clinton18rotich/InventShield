import React, { useState, useRef } from 'react'

export default function VideoFeed({ inventions, dark, compact }) {
  const [videos] = useState(()=>{try{return JSON.parse(localStorage.getItem('inv_videos')||'[]')}catch{return[]}})
  const [currentVideo, setCurrentVideo] = useState(0)
  const [liked, setLiked] = useState({})
  const [comments, setComments] = useState({})
  const [commentText, setCommentText] = useState('')
  const [showComments, setShowComments] = useState(null)
  const touchStartY = useRef(null)
  
  const demoVideos = [
    {id:1, title:'Solar Water Purifier Demo', inventor:'Alex Rivera', invention:'Solar Water Purifier', inventionId:1, views:234, likes:45, thumbnail:'💧', sound:'Original Audio'},
    {id:2, title:'Smart Irrigation Works', inventor:'Maria Santos', invention:'Smart Irrigation', inventionId:2, views:189, likes:32, thumbnail:'🌱', sound:'Original Audio'},
    {id:3, title:'Avocado Farm Tour', inventor:'Grace Akinyi', invention:'Avocados', inventionId:4, views:567, likes:98, thumbnail:'🥑', sound:'Original Audio'},
  ]
  
  const allVideos = [...demoVideos, ...videos]
  const v = allVideos[currentVideo] || demoVideos[0]
  
  const toggleLike = (id) => setLiked({...liked, [id]: !liked[id]})
  const addComment = (vidId) => { if(!commentText.trim())return; const ex=comments[vidId]||[]; setComments({...comments,[vidId]:[...ex,{user:'You',text:commentText}]}); setCommentText('') }
  
  const goNext = () => { if(currentVideo<allVideos.length-1) setCurrentVideo(currentVideo+1) }
  const goPrev = () => { if(currentVideo>0) setCurrentVideo(currentVideo-1) }
  
  const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY }
  const onTouchEnd = (e) => {
    if(!touchStartY.current) return
    const diff = touchStartY.current - e.changedTouches[0].clientY
    if(Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev() }
    touchStartY.current = null
  }
  
  return <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{position:'fixed',inset:0,zIndex:300,background:'#000',display:'flex',flexDirection:'column'}}>
    <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg, #1e293b, #0f172a)'}}>
      <span style={{fontSize:80,opacity:0.4}}>{v.thumbnail}</span>
    </div>
    
    <div style={{background:'#111',padding:12,borderTop:'1px solid #222'}}>
      <p style={{color:'white',fontWeight:'bold',fontSize:14,marginBottom:4}}>{v.title}</p>
      <p style={{color:'#9ca3af',fontSize:12,marginBottom:4}}>@{v.inventor} · 👁️ {v.views} · 🎵 {v.sound}</p>
      
      <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:8}}>
        <button onClick={()=>toggleLike(v.id)} style={{background:'none',border:'none',cursor:'pointer',fontSize:18}}>{liked[v.id]?'❤️':'🤍'} <span style={{color:'white',fontSize:12}}>{v.likes}</span></button>
        <button onClick={()=>setShowComments(showComments===v.id?null:v.id)} style={{background:'none',border:'none',cursor:'pointer',fontSize:18}}>💬 <span style={{color:'white',fontSize:12}}>{(comments[v.id]||[]).length}</span></button>
        <a href={'/vault/'+v.inventionId} target="_blank" style={{fontSize:16,textDecoration:'none'}}>🔬 View Invention</a>
        <span style={{color:'#666',fontSize:11,marginLeft:'auto'}}>{currentVideo+1}/{allVideos.length}</span>
      </div>
      
      {showComments===v.id && <div style={{borderTop:'1px solid #222',paddingTop:8,marginBottom:8}}>
        {(comments[v.id]||[]).length===0 && <p style={{color:'#666',fontSize:11,textAlign:'center'}}>No comments yet</p>}
        {(comments[v.id]||[]).map((c,i)=><p key={i} style={{color:'#d1d5db',fontSize:11,marginBottom:2}}><b style={{color:'white'}}>{c.user}:</b> {c.text}</p>)}
        <div style={{display:'flex',gap:6,marginTop:6}}><input placeholder="Add comment..." value={commentText} onChange={e=>setCommentText(e.target.value)} style={{flex:1,padding:8,borderRadius:8,border:'1px solid #333',background:'#000',color:'white',fontSize:12}} /><button onClick={()=>addComment(v.id)} style={{padding:'8px 14px',borderRadius:8,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontSize:12}}>Post</button></div>
      </div>}
      
      <div style={{display:'flex',gap:6,justifyContent:'center'}}>
        <button onClick={goPrev} disabled={currentVideo===0} style={{padding:'8px 20px',borderRadius:8,background:currentVideo===0?'#222':'#333',color:'white',border:'none',cursor:currentVideo===0?'default':'pointer',fontSize:13}}>◀ Prev</button>
        <button onClick={goNext} disabled={currentVideo===allVideos.length-1} style={{padding:'8px 20px',borderRadius:8,background:currentVideo===allVideos.length-1?'#222':'#4f46e5',color:'white',border:'none',cursor:currentVideo===allVideos.length-1?'default':'pointer',fontSize:13}}>Next ▶</button>
      </div>
    </div>
    <a href="/" style={{position:'absolute',top:10,right:10,background:'rgba(0,0,0,0.5)',color:'white',padding:'6px 14px',borderRadius:14,textDecoration:'none',fontSize:12,zIndex:5}}>✕ Close</a>
  </div>
}
