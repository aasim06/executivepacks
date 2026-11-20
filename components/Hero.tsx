'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  ArrowDown, 
  Rotate3d, 
  ArrowRight,
  Package,
  Zap,
  Gift,
  Play,
  MousePointerClick
} from 'lucide-react';

type MaterialTheme = 'kraft' | 'luxury' | 'white';

interface StageMeta {
  step: string;
  num: number;
  label: string;
  badgeText: string;
}

const STAGES: StageMeta[] = [
  {
    step: '01',
    num: 1,
    label: 'Die-Cut Blueprint',
    badgeText: 'STAGE 01 • DIE-CUT BLUEPRINT',
  },
  {
    step: '02',
    num: 2,
    label: 'Structural 3D Fold',
    badgeText: 'STAGE 02 • STRUCTURAL 3D FOLD',
  },
  {
    step: '03',
    num: 3,
    label: 'The Magic Reveal',
    badgeText: 'STAGE 03 • THE MAGIC REVEAL',
  },
  {
    step: '04',
    num: 4,
    label: '360° Inspection',
    badgeText: 'STAGE 04 • FINAL INSPECTION',
  }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);

  // States
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [activeTheme, setActiveTheme] = useState<MaterialTheme>('kraft');
  const [autoRotate, setAutoRotate] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // HUD & Performance Refs (Zero Re-render on RAF)
  const percentSpanRef = useRef<HTMLSpanElement>(null);
  const arrowIconRef = useRef<SVGSVGElement>(null);
  const currentStageIndexRef = useRef(0);
  const lastPctRef = useRef(-1);
  const isArrowRotatedRef = useRef(false);

  // Animation Refs
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rootBoxGroupRef = useRef<THREE.Group | null>(null);
  const floatingGroupRef = useRef<THREE.Group | null>(null);

  // Panel Pivots
  const leftPivotRef = useRef<THREE.Group | null>(null);
  const rightPivotRef = useRef<THREE.Group | null>(null);
  const frontPivotRef = useRef<THREE.Group | null>(null);
  const backPivotRef = useRef<THREE.Group | null>(null);
  const lidPivotRef = useRef<THREE.Group | null>(null);
  const tuckPivotRef = useRef<THREE.Group | null>(null);
  const leftDustRef = useRef<THREE.Group | null>(null);
  const rightDustRef = useRef<THREE.Group | null>(null);

  // Rising 3D Emblem & Glow Light
  const plaqueMeshRef = useRef<THREE.Mesh | null>(null);
  const interiorLightRef = useRef<THREE.PointLight | null>(null);
  const particlesPointsRef = useRef<THREE.Points | null>(null);
  const particleSpeedsRef = useRef<Float32Array | null>(null);

  // Materials & Lights
  const materialsRef = useRef<{
    kraft: THREE.Material;
    luxury: THREE.Material;
    white: THREE.Material;
    edge: THREE.Material;
    plaqueKraft: THREE.Material;
    plaqueLux: THREE.Material;
    plaqueWhite: THREE.Material;
  } | null>(null);
  const foilLightRef = useRef<THREE.PointLight | null>(null);

  // Pointer drag
  const isPointerDownRef = useRef(false);
  const previousPointerPosRef = useRef({ x: 0, y: 0 });
  const manualRotRef = useRef({ x: 0, y: 0 });

  // Responsive check
  useEffect(() => {
    const handleViewportCheck = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleViewportCheck();
    window.addEventListener('resize', handleViewportCheck);
    return () => window.removeEventListener('resize', handleViewportCheck);
  }, []);

  // -------------------------------------------------------------
  // 1. Procedural High-Definition Textures
  // -------------------------------------------------------------
  const createProceduralTextures = useCallback(() => {
    // A. Kraft Texture
    const kraftCanvas = document.createElement('canvas');
    kraftCanvas.width = 1024;
    kraftCanvas.height = 1024;
    const ctxK = kraftCanvas.getContext('2d')!;

    ctxK.fillStyle = '#c89d67';
    ctxK.fillRect(0, 0, 1024, 1024);

    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const len = 2 + Math.random() * 4.5;
      const alpha = 0.05 + Math.random() * 0.09;
      ctxK.fillStyle = Math.random() > 0.5 ? `rgba(90, 60, 30, ${alpha})` : `rgba(240, 215, 180, ${alpha})`;
      ctxK.fillRect(x, y, len, 1.5);
    }

    for (let y = 0; y < 1024; y += 4) {
      ctxK.fillStyle = 'rgba(70, 45, 20, 0.035)';
      ctxK.fillRect(0, y, 1024, 1.5);
    }

    ctxK.strokeStyle = 'rgba(70, 45, 20, 0.35)';
    ctxK.lineWidth = 1.5;
    ctxK.setLineDash([8, 6]);
    ctxK.strokeRect(30, 30, 964, 964);
    ctxK.setLineDash([]);

    ctxK.font = 'bold 15px monospace';
    ctxK.fillStyle = 'rgba(60, 40, 18, 0.8)';
    ctxK.fillText('EXECUTIVE PACKS • DIE-CUT REF: EP-M240', 60, 75);
    ctxK.fillText('CORRUGATED E-FLUTE • 100% RECYCLED FSC®', 60, 100);
    ctxK.fillText('DIMENSIONS: 240 × 160 × 80 mm', 60, 125);

    ctxK.save();
    ctxK.translate(512, 512);
    ctxK.strokeStyle = '#3e2714';
    ctxK.lineWidth = 3.5;
    ctxK.strokeRect(-210, -110, 420, 220);
    ctxK.fillStyle = '#2b1908';
    ctxK.font = '900 32px sans-serif';
    ctxK.textAlign = 'center';
    ctxK.fillText('EXECUTIVE PACKS', 0, -25);
    ctxK.font = '600 14px sans-serif';
    ctxK.letterSpacing = '3px';
    ctxK.fillText('BESPOKE PACKAGING CO. • EST. 1984', 0, 8);
    ctxK.font = '500 12px monospace';
    ctxK.fillText('FACTORY DIRECT • CRUSH-RESISTANT 350 GSM', 0, 40);
    ctxK.font = '26px sans-serif';
    ctxK.fillText('♻', -150, 80);
    ctxK.fillText('📦', 150, 80);
    ctxK.font = '11px monospace';
    ctxK.fillText('100% RECYCLABLE', 0, 80);
    ctxK.restore();

    const kraftTex = new THREE.CanvasTexture(kraftCanvas);
    kraftTex.anisotropy = 8;

    // B. Luxury Obsidian & Gold Foil Box Texture
    const luxCanvas = document.createElement('canvas');
    luxCanvas.width = 1024;
    luxCanvas.height = 1024;
    const ctxL = luxCanvas.getContext('2d')!;

    ctxL.fillStyle = '#101014';
    ctxL.fillRect(0, 0, 1024, 1024);

    for (let i = 0; i < 1500; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      ctxL.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.04})`;
      ctxL.fillRect(x, y, 2, 2);
    }

    ctxL.save();
    ctxL.translate(512, 512);
    ctxL.strokeStyle = '#FFB51B';
    ctxL.lineWidth = 2.5;
    ctxL.strokeRect(-230, -130, 460, 260);
    ctxL.strokeStyle = '#fef08a';
    ctxL.lineWidth = 1;
    ctxL.strokeRect(-222, -122, 444, 244);

    const goldGrad = ctxL.createLinearGradient(-150, -50, 150, 50);
    goldGrad.addColorStop(0, '#d97706');
    goldGrad.addColorStop(0.3, '#FFB51B');
    goldGrad.addColorStop(0.7, '#fef08a');
    goldGrad.addColorStop(1, '#b45309');

    ctxL.fillStyle = goldGrad;
    ctxL.font = '900 34px serif';
    ctxL.textAlign = 'center';
    ctxL.fillText('EXECUTIVE', 0, -32);
    ctxL.font = 'italic 400 16px serif';
    ctxL.fillText('Haute Packaging & Rigid Boxes', 0, 4);
    ctxL.font = '600 11px sans-serif';
    ctxL.letterSpacing = '5px';
    ctxL.fillText('METALLIC GOLD FOIL STAMP', 0, 45);
    ctxL.fillText('1200 GSM SOLID GREYBOARD', 0, 70);
    ctxL.restore();

    const luxTex = new THREE.CanvasTexture(luxCanvas);
    luxTex.anisotropy = 8;

    // C. Clean Arctic White Texture
    const whiteCanvas = document.createElement('canvas');
    whiteCanvas.width = 1024;
    whiteCanvas.height = 1024;
    const ctxW = whiteCanvas.getContext('2d')!;

    ctxW.fillStyle = '#f8f9fa';
    ctxW.fillRect(0, 0, 1024, 1024);

    ctxW.strokeStyle = 'rgba(0, 0, 0, 0.04)';
    ctxW.lineWidth = 1;
    for (let g = 0; g <= 1024; g += 64) {
      ctxW.beginPath();
      ctxW.moveTo(g, 0); ctxW.lineTo(g, 1024);
      ctxW.moveTo(0, g); ctxW.lineTo(1024, g);
      ctxW.stroke();
    }

    const cmykGrad = ctxW.createLinearGradient(0, 0, 1024, 0);
    cmykGrad.addColorStop(0, '#ea580c');
    cmykGrad.addColorStop(0.5, '#FFB51B');
    cmykGrad.addColorStop(1, '#b45309');

    ctxW.fillStyle = cmykGrad;
    ctxW.fillRect(60, 420, 904, 12);

    ctxW.save();
    ctxW.translate(512, 512);
    ctxW.fillStyle = '#18181b';
    ctxW.font = '800 32px sans-serif';
    ctxW.textAlign = 'center';
    ctxW.fillText('EXECUTIVE PACKS', 0, -20);
    ctxW.font = '500 13px sans-serif';
    ctxW.fillStyle = '#71717a';
    ctxW.fillText('FULL-COLOR CMYK RETAIL FOLDING CARTON', 0, 20);
    ctxW.fillText('HIGH-GLOSS AQUEOUS COATING • 350 GSM', 0, 45);
    ctxW.restore();

    const whiteTex = new THREE.CanvasTexture(whiteCanvas);
    whiteTex.anisotropy = 8;

    // D. Rising 3D Metallic Plaque Texture ("EXECUTIVE PACKS")
    const createPlaqueCanvas = (bgFill: string, isDark: boolean) => {
      const pCanv = document.createElement('canvas');
      pCanv.width = 1024;
      pCanv.height = 512;
      const ctx = pCanv.getContext('2d')!;

      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, 1024, 512);

      ctx.save();
      ctx.translate(512, 256);

      // Outer gold rim
      ctx.strokeStyle = '#FFB51B';
      ctx.lineWidth = 6;
      ctx.strokeRect(-480, -220, 960, 440);

      // Inner thin gold frame
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 2;
      ctx.strokeRect(-468, -208, 936, 416);

      // Corner gold diamonds
      const drawDiamond = (x: number, y: number) => {
        ctx.fillStyle = '#FFB51B';
        ctx.beginPath();
        ctx.moveTo(x, y - 10);
        ctx.lineTo(x + 10, y);
        ctx.lineTo(x, y + 10);
        ctx.lineTo(x - 10, y);
        ctx.closePath();
        ctx.fill();
      };
      drawDiamond(-468, -208);
      drawDiamond(468, -208);
      drawDiamond(-468, 208);
      drawDiamond(468, 208);

      // Crown icon
      ctx.font = '46px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('👑', 0, -115);

      // Gold Foil Typography
      const textGrad = ctx.createLinearGradient(-350, 0, 350, 0);
      textGrad.addColorStop(0, '#d97706');
      textGrad.addColorStop(0.3, '#FFB51B');
      textGrad.addColorStop(0.6, '#ffffff');
      textGrad.addColorStop(0.85, '#fef08a');
      textGrad.addColorStop(1, '#b45309');

      ctx.fillStyle = textGrad;
      ctx.font = '900 68px serif';
      ctx.letterSpacing = '8px';
      ctx.shadowColor = 'rgba(255, 181, 27, 0.65)';
      ctx.shadowBlur = 20;
      ctx.fillText('EXECUTIVE', 0, -25);
      ctx.shadowBlur = 0;

      ctx.font = '900 48px sans-serif';
      ctx.letterSpacing = '14px';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('PACKS', 0, 45);

      ctx.fillStyle = '#FFB51B';
      ctx.fillRect(-280, 80, 560, 2);

      ctx.font = 'bold 16px monospace';
      ctx.letterSpacing = '5px';
      ctx.fillStyle = isDark ? '#fef08a' : '#451a03';
      ctx.fillText('BESPOKE PACKAGING CO. • EST. 1984', 0, 115);

      ctx.font = 'italic 500 13px serif';
      ctx.letterSpacing = '2px';
      ctx.fillStyle = isDark ? '#d4d4d8' : '#78350f';
      ctx.fillText('ENGINEERED FOR THE WORLD’S FINEST BRANDS', 0, 150);

      ctx.restore();

      const tex = new THREE.CanvasTexture(pCanv);
      tex.anisotropy = 8;
      return tex;
    };

    const plaqueKraftTex = createPlaqueCanvas('#121217', true);
    const plaqueLuxTex = createPlaqueCanvas('#0a0a0d', true);
    const plaqueWhiteTex = createPlaqueCanvas('#ffffff', false);

    return { 
      kraftTex, 
      luxTex, 
      whiteTex,
      plaqueKraftTex,
      plaqueLuxTex,
      plaqueWhiteTex
    };
  }, []);

  // -------------------------------------------------------------
  // 2. Setup Three.js Cinematic Scene
  // -------------------------------------------------------------
  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;
    const desktopMode = window.innerWidth >= 1024;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 2.7, 6.2);
    camera.lookAt(0, 0.08, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.78);
    scene.add(ambientLight);

    const dirKeyLight = new THREE.DirectionalLight(0xfff9f0, 1.85);
    dirKeyLight.position.set(4.5, 7, 5);
    dirKeyLight.castShadow = true;
    dirKeyLight.shadow.mapSize.width = 1024;
    dirKeyLight.shadow.mapSize.height = 1024;
    dirKeyLight.shadow.bias = -0.0005;
    scene.add(dirKeyLight);

    const rimLight = new THREE.DirectionalLight(0x7ea0d0, 0.65);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    const amberRimLight = new THREE.DirectionalLight(0xFFB51B, 0.95);
    amberRimLight.position.set(-4, -2, -3);
    scene.add(amberRimLight);

    const foilLight = new THREE.PointLight(0xFFB51B, 2.2, 7);
    foilLight.position.set(1.5, 2.5, 2);
    scene.add(foilLight);
    foilLightRef.current = foilLight;

    // Contact Shadow Floor
    const shadowGeo = new THREE.PlaneGeometry(16, 16);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.42 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(desktopMode ? 1.22 : 0, desktopMode ? -0.325 : -1.255, 0);
    shadowMesh.receiveShadow = true;
    scene.add(shadowMesh);

    // Glowing Golden Studio Pedestal Ring (#FFB51B)
    const ringGeo = new THREE.RingGeometry(1.95, 2.00, 80);
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: 0xFFB51B, 
      transparent: true, 
      opacity: 0.42, 
      side: THREE.DoubleSide 
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.set(desktopMode ? 1.22 : 0, desktopMode ? -0.318 : -1.248, 0);
    scene.add(ringMesh);

    // Textures & Materials
    const { 
      kraftTex, 
      luxTex, 
      whiteTex,
      plaqueKraftTex,
      plaqueLuxTex,
      plaqueWhiteTex
    } = createProceduralTextures();

    const kraftMat = new THREE.MeshStandardMaterial({
      map: kraftTex,
      roughness: 0.78,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    const luxuryMat = new THREE.MeshStandardMaterial({
      map: luxTex,
      roughness: 0.32,
      metalness: 0.32,
      side: THREE.DoubleSide
    });

    const whiteMat = new THREE.MeshStandardMaterial({
      map: whiteTex,
      roughness: 0.38,
      metalness: 0.1,
      side: THREE.DoubleSide
    });

    const plaqueKraftMat = new THREE.MeshStandardMaterial({
      map: plaqueKraftTex,
      roughness: 0.22,
      metalness: 0.82,
      side: THREE.DoubleSide
    });

    const plaqueLuxMat = new THREE.MeshStandardMaterial({
      map: plaqueLuxTex,
      roughness: 0.2,
      metalness: 0.88,
      side: THREE.DoubleSide
    });

    const plaqueWhiteMat = new THREE.MeshStandardMaterial({
      map: plaqueWhiteTex,
      roughness: 0.25,
      metalness: 0.75,
      side: THREE.DoubleSide
    });

    materialsRef.current = {
      kraft: kraftMat,
      luxury: luxuryMat,
      white: whiteMat,
      edge: new THREE.MeshStandardMaterial({ color: 0x937856, roughness: 0.95 }),
      plaqueKraft: plaqueKraftMat,
      plaqueLux: plaqueLuxMat,
      plaqueWhite: plaqueWhiteMat
    };

    // Box Assembly
    const bW = 2.4;
    const bD = 1.6;
    const wH = 0.95;
    const th = 0.018;

    const rootGroup = new THREE.Group();
    const floatGroup = new THREE.Group();
    rootGroup.add(floatGroup);
    scene.add(rootGroup);

    rootBoxGroupRef.current = rootGroup;
    floatingGroupRef.current = floatGroup;

    // Position on Right side (58-60% width area on Desktop)
    if (desktopMode) {
      rootGroup.position.set(1.22, -0.32, 0);
      rootGroup.scale.set(0.78, 0.78, 0.78);
    } else {
      rootGroup.position.set(0, -1.25, 0);
      rootGroup.scale.set(0.32, 0.32, 0.32);
    }

    const createPanel = (pw: number, pd: number, mat: THREE.Material) => {
      const geo = new THREE.BoxGeometry(pw, th, pd);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    };

    // 1. Base Panel
    const baseMesh = createPanel(bW, bD, kraftMat);
    baseMesh.position.set(0, th / 2, 0);
    floatGroup.add(baseMesh);

    // 2. Left Wall
    const leftPivot = new THREE.Group();
    leftPivot.position.set(-bW / 2, th / 2, 0);
    const leftMesh = createPanel(wH, bD, kraftMat);
    leftMesh.position.set(-wH / 2, 0, 0);
    leftPivot.add(leftMesh);
    floatGroup.add(leftPivot);
    leftPivotRef.current = leftPivot;

    // 3. Right Wall
    const rightPivot = new THREE.Group();
    rightPivot.position.set(bW / 2, th / 2, 0);
    const rightMesh = createPanel(wH, bD, kraftMat);
    rightMesh.position.set(wH / 2, 0, 0);
    rightPivot.add(rightMesh);
    floatGroup.add(rightPivot);
    rightPivotRef.current = rightPivot;

    // 4. Front Wall
    const frontPivot = new THREE.Group();
    frontPivot.position.set(0, th / 2, bD / 2);
    const frontMesh = createPanel(bW, wH, kraftMat);
    frontMesh.position.set(0, 0, wH / 2);
    frontPivot.add(frontMesh);
    floatGroup.add(frontPivot);
    frontPivotRef.current = frontPivot;

    // 5. Back Wall
    const backPivot = new THREE.Group();
    backPivot.position.set(0, th / 2, -bD / 2);
    const backMesh = createPanel(bW, wH, kraftMat);
    backMesh.position.set(0, 0, -wH / 2);
    backPivot.add(backMesh);
    floatGroup.add(backPivot);
    backPivotRef.current = backPivot;

    // 6. Top Lid
    const lidPivot = new THREE.Group();
    lidPivot.position.set(0, 0, -wH);
    const lidMesh = createPanel(bW, bD, kraftMat);
    lidMesh.position.set(0, 0, -bD / 2);
    lidPivot.add(lidMesh);
    backPivot.add(lidPivot);
    lidPivotRef.current = lidPivot;

    // 7. Front Tuck Flap
    const tuckPivot = new THREE.Group();
    tuckPivot.position.set(0, 0, -bD);
    const tuckMesh = createPanel(bW * 0.96, wH * 0.45, kraftMat);
    tuckMesh.position.set(0, 0, -(wH * 0.45) / 2);
    tuckPivot.add(tuckMesh);
    lidPivot.add(tuckPivot);
    tuckPivotRef.current = tuckPivot;

    // 8. Dust Flaps (Tuck inside the box)
    const leftDust = new THREE.Group();
    leftDust.position.set(-bW / 2 + 0.025, 0, -bD / 2);
    const leftDustMesh = createPanel(wH * 0.72, bD * 0.84, kraftMat);
    leftDustMesh.position.set(-(wH * 0.72) / 2, 0, 0);
    leftDust.add(leftDustMesh);
    lidPivot.add(leftDust);
    leftDustRef.current = leftDust;

    const rightDust = new THREE.Group();
    rightDust.position.set(bW / 2 - 0.025, 0, -bD / 2);
    const rightDustMesh = createPanel(wH * 0.72, bD * 0.84, kraftMat);
    rightDustMesh.position.set((wH * 0.72) / 2, 0, 0);
    rightDust.add(rightDustMesh);
    lidPivot.add(rightDust);
    rightDustRef.current = rightDust;

    // 9. Rising 3D Gold Plaque & Volumetric Interior Glow
    const interiorLight = new THREE.PointLight(0xFFB51B, 0, 4.5);
    interiorLight.position.set(0, 0.5, 0);
    floatGroup.add(interiorLight);
    interiorLightRef.current = interiorLight;

    const plaqueGeo = new THREE.BoxGeometry(1.68, 0.84, 0.038);
    const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueKraftMat);
    plaqueMesh.position.set(0, 0.05, 0);
    plaqueMesh.scale.set(0.001, 0.001, 0.001);
    plaqueMesh.castShadow = true;
    floatGroup.add(plaqueMesh);
    plaqueMeshRef.current = plaqueMesh;

    // Golden Sparkle Particle Embers System
    const particleCount = 75;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 1.6;
      particlePositions[i * 3 + 1] = 0.2 + Math.random() * 1.8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
      particleSpeeds[i] = 0.006 + Math.random() * 0.012;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const dotCanvas = document.createElement('canvas');
    dotCanvas.width = 64;
    dotCanvas.height = 64;
    const dotCtx = dotCanvas.getContext('2d')!;
    const radGrad = dotCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
    radGrad.addColorStop(0, '#ffffff');
    radGrad.addColorStop(0.3, '#FFB51B');
    radGrad.addColorStop(1, 'rgba(255, 181, 27, 0)');
    dotCtx.fillStyle = radGrad;
    dotCtx.fillRect(0, 0, 64, 64);
    const dotTex = new THREE.CanvasTexture(dotCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      map: dotTex,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particlesPoints = new THREE.Points(particleGeo, particleMat);
    floatGroup.add(particlesPoints);
    particlesPointsRef.current = particlesPoints;
    particleSpeedsRef.current = particleSpeeds;

    // Initial Isometric Orientation
    rootGroup.rotation.x = 0.52;
    rootGroup.rotation.y = -0.38;

    // Resize
    const handleResize = () => {
      if (!mount || !renderer || !camera) return;
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);

      const isDesk = window.innerWidth >= 1024;
      if (rootBoxGroupRef.current) {
        if (isDesk) {
          rootBoxGroupRef.current.position.set(1.22, -0.32, 0);
          rootBoxGroupRef.current.scale.set(0.78, 0.78, 0.78);
          ringMesh.position.set(1.22, -0.318, 0);
          shadowMesh.position.set(1.22, -0.325, 0);
        } else {
          rootBoxGroupRef.current.position.set(0, -1.25, 0);
          rootBoxGroupRef.current.scale.set(0.32, 0.32, 0.32);
          ringMesh.position.set(0, -1.248, 0);
          shadowMesh.position.set(0, -1.255, 0);
        }
      }
    };
    window.addEventListener('resize', handleResize);

    // Continuous Animation Loop
    let clock = new THREE.Clock();

    const animateLoop = () => {
      animFrameIdRef.current = requestAnimationFrame(animateLoop);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.16;
      const p = currentProgressRef.current;

      // Update stage only when threshold crossed (prevents 60fps React re-renders)
      const stageIdx = p < 0.25 ? 0 : p < 0.55 ? 1 : p < 0.80 ? 2 : 3;
      if (stageIdx !== currentStageIndexRef.current) {
        currentStageIndexRef.current = stageIdx;
        setCurrentStageIndex(stageIdx);
      }

      // Update HUD percentage directly via DOM ref (0 React re-renders)
      if (percentSpanRef.current) {
        const pct = Math.round(p * 100);
        if (lastPctRef.current !== pct) {
          lastPctRef.current = pct;
          percentSpanRef.current.textContent = `${pct}%`;
        }
      }

      if (arrowIconRef.current) {
        const shouldRotate = p > 0.85;
        if (shouldRotate !== isArrowRotatedRef.current) {
          isArrowRotatedRef.current = shouldRotate;
          arrowIconRef.current.style.transform = shouldRotate ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }

      // Folding Kinematics
      const pWalls = Math.max(0, Math.min(1, (p - 0.10) / 0.30));
      const wallAngle = pWalls * (Math.PI / 2);

      if (leftPivotRef.current) leftPivotRef.current.rotation.z = -wallAngle;
      if (rightPivotRef.current) rightPivotRef.current.rotation.z = wallAngle;
      if (frontPivotRef.current) frontPivotRef.current.rotation.x = -wallAngle;
      if (backPivotRef.current) backPivotRef.current.rotation.x = wallAngle;

      const pDust = Math.max(0, Math.min(1, (p - 0.32) / 0.18));
      const dustAngle = pDust * (Math.PI / 2);
      if (leftDustRef.current) leftDustRef.current.rotation.z = -dustAngle;
      if (rightDustRef.current) rightDustRef.current.rotation.z = dustAngle;

      const pLidShowcase = Math.max(0, Math.min(1, (p - 0.35) / 0.22));
      const lidAngle = pLidShowcase * (-Math.PI * 0.35);
      if (lidPivotRef.current) lidPivotRef.current.rotation.x = lidAngle;
      if (tuckPivotRef.current) tuckPivotRef.current.rotation.x = -lidAngle * 0.5;

      // The Magic Reveal: Rising Emblem & Sparks
      const pReveal = Math.max(0, Math.min(1, (p - 0.38) / 0.35));
      
      if (plaqueMeshRef.current && interiorLightRef.current) {
        const targetY = 0.05 + pReveal * 1.32;
        plaqueMeshRef.current.position.y = targetY;

        const scale = 0.001 + pReveal * 0.999;
        plaqueMeshRef.current.scale.set(scale, scale, scale);

        plaqueMeshRef.current.rotation.x = Math.sin(elapsedTime * 2.2) * 0.06 - 0.05;
        plaqueMeshRef.current.rotation.y = Math.cos(elapsedTime * 1.8) * 0.05;

        interiorLightRef.current.intensity = pReveal * 3.6;
        interiorLightRef.current.position.y = 0.2 + pReveal * 0.6;
      }

      if (particlesPointsRef.current && particleSpeedsRef.current) {
        const mat = particlesPointsRef.current.material as THREE.PointsMaterial;
        mat.opacity = pReveal * 0.85;

        const posAttr = particlesPointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const positions = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += particleSpeedsRef.current[i];
          if (positions[i * 3 + 1] > 2.6) {
            positions[i * 3 + 1] = 0.2;
            positions[i * 3] = (Math.random() - 0.5) * 1.5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
          }
        }
        posAttr.needsUpdate = true;
      }

      // 360° Float and Levitation
      if (rootBoxGroupRef.current && floatingGroupRef.current) {
        const initialRotX = 0.52;
        const initialRotY = -0.38;

        const pSpin = Math.max(0, Math.min(1, (p - 0.74) / 0.26));
        const spinY = pSpin * (Math.PI * 2.2);

        const floatY = Math.sin(elapsedTime * 2.2) * 0.04 + (p > 0.74 ? 0.2 : 0);
        floatingGroupRef.current.position.y = floatY;

        const autoSpinAngle = autoRotate ? elapsedTime * 0.5 : 0;
        rootBoxGroupRef.current.rotation.x = initialRotX * (1 - pSpin * 0.38) + manualRotRef.current.x;
        rootBoxGroupRef.current.rotation.y = initialRotY + spinY + autoSpinAngle + manualRotRef.current.y;

        if (foilLightRef.current) {
          foilLightRef.current.position.x = Math.sin(elapsedTime * 1.5) * 3 + (desktopMode ? 1.22 : 0);
          foilLightRef.current.position.y = 1.8 + Math.cos(elapsedTime * 1.5) * 0.5;
          foilLightRef.current.position.z = Math.cos(elapsedTime * 1.5) * 3 + 2;
        }
      }

      renderer.render(scene, camera);
    };

    animateLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
    };
  }, [createProceduralTextures, autoRotate]);

  // Material Switcher
  const switchMaterial = (theme: MaterialTheme) => {
    setActiveTheme(theme);
    if (!materialsRef.current || !rootBoxGroupRef.current) return;

    const chosenBoxMat = materialsRef.current[theme];
    rootBoxGroupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child !== plaqueMeshRef.current && child.material !== materialsRef.current?.edge) {
        child.material = chosenBoxMat;
      }
    });

    if (plaqueMeshRef.current) {
      if (theme === 'luxury') {
        plaqueMeshRef.current.material = materialsRef.current.plaqueLux;
      } else if (theme === 'white') {
        plaqueMeshRef.current.material = materialsRef.current.plaqueWhite;
      } else {
        plaqueMeshRef.current.material = materialsRef.current.plaqueKraft;
      }
    }
  };

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const topOffset = window.innerWidth >= 640 ? 64 : 56;
      const totalScrollable = el.offsetHeight - (window.innerHeight - topOffset);
      if (totalScrollable <= 0) return;

      const p = Math.max(0, Math.min(1, (topOffset - rect.top) / totalScrollable));
      targetProgressRef.current = p;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStage = (stageIdx: number) => {
    const el = containerRef.current;
    if (!el) return;
    const progressTargets = [0.05, 0.35, 0.65, 0.90];
    const targetP = progressTargets[stageIdx] || 0;
    const topOffset = window.innerWidth >= 640 ? 64 : 56;
    const totalScrollable = el.offsetHeight - (window.innerHeight - topOffset);
    const targetScrollY = el.offsetTop - topOffset + totalScrollable * targetP;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  // Pointer drag
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDownRef.current = true;
    previousPointerPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const deltaX = e.clientX - previousPointerPosRef.current.x;
    const deltaY = e.clientY - previousPointerPosRef.current.y;
    previousPointerPosRef.current = { x: e.clientX, y: e.clientY };

    manualRotRef.current.y += deltaX * 0.008;
    manualRotRef.current.x += deltaY * 0.008;
    manualRotRef.current.x = Math.max(-0.6, Math.min(0.6, manualRotRef.current.x));
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
  };

  // Active Stage
  const currentStage = STAGES[currentStageIndex];

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="relative h-[310vh] bg-[#101014] text-white select-none overflow-clip transition-colors duration-500"
    >
      {/* Sticky Fullscreen Cinematic Viewport - Anchored below the sticky navbar and above mobile bottom nav */}
      <div 
        className="sticky top-14 sm:top-16 left-0 w-full overflow-hidden flex flex-col justify-between h-[calc(100vh_-_7.5rem)] sm:h-[calc(100vh_-_4rem)]"
        style={{ height: 'calc(100vh - 7.5rem)', minHeight: 'calc(100vh - 7.5rem)' }}
      >
        
        {/* Subtle Golden Radial Gradient Behind 3D Box & Ambient Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_72%_45%,rgba(255,181,27,0.18)_0%,rgba(16,16,20,0)_65%),radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.03)_0%,rgba(16,16,20,0)_50%)]" />

        {/* Subtle Technical Grid Texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.6) 1px, transparent 1px)',
            backgroundSize: '44px 44px'
          }}
        />

        {/* ------------------------------------------------------------- */}
        {/* TOP FLOATING BRAND / STATUS BAR (Container Fluid) */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 pt-3 sm:pt-4 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full max-w-[1920px] mx-auto flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-lg pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-[#FFB51B] animate-pulse shrink-0 shadow-[0_0_8px_#FFB51B]"></span>
            <span className="text-[11px] font-bold text-stone-200 tracking-wider uppercase font-mono">
              3D Realtime Kinematics Engine
            </span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition backdrop-blur-xl shadow-lg ${
                autoRotate 
                  ? 'bg-[#FFB51B] text-[#101014] border-[#FFB51B] shadow-[0_0_12px_rgba(255,181,27,0.4)]' 
                  : 'bg-white/[0.06] border-white/10 text-stone-300 hover:bg-white/15'
              }`}
            >
              <Rotate3d className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{autoRotate ? 'Auto Orbiting' : 'Auto Orbit'}</span>
            </button>

            <div className="px-3 py-1.5 rounded-xl bg-white text-[#101014] font-mono text-xs font-black shadow-lg flex items-center gap-1.5">
              <span ref={percentSpanRef}>0%</span>
              <ArrowDown ref={arrowIconRef} className="w-3.5 h-3.5 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3D CANVAS STAGE (Full bleed background layer) */}
        {/* ------------------------------------------------------------- */}
        <div 
          className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div ref={canvasMountRef} className="w-full h-full pointer-events-none" />
          
          <div className="absolute bottom-24 right-8 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-white/10 text-white/90 text-[11px] font-medium shadow-xl">
            <MousePointerClick className="w-3.5 h-3.5 text-[#FFB51B]" />
            <span>Drag to rotate 3D box • Scroll to see unbox & reveal</span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TWO-COLUMN HERO CONTENT (Container Fluid Widescreen) */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-3 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 flex-1 flex flex-col justify-start sm:justify-center pt-1 sm:pt-0 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16 items-center w-full">
            
            {/* Left Column (40–42% fluid width) - Frosted card on mobile for flawless text contrast */}
            <div 
              suppressHydrationWarning
              className="lg:col-span-5 xl:col-span-5 max-w-2xl pointer-events-auto bg-[#0c0a09]/95 sm:bg-transparent backdrop-blur-2xl sm:backdrop-blur-none p-3.5 sm:p-0 rounded-2xl sm:rounded-none border border-white/20 sm:border-0 shadow-2xl sm:shadow-none"
            >
              
              {/* Stage Pill */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#FFB51B]/10 border border-[#FFB51B]/30 text-[#FFB51B] text-[10px] sm:text-[11px] font-black tracking-widest uppercase mb-2.5 sm:mb-4 backdrop-blur-md shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB51B] shadow-[0_0_6px_#FFB51B]"></span>
                <span className="truncate">{currentStage.badgeText}</span>
              </div>

              {/* Master Headline (Exact Requirement) */}
              <h1 className="text-2xl sm:text-5xl lg:text-[52px] font-black text-white tracking-tight leading-[1.12] sm:leading-[1.08] mb-2 sm:mb-4 drop-shadow-md">
                Packaging That <br />
                Makes Your Brand <br />
                <span className="relative inline-block text-[#FFB51B]">
                  Unforgettable.
                  {/* Subtle Golden Glow Curved Accent */}
                  <svg 
                    className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#FFB51B]/80 pointer-events-none" 
                    viewBox="0 0 200 12" 
                    fill="none" 
                    preserveAspectRatio="none"
                  >
                    <path 
                      d="M2 9C50 3 150 2 198 8" 
                      stroke="currentColor" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                    />
                  </svg>
                </span>
              </h1>

              {/* Description (Exact Requirement) */}
              <p className="text-xs sm:text-base text-stone-300 font-medium leading-relaxed mb-3 sm:mb-6 max-w-lg line-clamp-2 sm:line-clamp-none drop-shadow-xs">
                From custom concepts to production-ready packaging. Designed to impress, engineered to protect, and built to scale.
              </p>

              {/* Information Pills (Exact Requirement) */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 mb-4 sm:mb-7">
                <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 text-[11px] sm:text-xs font-semibold text-stone-200 shadow-xs">
                  <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFB51B]" />
                  <span>No MOQ (From 25)</span>
                </div>

                <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 text-[11px] sm:text-xs font-semibold text-stone-200 shadow-xs">
                  <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFB51B]" />
                  <span>4–5 Days Express</span>
                </div>

                <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 text-[11px] sm:text-xs font-semibold text-stone-200 shadow-xs">
                  <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFB51B]" />
                  <span>Free Sample Kits</span>
                </div>
              </div>

              {/* CTA Buttons (Exact Requirement) */}
              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href="#quote-section"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-[#FFB51B] hover:bg-[#ffbe33] text-[#101014] font-black text-xs sm:text-sm transition-all shadow-[0_0_24px_rgba(255,181,27,0.35)] hover:shadow-[0_0_32px_rgba(255,181,27,0.55)] active:scale-98 shrink-0"
                >
                  <span>Get Instant Pricing</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#101014]" />
                </a>

                <a
                  href="#categories-section"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 font-bold text-xs sm:text-sm hover:bg-white/25 hover:border-white/35 transition shadow-xs active:scale-98 shrink-0"
                >
                  <Play className="w-3 h-3 fill-white text-white" />
                  <span>Explore 55+ Boxes</span>
                </a>
              </div>

            </div>

            {/* Right Column (58–60% width area for the 3D Box) */}
            <div className="hidden lg:block lg:col-span-7 xl:col-span-7 h-full pointer-events-none" />

          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* BOTTOM INSPECTION CONTROLS (Glassmorphic Unified Panel - Fluid) */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 mt-auto pb-2.5 sm:pb-4 px-2 sm:px-8 lg:px-12 xl:px-16 max-w-[1920px] mx-auto w-full pointer-events-none">
          <div className="w-fit max-w-[272px] sm:max-w-5xl mx-auto p-1 sm:p-2.5 rounded-2xl bg-stone-950/95 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/80 pointer-events-auto flex items-center justify-center sm:justify-between gap-1.5 sm:gap-3">
            
            {/* Timeline Steps */}
            <div className="flex items-center gap-1 shrink-0">
              {STAGES.map((s, idx) => {
                const isActive = currentStageIndex === idx;
                return (
                  <button
                    key={s.step}
                    onClick={() => scrollToStage(idx)}
                    aria-label={s.label}
                    className={`px-1.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold transition flex items-center gap-1 sm:gap-2 whitespace-nowrap ${
                      isActive 
                        ? 'bg-[#FFB51B] text-[#101014] font-black shadow-[0_0_16px_rgba(255,181,27,0.4)]' 
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isActive && idx === 3 ? (
                      <Rotate3d className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#101014]" />
                    ) : (
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#101014]' : 'bg-stone-500'}`} />
                    )}
                    <span className="sm:hidden font-mono font-bold">{s.step}</span>
                    <span className="hidden sm:inline-block">{s.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="w-px h-4 sm:h-6 bg-white/20 shrink-0 mx-0.5 sm:mx-1" />

            {/* Material Finish Swatches */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-wider hidden sm:inline-block px-1">
                FINISH:
              </span>

              <button
                onClick={() => switchMaterial('kraft')}
                aria-label="Raw Kraft Finish"
                className={`p-1.5 sm:px-3 sm:py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                  activeTheme === 'kraft'
                    ? 'bg-[#FFB51B] text-[#101014] border-[#FFB51B] font-black shadow-xs'
                    : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/15'
                }`}
                title="Raw Kraft Finish"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#c89d67] border border-white/60 shadow-xs" />
                <span className="hidden sm:inline-block">Raw Kraft</span>
              </button>

              <button
                onClick={() => switchMaterial('luxury')}
                aria-label="Gold Foil Finish"
                className={`p-1.5 sm:px-3 sm:py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                  activeTheme === 'luxury'
                    ? 'bg-[#FFB51B] text-[#101014] border-[#FFB51B] font-black shadow-xs'
                    : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/15'
                }`}
                title="Gold Foil Finish"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#111215] border border-[#FFB51B] shadow-xs" />
                <span className="hidden sm:inline-block">Gold Foil</span>
              </button>

              <button
                onClick={() => switchMaterial('white')}
                aria-label="Arctic White Finish"
                className={`p-1.5 sm:px-3 sm:py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                  activeTheme === 'white'
                    ? 'bg-[#FFB51B] text-[#101014] border-[#FFB51B] font-black shadow-xs'
                    : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/15'
                }`}
                title="Arctic White Finish"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-stone-300 shadow-xs" />
                <span className="hidden sm:inline-block">Arctic White</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
