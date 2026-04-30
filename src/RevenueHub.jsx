import React, { useState } from 'react'

export default function RevenueHub({ inventions, lang, dark }) {
  const [timeframe, setTimeframe] = useState('all')
  const [view, setView] = useState('overview')
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'; const sub=dark?'#9ca3af':'#6b7280'
  
  const active = inventions.filter(i=>i.crowdfunding?.active)
  const totalRaised = inventions.reduce((s,i)=>s+(i.crowdfunding?.raised||0),0)
  const totalFees = inventions.reduce((s,i)=>s+Math.floor((i.crowdfunding?.raised||0)*(i.feeWaiver?0:0.05)),0)
  const totalPayouts = totalRaised - totalFees
  const boostRevenue = inventions.filter(i=>i.featured).length * 25
  const notarizeRevenue = inventions.filter(i=>i.blockchainAnchored).length * 5
  const monthlyData = [{month:'Jan',raised:5000,fees:250},{month:'Feb',raised:12000,fees:600},{month:'Mar',raised:8000,fees:400},{month:'Apr',raised:15000,fees:750},{month:'May',raised:32000,fees:1600}]
  const maxRaised = Math.max(...monthlyData.map(d=>d.raised))
  
  const topInventions = [...inventions].sort((a,b)=>(b.crowdfunding?.raised||0)-(a.crowdfunding?.raised||0)).slice(0,5)
  const countryData = [{country:'Kenya',amount:18500},{country:'Nigeria',amount:5200},{country:'India',amount:3200},{country:'USA',amount:2800},{country:'UK',amount:1500}]
  
  const exportCSV = () => {
    const csv = 'Invention,Funding,Raised,Fees,Status\n' + inventions.map(i=>`${i.title},${i.funding},${i.crowdfunding?.raised||0},${Math.floor((i.crowdfunding?.raised||0)*0.05)},${i.status}`).join('\n')
    const blob = new Blob([csv],{type:'text/csv'})
    const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='revenue_report.csv'; a.click()
  }
  
  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:1000,margin:'0 auto'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8,marginBottom:16}}>
      <h1 style={{fontSize:26,fontWeight:'bold',color:txt}}>💰 Revenue Hub</h1>
      <div style={{display:'flex',gap:6}}>
        {['overview','chart','transactions','top'].map(v=><button key={v} onClick={()=>setView(v)} style={{padding:'6px 14px',borderRadius:16,border:'none',background:view===v?'#4f46e5':dark?'#1f2937':'white',color:view===v?'white':txt,cursor:'pointer',fontSize:11,textTransform:'capitalize'}}>{v}</button>)}
        <button onClick={exportCSV} style={{padding:'6px 14px',borderRadius:16,background:'#16a34a',color:'white',border:'none',cursor:'pointer',fontSize:11}}>📥 Export CSV</button>
      </div>
    </div>

    {view==='overview' && <>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))',gap:8,marginBottom:16}}>
        <div style={{background:cb,borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#16a34a'}}>${totalRaised.toLocaleString()}</p><p style={{fontSize:9,color:sub}}>Total Raised</p></div>
        <div style={{background:cb,borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#4f46e5'}}>${totalFees.toLocaleString()}</p><p style={{fontSize:9,color:sub}}>Platform Fees</p></div>
        <div style={{background:cb,borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#15803d'}}>${totalPayouts.toLocaleString()}</p><p style={{fontSize:9,color:sub}}>Inventor Payouts</p></div>
        <div style={{background:cb,borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#92400e'}}>${boostRevenue}</p><p style={{fontSize:9,color:sub}}>Boost Revenue</p></div>
        <div style={{background:cb,borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:'#4338ca'}}>${notarizeRevenue}</p><p style={{fontSize:9,color:sub}}>Notarize Revenue</p></div>
        <div style={{background:cb,borderRadius:10,padding:14,textAlign:'center'}}><p style={{fontSize:20,fontWeight:'bold',color:txt}}>{active.length}</p><p style={{fontSize:9,color:sub}}>Active Campaigns</p></div>
      </div>

      <div style={{background:cb,borderRadius:12,padding:16,marginBottom:16}}>
        <h3 style={{fontSize:14,fontWeight:'600',color:txt,marginBottom:12}}>📊 Monthly Revenue</h3>
        <div style={{display:'flex',alignItems:'flex-end',gap:8,height:150,paddingTop:20}}>
          {monthlyData.map((d,i)=><div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div style={{width:'100%',background:'#4f46e5',borderRadius:'4px 4px 0 0',height:(d.raised/maxRaised)*100,marginBottom:4,minHeight:4}}></div>
            <span style={{fontSize:8,color:sub}}>{d.month}</span>
            <span style={{fontSize:7,color:'#4f46e5',fontWeight:'bold'}}>${d.raised/1000}k</span>
          </div>)}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:12,marginBottom:16}}>
        <div style={{background:cb,borderRadius:12,padding:14}}>
          <h3 style={{fontSize:13,fontWeight:'600',color:txt,marginBottom:8}}>🌍 Revenue by Country</h3>
          {countryData.map((c,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:11,padding:'4px 0',borderBottom:i<4?'1px solid '+(dark?'#374151':'#e5e7eb'):'none'}}><span style={{color:txt}}>{c.country}</span><span style={{color:'#4f46e5',fontWeight:'bold'}}>${c.amount.toLocaleString()}</span></div>)}
        </div>
        <div style={{background:cb,borderRadius:12,padding:14}}>
          <h3 style={{fontSize:13,fontWeight:'600',color:txt,marginBottom:8}}>📈 Growth Rate</h3>
          <p style={{fontSize:28,fontWeight:'bold',color:'#16a34a',textAlign:'center'}}>+540%</p>
          <p style={{fontSize:10,color:sub,textAlign:'center'}}>Month over month</p>
          <div style={{marginTop:8}}><div style={{display:'flex',justifyContent:'space-between',fontSize:10}}><span style={{color:sub}}>Apr</span><span style={{color:txt}}>$15K</span></div><div style={{display:'flex',justifyContent:'space-between',fontSize:10}}><span style={{color:sub}}>May</span><span style={{color:txt,fontWeight:'bold'}}>$32K</span></div></div>
        </div>
      </div>
    </>}

    {view==='chart' && <div style={{background:cb,borderRadius:12,padding:20}}>
      <h3 style={{fontSize:14,fontWeight:'600',color:txt,marginBottom:12}}>📊 Revenue Chart</h3>
      <div style={{display:'flex',alignItems:'flex-end',gap:12,height:200,paddingTop:20}}>
        {monthlyData.map((d,i)=><div key={i} style={{flex:1,textAlign:'center'}}>
          <div style={{background:'linear-gradient(180deg, #4f46e5, #818cf8)',borderRadius:'4px 4px 0 0',height:(d.raised/maxRaised)*160,marginBottom:4,transition:'height 0.5s'}}></div>
          <div style={{background:'#16a34a',borderRadius:'4px 4px 0 0',height:(d.fees/maxRaised)*160}}></div>
          <span style={{fontSize:8,color:sub}}>{d.month}</span></div>)}
      </div>
      <div style={{display:'flex',gap:16,justifyContent:'center',marginTop:8,fontSize:10}}>
        <span style={{color:'#4f46e5'}}>■ Raised</span><span style={{color:'#16a34a'}}>■ Fees</span></div>
    </div>}

    {view==='transactions' && <div style={{background:cb,borderRadius:12,padding:16}}>
      <h3 style={{fontSize:14,fontWeight:'600',color:txt,marginBottom:12}}>💳 Recent Transactions</h3>
      {inventions.filter(i=>i.crowdfunding?.raised>0).slice(0,10).map((i,idx)=><div key={idx} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:idx<9?'1px solid '+(dark?'#374151':'#e5e7eb'):'none',fontSize:11}}><div><span style={{fontWeight:600,color:txt}}>{i.title}</span><span style={{color:sub,marginLeft:8}}>{i.inventorName}</span></div><div style={{textAlign:'right'}}><span style={{color:'#16a34a',fontWeight:'bold'}}>${i.crowdfunding.raised.toLocaleString()}</span><span style={{color:sub,marginLeft:6}}>raised</span><span style={{color:'#4f46e5',marginLeft:8}}>Fee: ${Math.floor(i.crowdfunding.raised*0.05)}</span></div></div>)}
    </div>}

    {view==='top' && <div style={{background:cb,borderRadius:12,padding:16}}>
      <h3 style={{fontSize:14,fontWeight:'600',color:txt,marginBottom:12}}>🏆 Top Earning Inventions</h3>
      {topInventions.map((i,idx)=><div key={idx} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:idx<4?'1px solid '+(dark?'#374151':'#e5e7eb'):'none'}}>
        <span style={{fontSize:20}}>{idx===0?'🥇':idx===1?'🥈':idx===2?'🥉':'⭐'}</span>
        <div style={{flex:1}}><span style={{fontWeight:600,fontSize:12,color:txt}}>{i.title}</span><span style={{fontSize:10,color:sub,marginLeft:6}}>{i.inventorName}</span></div>
        <div style={{textAlign:'right'}}><span style={{fontWeight:'bold',color:'#16a34a'}}>${(i.crowdfunding?.raised||0).toLocaleString()}</span><span style={{fontSize:9,color:sub,display:'block'}}>raised</span></div>
        <div style={{width:80,background:dark?'#374151':'#e5e7eb',borderRadius:9999,height:6}}><div style={{background:'#4f46e5',height:6,borderRadius:9999,width:Math.min(100,((i.crowdfunding?.raised||0)/50000)*100)+'%'}}></div></div>
      </div>)}
    </div>}
  </div></div>
}
