import { useEffect, useRef, useState } from 'react'
import './ShootingStars.scss'

type Comet = {
  id: number
  top: string
  left: string
  angle: number
  duration: number
  size: number
}


const CORNERS: Array<{ top: string; left: string; angle: number }> = [
  { top: '-4%',  left: '-4%',   angle: 35 },
  { top: '-4%',  left: '104%',  angle: 145 },
  { top: '104%', left: '-4%',   angle: -35 },
  { top: '104%', left: '104%',  angle: -145 },
]

let cometId = 0

export default function ShootingStars() {
  const [comets, setComets] = useState<Comet[]>([])
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion.current) return 

    let timeoutId: ReturnType<typeof setTimeout>

    const spawnBurst = () => {
      const count = 1 + Math.floor(Math.random() * 5) 

      const burst: Comet[] = Array.from({ length: count }, () => {
        const corner = CORNERS[Math.floor(Math.random() * CORNERS.length)]
        const angleJitter = (Math.random() - 0.5) * 16 

        return {
          id: cometId++,
          top: corner.top,
          left: corner.left,
          angle: corner.angle + angleJitter,
          duration: 1.1 + Math.random() * 1.2,
          size: 2 + Math.random() * 2,
        }
      })

      setComets((prev) => [...prev, ...burst])

      
      burst.forEach((comet) => {
        setTimeout(() => {
          setComets((prev) => prev.filter((c) => c.id !== comet.id))
        }, comet.duration * 1000 + 200)
      })

      timeoutId = setTimeout(spawnBurst, 6000 + Math.random() * 8000) 
    }

    timeoutId = setTimeout(spawnBurst, 2000 + Math.random() * 3000) 

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="shooting-stars" aria-hidden="true">
      {comets.map((comet) => (
        <span
          key={comet.id}
          className="shooting-stars__comet"
          style={{
            top: comet.top,
            left: comet.left,
            ['--angle' as string]: `${comet.angle}deg`,
            ['--duration' as string]: `${comet.duration}s`,
            ['--size' as string]: `${comet.size}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
