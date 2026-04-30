import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SmartAIFloatingButton() {
  const nav = useNavigate()
  return (
    <div style={{position:'fixed',bottom:80,right:16,zIndex:150}}>
      <button onClick={()=>nav('/smartai')} style={{
        width:52,height:52,borderRadius:'50%',
        background:'linear-gradient(135deg, #4f46e5, #7c3aed)',
        color:'white',border:'none',
        boxShadow:'0 4px 15px rgba(79,70,229,0.4)',
        cursor:'pointer',fontSize:24,
        display:'flex',alignItems:'center',justifyContent:'center'
      }}>
        🤖
      </button>
    </div>
  )
}
