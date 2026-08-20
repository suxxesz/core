import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './Galaxy.scss'

export default function Galaxy() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = window.innerWidth
    let H = window.innerHeight
    const mouse = { nx: 0, ny: 0 }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x05060d, 1)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(58, W / H, 0.1, 3000)
    camera.position.set(0, 8, 130)

    const makeDotTexture = () => {
      const c = document.createElement('canvas')
      c.width = c.height = 64
      const g = c.getContext('2d')!
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
      grad.addColorStop(0, 'rgba(255,255,255,1)')
      grad.addColorStop(0.35, 'rgba(255,255,255,.7)')
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      g.fillStyle = grad
      g.fillRect(0, 0, 64, 64)
      const tex = new THREE.CanvasTexture(c)
      tex.premultiplyAlpha = false
      tex.flipY = false
      tex.needsUpdate = true
      return tex
    }
    const dotTex = makeDotTexture()

    const COUNT = 5200
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const colA = new THREE.Color('#8a60f5')
    const colB = new THREE.Color('#5ecbff')
    const colC = new THREE.Color('#c65fe0')
    const ARMS = 4, RADIUS = 150, SPIN = 3.2, RAND = 12

    for (let i = 0; i < COUNT; i++) {
      const t = Math.pow(Math.random(), 1.6)
      const r = t * RADIUS
      const armAngle = (i % ARMS) * (Math.PI * 2 / ARMS)
      const spinAngle = r * 0.03 * SPIN
      const randX = (Math.random() - 0.5) * RAND * (1 - t * 0.4)
      const randY = (Math.random() - 0.5) * RAND * 0.35 * (1 - t * 0.4)
      const randZ = (Math.random() - 0.5) * RAND * (1 - t * 0.4)
      const angle = armAngle + spinAngle + (Math.random() - 0.5) * 0.35

      const x = Math.cos(angle) * r + randX
      const y = randY
      const z = Math.sin(angle) * r + randZ
      positions[i * 3] = x; positions[i * 3 + 1] = y; positions[i * 3 + 2] = z

      const mixed = colA.clone()
      const mixT = Math.random()
      mixed.lerp(mixT < .5 ? colB : colC, t * 0.8 + Math.random() * 0.2)
      colors[i * 3] = mixed.r; colors[i * 3 + 1] = mixed.g; colors[i * 3 + 2] = mixed.b
    }

    const galaxyGeo = new THREE.BufferGeometry()
    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    galaxyGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const galaxyMat = new THREE.PointsMaterial({
      size: 1.7, sizeAttenuation: true, map: dotTex, transparent: true,
      vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: .9,
    })
    const galaxy = new THREE.Points(galaxyGeo, galaxyMat)
    galaxy.rotation.x = 0.35
    scene.add(galaxy)

    const dustGeo = new THREE.BufferGeometry()
    const dustCount = 900
    const dustPos = new Float32Array(dustCount * 3)
    for (let d = 0; d < dustCount; d++) {
      dustPos[d * 3] = (Math.random() - 0.5) * 900
      dustPos[d * 3 + 1] = (Math.random() - 0.5) * 500
      dustPos[d * 3 + 2] = -300 - Math.random() * 600
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dustMat = new THREE.PointsMaterial({ size: 1.1, color: 0xf4f2ff, map: dotTex, transparent: true, opacity: .5, depthWrite: false })
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight
      camera.aspect = W / H; camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    const onPointerMove = (e: PointerEvent) => {
      mouse.nx = (e.clientX / W - .5) * 2
      mouse.ny = (e.clientY / H - .5) * 2
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove)

    const timer = new THREE.Timer()
    let rafId: number
    const tick = () => {
      const dt = timer.getDelta()
      if (!reducedMotion) {
        galaxy.rotation.y += dt * 0.03
        dust.rotation.y += dt * 0.008
        camera.position.x += (mouse.nx * 14 - camera.position.x) * 0.02
        camera.position.y += (8 - mouse.ny * 8 - camera.position.y) * 0.02
        camera.lookAt(0, 0, 0)
      }
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      galaxyGeo.dispose(); galaxyMat.dispose()
      dustGeo.dispose(); dustMat.dispose()
      dotTex.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas className="galaxy" ref={canvasRef} aria-hidden="true" />
}