import React, { useState } from 'react'

const steps = [
  { icon:'🏠', title:'Dashboard', text:'Your home base. See all your inventions, protection status, funding progress, and quick actions.' },
  { icon:'🔍', title:'Discover', text:'Browse inventions from other creators. Request to contribute to projects you believe in.' },
  { icon:'➕', title:'Add Invention', text:'Submit your idea in 30 seconds. Give it a name, describe it, and choose a category. You can stay anonymous.' },
  { icon:'🛡️', title:'Protection Center', text:'The most important page. Activate your Dead Man Switch and Panic Button to protect your ideas.' },
  { icon:'💬', title:'Messages', text:'Chat with contributors, investors, and mentors. Build your team and grow your invention.' },
  { icon:'💰', title:'Crowdfunding', text:'Start a campaign from your vault. Set a goal, share your link, and get funded. Fee waivers available!' },
  { icon:'🤖', title:'AI Assistant', text:'Ask me anything about InventShield. I can help with protection, funding, legal questions, and more.' },
  { icon:'⚖️', title:'Legal Hub', text:'Generate NDAs, check patentability, download filing templates, and connect with IP lawyers worldwide.' },
]

export default function TourGuide({ onClose }) {
  const [step, setStep] = useState(0)
  const s = steps[step]
  
  return (
    <div style={{
      position:'fixed', inset:0, zIndex:250,
      background:'rgba(0,0,0,0.85)',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:20
    }}>
      <div style={{
        background:'white', borderRadius:24, padding:28,
        maxWidth:380, width:'100%', textAlign:'center',
        boxShadow:'0 20px 60px rgba(0,0,0,0.5)',
        animation:'popInTour 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        <div style={{
          width:70, height:70, borderRadius:20,
          background:'linear-gradient(135deg, #4f46e5, #7c3aed)',
          display:'flex', alignItems:'center', justifyContent:'center',
          margin:'0 auto 16px', fontSize:32
        }}>
          {s.icon}
        </div>
        
        <h2 style={{fontSize:20, fontWeight:'bold', color:'#111827', marginBottom:8}}>
          {s.title}
        </h2>
        
        <p style={{color:'#4b5563', fontSize:14, lineHeight:1.7, marginBottom:24}}>
          {s.text}
        </p>
        
        <div style={{display:'flex', gap:5, justifyContent:'center', marginBottom:20}}>
          {steps.map((_, i) => (
            <div key={i} style={{
              height:4, borderRadius:2, transition:'all 0.3s ease',
              width: i === step ? 24 : 8,
              background: i === step ? '#4f46e5' : i < step ? '#a5b4fc' : '#e5e7eb'
            }} />
          ))}
        </div>
        
        <p style={{fontSize:11, color:'#9ca3af', marginBottom:16}}>
          Step {step + 1} of {steps.length}
        </p>
        
        <div style={{display:'flex', gap:8}}>
          <button onClick={onClose} style={{
            flex:1, padding:'12px', borderRadius:12,
            background:'#f3f4f6', border:'none', color:'#6b7280',
            cursor:'pointer', fontSize:13
          }}>
            Skip
          </button>
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(step + 1)} style={{
              flex:2, padding:'12px', borderRadius:12,
              background:'#4f46e5', border:'none', color:'white',
              cursor:'pointer', fontSize:13, fontWeight:600
            }}>
              Next: {steps[step + 1]?.title}
            </button>
          ) : (
            <button onClick={onClose} style={{
              flex:2, padding:'12px', borderRadius:12,
              background:'#16a34a', border:'none', color:'white',
              cursor:'pointer', fontSize:13, fontWeight:600
            }}>
              🎉 Complete Tour!
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
