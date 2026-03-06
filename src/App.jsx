import { useState } from 'react'
import './App.css'

function App() {
  const [rotation, setRotation] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleRotate = (e) => {
    setIsSidebarOpen(true)
    const rect = e.currentTarget.getBoundingClientRect()
    const buttonCenterX = rect.left + rect.width / 2
    const buttonCenterY = rect.top + rect.height / 2
    
    const hubCenterX = window.innerWidth / 2
    const hubCenterY = window.innerHeight / 2

    // Calculate target angle in radians
    const angleRad = Math.atan2(buttonCenterY - hubCenterY, buttonCenterX - hubCenterX)
    
    // Convert to degrees and adjust for initial state (arrow points up)
    let targetAngle = (angleRad * 180) / Math.PI + 90
    
    // Normalize target angle to [0, 360)
    targetAngle = (targetAngle % 360 + 360) % 360

    // Shortest path logic:
    const currentRot = rotation
    const currentRotNormalized = (currentRot % 360 + 360) % 360
    
    let diff = targetAngle - currentRotNormalized
    
    if (diff > 180) {
      diff -= 360
    } else if (diff < -180) {
      diff += 360
    }
    
    setRotation(currentRot + diff)
  }

  return (
    <div className="home">

      {/* ── Center Hub ── */}
      <div className="hub-container">
        <div className="hub">
          <img src="/dial.png" alt="iMAGE266 The Foundation Inc." className="hub__img" />
        </div>
      </div>

      {/* ── Rotating Arrow (outside hub container for z-index) ── */}
      <div 
        className="arrow-container" 
        style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
      >
        <img src="/timer-arrow.png" alt="Timer Arrow" className="arrow-img" />
      </div>

      {/* ── Left column images ── */}
      <button className="img-btn img-btn--l1" onClick={handleRotate} aria-label="iMAGE PRP">
        <img src="/left-1.gif" alt="iMAGE PRP" />
      </button>
      <button className="img-btn img-btn--l2" onClick={handleRotate} aria-label="iMAGE PRP 2">
        <img src="/left-2.gif" alt="iMAGE PRP 2" />
      </button>
      <button className="img-btn img-btn--l3" onClick={handleRotate} aria-label="iMAGE266 Tax">
        <img src="/left-3.gif" alt="iMAGE266 Tax" />
      </button>

      {/* ── Right column images ── */}
      <button className="img-btn img-btn--r1" onClick={handleRotate} aria-label="iMAGE266 Video">
        <img src="/right-1.png" alt="iMAGE266 Video" />
      </button>
      <button className="img-btn img-btn--r2" onClick={handleRotate} aria-label="iMAGE266 Video 2">
        <img src="/right-2.gif" alt="iMAGE266 Video 2" />
      </button>
      <button className="img-btn img-btn--r3" onClick={handleRotate} aria-label="iMAGE266 Insurance">
        <img src="/right-3.gif" alt="iMAGE266 Insurance" />
      </button>

      {/* ── Sidebar (Slide Window) ── */}
      <div className={`sidebar ${isSidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__inner">
          <button 
            className="sidebar__back" 
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Back"
          >
            <img src="/back-arrow.png" alt="Back" />
          </button>
          
          <img src="/slide-window-obj-1.png" alt="Card Details" className="sidebar__img" />
        </div>
      </div>

    </div>
  )
}

export default App
