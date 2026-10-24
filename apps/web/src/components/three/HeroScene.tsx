import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { useReducedMotion } from 'motion/react'
import { AICore } from './AICore'
import { ParticleField } from './ParticleField'

function SceneContent({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <>
      {/* Fast, lightweight local directional & ambient lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#e0f2fe" />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#10b981" />

      {/* 3D Scene Objects */}
      <AICore />
      <ParticleField count={reduceMotion ? 40 : 120} />

      {/* Subtle auto-orbit — disabled if user prefers reduced motion */}
      {!reduceMotion && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.35}
          maxPolarAngle={Math.PI * 0.65}
          minPolarAngle={Math.PI * 0.35}
        />
      )}

      {/* Adaptive performance utilities */}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  )
}

/** WebGL availability check evaluated once synchronously */
function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    )
  } catch {
    return false
  }
}

const IS_WEBGL_SUPPORTED = typeof window !== 'undefined' ? checkWebGLSupport() : true

/** Static fallback shown when WebGL is unavailable */
function StaticCoreFallback() {
  return (
    <div
      aria-hidden="true"
      className="w-full h-full flex items-center justify-center"
      style={{ minHeight: 440 }}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute w-80 h-80 rounded-full bg-cyan-500/10 animate-pulse" />
        <div className="absolute w-60 h-60 rounded-full bg-emerald-500/10 animate-pulse [animation-delay:0.5s]" />
        <div className="absolute w-44 h-44 rounded-full border border-cyan-400/20 animate-spin [animation-duration:12s]" />
        <div className="absolute w-56 h-56 rounded-full border border-emerald-400/15 animate-spin [animation-duration:18s] [animation-direction:reverse]" />
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#06b6d4] via-[#0d9488] to-[#10b981] flex items-center justify-center shadow-[0_0_60px_20px_rgba(6,182,212,0.3)]">
          <div className="w-10 h-10 rounded-full bg-white/80 shadow-[0_0_20px_8px_rgba(255,255,255,0.4)] blur-[1px]" />
        </div>
      </div>
    </div>
  )
}

export function HeroScene() {
  const reduceMotion = useReducedMotion() ?? false
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  // Pause canvas RAF loop when scrolled out of view to save 100% GPU
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!IS_WEBGL_SUPPORTED) {
    return <StaticCoreFallback />
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="w-full h-full"
      style={{ minHeight: 440 }}
    >
      {isVisible && (
        <Canvas
          dpr={[1, 1.5]}
          frameloop="always"
          camera={{ position: [0, 0, 6.5], fov: 50 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          style={{ background: 'transparent' }}
        >
          <SceneContent reduceMotion={reduceMotion} />
        </Canvas>
      )}
    </div>
  )
}
