import React, { useState } from 'react'

export default function RecordsHub({ inventions, lang, dark }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [view, setView] = useState('table')
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#9ca3af':'#6b7280'
  
  let filtered = inventions.filter(i=>i.title?.toLowerCase().includes(search.toLowerCase())||i.inventorName?.toLowerCase().includes(search.toLowerCase()))
  if(statusFilter!=='All') filtered = filtered.filter(i=>i.status===statusFilter)
  if(sortBy==='funding') filtered.sort((a,b)=>parseInt(b.funding?.replace(/\D/g,'')||0)-parseInt(a.funding?.replace(/\D/g,'')||0))
  if(sortBy==='oldest') filtered.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt))
  if(sortBy==='newest') filtered.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
  
  const totalValue = inventions.reduce((s,i)=>s+parseInt(i.funding?.replace(/\D/g,'')||0),0)
  const protectedCount = inventions.filter(i=>i.status==='protected').length
  const draftCount = inventions.filter(i=>i.status==='draft').length
  const hash = '0x'+Math.abs(JSON.stringify(inventions).split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)).toString(16).padStart(16,'0')
  const monthlyGrowth = [{m:'Jan',c:0},{m:'Feb',c:0},{m:'Mar',c:1},{m:'Apr',c:1},{m:'May',c:2}]
  
  const exportData = (format) => {
    let content, type, ext
    if(format==='csv') {
      content = 'Title,Inventor,Status,Funding,Date\n'+filtered.map(i=>`${i.title},${i.inventorName},${i.status},${i.funding},${i.createdAt?.split('T')[0]}`).join('\n')
      type='text/csv'; ext='csv'
    } else if(format==='json') {
      content = JSON.stringify(filtered,null,2)
      type='application/json'; ext='json'
    } else {
      content = filtered.map(i=>`${i.title} | ${i.inventorName} | ${i.status} | ${i.funding}`).join('\n')
      type='text/plain'; ext='txt'
    }
    const blob = new Blob([content],{type})
    const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`inventShield_records.${ext}`; a.click()
  }
  
  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:1100,margin:'0 auto'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8,marginBottom:12}}>
      <h1 style={{fontSize:26,fontWeight:'bold',color:txt}}>📋 Records Hub</h1>
      <div style={{display:'flex',gap:6}}>
        {['table','stats','log'].map(v=><button key={v} onClick={()=>setView(v)} style={{padding:'6px 14px',borderRadius:16,border:'none',background:view===v?'#4f46e5':dark?'#1f2937':'white',color:view===v?'white':txt,cursor:'pointer',fontSize:11,textTransform:'capitalize'}}>{v}</button>)}
      </div>
    </div>

    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(120px, 1fr))',gap:6,marginBottom:12}}>
      <div style={{background:cb,borderRadius:8,padding:10,textAlign:'center'}}><p style={{fontSize:16,fontWeight:'bold',color:'#4f46e5'}}>{inventions.length}</p><p style={{fontSize:8,color:sub}}>Total Inventions</p></div>
      <div style={{background:cb,borderRadius:8,padding:10,textAlign:'center'}}><p style={{fontSize:16,fontWeight:'bold',color:'#16a34a'}}>{protectedCount}</p><p style={{fontSize:8,color:sub}}>Protected</p></div>
      <div style={{background:cb,borderRadius:8,padding:10,textAlign:'center'}}><p style={{fontSize:16,fontWeight:'bold',color:'#f59e0b'}}>{draftCount}</p><p style={{fontSize:8,color:sub}}>Drafts</p></div>
      <div style={{background:cb,borderRadius:8,padding:10,textAlign:'center'}}><p style={{fontSize:16,fontWeight:'bold',color:'#4f46e5'}}>${totalValue.toLocaleString()}</p><p style={{fontSize:8,color:sub}}>Total Value</p></div>
      <div style={{background:cb,borderRadius:8,padding:10,textAlign:'center'}}><p style={{fontSize:12,fontWeight:'bold',color:txt,fontFamily:'monospace'}}>{hash.slice(0,12)}...</p><p style={{fontSize:8,color:sub}}>Integrity Hash</p></div>
    </div>

    {view==='table' && <>
      <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:10}}>
        <input placeholder="Search records..." value={search} onChange={e=>setSearch(e.target.value)} style={{flex:1,minWidth:150,padding:8,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:cb,color:txt,fontSize:11}} />
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} style={{padding:8,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:cb,color:txt,fontSize:11}}><option>All</option><option>protected</option><option>draft</option></select>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{padding:8,borderRadius:8,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:cb,color:txt,fontSize:11}}><option value="newest">Newest</option><option value="oldest">Oldest</option><option value="funding">Highest Funded</option></select>
        <button onClick={()=>exportData('csv')} style={{padding:'8px 12px',borderRadius:8,background:'#16a34a',color:'white',border:'none',cursor:'pointer',fontSize:10}}>📥 CSV</button>
        <button onClick={()=>exportData('json')} style={{padding:'8px 12px',borderRadius:8,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontSize:10}}>📥 JSON</button>
        <button onClick={()=>exportData('txt')} style={{padding:'8px 12px',borderRadius:8,background:'#6b7280',color:'white',border:'none',cursor:'pointer',fontSize:10}}>📥 TXT</button>
      </div>
      <div style={{background:cb,borderRadius:10,overflow:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:10}}>
          <thead><tr style={{background:dark?'#111827':'#f9fafb'}}><th style={{padding:'8px 10px',textAlign:'left',color:txt}}>Title</th><th style={{padding:'8px 10px',textAlign:'left',color:txt}}>Inventor</th><th style={{padding:'8px 10px',textAlign:'left',color:txt}}>Status</th><th style={{padding:'8px 10px',textAlign:'left',color:txt}}>Funding</th><th style={{padding:'8px 10px',textAlign:'left',color:txt}}>Date</th></tr></thead>
          <tbody>{filtered.map(i=><tr key={i.id} style={{borderTop:'1px solid '+(dark?'#374151':'#e5e7eb')}}><td style={{padding:'6px 10px',color:'#4f46e5',cursor:'pointer'}} onClick={()=>window.location.href=`/vault/${i.id}`}>{i.title}</td><td style={{padding:'6px 10px',color:txt}}>{i.anonymous?'🕵️':i.inventorName}</td><td style={{padding:'6px 10px'}}><span style={{padding:'2px 6px',borderRadius:9999,fontSize:8,fontWeight:'bold',background:i.status==='protected'?'#dcfce7':'#fef9c3',color:i.status==='protected'?'#15803d':'#a16207'}}>{i.status}</span></td><td style={{padding:'6px 10px',color:'#4f46e5',fontWeight:'bold'}}>{i.funding}</td><td style={{padding:'6px 10px',color:sub}}>{i.createdAt?.split('T')[0]}</td></tr>)}</tbody>
        </table>
      </div></>}

    {view==='stats' && <div>
      <div style={{background:cb,borderRadius:12,padding:16,marginBottom:12}}>
        <h3 style={{fontSize:14,fontWeight:'600',color:txt,marginBottom:10}}>📈 Growth Over Time</h3>
        <div style={{display:'flex',alignItems:'flex-end',gap:12,height:120}}>
          {monthlyGrowth.map((m,i)=><div key={i} style={{flex:1,textAlign:'center'}}><div style={{background:'#4f46e5',borderRadius:'4px 4px 0 0',height:m.c===0?8:m.c===1?40:80,marginBottom:4}}></div><span style={{fontSize:8,color:sub}}>{m.m}</span></div>)}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:10}}>
        <div style={{background:cb,borderRadius:10,padding:14}}><h3 style={{fontSize:12,fontWeight:'600',color:txt,marginBottom:8}}>📊 Status Breakdown</h3><div style={{display:'flex',height:8,borderRadius:4,overflow:'hidden',marginBottom:4}}><div style={{background:'#16a34a',width:(protectedCount/inventions.length)*100+'%'}}></div><div style={{background:'#f59e0b',width:(draftCount/inventions.length)*100+'%'}}></div></div><div style={{display:'flex',justifyContent:'space-between',fontSize:9}}><span style={{color:'#16a34a'}}>Protected: {protectedCount}</span><span style={{color:'#f59e0b'}}>Draft: {draftCount}</span></div></div>
        <div style={{background:cb,borderRadius:10,padding:14}}><h3 style={{fontSize:12,fontWeight:'600',color:txt,marginBottom:8}}>🔗 Blockchain</h3><p style={{fontSize:20,fontWeight:'bold',color:'#4f46e5'}}>{inventions.filter(i=>i.blockchainAnchored).length}</p><p style={{fontSize:9,color:sub}}>Anchored inventions</p></div>
      </div>
    </div>}

    {view==='log' && <div style={{background:cb,borderRadius:12,padding:16}}>
      <h3 style={{fontSize:14,fontWeight:'600',color:txt,marginBottom:10}}>📋 Audit Log</h3>
      {inventions.flatMap(i=>(i.activities||[]).map(a=>({...a,invention:i.title}))).slice(0,20).map((a,i)=><div key={i} style={{padding:'6px 0',borderBottom:i<19?'1px solid '+(dark?'#374151':'#e5e7eb'):'none',fontSize:10,color:sub}}><b style={{color:'#4f46e5'}}>{a.invention}</b>: {a.text} · {a.time}</div>)}
    </div>}
  </div></div>
}
