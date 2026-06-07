import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Mic, Send, Sparkles, Radio, ShieldCheck, Users, Wand2, Music2, Clock3, Heart, Play, Plus, BadgeCheck, Headphones, Share2, Disc3, MessageCircle } from 'lucide-react';
import './styles.css';

const prompts = [
  'I have 25 minutes before class. Calm my nerves but keep me alert.',
  'Make a rainy-night Hindi + indie session for deep work.',
  'I want gym tracks like my 2025 top songs, but fresher.',
  'Build a 3-person road trip vibe: Arijit + Afrobeats + no explicit songs.'
];

const sessionMap = {
  focus: {
    label: 'Focus Reset',
    title: '25-min Focus Reset',
    reason: 'Designed for low-friction concentration: familiar artists first, then two new discoveries, with no lyrical overload.',
    tracks: ['Night Changes - LoFi Edit', 'Kasoor - Acoustic', 'Sunset Lover', 'Aabaad Barbaad - Soft Mix'],
    metrics: ['25 min', '0 skips target', '2 discoveries', 'Safe volume cue']
  },
  gym: {
    label: 'Training Boost',
    title: '42-min Training Boost',
    reason: 'Uses your high-energy taste, adds new tracks in the same tempo band, and keeps momentum without repeated songs.',
    tracks: ['Believer', 'HUMBLE.', 'Tauba Tauba - Workout Mix', 'Blinding Lights'],
    metrics: ['42 min', '130-150 BPM', '4 energy ramps', 'Premium upsell moment']
  },
  social: {
    label: 'Group Blend',
    title: 'Road Trip Consensus Mix',
    reason: 'Balances conflicting tastes, removes explicit content, and explains tradeoffs before adding to the shared queue.',
    tracks: ['Chaleya', 'Essence', 'Ilahi', 'Calm Down'],
    metrics: ['3 friends', 'No explicit', 'Shared queue', 'Explainable picks']
  }
};

function getSession(text) {
  const t = text.toLowerCase();
  if (t.includes('gym') || t.includes('workout') || t.includes('training')) return sessionMap.gym;
  if (t.includes('trip') || t.includes('friend') || t.includes('person') || t.includes('group')) return sessionMap.social;
  return sessionMap.focus;
}

function PhonePrototype({ activeTab, setActiveTab, prompt, setPrompt, session, setSession }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Tell me the moment, mood, time, language, or people. I will build a session, not just a playlist.' }
  ]);

  const submit = () => {
    const clean = prompt.trim();
    if (!clean) return;
    const next = getSession(clean);
    setSession(next);
    setMessages((m) => [
      ...m,
      { role: 'user', text: clean },
      { role: 'ai', text: `I built ${next.title}. It starts safe and familiar, then adds controlled discovery with explanation and opt-in memory.` }
    ]);
    setPrompt('');
    setActiveTab('aura');
  };

  return (
    <div className="phone-shell">
      <div className="phone-top"><span>9:41</span><span>5G 72%</span></div>
      <div className="spotify-head">
        <div className="mark"><Disc3 size={18}/></div>
        <div>
          <p>Spotify Aura</p>
          <small>GenAI concept prototype</small>
        </div>
      </div>

      {activeTab === 'home' && (
        <div className="screen-body">
          <div className="hero-card">
            <p className="eyebrow">NEW</p>
            <h2>Ask for the sound of your moment.</h2>
            <p>No more searching, skipping, and rebuilding queues manually.</p>
            <button onClick={() => setActiveTab('aura')}><Sparkles size={16}/> Try Aura</button>
          </div>
          <div className="row-title">For you now</div>
          <div className="playlist-grid">
            {['Daily Mix', 'DJ', 'Made For You', 'Podcasts'].map((x, i) => <div className="tile" key={x}><div className={'cover c'+i}></div><span>{x}</span></div>)}
          </div>
          <div className="list-card"><Radio size={18}/><div><b>Current problem</b><small>Good recommendations, but too much manual effort to express intent.</small></div></div>
        </div>
      )}

      {activeTab === 'aura' && (
        <div className="screen-body chat-screen">
          <div className="prompt-bar"><Sparkles size={16}/><span>Aura understands context, constraints and taste.</span></div>
          <div className="messages">
            {messages.map((m, i) => <div key={i} className={'bubble '+m.role}>{m.text}</div>)}
          </div>
          <div className="quick-prompts">
            {prompts.slice(0,2).map((p) => <button key={p} onClick={() => setPrompt(p)}>{p}</button>)}
          </div>
          <div className="composer"><Mic size={18}/><input value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Ask for a vibe..."/><button onClick={submit}><Send size={16}/></button></div>
        </div>
      )}

      {activeTab === 'session' && (
        <div className="screen-body">
          <div className="session-card">
            <div className="session-art"><Music2 size={48}/></div>
            <div><p className="eyebrow">AI SESSION</p><h2>{session.title}</h2><p>{session.reason}</p></div>
          </div>
          <div className="metric-row">{session.metrics.map(m => <span key={m}>{m}</span>)}</div>
          <div className="row-title">Generated queue</div>
          {session.tracks.map((t, i) => <div className="track" key={t}><span>{i+1}</span><div><b>{t}</b><small>{i===0?'Familiar open':'Controlled discovery'}</small></div><Plus size={16}/></div>)}
          <button className="primary"><Play size={16}/> Start Session</button>
        </div>
      )}

      {activeTab === 'social' && (
        <div className="screen-body">
          <div className="social-card"><Users size={22}/><div><b>Jam Agent</b><small>Negotiates group taste before the queue becomes chaos.</small></div></div>
          {['Satyam: Hindi + calm', 'Riya: Afrobeats', 'Aman: No explicit'].map(x => <div className="friend" key={x}><span>{x}</span><BadgeCheck size={16}/></div>)}
          <div className="agent-note"><MessageCircle size={18}/><p>I removed explicit tracks, kept 2 Hindi anchors, and added 3 Afrobeats bridges so nobody dominates the session.</p></div>
          <button className="primary"><Share2 size={16}/> Share AI Jam Card</button>
        </div>
      )}

      {activeTab === 'trust' && (
        <div className="screen-body">
          <div className="trust-panel"><ShieldCheck size={28}/><h2>Trust layer</h2><p>Aura never silently changes your long-term taste profile. Memory is opt-in, edits are transparent, and AI tracks are labelled.</p></div>
          {['Explain why every song appears', 'Do not train on private prompts without consent', 'Disclose AI-generated audio/content', 'Escalate sensitive mental-health prompts'].map(x => <div className="check" key={x}><ShieldCheck size={16}/><span>{x}</span></div>)}
        </div>
      )}

      <div className="bottom-nav">
        {[['home','Home',Headphones],['aura','Aura',Sparkles],['session','Session',Wand2],['social','Jam',Users],['trust','Trust',ShieldCheck]].map(([id,label,Icon]) => (
          <button key={id} className={activeTab===id?'on':''} onClick={() => setActiveTab(id)}><Icon size={17}/><span>{label}</span></button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [prompt, setPrompt] = useState(prompts[0]);
  const [session, setSession] = useState(sessionMap.focus);
  const currentPrompt = useMemo(() => prompt || prompts[0], [prompt]);

  return (
    <main>
      <section className="left-panel">
        <div className="kicker"><Sparkles size={16}/> Open Project 2026 prototype</div>
        <h1>Spotify Aura turns intent into a complete listening session.</h1>
        <p className="lede">A GenAI layer for Spotify that understands moments, constraints, social context and trust - then generates a playable queue with reasons, controls and memory consent.</p>
        <div className="demo-box">
          <label>Live prompt</label>
          <textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} />
          <div className="button-row">
            <button onClick={()=>{ const s=getSession(currentPrompt); setSession(s); setActiveTab('session'); }}><Wand2 size={16}/> Generate session</button>
            <button className="ghost" onClick={()=>setActiveTab('trust')}><ShieldCheck size={16}/> See guardrails</button>
          </div>
        </div>
        <div className="insights">
          <div><Clock3/><b>Time saved</b><span>from search + skip loops</span></div>
          <div><Heart/><b>Trust</b><span>explainable AI picks</span></div>
          <div><Users/><b>Social</b><span>group taste negotiation</span></div>
        </div>
        <p className="legal">Unofficial Spotify-inspired academic concept. No Spotify APIs are used in this static demo.</p>
      </section>
      <section className="right-panel">
        <PhonePrototype activeTab={activeTab} setActiveTab={setActiveTab} prompt={prompt} setPrompt={setPrompt} session={session} setSession={setSession}/>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
