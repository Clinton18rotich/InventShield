import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DiscoverHub({ inventions, setInventions, lang, dark, auth }) {
  const nav=useNavigate(); const [req,setReq]=useState([]); const [search,setSearch]=useState("")
  const [category,setCategory]=useState("All"); const [sort,setSort]=useState("newest")
  const [saved,setSaved]=useState(()=>{try{return JSON.parse(localStorage.getItem("inv_saved")||"[]")}catch{return[]}})
  const bg=dark?"#111827":"#f9fafb"; const cb=dark?"#1f2937":"white"; const txt=dark?"#f9fafb":"#111827"; const sub=dark?"#9ca3af":"#6b7280"
  const categories=["All","Eco-friendly","AI-powered","CleanTech","AgriTech","HealthTech","FinTech"]
  
  let flt = inventions.filter(i=>i.title?.toLowerCase().includes(search.toLowerCase())||i.tag?.toLowerCase().includes(search.toLowerCase()))
  if(category!=="All") flt=flt.filter(i=>i.tag===category)
  if(sort==="funding") flt.sort((a,b)=>parseInt(b.funding?.replace(/\D/g,"")||0)-parseInt(a.funding?.replace(/\D/g,"")||0))
  if(sort==="contributors") flt.sort((a,b)=>(b.contributors?.length||0)-(a.contributors?.length||0))
  const trending = [...inventions].sort((a,b)=>(b.crowdfunding?.backers||0)-(a.crowdfunding?.backers||0)).slice(0,3)
  const toggleSave = (id) => { const updated=saved.includes(id)?saved.filter(s=>s!==id):[...saved,id]; setSaved(updated); localStorage.setItem("inv_saved",JSON.stringify(updated)) }
  
  return <div style={{minHeight:"100vh",background:bg,padding:"16px 16px 80px"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
    <h1 style={{fontSize:26,fontWeight:"bold",color:txt,marginBottom:8}}>🔍 Discover Inventions</h1>
    
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
      <input placeholder="Search by name, tag, or inventor..." value={search} onChange={e=>setSearch(e.target.value)} style={{flex:1,minWidth:180,padding:10,borderRadius:10,border:"1px solid "+(dark?"#374151":"#d1d5db"),background:cb,color:txt,fontSize:13}} />
      <select value={category} onChange={e=>setCategory(e.target.value)} style={{padding:10,borderRadius:10,border:"1px solid "+(dark?"#374151":"#d1d5db"),background:cb,color:txt,fontSize:12}}>{categories.map(c=><option key={c}>{c}</option>)}</select>
      <select value={sort} onChange={e=>setSort(e.target.value)} style={{padding:10,borderRadius:10,border:"1px solid "+(dark?"#374151":"#d1d5db"),background:cb,color:txt,fontSize:12}}>
        <option value="newest">🆕 Newest</option><option value="funding">💰 Most Funded</option><option value="contributors">👥 Most Contributors</option></select>
    </div>
    
    {trending.length>0 && <div style={{marginBottom:20}}><h3 style={{fontSize:15,fontWeight:"600",color:txt,marginBottom:8}}>🔥 Trending Now</h3><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))",gap:8}}>{trending.map(i=><div key={i.id} onClick={()=>nav(`/vault/${i.id}`)} style={{background:cb,borderRadius:10,padding:12,cursor:"pointer",border:"1px solid "+(dark?"#374151":"#e5e7eb")}}><span style={{fontSize:20}}>{i.tag==="Eco-friendly"?"🌿":"💡"}</span><h4 style={{fontSize:12,fontWeight:600,color:txt}}>{i.title}</h4><p style={{fontSize:10,color:sub}}>{i.funding} | {i.crowdfunding?.backers||0} backers</p><div style={{width:"100%",background:dark?"#374151":"#e5e7eb",borderRadius:9999,height:4,marginTop:4}}><div style={{background:"#facc15",height:4,borderRadius:9999,width:Math.min(100,Math.round((i.crowdfunding?.raised||0)/(i.crowdfunding?.goal||1)*100))+"%"}}></div></div></div>)}</div></div>}
    
    {saved.length>0 && <div style={{marginBottom:20}}><h3 style={{fontSize:14,fontWeight:"600",color:txt,marginBottom:6}}>⭐ Saved ({saved.length})</h3><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{inventions.filter(i=>saved.includes(i.id)).map(i=><span key={i.id} onClick={()=>nav(`/vault/${i.id}`)} style={{padding:"5px 10px",background:cb,borderRadius:14,fontSize:10,color:txt,cursor:"pointer",border:"1px solid "+(dark?"#374151":"#e5e7eb")}}>{i.title}</span>)}</div></div>}
    
    <h3 style={{fontSize:14,fontWeight:"600",color:txt,marginBottom:8}}>📋 All Inventions ({flt.length})</h3>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:10}}>
      {flt.map(i=><div key={i.id} style={{background:cb,borderRadius:12,padding:14,border:"1px solid "+(dark?"#374151":"#e5e7eb")}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
          <h3 onClick={()=>nav(`/vault/${i.id}`)} style={{fontSize:14,fontWeight:600,color:txt,cursor:"pointer"}}>{i.title}</h3>
          <button onClick={()=>toggleSave(i.id)} style={{background:"none",border:"none",fontSize:14,cursor:"pointer"}}>{saved.includes(i.id)?"⭐":"☆"}</button></div>
        <span style={{padding:"2px 7px",borderRadius:9999,fontSize:8,background:i.status==="protected"?"#dcfce7":"#fef9c3",color:i.status==="protected"?"#15803d":"#a16207"}}>{i.status}</span>
        <span style={{fontSize:9,color:sub,marginLeft:4}}>{i.tag} | {i.inventorName}</span>
        {i.crowdfunding?.active && <div style={{width:"100%",background:dark?"#374151":"#e5e7eb",borderRadius:9999,height:4,margin:"6px 0"}}><div style={{background:"#facc15",height:4,borderRadius:9999,width:Math.min(100,Math.round((i.crowdfunding.raised/i.crowdfunding.goal)*100))+"%"}}></div></div>}
        <p style={{fontSize:16,fontWeight:"bold",color:"#4f46e5",margin:"4px 0"}}>{i.funding}</p>
        <div style={{display:"flex",gap:4}}>
          <button onClick={()=>nav(`/vault/${i.id}`)} style={{flex:1,padding:"5px",borderRadius:5,border:"1px solid "+(dark?"#374151":"#d1d5db"),color:txt,cursor:"pointer",background:"transparent",fontSize:9}}>View</button>
          <button onClick={()=>{if(!auth.isLoggedIn){nav("/login");return};setReq([...req,i.id]);setTimeout(()=>{setInventions(inventions.map(x=>x.id===i.id?{...x,contributors:[...x.contributors,{name:auth.user.name,role:"Contributor",share:5,avatar:auth.user.avatar,userId:auth.user.id}]}:x));setReq(req.filter(y=>y!==i.id))},2000)}} disabled={req.includes(i.id)} style={{flex:1,padding:"5px",borderRadius:5,background:req.includes(i.id)?"#d1d5db":"#4f46e5",color:"white",border:"none",cursor:req.includes(i.id)?"default":"pointer",fontSize:9}}>{req.includes(i.id)?"...":auth.isLoggedIn?"Contribute":"Login to contribute"}</button></div>
      </div>)}
    </div>
  </div></div>
}
