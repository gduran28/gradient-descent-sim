"use client"

import type React from "react"
import { useMemo } from "react"
import { evaluate } from "mathjs"
import * as THREE from "three"
import { Sphere } from "@react-three/drei"

interface Point {
  [key: string]: number
}

interface FunctionPlotProps {
  func: string
  results: Point[]
}

const FunctionPlot: React.FC<FunctionPlotProps> = ({ func, results }) => {
  const { points, minMax } = useMemo(() => {
    const resolution = 50
    const points: number[][] = []
    let minZ = Number.POSITIVE_INFINITY
    let maxZ = Number.NEGATIVE_INFINITY

    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const x = (i / (resolution - 1)) * 10 - 5
        const y = (j / (resolution - 1)) * 10 - 5
        let z
        try {
          z = evaluate(func, { x, y })
        } catch (error) {
          console.error("Error evaluating function:", error)
          z = 0
        }

        if (isNaN(z) || !isFinite(z)) {
          z = 0
        }

        points.push([x, y, z])

        minZ = Math.min(minZ, z)
        maxZ = Math.max(maxZ, z)
      }
    }

    return { points, minMax: { minZ, maxZ } }
  }, [func])

  const colorScale = (z: number) => {
    const t = (z - minMax.minZ) / (minMax.maxZ - minMax.minZ)
    return new THREE.Color(t, 0.5, 1 - t)
  }

  const surfaceGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array(points.flat())
    const colors = new Float32Array(points.length * 3)

    points.forEach((point, i) => {
      const color = colorScale(point[2])
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    })

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const indices = []
    const resolution = Math.sqrt(points.length)
    for (let i = 0; i < resolution - 1; i++) {
      for (let j = 0; j < resolution - 1; j++) {
        const a = i * resolution + j
        const b = i * resolution + j + 1
        const c = (i + 1) * resolution + j
        const d = (i + 1) * resolution + j + 1
        indices.push(a, b, d)
        indices.push(a, d, c)
      }
    }
    geometry.setIndex(indices)

    return geometry
  }, [points, colorScale]) //Removed minMax from dependencies

  return (
    <>
      <mesh>
        <bufferGeometry attach="geometry" {...surfaceGeometry} />
        <meshPhongMaterial
          attach="material"
          vertexColors
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
          shininess={50}
        />
      </mesh>
      {results.map((point, i) => {
        let z
        try {
          z = evaluate(func, point)
        } catch (error) {
          console.error("Error evaluating function for result point:", error)
          z = 0
        }

        if (isNaN(z) || !isFinite(z)) {
          z = 0
        }

        return (
          <Sphere key={i} args={[0.15, 32, 32]} position={[point.x, point.y, z]}>
            <meshBasicMaterial color={i === results.length - 1 ? "red" : "yellow"} />
          </Sphere>
        )
      })}
    </>
  )
}

export default FunctionPlot

