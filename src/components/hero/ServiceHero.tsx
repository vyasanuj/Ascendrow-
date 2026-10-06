import { useState } from 'preact/hooks';
import './ServiceHero.css';

interface FolderContent {
  items: string[];
  image: string;
  heading: string;
  description: string;
}

interface Folder {
  title: string;
  color: string;
  textColor?: string;
  content: FolderContent;
}

interface ServiceHeroProps {
  folders: Folder[];
}

export default function ServiceHero({ folders }: ServiceHeroProps) {
  // We'll default to the first card being expanded
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bento-accordion-container">
      {folders.map((folder, idx) => {
        const isActive = idx === activeIndex;
        
        return (
          <div 
            key={idx}
            className={`bento-card ${isActive ? 'active' : ''}`}
            onClick={() => setActiveIndex(idx)}
            onMouseEnter={() => setActiveIndex(idx)}
          >
            {/* Background Image with Parallax-style zoom */}
            <div className="bento-bg">
              <img src={folder.content.image} alt={folder.title} />
              <div className="bento-overlay" />
            </div>

            {/* Inactive Content: Vertically aligned title for when card is shrunk */}
            <div className="bento-inactive-content">
              <span className="bento-number">{(idx + 1).toString().padStart(2, '0')}</span>
              <h3 className="bento-title-vertical">{folder.title}</h3>
            </div>

            {/* Active Content: The glass panel that appears when expanded */}
            <div className="bento-active-content">
              <div className="bento-glass-panel">
                <div className="bento-header">
                  <span className="bento-active-number">{(idx + 1).toString().padStart(2, '0')}</span>
                  <span className="bento-active-title">{folder.title}</span>
                </div>
                <h2 className="bento-heading">{folder.content.heading}</h2>
                <p className="bento-desc">{folder.content.description}</p>
                
                <ul className="bento-list">
                  {folder.content.items.map(item => (
                    <li key={item}>
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="rgba(255, 255, 255, 0.05)"/>
                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
