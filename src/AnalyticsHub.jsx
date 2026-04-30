import React, { useState } from 'react'

export default function AnalyticsHub({ inventions, lang, dark }) {
  const [timeframe, setTimeframe] = useState('year')
  const [view, setView] = useState('overview')
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#9ca3af':'#6b7280'
  
  const totalRaised = inventions.reduce((s,i)=>s+(i.crowdfunding?.raised||0),0)
  const totalFees = inventions.reduce((s,i)=>s+Math.floor((i.crowdfunding?.raised||0)*0.05),0)
  const activeCampaigns = inventions.filter(i=>i.crowdfunding?.active).length
  const totalBackers = inventions.reduce((s,i)=>s+(i.crowdfunding?.backers||0),0)
  const protectedCount = inventions.filter(i=>i.status==='protected').length
  const draftCount = inventions.filter(i=>i.status==='draft').length
  
  const monthlyData = [
    {m:'Jan',raised:5000,fees:250,users:12,inventions:1,backers:45},
    {m:'Feb',raised:12000,fees:600,users:28,inventions:2,backers:89},
    {m:'Mar',raised:8000,fees:400,users:35,inventions:2,backers:67},
    {m:'Apr',raised:15000,fees:750,users:52,inventions:3,backers:134},
    {m:'May',raised:32000,fees:1600,users:78,inventions:4,backers:210},
  ]
  const maxRaised = Math.max(...monthlyData.map(d=>d.raised))
  
  const categoryData = {}
  inventions.forEach(i=>{const t=i.tag||'Other'; categoryData[t]=(categoryData[t]||0)+1})
  const categories = Object.entries(categoryData).sort((a,b)=>b[1]-a[1])
  
  const funnelData = [
    {stage:'Visitors',count:1500,color:'#4f46e5'},
    {stage:'Signed Up',count:78,color:'#7c3aed'},
    {stage:'Submitted Invention',count:inventions.length,color:'#a78bfa'},
    {stage:'Started Campaign',count:activeCampaigns,color:'#c4b5fd'},
    {stage:'Funded',count:inventions.filter(i=>(i.crowdfunding?.raised||0)>0).length,color:'#16a34a'},
  ]
  
  const exportCSV = () => {
    const csv = 'Month,Raised,Fees,New Users,Inventions,Backers\n'+monthlyData.map(d=>`${d.m},${d.raised},${d.fees},${d.users},${d.inventions},${d.backers}`).join('\n')
    const blob = new Blob([csv],{type:'text/csv'})
    const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='analytics_report.csv'; a.click()
  }
  
  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:1100,margin:'0 auto'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8,marginBottom:16}}>
      <h1 style={{fontSize:26,fontWeight:'bold',color:txt}}>📊 Analytics Hub</h1>
      <div style={{display:'flex',gap:6}}>
        {['overview','funnel','categories','trends'].map(v=><button key={v} onClick={()=>setView(v)} style={{padding:'6px 14px',borderRadius:16,border:'none',background:view===v?'#4f46e5':dark?'#1f2937':'white',color:view===v?'white':txt,cursor:'pointer',fontSize:11,textTransform:'capitalize'}}>{v}</button>)}
        <button onClick={exportCSV} style={{padding:'6px 14px',borderRadius:16,background:'#16a34a',color:'white',border:'none',cursor:'pointer',fontSize:11}}>📥 CSV</button>
        <select value={timeframe} onChange={e=>setTimeframe(e.target.value)} style={{padding:'6px',borderRadius:16,border:'1px solid '+(dark?'#374151':'#d1d5db'),background:cb,color:txt,fontSize:11}}>
          <option value="week">Week</option><option value="month">Month</option><option value="year">Year</option><option value="all">All Time</option></select>
      </div>
    </div>

    {view==='overview' && <>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(150px, 1fr))',gap:8,marginBottom:16}}>
        <div style={{background:cb,borderRadius:12,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#16a34a'}}>${totalRaised.toLocaleString()}</p><p style={{fontSize:9,color:sub}}>Total Raised</p></div>
        <div style={{background:cb,borderRadius:12,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#4f46e5'}}>${totalFees.toLocaleString()}</p><p style={{fontSize:9,color:sub}}>Platform Fees</p></div>
        <div style={{background:cb,borderRadius:12,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:txt}}>{activeCampaigns}</p><p style={{fontSize:9,color:sub}}>Active Campaigns</p></div>
        <div style={{background:cb,borderRadius:12,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:txt}}>{totalBackers}</p><p style={{fontSize:9,color:sub}}>Total Backers</p></div>
        <div style={{background:cb,borderRadius:12,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#15803d'}}>{protectedCount}</p><p style={{fontSize:9,color:sub}}>Protected</p></div>
        <div style={{background:cb,borderRadius:12,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#f59e0b'}}>{draftCount}</p><p style={{fontSize:9,color:sub}}>Drafts</p></div>
      </div>

      <div style={{background:cb,borderRadius:12,padding:16,marginBottom:16}}>
        <h3 style={{fontSize:14,fontWeight:'600',color:txt,marginBottom:12}}>📈 Revenue Trend</h3>
        <div style={{display:'flex',alignItems:'flex-end',gap:10,height:180}}>
          {monthlyData.map((d,i)=><div key={i} style={{flex:1,textAlign:'center'}}>
            <div style={{background:'linear-gradient(180deg, #4f46e5, #818cf8)',borderRadius:'4px 4px 0 0',height:(d.raised/maxRaised)*150,marginBottom:4,transition:'height 0.5s'}}></div>
            <span style={{fontSize:9,color:sub}}>{d.m}</span>
            <span style={{fontSize:8,color:'#4f46e5',fontWeight:'bold'}}>${(d.raised/1000).toFixed(0)}k</span></div>)}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:12}}>
        <div style={{background:cb,borderRadius:12,padding:16}}>
          <h3 style={{fontSize:13,fontWeight:'600',color:txt,marginBottom:10}}>👥 User Growth</h3>
          <div style={{display:'flex',alignItems:'flex-end',gap:8,height:100}}>
            {monthlyData.map((d,i)=><div key={i} style={{flex:1,textAlign:'center'}}><div style={{background:'#4f46e5',borderRadius:'4px 4px 0 0',height:d.users,minHeight:4}}></div><span style={{fontSize:7,color:sub}}>{d.m}</span></div>)}
          </div>
        </div>
        <div style={{background:cb,borderRadius:12,padding:16}}>
          <h3 style={{fontSize:13,fontWeight:'600',color:txt,marginBottom:10}}>💰 Revenue Breakdown</h3>
          {[{label:'Crowdfunding Fees',value:totalFees,color:'#4f46e5'},{label:'Boost Revenue ($25/listing)',value:inventions.filter(i=>i.featured).length*25,color:'#f59e0b'},{label:'Notarization ($5/ea)',value:inventions.filter(i=>i.blockchainAnchored).length*5,color:'#16a34a'}].map((item,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:i<2?'1px solid '+(dark?'#374151':'#e5e7eb'):'none',fontSize:11}}><span style={{color:txt}}>{item.label}</span><span style={{color:item.color,fontWeight:'bold'}}>${item.value.toLocaleString()}</span></div>)}
        </div>
      </div>
    </>}

    {view==='funnel' && <div style={{background:cb,borderRadius:12,padding:20}}>
      <h3 style={{fontSize:14,fontWeight:'600',color:txt,marginBottom:16}}>🎯 Conversion Funnel</h3>
      <div style={{display:'flex',flexDirection:'column',gap:6}}>
        {funnelData.map((f,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontSize:11,color:txt,minWidth:120}}>{f.stage}</span>
          <div style={{flex:1,background:dark?'#374151':'#e5e7eb',borderRadius:9999,height:20,overflow:'hidden'}}>
            <div style={{background:f.color,height:20,borderRadius:9999,width:(f.count/funnelData[0].count)*100+'%',display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:8,transition:'width 0.5s'}}>
              <span style={{fontSize:10,color:'white',fontWeight:'bold'}}>{f.count}</span></div></div>
              <span style={{fontSize:9,color:sub}}>{i===0?'100%':Math.round((f.count/funnelData[0].count)*100)+'%'}</span></div>)}
      </div>
      <p style={{fontSize:10,color:sub,marginTop:12,textAlign:'center'}}>Conversion rate: {Math.round((funnelData[4].count/funnelData[0].count)*100)}% from visitor to funded</p>
    </div>}

    {view==='categories' && <div style={{background:cb,borderRadius:12,padding:20}}>
      <h3 style={{fontSize:14,fontWeight:'600',color:txt,marginBottom:12}}>🏷️ Inventions by Category</h3>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {categories.map(([cat,count])=><div key={cat} style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontSize:11,color:txt,minWidth:100}}>{cat}</span>
          <div style={{flex:1,background:dark?'#374151':'#e5e7eb',borderRadius:9999,height:14,overflow:'hidden'}}>
            <div style={{background:'#4f46e5',height:14,borderRadius:9999,width:(count/inventions.length)*100+'%',display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:6}}>
              <span style={{fontSize:9,color:'white',fontWeight:'bold'}}>{count}</span></div></div>
              <span style={{fontSize:9,color:sub}}>{Math.round((count/inventions.length)*100)}%</span></div>)}
      </div>
    </div>}

    {view==='trends' && <div style={{background:cb,borderRadius:12,padding:20}}>
      <h3 style={{fontSize:14,fontWeight:'600',color:txt,marginBottom:16}}>📈 Monthly Trends</h3>
      <div style={{overflow:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:11}}>
          <thead><tr style={{background:dark?'#111827':'#f9fafb'}}><th style={{padding:'8px 10px',textAlign:'left',color:txt}}>Month</th><th style={{padding:'8px 10px',textAlign:'right',color:txt}}>Raised</th><th style={{padding:'8px 10px',textAlign:'right',color:txt}}>Fees</th><th style={{padding:'8px 10px',textAlign:'right',color:txt}}>New Users</th><th style={{padding:'8px 10px',textAlign:'right',color:txt}}>Inventions</th><th style={{padding:'8px 10px',textAlign:'right',color:txt}}>Backers</th><th style={{padding:'8px 10px',textAlign:'right',color:txt}}>Growth</th></tr></thead>
          <tbody>{monthlyData.map((d,i)=><tr key={i} style={{borderTop:'1px solid '+(dark?'#374151':'#e5e7eb')}}><td style={{padding:'8px 10px',color:txt,fontWeight:600}}>{d.m}</td><td style={{padding:'8px 10px',textAlign:'right',color:'#16a34a',fontWeight:'bold'}}>${d.raised.toLocaleString()}</td><td style={{padding:'8px 10px',textAlign:'right',color:'#4f46e5'}}>${d.fees}</td><td style={{padding:'8px 10px',textAlign:'right',color:txt}}>{d.users}</td><td style={{padding:'8px 10px',textAlign:'right',color:txt}}>{d.inventions}</td><td style={{padding:'8px 10px',textAlign:'right',color:txt}}>{d.backers}</td><td style={{padding:'8px 10px',textAlign:'right',color:i===0?'#6b7280':d.raised>monthlyData[i-1].raised?'#16a34a':'#dc2626',fontWeight:'bold'}}>{i===0?'-':d.raised>monthlyData[i-1].raised?'↑':'↓'} {i===0?'':Math.round(Math.abs((d.raised-monthlyData[i-1].raised)/monthlyData[i-1].raised*100))+'%'}</td></tr>)}</tbody></table>
      </div>
    </div>}
  </div></div>
}
