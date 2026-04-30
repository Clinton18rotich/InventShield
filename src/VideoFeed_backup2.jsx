import React, { useState, useEffect, useRef } from 'react'

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
  const [muted, setMuted] = useState(false)
  const videoRef = useRef(null)
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#9ca3af':'#6b7280'
  
  const demoVideos = [
    {id:1, title:'Solar Water Purifier Demo', inventor:'Alex Rivera', invention:'Solar Water Purifier', inventionId:1, views:234, likes:45, thumbnail:'💧', duration:'0:45', hashtags:['CleanTech','Water','Solar'], sound:'Original Audio'},
    {id:2, title:'How Smart Irrigation Works', inventor:'Maria Santos', invention:'Smart Irrigation', inventionId:2, views:189, likes:32, thumbnail:'🌱', duration:'1:20', hashtags:['AI','Agriculture','Smart'], sound:'Original Audio'},
    {id:3, title:'Avocado Farm Tour', inventor:'Grace Akinyi', invention:'Avocados', inventionId:4, views:567, likes:98, thumbnail:'🥑', duration:'0:30', hashtags:['Organic','Farming','Tour'], sound:'Nature Sounds'},
  ]
  
  const allVideos = [...demoVideos, ...videos]
  
  useEffect(() => {
    if (liked[currentVideo] || heartAnim) return
    const timer = setInterval(() => {
      setVideos(prev => prev.map((v,i) => i===currentVideo ? {...v, views: (v.views||0)+1} : v))
    }, 3000)
    return () => clearInterval(timer)
  }, [currentVideo])
  
  const addVideo = () => {
    if(!caption.trim()||!selectedInvention) return
    const tags = hashtags.split(',').map(t=>t.trim()).filter(t=>t)
    const inv = inventions.find(i=>i.id===parseInt(selectedInvention))
    const newVideo = {id:Date.now(), title:caption, inventor:'You', invention:inv?.title||'Invention', inventionId:parseInt(selectedInvention), views:0, likes:0, thumbnail:'🎬', duration:'0:15', hashtags:tags.length?tags:['Invention'], sound:'Original Audio'}
    const updated = [newVideo, ...videos]
    setVideos(updated)
    localStorage.setItem('inv_videos', JSON.stringify(updated))
    setCaption(''); setSelectedInvention(''); setHashtags(''); setRecording(false)
  }
  
  const toggleLike = (id) => {
    setLiked({...liked, [id]: !liked[id]})
    setHeartAnim(id)
    setTimeout(()=>setHeartAnim(null), 1000)
  }
  
  const toggleSave = (id) => {
    const updated = saved.includes(id) ? saved.filter(s=>s!==id) : [...saved, id]
    setSaved(updated)
    localStorage.setItem('inv_saved_videos', JSON.stringify(updated))
  }
  
  const addComment = (vidId) => {
    if(!commentText.trim()) return
    const existing = comments[vidId] || []
    setComments({...comments, [vidId]: [...existing, {user:'You', text:commentText, time:'Just now'}]})
    setCommentText('')
  }
  
  const toggleFollow = (inventor) => {
    setFollowing({...following, [inventor]: !following[inventor]})
  }
  
  const scrollTo = (dir) => {
    if (dir === 'up' && currentVideo > 0) setCurrentVideo(currentVideo-1)
    if (dir === 'down' && currentVideo < allVideos.length-1) setCurrentVideo(currentVideo+1)
  }
  
  if (compact) {
    return <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:10}}>
      {allVideos.map(v=><div key={v.id} style={{background:cb,borderRadius:14,overflow:'hidden',border:'1px solid '+(dark?'#374151':'#e5e7eb')}}>
        <div style={{height:250,background:'linear-gradient(135deg, '+(dark?'#1e293b':'#e0e7ff')+', '+(dark?'#0f172a':'#c7d2fe')+')',display:'flex',alignItems:'center',justifyContent:'center',position:'fixed',inset:0,zIndex:300}}>
          <span style={{fontSize:60}}>{v.thumbnail}</span>
          <span style={{position:'absolute',bottom:8,right:8,background:'rgba(0,0,0,0.7)',color:'white',padding:'3px 6px',borderRadius:4,fontSize:9}}>{v.duration}</span>
        </div>
        <div style={{padding:10}}><p style={{fontSize:12,fontWeight:600,color:txt}}>{v.title}</p>
          <div style={{display:'flex',gap:8,fontSize:10,color:sub,marginTop:4}}><span>👁️ {v.views}</span><span>❤️ {v.likes}</span></div>
          {v.hashtags && <div style={{display:'flex',gap:3,flexWrap:'wrap',marginTop:4}}>{v.hashtags.map(t=><span key={t} style={{fontSize:8,color:'#4f46e5'}}>#{t}</span>)}</div>}
        </div>
      </div>)}
    </div>
  }
  
  const v = allVideos[currentVideo]
  if (!v) return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:500,margin:'0 auto'}}><h1 style={{color:txt,fontSize:20}}>🎬 Video Showcase</h1>{recording ? <div style={{background:cb,borderRadius:14,padding:20,marginBottom:16}}><select value={selectedInvention} onChange={e=>setSelectedInvention(e.target.value)} style={{width:'100%',padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),marginBottom:8,background:cb,color:txt,fontSize:12}}><option value="">Select invention...</option>{inventions.map(i=><option key={i.id} value={i.id}>{i.title}</option>)}</select><div style={{border:'2px dashed '+(dark?'#374151':'#d1d5db'),borderRadius:12,padding:40,textAlign:'center',marginBottom:8,background:dark?'#0f172a':'#f9fafb'}}><span style={{fontSize:40}}>📹</span><p style={{fontSize:12,color:sub}}>Tap to record (up to 60s)</p></div><input placeholder="Caption" value={caption} onChange={e=>setCaption(e.target.value)} style={{width:'100%',padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),marginBottom:8,background:cb,color:txt,fontSize:12,boxSizing:'border-box'}} /><input placeholder="Hashtags (comma separated)" value={hashtags} onChange={e=>setHashtags(e.target.value)} style={{width:'100%',padding:10,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),marginBottom:8,background:cb,color:txt,fontSize:12,boxSizing:'border-box'}} /><button onClick={addVideo} disabled={!caption.trim()||!selectedInvention} style={{width:'100%',padding:12,borderRadius:8,background:(!caption.trim()||!selectedInvention)?'#d1d5db':'#dc2626',color:'white',border:'none',cursor:(!caption.trim()||!selectedInvention)?'default':'pointer',fontWeight:600}}>📹 Post</button></div> : <button onClick={()=>setRecording(true)} style={{width:'100%',padding:14,borderRadius:12,background:'#dc2626',color:'white',border:'none',cursor:'pointer',fontWeight:600,fontSize:15,marginBottom:20}}>📹 + Post Video</button>}
  <div style={{textAlign:'center',color:sub,padding:40}}>{allVideos.length>0?'Swipe up/down to browse videos':'No videos yet'}</div></div></div>
  
  return <div style={{minHeight:'100vh',background:'#000',position:'fixed',inset:0,zIndex:300}} ref={videoRef}>
    <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>toggleLike(v.id)}>
      <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg, #1e293b, #0f172a)',display:'flex',alignItems:'center',justifyContent:'center',position:'fixed',inset:0,zIndex:300}}>
        <span style={{fontSize:100,opacity:0.5}}>{v.thumbnail}</span>
        <span style={{position:'absolute',top:60,left:16,background:'rgba(0,0,0,0.6)',color:'white',padding:'4px 10px',borderRadius:9999,fontSize:11}}>🎬 For You</span>
        {v.hashtags && <div style={{position:'absolute',top:60,right:16,display:'flex',flexDirection:'column',gap:4}}>{v.hashtags.map(t=><span key={t} style={{background:'rgba(255,255,255,0.2)',color:'white',padding:'3px 8px',borderRadius:9999,fontSize:9}}>#{t}</span>)}</div>}
      </div>
      {heartAnim===v.id && <HeartAnimation />}
    </div>
    
    <div style={{position:'absolute',bottom:0,left:0,right:0,padding:16,background:'linear-gradient(transparent, rgba(0,0,0,0.8))'}}>
      <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between'}}>
        <div style={{flex:1,marginRight:12}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
            <span style={{fontSize:20}}>{v.thumbnail}</span>
            <div>
              <p style={{color:'white',fontWeight:'bold',fontSize:13}}>{v.inventor}</p>
              <button onClick={()=>toggleFollow(v.inventor)} style={{background:'none',border:'none',color:following[v.inventor]?'#f59e0b':'#9ca3af',cursor:'pointer',fontSize:10,padding:0}}>{following[v.inventor]?'✅ Following':'+ Follow'}</button>
            </div>
          </div>
          <p style={{color:'white',fontSize:14,fontWeight:500,marginBottom:4}}>{v.title}</p>
          <p style={{color:'#9ca3af',fontSize:11}}>🔬 {v.invention} | 🎵 {v.sound}</p>
          <div style={{display:'flex',gap:10,fontSize:10,color:'#9ca3af',marginTop:4}}><span>👁️ {v.views} views</span><span>❤️ {v.likes} likes</span></div>
        </div>
        
        <div style={{display:'flex',flexDirection:'column',gap:12,alignItems:'center'}}>
          <button onClick={()=>toggleLike(v.id)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:2}}><span style={{fontSize:24}}>{liked[v.id]?'❤️':'🤍'}</span><span style={{color:'white',fontSize:10}}>{v.likes}</span></button>
          <button onClick={()=>setShowComments(showComments===v.id?null:v.id)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:2}}><span style={{fontSize:22}}>💬</span><span style={{color:'white',fontSize:10}}>{(comments[v.id]||[]).length}</span></button>
          <button onClick={()=>toggleSave(v.id)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:2}}><span style={{fontSize:22}}>{saved.includes(v.id)?'⭐':'☆'}</span><span style={{color:'white',fontSize:10}}>Save</span></button>
          <button onClick={()=>window.open('/vault/'+v.inventionId,'_blank')} style={{background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:2}}><span style={{fontSize:22}}>🔬</span><span style={{color:'white',fontSize:10}}>View</span></button>
          <button onClick={()=>setMuted(!muted)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:2}}><span style={{fontSize:20}}>{muted?'🔇':'🔊'}</span></button>
        </div>
      </div>
      
      {showComments===v.id && <div style={{background:'rgba(0,0,0,0.9)',borderRadius:12,padding:12,marginTop:8,maxHeight:200,overflowY:'auto'}}>
        <h4 style={{color:'white',fontSize:12,marginBottom:8}}>💬 Comments</h4>
        {(comments[v.id]||[]).map((c,i)=><div key={i} style={{padding:'4px 0',borderBottom:i<(comments[v.id]||[]).length-1?'1px solid #333':'none'}}><p style={{color:'white',fontSize:11,fontWeight:600}}>{c.user} <span style={{color:'#9ca3af',fontWeight:400,fontSize:9}}>{c.time}</span></p><p style={{color:'#d1d5db',fontSize:11}}>{c.text}</p></div>)}
        <div style={{display:'flex',gap:6,marginTop:6}}><input placeholder="Add comment..." value={commentText} onChange={e=>setCommentText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addComment(v.id)} style={{flex:1,padding:6,borderRadius:16,border:'1px solid #333',background:'#111',color:'white',fontSize:11}} /><button onClick={()=>addComment(v.id)} style={{padding:'6px 12px',borderRadius:16,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontSize:10}}>Post</button></div>
      </div>}
    </div>
    
    <div style={{position:'absolute',top:'40%',right:0,display:'flex',flexDirection:'column',gap:20}}>
      <button onClick={()=>scrollTo('up')} disabled={currentVideo===0} style={{background:'rgba(255,255,255,0.2)',border:'none',color:'white',fontSize:24,cursor:'pointer',padding:'8px 12px',borderRadius:'8px 0 0 8px',opacity:currentVideo===0?0.3:1}}>▲</button>
      <button onClick={()=>scrollTo('down')} disabled={currentVideo===allVideos.length-1} style={{background:'rgba(255,255,255,0.2)',border:'none',color:'white',fontSize:24,cursor:'pointer',padding:'8px 12px',borderRadius:'8px 0 0 8px',opacity:currentVideo===allVideos.length-1?0.3:1}}>▼</button>
    </div>
    
    <div style={{position:'absolute',bottom:100,left:0,right:0,display:'flex',justifyContent:'center',gap:4}}>
      {allVideos.map((_,i)=><div key={i} style={{width:40,height:3,borderRadius:2,background:i===currentVideo?'white':'rgba(255,255,255,0.3)',transition:'all 0.3s'}}></div>)}
    </div>
  </div>
}
