import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const steps = [
  { page:'/', title:'Dashboard', text:'Your home. See all inventions, protection status, and funding.' },
  { page:'/discover', title:'Discover', text:'Browse inventions from other creators worldwide.' },
  { page:'/add', title:'Add Invention', text:'Submit your idea in 30 seconds.' },
  { page:'/protection', title:'Protection Center', text:'Activate Dead Man Switch + Panic Button.' },
  { page:'/smartai', title:'AI Assistant', text:'Ask me anything about InventShield!' },
]

export default function TourLauncher() {
  const [showTour, setShowTour] = useState(false)
  const nav = useNavigate()
  
  const startTour = () => {
    setShowTour(true)
    let i = 0
    nav(steps[i].page)
    setTimeout(() => {
      alert(steps[i].title + '\n\n' + steps[i].text + '\n\n(1 of ' + steps.length + ')')
      i++
      const interval = setInterval(() => {
        if (i >= steps.length) {
          clearInterval(interval)
          localStorage.setItem('inventshield_onboarded', '1')
          setShowTour(false)
          setTimeout(() => alert('Tour Complete! Enjoy InventShield.'), 300)
          return
        }
        nav(steps[i].page)
        setTimeout(() => {
          alert(steps[i].title + '\n\n' + steps[i].text + '\n\n(' + (i+1) + ' of ' + steps.length + ')')
          i++
        }, 400)
      }, 2500)
    }, 400)
  }
  
  return (
    <div style={{position:'fixed', bottom:100, right:20, zIndex:100}}>
      <button onClick={startTour} style={{
        padding:'12px 20px', borderRadius:30,
        background:'linear-gradient(135deg, #4f46e5, #7c3aed)',
        color:'white', border:'none', cursor:'pointer',
        fontSize:14, fontWeight:600,
        boxShadow:'0 4px 20px rgba(79,70,229,0.5)'
      }}>
        🎓 Take a Tour
      </button>
    </div>
  )
}
