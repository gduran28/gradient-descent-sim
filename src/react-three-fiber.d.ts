// src/react-three-fiber.d.ts
import * as THREE from 'three'
import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      pointLight: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      mesh: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      meshPhongMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      meshBasicMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      pointsMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      points: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      gridHelper: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      axesHelper: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}