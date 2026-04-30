import React, { useState, useRef, useEffect } from 'react'

function getResponse(query) {
  const ql = query.toLowerCase().trim()
  
  if (ql.length < 3) return "Tell me more! I'm listening."
  if (/^(wow|great|nice|awesome|amazing|cool|fantastic|excellent|love|brilliant|superb|perfect)/.test(ql)) return "Thank you so much! That really means a lot. I'm here to help anytime you need me. What would you like to explore next?"
  if (/^(ok|okay|yes|yeah|yep|sure|alright|fine|hmm|mmm|oh|ah|i see|right|got it)/.test(ql)) return "Got it! Is there something specific you'd like to know more about? I can walk you through protection features, crowdfunding, or submitting your invention."
  if (/^(no|nope|nah|not really|nothing)/.test(ql)) return "No worries at all! Take your time. I'm here whenever you're ready."
  if (/^(sorry|apologize|my bad|excuse)/.test(ql)) return "No need to apologize! I'm here to help, not judge. What can I do for you?"
  if (/^(help|assist|support|guide)/.test(ql)) return "Absolutely! I can help with protecting inventions, crowdfunding, fee waivers, submitting ideas, finding investors, team building, and more. Pick any topic!"
  if (ql.includes("how are you") || ql.includes("how do you do") || ql.includes("how's it going")) return "I'm doing great, thanks for asking! Ready and excited to help inventors like you. How about you — how's your invention journey going?"
  if (ql.includes("good morning")) return "Good morning! Hope you're ready for a productive day. What invention challenge can I help you tackle today?"
  if (ql.includes("good afternoon")) return "Good afternoon! Perfect time to work on your ideas. What can I help you with?"
  if (ql.includes("good evening") || ql.includes("good night")) return "Good evening! Still working on your inventions? That's dedication! How can I help?"
  if (ql.includes("bye") || ql.includes("goodbye") || ql.includes("see you") || ql.includes("later") || ql.includes("peace")) return "Goodbye! Come back anytime — I'll be here. And remember, your ideas deserve to be protected!"
  if (ql.includes("tell me more") || ql.includes("explain more") || ql.includes("go on") || ql.includes("elaborate")) return "I'd love to dive deeper! Which topic interests you most — protection features, crowdfunding strategies, how to submit an invention, or finding investors? Pick one and I'll give you all the details!"
  if (ql.includes("i have an idea") || ql.includes("i want to invent") || ql.includes("i created")) return "That's exciting! There's nothing quite like the spark of a new idea. Tell me a bit about it — is it a physical product, software, or something else? I can guide you on the best way to protect and fund it."
  if (ql.includes("i'm new") || ql.includes("first time") || ql.includes("just started") || ql.includes("beginner")) return "Welcome aboard! Starting out can feel overwhelming but don't worry — I'll make it simple. Quick start: 1. Add your invention (tap +) 2. Set up Dead Man Switch 3. Share your link to get contributors. That's it! Want me to explain any of these steps?"
  if (ql.includes("thanks") || ql.includes("thank you") || ql.includes("appreciate") || ql.includes("grateful")) return "You're very welcome! It makes me happy to help. Is there anything else you'd like to know — maybe about crowdfunding, team building, or protection features?"
  if (ql.includes("i don't know") || ql.includes("not sure") || ql.includes("confused") || ql.includes("lost")) return "No problem at all — I've got you! Most inventors begin by protecting their idea first, then raising funds. Which of these interests you more? Or I can just walk you through the whole platform step by step."
  if (ql.includes("tell me a story") || ql.includes("success story") || ql.includes("example")) return "I'd love to share a story! There was an inventor from Kitale, Kenya who used InventShield to protect his solar water purifier design. He raised KES 32,000 through crowdfunding, added two contributors, and now his invention is blockchain-verified. Your story could be next!"
  
  const q = ql

  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('howdy'))
    return "Hey there! I'm your InventShield assistant. Think of me as a friendly guide who helps inventors protect their brilliant ideas and get them funded. What brings you here today?"
  
  if (q.includes('protect') || q.includes('panic') || q.includes('dead man') || q.includes('switch'))
    return "Great question! Protecting your invention is what we do best.\n\nImagine this — you have a brilliant idea but you're worried someone might steal it. Here's how InventShield keeps you safe:\n\n1. Dead Man Switch — If you ever go silent, your vault automatically publishes your invention so the world knows it was yours. It's like a digital will for your ideas.\n\n2. Panic Button — One tap and your vault locks instantly. Your trusted contacts get alerted, and proof of your invention is broadcast publicly. Nobody can silence you.\n\n3. Blockchain Anchoring — For just $5, we timestamp your invention on the blockchain. That's permanent proof you can use in court.\n\n4. Anonymous Mode — Submit without revealing your identity. Your secret stays safe.\n\nWould you like me to explain any of these in more detail?"
  
  if (q.includes('crowdfunding') || q.includes('fund') || q.includes('campaign') || q.includes('donate') || q.includes('raise money'))
    return "Ah, you want to raise funds for your invention! That's exciting!\n\nHere's the simple version: You set a goal amount and share your campaign link. Supporters contribute directly. When you reach your goal, the funds are released to you.\n\nThe best part? We only take a tiny 5% platform fee — and if you truly can't afford it, we waive the fee completely. Apply in your vault and it's approved automatically.\n\nMost inventors on our platform keep 95-100% of everything they raise. Compare that to other platforms that take 8-15%!\n\nReady to start your campaign? Head to your invention vault and click Start Crowdfunding."
  
  if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('free') || q.includes('waiver') || q.includes('money'))
    return "I love this question because it shows you're thinking practically!\n\nInventShield was built with a simple belief — money should never stop a great idea. Here's the honest breakdown:\n\n• Crowdfunding fee: Just 5% (most platforms charge 8-15%)\n• Can't afford it? Apply for a fee waiver. It auto-approves in 5 seconds. You pay 0%.\n• Boost your listing: $25/week to get featured on the homepage\n• Blockchain proof: $5 one-time to timestamp your invention forever\n• Everything else is FREE — submitting, vault storage, team management, messaging\n\nWe make money when you make money. If you have nothing, you pay nothing. Fair enough?"
  
  if (q.includes('invent') || q.includes('submit') || q.includes('add') || q.includes('create') || q.includes('new idea') || q.includes('start'))
    return "So you have an idea? Let's get it protected right now!\n\nStep 1: Tap Add Invention in the top menu\nStep 2: Give it a name, describe what it does, and choose a category\nStep 3: If you want to stay anonymous, just check the box\nStep 4: Hit submit — boom! You now have a secure vault for your invention.\n\nFrom there you can upload documents, add team members, start crowdfunding, or activate protection features.\n\nIt takes about 30 seconds. Want to give it a try right now?"
  
  if (q.includes('investor') || q.includes('invest') || q.includes('browse') || q.includes('find'))
    return "Looking for investors? We've got you!\n\nVisit the Investors portal and you'll see all the inventions currently seeking funding. You can filter by category — Eco-friendly, AI, CleanTech — and see exactly how much each project has raised, how big the team is, and whether it's blockchain-verified.\n\nIf you're an inventor, investors can express interest in YOUR invention. If you're an investor, you can browse and connect with inventors directly.\n\nThere's a small 3% fee on successful connections, but only when a deal actually happens. No upfront costs."
  
  if (q.includes('blockchain') || q.includes('anchor') || q.includes('crypto') || q.includes('notarize') || q.includes('timestamp'))
    return "Blockchain anchoring is like getting a digital notary stamp — except it's permanent, unchangeable, and recognized worldwide.\n\nHere's why it matters: Let's say someone steals your idea and files a patent. With blockchain anchoring, you have an immutable timestamp proving EXACTLY when you created your invention. That's court-admissible evidence.\n\nIt costs just $5 — a one-time payment for lifelong protection. Think of it as insurance for your idea."
  
  if (q.includes('language') || q.includes('translate') || q.includes('swahili') || q.includes('spanish') || q.includes('french'))
    return "We speak your language! InventShield works in English, Spanish, French, Swahili, and Chinese. Just tap the language selector in the top navigation bar. Your preference is saved automatically. Tunazungumza Kiswahili pia!"
  
  if (q.includes('contributor') || q.includes('team') || q.includes('collab') || q.includes('join') || q.includes('share'))
    return "Invention is rarely a solo journey — that's why we built collaboration tools!\n\nShare your invention link with people you trust. They request to join from the Discover page. You assign roles — Inventor, Contributor, Reviewer — and set share percentages. Everyone's contributions are tracked on the blockchain. No disputes about who did what."
  
  if (q.includes('what is inventshield') || q.includes('about inventshield') || q.includes('inventshield') || q.includes('explain'))
    return "InventShield is a home for inventors.\n\nIn many parts of the world, brilliant people have amazing ideas but no way to protect them. Patent lawyers cost thousands. Investors are hard to find. Corrupt people steal ideas knowing the inventor can't fight back.\n\nInventShield changes that. We give every inventor the tools to protect, fund, and collaborate on their inventions — with fee waivers for those who need them. Over 35 features, 5 languages, and built with love in Kenya."
  
  if (q.includes('who are you') || q.includes('what are you') || q.includes('your name'))
    return "I'm your InventShield assistant! I was built to help inventors like you navigate the world of idea protection, crowdfunding, and collaboration. I was created by Clinton Rotich, a Kenyan developer who believes that great ideas shouldn't be stolen or silenced. So think of me as your friendly, always-available guide. What can I help you with?"
  
  if (q.includes('weather') || q.includes('time') || q.includes('date') || q.includes('today'))
    return "Sure! Today is " + new Date().toLocaleDateString('en-US', {weekday:'long', year:'numeric', month:'long', day:'numeric'}) + ". The time is " + new Date().toLocaleTimeString() + ". By the way, if you're into farming, check out our sister app FarmDirect! It has live weather for all 47 Kenyan counties."
  
  if (q.includes('farm') || q.includes('crop') || q.includes('agriculture') || q.includes('farmdirect'))
    return "Oh, you know about FarmDirect? That's our sister platform! It's like InventShield but for farmers — crop marketplace, livestock trading, delivery tracking, weather for all 47 counties, and video calling. Both apps were built by Clinton Rotich in Kenya. Check it on GitHub: Clinton18rotich/FarmDirect-React"
  
  if (q.includes('joke') || q.includes('funny') || q.includes('laugh'))
    return "Why did the inventor bring a ladder to the meeting? Because they wanted to take their idea to the NEXT LEVEL! Okay, that was bad. Let me make it up to you — ask me something useful about InventShield!"

  if (q.includes('capital of') || q.includes('capital city'))
    return "I know this one! Kenya: Nairobi, USA: Washington DC, UK: London, France: Paris, China: Beijing, India: New Delhi, Nigeria: Abuja, South Africa: Pretoria. Fun fact: Nairobi is the only capital city in the world with a national park!"

  return "That's an interesting topic! While I'm really good at InventShield features, let me suggest what I can definitely help with: protecting inventions, crowdfunding, fee waivers, submitting ideas, finding investors, team building, or language settings. Pick any of these — or ask 'What is InventShield?' for the full story!"
}

export default function GeminiChat({ dark }) {
  const [messages, setMessages] = useState([{role:'ai', text:"Hey there! I'm your InventShield assistant. I can help you protect your inventions, raise funds, find investors, and much more. What would you like to know?"}])
  const [input, setInput] = useState(''); const [thinking, setThinking] = useState(false)
  const bg=dark?'#111827':'#f9fafb'; const cb=dark?'#1f2937':'white'; const txt=dark?'#f9fafb':'#111827'
  const msgRef = useRef(null)
  
  useEffect(() => { msgRef.current?.scrollIntoView({behavior:'smooth'}) }, [messages])
  
  const ask = () => {
    if(!input.trim()) return
    setMessages(prev => [...prev, {role:'user', text:input}])
    const q = input; setInput(''); setThinking(true)
    setTimeout(() => {
      setMessages(prev => [...prev, {role:'ai', text:getResponse(q)}])
      setThinking(false)
    }, 600 + Math.random() * 400)
  }

  return <div style={{minHeight:'100vh',background:bg,padding:'16px 16px 80px'}}><div style={{maxWidth:700,margin:'0 auto'}}>
    <h1 style={{fontSize:24,fontWeight:'bold',color:txt,marginBottom:4}}>InventShield AI</h1>
    <p style={{color:dark?'#9ca3af':'#6b7280',fontSize:12,marginBottom:12}}>Friendly • Instant • Always here to help</p>
    <div style={{background:cb,borderRadius:16,padding:16,minHeight:350,maxHeight:450,overflowY:'auto',marginBottom:12}}>
      {messages.map((m,i)=><div key={i} style={{alignSelf:m.role==='user'?'flex-end':'flex-start',maxWidth:'90%',background:m.role==='user'?'#4f46e5':dark?'#111827':'#f0f0ff',color:m.role==='user'?'white':txt,padding:'12px 16px',borderRadius:16,fontSize:13,marginBottom:8,lineHeight:1.6,whiteSpace:'pre-wrap'}}>{m.text}</div>)}
      {thinking&&<div style={{color:'#9ca3af',fontSize:12,fontStyle:'italic',padding:'8px 16px'}}>Typing...</div>}
      <div ref={msgRef} />
    </div>
    <div style={{display:'flex',gap:6}}>
      <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&ask()} placeholder="Ask me anything..." style={{flex:1,padding:14,borderRadius:24,border:'1px solid #d1d5db',fontSize:13,background:cb,color:txt,boxSizing:'border-box'}} />
      <button onClick={ask} style={{padding:'14px 22px',borderRadius:24,background:'#4f46e5',color:'white',border:'none',cursor:'pointer',fontWeight:600,fontSize:13}}>Send</button>
    </div>
  </div></div>
}
