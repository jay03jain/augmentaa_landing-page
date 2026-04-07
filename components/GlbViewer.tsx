"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface GlbViewerProps {
  src: string;
  className?: string;
}

export default function GlbViewer({ src, className = "" }: GlbViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.01,
      100
    );
    camera.position.set(0, 0, 3);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    // Wait for canvas to have real dimensions
    const width = canvas.clientWidth || 400;
    const height = canvas.clientHeight || 280;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(2, 4, 3);
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x00c9a7, 0.3);
    fillLight.position.set(-2, -1, -2);
    scene.add(fillLight);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.enablePan = false;
    controls.minDistance = 1;
    controls.maxDistance = 6;

    // Load GLB
    const loader = new GLTFLoader();
    loader.load(
      src,
      (gltf) => {
        const model = gltf.scene;

        // Center and scale model to fit view
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.0 / maxDim;

        model.position.sub(center);
        model.scale.setScalar(scale);

        scene.add(model);
        setLoaded(true);
      },
      undefined,
      (_err) => {
        setError(true);
      }
    );

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [src]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 rounded-xl ${className}`}
      >
        <p className="text-sm text-gray-400">Model unavailable</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-teal-50 rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-gray-400">Loading model…</p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-xl"
        style={{ display: "block", opacity: loaded ? 1 : 0 }}
      />
      {loaded && (
        <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-400">
          Drag to rotate · Scroll to zoom
        </p>
      )}
    </div>
  );
}
