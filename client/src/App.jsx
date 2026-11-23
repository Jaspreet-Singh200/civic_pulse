import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { CivicPortal } from './Portal.jsx'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, CircleHelp, Clock3, Droplets, Footprints, Lightbulb, LocateFixed, MapPin, Menu, MessageSquareText, ShieldCheck, Sparkles, ThumbsUp, Waves, X } from 'lucide-react'

const categories = [
  { icon: Footprints, name: 'Roads & potholes', count: 'Roads' },
  { icon: Droplets, name: 'Water & drainage', count: 'Water' },
  { icon: Lightbulb, name: 'Street lighting', count: 'Lighting' },
  { icon: Waves, name: 'Waste & sanitation', count: 'Sanitation' },
]

const stories = [
  { title: 'Safer crossing, brighter nights', place: 'Indiranagar, Ward 81', category: 'Street lighting', status: 'Resolved', days: '2 days ago', image: 'photo-1519608487953-e999c86e7455', tone: 'night' },
  { title: 'A smoother ride to school', place: 'Jayanagar, Ward 172', category: 'Roads & potholes', status: 'In progress', days: '4 days ago', image: 'photo-1519608487953-e999c86e7455', tone: 'road' },
  { title: 'Clear drains before the rain', place: 'Koramangala, Ward 151', category: 'Water & drainage', status: 'Resolved', days: '1 week ago', image: 'photo-1541919329513-35f7af297129', tone: 'water' },
]

function Brand({ light = false }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="#top" aria-label="CivicPulse home"><span className="brand-mark"><span /></span><span>Civic<span className="brand-pulse">Pulse</span></span></a>
}

function LandingPage() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [email, setEmail] = useState('')
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 3200) }
  const join = (event) => { event.preventDefault(); notify(email ? 'You’re on the list. We’ll be in touch soon.' : 'Enter your email to get updates.') }

  return <div id="top">
    <header className="topbar">
      <div className="nav-wrap"><Brand />
        <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#how">How it works</a><a href="#categories">Explore issues</a><a href="#impact">Our impact</a>
        </nav>
        <div className="nav-actions"><button className="text-button" onClick={() => navigate('/login')}>Log in</button><button className="button button-dark button-nav" onClick={() => navigate('/report')}>Report an issue <ArrowRight size={15} /></button></div>
        <button className="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="eyebrow"><span className="live-dot" /> A better city starts with you</div>
          <h1>Your city.<br /><span>Your voice.</span><br />Your impact.</h1>
          <p className="hero-copy">See something that needs fixing? Tell your city, track the progress, and be part of the change.</p>
          <div className="hero-actions"><button className="button button-blue button-large" onClick={() => navigate('/report')}>Report an issue <ArrowRight size={17} /></button><a className="button button-quiet button-large" href="#how">See how it works <ArrowDown size={16} /></a></div>
          <div className="hero-proof"><div className="avatar-stack"><span>R</span><span>A</span><span>M</span><span>+</span></div><p><strong>Built with the people who live here.</strong><br />One report can make a real difference.</p></div>
        </div>
        <div className="hero-visual" aria-label="Illustration of a connected neighborhood">
          <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
          <div className="city-scene"><div className="sun" /><div className="cloud cloud-one" /><div className="cloud cloud-two" />
            <div className="building building-a"><i /><i /><i /><i /><i /><i /></div><div className="building building-b"><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="building building-c"><i /><i /><i /><i /></div><div className="building building-d"><i /><i /><i /><i /><i /><i /></div>
            <div className="hill hill-back" /><div className="hill hill-front" /><div className="street" />
            <div className="map-pin pin-main"><MapPin size={18} fill="currentColor" /><span>Issue reported</span></div><div className="map-pin pin-small pin-left"><Lightbulb size={15} /></div><div className="map-pin pin-small pin-right"><Droplets size={15} /></div>
            <div className="report-card"><div className="report-card-icon"><Check size={16} /></div><div><b>Your report is on its way</b><span>Ward 81 · Indiranagar</span></div><ArrowUpRight className="report-card-arrow" size={17} /></div>
          </div>
          <div className="float-note note-top"><span className="note-icon"><ShieldCheck size={16} /></span><span><b>Every voice counts</b><small>Community verified</small></span></div>
          <div className="float-note note-bottom"><span className="note-pulse"><span /></span><span><b>Progress, not promises</b><small>Updates at every step</small></span></div>
        </div>
        <div className="hero-footer"><span>MADE FOR THE NEIGHBORHOODS WE CALL HOME</span><span className="hero-footer-line" /><span className="hero-scroll">SCROLL TO EXPLORE <ArrowDown size={13} /></span></div>
      </section>

      <section className="trust-strip"><div className="trust-inner"><span className="trust-label">A simpler way to make change</span><div><span className="trust-icon"><MapPin size={16} /></span>Pinpoint the problem</div><div><span className="trust-icon"><MessageSquareText size={16} /></span>Keep everyone in the loop</div><div><span className="trust-icon"><Check size={16} /></span>See it through to solved</div></div></section>

      <section className="section how-section" id="how"><div className="section-heading"><div><span className="section-kicker">GOOD CHANGE, MADE SIMPLE</span><h2>From “someone should”<br />to <span>“it’s taken care of.”</span></h2></div><p>City problems can feel like they’re someone else’s job. CivicPulse helps you make them everyone’s priority.</p></div>
        <div className="steps"><article className="step-card"><span className="step-number">01</span><div className="step-icon step-blue"><MapPin /></div><h3>Spot it. Share it.</h3><p>Snap a photo, drop a pin, and tell us what’s going on. It takes less time than your coffee order.</p><a href="#categories">See what you can report <ArrowRight size={14} /></a></article><div className="step-connector"><span /><ArrowRight size={17} /></div><article className="step-card"><span className="step-number">02</span><div className="step-icon step-green"><MessageSquareText /></div><h3>Your city gets to work.</h3><p>Your report reaches the right team. Neighbors can add support so urgent issues stand out.</p><a href="#impact">How progress works <ArrowRight size={14} /></a></article><div className="step-connector"><span /><ArrowRight size={17} /></div><article className="step-card"><span className="step-number">03</span><div className="step-icon step-amber"><Check /></div><h3>Follow it to fixed.</h3><p>Get clear updates as things move along. No chasing, no wondering, no falling through the cracks.</p><a href="#stories">See community wins <ArrowRight size={14} /></a></article></div>
      </section>

      <section className="categories-section" id="categories"><div className="section-heading categories-heading"><div><span className="section-kicker">A PLACE FOR EVERY LITTLE FIX</span><h2>What needs a little<br /><span>city-sized love?</span></h2></div><a className="plain-link" href="#stories">Explore community reports <ArrowRight size={15} /></a></div><div className="category-grid">{categories.map(({ icon: Icon, name, count }, i) => <a className={`category-card cat-${i}`} href="#stories" key={name}><div className="category-icon"><Icon size={21} /></div><h3>{name}</h3><span>Report an issue <ArrowUpRight size={15} /></span><div className="category-art"><div className="art-circle" /><div className="art-line" /></div></a>)}</div></section>

      <section className="impact-section" id="impact"><div className="impact-copy"><span className="section-kicker kicker-light">SMALL ACTIONS. REAL MOMENTUM.</span><h2>Better neighborhoods<br />aren’t a big idea.<br /><span>They’re a thousand<br />little ones.</span></h2><p>Every report is a neighbor showing up for their community. Every resolution is proof that it matters.</p><a href="#stories" className="button button-white">Meet the community <ArrowRight size={16} /></a></div><div className="impact-art"><div className="impact-circle circle-back" /><div className="impact-circle circle-front" /><div className="impact-stat"><span className="stat-pulse"><span /></span><strong>Coming soon</strong><small>Real community impact, here</small><div className="stat-rule" /><div className="stat-meta"><span><b>Local</b> at heart</span><span><b>Open</b> by design</span></div></div><div className="impact-label label-top"><span><Check size={13} /></span>One neighborhood at a time</div><div className="impact-label label-bottom"><span><MapPin size={13} /></span>Progress you can follow</div></div></section>

      <section className="stories-section" id="stories"><div className="section-heading stories-heading"><div><span className="section-kicker">THE LITTLE THINGS ADD UP</span><h2>Good things are<br /><span>already in motion.</span></h2></div><div className="stories-aside"><p>Every resolved issue starts with a neighbor who cared enough to speak up.</p><a className="plain-link" href="#categories">Explore all reports <ArrowRight size={15} /></a></div></div><div className="story-grid">{stories.map((story) => <article className="story-card" key={story.title}><div className={`story-image ${story.tone}`} style={{ backgroundImage: `linear-gradient(180deg, transparent 48%, rgba(16,29,50,.55)), url(https://images.unsplash.com/${story.image}?auto=format&fit=crop&w=900&q=80)` }}><span className={`status-chip ${story.status === 'Resolved' ? 'status-done' : 'status-progress'}`}><span />{story.status}</span><button aria-label="Support this report" className="support-button" onClick={() => notify('Community support opens when reports launch.')}><ThumbsUp size={15} /></button></div><div className="story-body"><span className="story-category">{story.category}</span><h3>{story.title}</h3><div className="story-meta"><span><MapPin size={13} />{story.place}</span><span><Clock3 size={13} />{story.days}</span></div></div></article>)}</div><div className="stories-disclaimer"><CircleHelp size={14} /> Preview stories shown for design preview. Live community reports will appear here when the platform launches.</div></section>

      <section className="join-section"><div className="join-icon"><Sparkles size={20} /></div><div className="join-copy"><span className="section-kicker">BE PART OF WHAT’S NEXT</span><h2>Good neighbors make<br />great cities.</h2><p>We’re getting CivicPulse ready for your neighborhood. Leave your email and we’ll let you know when it’s time.</p></div><form className="join-form" onSubmit={join}><label htmlFor="join-email">Get launch updates</label><div className="email-field"><input id="join-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required /><button type="submit" aria-label="Subscribe for launch updates"><ArrowRight size={18} /></button></div><small>Just the useful stuff. Unsubscribe whenever.</small></form></section>
    </main>

    <footer className="footer"><div className="footer-main"><div className="footer-brand"><Brand light /><p>Your City. Your Voice. Your Impact.</p></div><div className="footer-col"><span>EXPLORE</span><a href="#how">How it works</a><a href="#categories">Issue categories</a><a href="#stories">Community stories</a></div><div className="footer-col"><span>THE PLATFORM</span><a href="#impact">For residents</a><a href="#impact">For city teams</a><a href="#top">About CivicPulse</a></div><div className="footer-col footer-note"><span>A NOTE FROM US</span><p>Better cities happen when neighbors and local teams can work together.</p><a href="#top">Say hello <ArrowUpRight size={13} /></a></div></div><div className="footer-bottom"><span>© 2025 CivicPulse. Made for the places we call home.</span><span className="footer-links"><a href="#top">Privacy</a><a href="#top">Terms</a><a href="#top">Accessibility</a><span className="footer-location"><MapPin size={12} /> Built for every neighborhood</span></span></div></footer>
    {toast && <div className="toast" role="status"><span><Check size={15} /></span>{toast}</div>}
  </div>
}

function App() { return <Routes><Route path="/welcome" element={<LandingPage/>}/><Route path="/*" element={<CivicPortal/>}/></Routes> }

export default App
