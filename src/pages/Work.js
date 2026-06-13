import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../components/useReveal';
import { loadProjects } from '../utils/content';

const statusColor = {
  Live: { bg:'rgba(100,200,100,0.1)', color:'#6dc86d', border:'rgba(100,200,100,0.2)' },
  Building: { bg:'rgba(212,175,114,0.1)', color:'var(--gold)', border:'rgba(212,175,114,0.2)' },
  Shipped: { bg:'rgba(100,150,255,0.1)', color:'#6496ff', border:'rgba(100,150,255,0.2)' },
  'Coming Soon': { bg:'rgba(150,150,150,0.1)', color:'#888', border:'rgba(150,150,150,0.2)' },
};

export default function Work() {
  useReveal();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <main>
      <div className="page-header">
        <Link to="/" className="back-link r v">← Back to Home</Link>
        <div className="sl r v">Built From Obsession</div>
        <h1 className="r v">All the <em>Work.</em></h1>
        <p className="r v">Every tool, site and app — built because something pulled me in. Not because there was a plan.</p>
      </div>

      <div className="work-section">

        {featured.length > 0 && (
          <>
            <div className="sl r" style={{marginBottom:'1.5rem'}}>Featured</div>
            <div className="r" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'1px',background:'var(--border-dim)',border:'1px solid var(--border-dim)',marginBottom:'3rem'}}>
              {featured.map((p, i) => <ProjectCard key={p.slug} project={p} delay={i * 0.08} />)}
            </div>
          </>
        )}

        {rest.length > 0 && (
          <>
            <div className="sl r" style={{marginBottom:'1.5rem'}}>All Projects</div>
            <div className="r" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'var(--border-dim)',border:'1px solid var(--border-dim)'}}>
              {rest.map((p, i) => <ProjectCard key={p.slug} project={p} delay={i * 0.06} />)}
            </div>
          </>
        )}

      </div>

      <footer style={{background:'var(--surface)',borderTop:'1px solid var(--border-dim)',padding:'2.5rem 3rem'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1.5rem'}}>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.2rem',fontWeight:900,color:'var(--ink)'}}>Klee<span style={{color:'var(--gold)'}}>OnAI</span></div>
            <div style={{fontFamily:"'Playfair Display',serif",fontStyle:'italic',fontSize:'.85rem',color:'var(--ink-dim)',marginTop:'.5rem',maxWidth:'380px',lineHeight:1.6}}>"Gentlemen by day. Philosopher by night. Contrarian by necessity. Rebel by fate &amp; anarchist by choice."</div>
          </div>
          <div style={{display:'flex',gap:'1.8rem',flexWrap:'wrap',alignItems:'center'}}>
            <a href="https://x.com/kleeonai" target="_blank" rel="noreferrer" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.58rem',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ink-dim)',textDecoration:'none'}}>X</a>
            <a href="https://www.linkedin.com/in/abakar-ahmat-oumar-122b2a288/" target="_blank" rel="noreferrer" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.58rem',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ink-dim)',textDecoration:'none'}}>LinkedIn</a>
            <a href="https://selar.com/m/abakar-ahmat-oumar1" target="_blank" rel="noreferrer" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.58rem',letterSpacing:'.15em',textTransform:'uppercase',color:'var(--ink-dim)',textDecoration:'none'}}>Selar</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ProjectCard({ project: p, delay }) {
  const s = statusColor[p.status] || statusColor['Live'];
  return (
    <div
      className="r"
      style={{background:'var(--surface)',padding:'2.5rem',display:'flex',flexDirection:'column',gap:'.8rem',transition:'background .25s',transitionDelay:`${delay}s`}}
      onMouseEnter={e => e.currentTarget.style.background='var(--surface2)'}
      onMouseLeave={e => e.currentTarget.style.background='var(--surface)'}
    >
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'1rem'}}>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.2rem',fontWeight:700,lineHeight:1.2,color:'var(--ink)'}}>{p.title}</h3>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.5rem',letterSpacing:'.12em',textTransform:'uppercase',padding:'.25rem .6rem',border:`1px solid ${s.border}`,background:s.bg,color:s.color,whiteSpace:'nowrap',flexShrink:0}}>{p.status}</span>
      </div>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.5rem',letterSpacing:'.1em',color:'var(--gold)',opacity:.6}}>{p.year}</div>
      <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.68rem',color:'var(--ink-dim)',lineHeight:1.8,flex:1}}>{p.description}</p>
      <div style={{display:'flex',flexWrap:'wrap',gap:'.3rem'}}>
        {(p.tags || []).map(t => (
          <span key={t} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.48rem',letterSpacing:'.1em',textTransform:'uppercase',border:'1px solid var(--border-dim)',color:'var(--ink-dim)',padding:'.2rem .45rem'}}>{t}</span>
        ))}
      </div>
      {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="btn-s" style={{fontSize:'.6rem',padding:'.55rem 1rem',alignSelf:'flex-start',marginTop:'.5rem'}}>Visit →</a>}
    </div>
  );
}
