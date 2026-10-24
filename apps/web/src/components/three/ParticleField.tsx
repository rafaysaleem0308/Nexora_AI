import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
  spread?: number
  size?: number
  color?: string
  secondaryColor?: string
  speed?: number
}

export function ParticleField({
  count = 180,
  spread = 12,
  size = 0.025,
  color = '#06b6d4',
  secondaryColor = '#10b981',
  speed = 0.12,
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const primaryColor = new THREE.Color(color)
    const secColor = new THREE.Color(secondaryColor)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = (Math.random() * 0.5 + 0.5) * spread

      positions[i3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = r * Math.cos(phi)

      const t = Math.random()
      const blended = primaryColor.clone().lerp(secColor, t)
      colors[i3] = blended.r
      colors[i3 + 1] = blended.g
      colors[i3 + 2] = blended.b
    }

    return { positions, colors }
  }, [count, spread, color, secondaryColor])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime * speed
    meshRef.current.rotation.y = t * 0.25
    meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.08
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
