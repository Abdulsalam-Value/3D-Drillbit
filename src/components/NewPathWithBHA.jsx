import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Component to load and display the BHA model
function BHAComponent() {
  const { scene } = useGLTF('/models/Combined_tool(BHA)-Drill_collar_002.gltf'); // Ensure correct path to the GLTF file

  console.log('BHA Loaded:', scene); // Log to check if the model is loading

  if (!scene) {
    return <p>Loading BHA model...</p>; // Display a loading message if the model is not ready
  }

  return <primitive object={scene} scale={5} position={[0, 0, 0]} />; // Adjusted scale and position
}

// Main component for rendering the 3D environment
export default function NewPathWithBHA() {
  return (
    <div style={{ height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        
        {/* Add a simple cube to ensure the scene is rendering */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>

        <BHAComponent /> {/* Render the BHA model */}
      </Canvas>
    </div>
  );
}
