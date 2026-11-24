'use client';

import React, { useEffect, useRef, useState, useCallback, startTransition } from 'react';
import * as THREE from 'three';
import { 
  ArrowDown, 
  Rotate3d, 
  ArrowRight,
  ArrowUpRight,
  Package,
  Zap,
  Gift,
  Play,
  MousePointerClick,
  Sparkles,
  Bookmark
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
    label: 'Closed 3D Box',
    badgeText: 'STAGE 01 • SEALED MASTER BOX',
  },
  {
    step: '02',
    num: 2,
    label: 'Unboxing & Reveal',
    badgeText: 'STAGE 02 • 3D BOX OPENS',
  },
  {
    step: '03',
    num: 3,
    label: '4 Boxes in Flight',
    badgeText: 'STAGE 03 • 4 BOXES IN FLIGHT',
  },
  {
    step: '04',
    num: 4,
    label: '4 Cards Landed',
    badgeText: 'STAGE 04 • LANDED ON 4 CARDS',
  }
];

export interface UnboxProduct {
  id: string;
  name: string;
  desc: string;
  specPill: string;
  priceEstimate: string;
  moq: string;
  ctaText: string;
  img: string;
  categoryTag: string;
  tags: string[];
}

// Web Audio Soft Tactile Haptic Click
function playSoftClick(freq = 640, duration = 0.04) {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio policy restrictions
  }
}

// Exactly 4 products matching the video & uploaded images
const PRODUCTS: UnboxProduct[] = [
  {
    id: 'sleeve-box',
    name: 'Sleeve Box',
    desc: 'Slide-to-reveal drawer box built with rigid greyboard. Features custom satin ribbon pull handle and precision protective foam interior for luxury retail.',
    specPill: 'Slider Tray • Ribbon Pull',
    priceEstimate: 'From PKR 55',
    moq: 'MOQ 50 pcs',
    ctaText: 'Shop Sleeve Boxes',
    img: '/images/unboxing/box-sleeve.png',
    categoryTag: 'rigid-luxury',
    tags: ['# SLEEVE', '# LUXURY']
  },
  {
    id: 'rigid-box',
    name: 'Rigid Box',
    desc: 'Prestige 1200 GSM heavy-duty greyboard cube box structure. Embellished with hot-stamped gold foil accents and ultra-smooth soft-touch matte lamination.',
    specPill: '1200 GSM • Gold Foil Ring',
    priceEstimate: 'From PKR 120',
    moq: 'MOQ 25 pcs',
    ctaText: 'Shop Rigid Boxes',
    img: '/images/unboxing/box-rigid.png',
    categoryTag: 'rigid-luxury',
    tags: ['# RIGID', '# LUXURY']
  },
  {
    id: 'magnetic-box',
    name: 'Magnetic Box',
    desc: 'Luxury book-style flip lid box with concealed magnetic snaps. Features deep botanical debossing with anti-scratch velvet coating for perfumes and jewelry.',
    specPill: 'Concealed Magnets • Matte',
    priceEstimate: 'From PKR 95',
    moq: 'MOQ 50 pcs',
    ctaText: 'Shop Magnetic Boxes',
    img: '/images/unboxing/box-magnetic.png',
    categoryTag: 'rigid-luxury',
    tags: ['# BOX', '# LUXURY']
  },
  {
    id: 'gable-box',
    name: 'Gift Gable Box',
    desc: 'Eco-friendly FSC-certified kraft carrier with die-cut handles. Finished with hand-tied satin ribbon bow and grease-resistant food-safe inner coating.',
    specPill: 'FSC Kraft • Satin Bow',
    priceEstimate: 'From PKR 48',
    moq: 'MOQ 100 pcs',
    ctaText: 'Shop Gable Boxes',
    img: '/images/unboxing/box-gable.png',
    categoryTag: 'food-bakery',
    tags: ['# FOOD', '# BAKERY']
  }
];

// Easing math
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const inOut = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const out = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);

  // States
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [activeTheme, setActiveTheme] = useState<MaterialTheme>('kraft');
  const [autoRotate, setAutoRotate] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const hoveredCardIdxRef = useRef<number | null>(null);

  // HUD & DOM Refs (Zero Re-render at 60-120fps)
  const percentSpanRef = useRef<HTMLSpanElement>(null);
  const arrowIconRef = useRef<SVGSVGElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const landedHeaderRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const currentStageIndexRef = useRef(0);
  const lastPctRef = useRef(-1);
  const isArrowRotatedRef = useRef(false);

  // 4 Boxes and 4 Cards Refs
  const boxElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hoverValuesRef = useRef<number[]>([0, 0, 0, 0]);

  // Smooth Scroll Progress Refs
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);
  const isHeroVisibleRef = useRef(true);
  const isLoopRunningRef = useRef(false);

  // Three.js Core Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rootBoxGroupRef = useRef<THREE.Group | null>(null);
  const floatingGroupRef = useRef<THREE.Group | null>(null);
  const ringMeshRef = useRef<THREE.Mesh | null>(null);
  const shadowMeshRef = useRef<THREE.Mesh | null>(null);

  // 3D Box Pivots
  const leftPivotRef = useRef<THREE.Group | null>(null);
  const rightPivotRef = useRef<THREE.Group | null>(null);
  const frontPivotRef = useRef<THREE.Group | null>(null);
  const backPivotRef = useRef<THREE.Group | null>(null);
  const lidPivotRef = useRef<THREE.Group | null>(null);
  const tuckPivotRef = useRef<THREE.Group | null>(null);
  const leftDustRef = useRef<THREE.Group | null>(null);
  const rightDustRef = useRef<THREE.Group | null>(null);

  // Interior Light & Particles
  const interiorLightRef = useRef<THREE.PointLight | null>(null);
  const particlesPointsRef = useRef<THREE.Points | null>(null);
  const particleSpeedsRef = useRef<Float32Array | null>(null);
  const foilLightRef = useRef<THREE.PointLight | null>(null);

  // Materials Ref
  const materialsRef = useRef<{
    kraft: THREE.Material;
    luxury: THREE.Material;
    white: THREE.Material;
    edge: THREE.Material;
  } | null>(null);

  // Interaction
  const isPointerDownRef = useRef(false);
  const previousPointerPosRef = useRef({ x: 0, y: 0 });
  const manualRotRef = useRef({ x: 0, y: 0 });
  const mouseScreenRef = useRef({ x: 0, y: 0 });

  // Responsive Viewport Check
  useEffect(() => {
    const handleViewportCheck = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setIsMobile(window.innerWidth < 768);
    };
    handleViewportCheck();
    window.addEventListener('resize', handleViewportCheck);
    return () => window.removeEventListener('resize', handleViewportCheck);
  }, []);

  // Mouse Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseScreenRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

    ctxK.font = 'bold 16px monospace';
    ctxK.fillStyle = 'rgba(60, 40, 18, 0.85)';
    ctxK.fillText('EXECUTIVE PACKS • MASTER DIE-CUT REF: EP-M240', 60, 75);
    ctxK.fillText('CORRUGATED E-FLUTE • 100% RECYCLED FSC® CERTIFIED', 60, 100);
    ctxK.fillText('DIMENSIONS: 280 × 190 × 95 mm • FACTORY DIRECT', 60, 125);

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

    // B. Luxury Obsidian & Gold Foil
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

    // C. Arctic White
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

    return { kraftTex, luxTex, whiteTex };
  }, []);

  // -------------------------------------------------------------
  // 2. Three.js Setup (3D Box is 100% CLOSED at 0% Scroll)
  // -------------------------------------------------------------
  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;
    const desktopMode = window.innerWidth >= 1024;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 2.3, 6.2);
    camera.lookAt(0, -0.05, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    const isMobInit = window.innerWidth < 768;
    const maxDpr = isMobInit ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.85);
    scene.add(ambientLight);

    const dirKeyLight = new THREE.DirectionalLight(0xfff9f0, 2.0);
    dirKeyLight.position.set(4.5, 7.5, 5);
    dirKeyLight.castShadow = true;
    dirKeyLight.shadow.mapSize.width = 1024;
    dirKeyLight.shadow.mapSize.height = 1024;
    dirKeyLight.shadow.bias = -0.0005;
    scene.add(dirKeyLight);

    const rimLight = new THREE.DirectionalLight(0x7ea0d0, 0.7);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    const amberRimLight = new THREE.DirectionalLight(0xFFB51B, 1.15);
    amberRimLight.position.set(-4, -2, -3);
    scene.add(amberRimLight);

    const foilLight = new THREE.PointLight(0xFFB51B, 2.4, 8);
    foilLight.position.set(1.5, 2.5, 2);
    scene.add(foilLight);
    foilLightRef.current = foilLight;

    // Contact Shadow Floor
    const isMobile = window.innerWidth < 768;
    const initBaseY = desktopMode ? -0.45 : (isMobile ? -0.48 : -0.55);

    const shadowGeo = new THREE.PlaneGeometry(16, 16);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.42 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(desktopMode ? 1.15 : 0, initBaseY, 0);
    shadowMesh.receiveShadow = true;
    scene.add(shadowMesh);
    shadowMeshRef.current = shadowMesh;

    // Glowing Golden Pedestal Ring
    const ringGeo = new THREE.RingGeometry(1.95, 2.02, 80);
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: 0xFFB51B, 
      transparent: true, 
      opacity: 0.42, 
      side: THREE.DoubleSide 
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.set(desktopMode ? 1.15 : 0, initBaseY + 0.005, 0);
    scene.add(ringMesh);
    ringMeshRef.current = ringMesh;

    // Materials
    const { kraftTex, luxTex, whiteTex } = createProceduralTextures();

    const kraftMat = new THREE.MeshStandardMaterial({
      map: kraftTex,
      roughness: 0.78,
      metalness: 0.08,
      bumpMap: kraftTex,
      bumpScale: 0.015,
      side: THREE.DoubleSide
    });

    const luxMat = new THREE.MeshStandardMaterial({
      map: luxTex,
      roughness: 0.28,
      metalness: 0.45,
      bumpMap: luxTex,
      bumpScale: 0.02,
      side: THREE.DoubleSide
    });

    const whiteMat = new THREE.MeshStandardMaterial({
      map: whiteTex,
      roughness: 0.5,
      metalness: 0.1,
      bumpMap: whiteTex,
      bumpScale: 0.01,
      side: THREE.DoubleSide
    });

    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0x93683a,
      roughness: 0.95,
      metalness: 0.02
    });

    materialsRef.current = {
      kraft: kraftMat,
      luxury: luxMat,
      white: whiteMat,
      edge: edgeMat
    };

    // -------------------------------------------------------------
    // 3. Assemble 3D Box Geometry (100% CLOSED INITIALLY)
    // -------------------------------------------------------------
    const rootGroup = new THREE.Group();
    const floatGroup = new THREE.Group();
    rootGroup.add(floatGroup);
    scene.add(rootGroup);
    rootBoxGroupRef.current = rootGroup;
    floatingGroupRef.current = floatGroup;

    const bW = 2.40;
    const bD = 1.60;
    const wH = 0.90;
    const th = 0.038;

    const createPanel = (pW: number, pD: number, mat: THREE.Material) => {
      const panelGroup = new THREE.Group();
      const faceGeo = new THREE.BoxGeometry(pW, th, pD);
      const faceMesh = new THREE.Mesh(faceGeo, mat);
      faceMesh.castShadow = true;
      faceMesh.receiveShadow = true;
      panelGroup.add(faceMesh);
      return panelGroup;
    };

    // Base
    const baseMesh = createPanel(bW, bD, kraftMat);
    baseMesh.position.set(0, 0, 0);
    floatGroup.add(baseMesh);

    // Left Wall
    const leftPivot = new THREE.Group();
    leftPivot.position.set(-bW / 2, th / 2, 0);
    const leftMesh = createPanel(wH, bD, kraftMat);
    leftMesh.position.set(-wH / 2, 0, 0);
    leftPivot.add(leftMesh);
    floatGroup.add(leftPivot);
    leftPivotRef.current = leftPivot;

    // Right Wall
    const rightPivot = new THREE.Group();
    rightPivot.position.set(bW / 2, th / 2, 0);
    const rightMesh = createPanel(wH, bD, kraftMat);
    rightMesh.position.set(wH / 2, 0, 0);
    rightPivot.add(rightMesh);
    floatGroup.add(rightPivot);
    rightPivotRef.current = rightPivot;

    // Front Wall
    const frontPivot = new THREE.Group();
    frontPivot.position.set(0, th / 2, bD / 2);
    const frontMesh = createPanel(bW, wH, kraftMat);
    frontMesh.position.set(0, 0, wH / 2);
    frontPivot.add(frontMesh);
    floatGroup.add(frontPivot);
    frontPivotRef.current = frontPivot;

    // Back Wall
    const backPivot = new THREE.Group();
    backPivot.position.set(0, th / 2, -bD / 2);
    const backMesh = createPanel(bW, wH, kraftMat);
    backMesh.position.set(0, 0, -wH / 2);
    backPivot.add(backMesh);
    floatGroup.add(backPivot);
    backPivotRef.current = backPivot;

    // Top Lid (Attached to top edge of back wall)
    const lidPivot = new THREE.Group();
    lidPivot.position.set(0, 0, -wH);
    const lidMesh = createPanel(bW, bD, kraftMat);
    lidMesh.position.set(0, 0, -bD / 2);
    lidPivot.add(lidMesh);
    backPivot.add(lidPivot);
    lidPivotRef.current = lidPivot;

    // Front Tuck Flap (Attached to front edge of top lid)
    const tuckPivot = new THREE.Group();
    tuckPivot.position.set(0, 0, -bD);
    const tuckMesh = createPanel(bW * 0.96, wH * 0.45, kraftMat);
    tuckMesh.position.set(0, 0, -(wH * 0.45) / 2);
    tuckPivot.add(tuckMesh);
    lidPivot.add(tuckPivot);
    tuckPivotRef.current = tuckPivot;

    // Dust Flaps
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

    // Interior Volumetric Light
    const interiorLight = new THREE.PointLight(0xFFB51B, 0, 5.0);
    interiorLight.position.set(0, 0.45, 0);
    floatGroup.add(interiorLight);
    interiorLightRef.current = interiorLight;

    // Golden Sparkle Particle Embers
    const particleCount = 85;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 2.0;
      particlePositions[i * 3 + 1] = 0.2 + Math.random() * 2.2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
      particleSpeeds[i] = 0.008 + Math.random() * 0.015;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const dotCanvas = document.createElement('canvas');
    dotCanvas.width = 64;
    dotCanvas.height = 64;
    const dotCtx = dotCanvas.getContext('2d')!;
    const radGrad = dotCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
    radGrad.addColorStop(0, '#ffffff');
    radGrad.addColorStop(0.35, '#FFB51B');
    radGrad.addColorStop(1, 'rgba(255, 181, 27, 0)');
    dotCtx.fillStyle = radGrad;
    dotCtx.fillRect(0, 0, 64, 64);
    const dotTex = new THREE.CanvasTexture(dotCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
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

    // Initial 3D Box Position
    if (desktopMode) {
      rootGroup.position.set(1.15, -0.45, 0);
      rootGroup.scale.set(0.75, 0.75, 0.75);
    } else {
      rootGroup.position.set(0, -1.25, 0);
      rootGroup.scale.set(0.32, 0.32, 0.32);
    }
    rootGroup.rotation.x = 0.48;
    rootGroup.rotation.y = -0.38;

    // ─────────────────────────────────────────────────────────────
    // EXACT KINEMATICS: BOX IS COMPLETELY CLOSED AT INITIAL STATE
    // ─────────────────────────────────────────────────────────────
    leftPivot.rotation.z = -Math.PI / 2;
    rightPivot.rotation.z = Math.PI / 2;
    frontPivot.rotation.x = -Math.PI / 2;
    backPivot.rotation.x = Math.PI / 2;

    // +Math.PI / 2 folds the lid horizontally forward over the box top!
    lidPivot.rotation.x = Math.PI / 2; 

    // +Math.PI / 2 folds the tuck flap vertically down into the front of the box!
    tuckPivot.rotation.x = Math.PI / 2;

    // Dust flaps tucked inward inside the box
    leftDust.rotation.z = -Math.PI / 2;
    rightDust.rotation.z = Math.PI / 2;

    const handleResize = () => {
      if (!mount || !renderer || !camera) return;
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);

      const isDesk = window.innerWidth >= 1024;
      const isMob = window.innerWidth < 768;
      const maxDpr = isMob ? 1.5 : 2;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
      setIsDesktop(isDesk);
      setIsMobile(isMob);
      if (rootBoxGroupRef.current) {
        if (isDesk) {
          rootBoxGroupRef.current.position.set(1.15, -0.45, 0);
          rootBoxGroupRef.current.scale.set(0.75, 0.75, 0.75);
          if (ringMeshRef.current) ringMeshRef.current.position.set(1.15, -0.445, 0);
          if (shadowMeshRef.current) shadowMeshRef.current.position.set(1.15, -0.45, 0);
        } else {
          const mobY = isMob ? -0.48 : -0.55;
          const mobScale = isMob ? 0.48 : 0.60;
          rootBoxGroupRef.current.position.set(0, mobY, 0);
          rootBoxGroupRef.current.scale.set(mobScale, mobScale, mobScale);
          if (ringMeshRef.current) ringMeshRef.current.position.set(0, mobY + 0.005, 0);
          if (shadowMeshRef.current) shadowMeshRef.current.position.set(0, mobY, 0);
        }
      }
    };
    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // 4. Main Continuous Animation Loop
    // -------------------------------------------------------------
    let clock = new THREE.Clock();

    const animateLoop = () => {
      // Pause Three.js render loop when Hero is offscreen to save GPU & CPU
      if (!isHeroVisibleRef.current) {
        isLoopRunningRef.current = false;
        return;
      }

      animFrameIdRef.current = requestAnimationFrame(animateLoop);
      const elapsedTime = clock.getElapsedTime();

      // Soft, cushioned lerp toward target scroll fraction (glides like velvet, zero stutter)
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.08;
      const p = currentProgressRef.current;

      const W = window.innerWidth;
      const H = window.innerHeight;
      const deskMode = W >= 1024;
      const isMob = W < 768;

      // Stage HUD with startTransition to avoid dropping frames during scroll
      const stageIdx = p < 0.20 ? 0 : p < 0.50 ? 1 : p < 0.74 ? 2 : 3;
      if (stageIdx !== currentStageIndexRef.current) {
        currentStageIndexRef.current = stageIdx;
        startTransition(() => {
          setCurrentStageIndex(stageIdx);
        });
      }

      // HUD Percentage
      if (percentSpanRef.current) {
        const pct = Math.round(p * 100);
        if (lastPctRef.current !== pct) {
          lastPctRef.current = pct;
          percentSpanRef.current.textContent = `${pct}%`;
        }
      }

      if (arrowIconRef.current) {
        const shouldRotate = p > 0.90;
        if (shouldRotate !== isArrowRotatedRef.current) {
          isArrowRotatedRef.current = shouldRotate;
          arrowIconRef.current.style.transform = shouldRotate ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }

      // -----------------------------------------------------------
      // A. 3D Box Kinematics: 100% CLOSED AT START -> OPENS ON SCROLL
      // -----------------------------------------------------------
      const pCenter = clamp(p / 0.26);
      const eCenter = inOut(pCenter);
      const startX = deskMode ? 1.15 : 0;
      const currentBoxX = lerp(startX, 0, eCenter);

      const pOpen = clamp((p - 0.05) / 0.32);
      const eOpen = inOut(pOpen);

      // Top Lid: at eOpen = 0 -> +PI/2 (completely closed & flat over box top)
      // at eOpen = 1 -> opens backward to -0.65 rad (-37°)
      if (lidPivotRef.current) {
        lidPivotRef.current.rotation.x = Math.PI / 2 - eOpen * (Math.PI * 0.70);
      }

      // Tuck Flap: at eOpen = 0 -> +PI/2 (tucked down inside front wall)
      // at eOpen = 1 -> 0 (straight with the lid)
      if (tuckPivotRef.current) {
        tuckPivotRef.current.rotation.x = Math.PI / 2 - eOpen * (Math.PI / 2);
      }

      // Dust Flaps: tucked inside when closed (eOpen=0), folds out with lid (eOpen=1)
      if (leftDustRef.current) {
        leftDustRef.current.rotation.z = -Math.PI / 2 + eOpen * (Math.PI / 2);
      }
      if (rightDustRef.current) {
        rightDustRef.current.rotation.z = Math.PI / 2 - eOpen * (Math.PI / 2);
      }

      // Interior Light & Particle Glow
      if (interiorLightRef.current) {
        interiorLightRef.current.intensity = eOpen * 5.0;
      }

      if (particlesPointsRef.current && particleSpeedsRef.current) {
        const mat = particlesPointsRef.current.material as THREE.PointsMaterial;
        mat.opacity = eOpen * 0.9;

        const posAttr = particlesPointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const positions = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += particleSpeedsRef.current[i];
          if (positions[i * 3 + 1] > 2.8) {
            positions[i * 3 + 1] = 0.2;
            positions[i * 3] = (Math.random() - 0.5) * 1.8;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1.4;
          }
        }
        posAttr.needsUpdate = true;
      }

      // Box Translation & Scaling
      if (rootBoxGroupRef.current && floatingGroupRef.current) {
        const pDescend = clamp((p - 0.45) / 0.42);
        const eDescend = inOut(pDescend);

        const baseScale = deskMode ? 0.75 : (isMob ? 0.48 : 0.60);
        const targetScale = baseScale * (1 - eDescend * (isMob ? 0.78 : 0.45));
        rootBoxGroupRef.current.scale.set(targetScale, targetScale, targetScale);

        const baseY = deskMode ? -0.45 : (isMob ? -0.48 : -0.55);
        const descendY = baseY - eDescend * (deskMode ? 0.75 : (isMob ? 0.62 : 0.45));
        rootBoxGroupRef.current.position.set(currentBoxX, descendY, 0);

        if (ringMeshRef.current) {
          ringMeshRef.current.position.set(currentBoxX, descendY + 0.005, 0);
          const ringScale = 1 - eDescend * (isMob ? 0.78 : 0.40);
          ringMeshRef.current.scale.set(ringScale, ringScale, ringScale);
        }
        if (shadowMeshRef.current) {
          shadowMeshRef.current.position.set(currentBoxX, descendY, 0);
          const shadowScale = 1 - eDescend * (isMob ? 0.78 : 0.40);
          shadowMeshRef.current.scale.set(shadowScale, shadowScale, shadowScale);
        }

        const idleFloat = Math.sin(elapsedTime * 2.2) * 0.035;
        floatingGroupRef.current.position.y = idleFloat;

        const autoSpinAngle = autoRotate ? elapsedTime * 0.5 : 0;
        const initialRotX = 0.48;
        const initialRotY = -0.38;
        rootBoxGroupRef.current.rotation.x = initialRotX + manualRotRef.current.x;
        rootBoxGroupRef.current.rotation.y = initialRotY + autoSpinAngle + manualRotRef.current.y;

        if (foilLightRef.current) {
          foilLightRef.current.position.x = Math.sin(elapsedTime * 1.6) * 3 + currentBoxX;
          foilLightRef.current.position.y = 2.0 + Math.cos(elapsedTime * 1.6) * 0.5;
        }
      }

      // -----------------------------------------------------------
      // B. Hero Headline & Hints Fade Out
      // -----------------------------------------------------------
      const pTextFade = clamp((p - 0.05) / 0.18);
      if (heroCopyRef.current) {
        heroCopyRef.current.style.opacity = `${1 - pTextFade}`;
        heroCopyRef.current.style.transform = `translateY(${-pTextFade * 40}px)`;
        heroCopyRef.current.style.pointerEvents = pTextFade > 0.8 ? 'none' : 'auto';
      }
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = `${clamp(1 - p * 4)}`;
      }

      // Top Landed Title (Reveals at p > 0.62)
      const pHeaderFade = clamp((p - 0.62) / 0.18);
      if (landedHeaderRef.current) {
        landedHeaderRef.current.style.opacity = `${pHeaderFade}`;
        landedHeaderRef.current.style.transform = `translateY(${(1 - pHeaderFade) * -20}px)`;
      }

      // -----------------------------------------------------------
      // C. EXACTLY 4 BOXES & 4 CARDS KINEMATICS (2x2 Grid on Mobile, 4 in Row on Desktop)
      // -----------------------------------------------------------
      const cw = Math.min(W * 0.22, 275);
      const colW = cw * 1.10;
      const topFinal = deskMode 
        ? Math.max(H * 0.48, 410) 
        : Math.max(H * 0.46, 340);

      const originScreenX = currentBoxX * (W / 6.5);
      const originScreenY = isMob ? H * 0.10 : (deskMode ? -H * 0.02 : -H * 0.08);

      // Mobile 2x2 Grid Positioning Parameters (Generous height & scale with guaranteed bottom padding)
      const mobCardHeight = 264;
      const mobRowGap = 10;
      const mobRow0Top = Math.max(H * 0.125, 86);
      const mobRow1Top = mobRow0Top + mobCardHeight + mobRowGap;
      const mobColSpacing = Math.min(W * 0.245, 94);

      PRODUCTS.forEach((_, i) => {
        const boxEl = boxElsRef.current[i];
        const cardEl = cardElsRef.current[i];
        if (!boxEl) return;

        const tEmerge = clamp((p - 0.20 - i * 0.035) / 0.32);
        const eEmerge = inOut(tEmerge);

        const tLand = clamp((p - 0.54 - i * 0.035) / 0.32);
        const eLand = inOut(tLand);

        // 2x2 on Mobile: Row 0 (i=0,1), Row 1 (i=2,3)
        const col = i % 2;
        const row = Math.floor(i / 2);
        const colSign = col === 0 ? -1 : 1;

        const ex = isMob ? colSign * mobColSpacing : (i - 1.5) * colW;

        const targetCardTop = isMob ? (row === 0 ? mobRow0Top : mobRow1Top) : topFinal;
        // On mobile, flying box guides towards the card's center (114px from card top, comfortably clear of badges and larger)
        // On desktop, box lands half-above the card
        const ey = isMob 
          ? (targetCardTop + 114 - H * 0.50) 
          : (topFinal - H * 0.50 - 10);

        const mobSpreadX = colSign * (W * 0.24);
        const mobPeakY = originScreenY - H * (row === 0 ? 0.28 : 0.14);
        const spreadX = isMob ? mobSpreadX : (i - 1.5) * (deskMode ? W * 0.20 : W * 0.22);
        const peakY = isMob ? mobPeakY : originScreenY - H * (deskMode ? 0.24 : 0.18) + (i % 2 === 0 ? -15 : 15);
        const arcY = -Math.sin(Math.PI * tEmerge) * (H * (deskMode ? 0.14 : 0.12));

        const midX = lerp(originScreenX, spreadX, eEmerge) + mouseScreenRef.current.x * 12 * (1 - eLand);
        const midY = lerp(originScreenY, peakY, eEmerge) + arcY + mouseScreenRef.current.y * 10 * (1 - eLand);

        const currentX = lerp(midX, ex, eLand);
        const currentY = lerp(midY, ey, eLand);

        const seatedScale = deskMode ? 1.08 : (isMob ? 0.74 : 0.72);
        const flyScale = lerp(0.08, seatedScale, eEmerge) + Math.sin(Math.PI * tEmerge) * 0.10;
        const currentScale = lerp(flyScale, seatedScale, eLand);

        const flyRotY = Math.sin(Math.PI * tEmerge) * (i % 2 === 0 ? -40 : 40);
        const currentRotY = lerp(flyRotY, 0, eLand);

        const flyRotZ = Math.sin(Math.PI * tEmerge) * (i - 1.5) * 5;
        const currentRotZ = lerp(flyRotZ, 0, eLand);

        // Keep box 100% visible throughout flight and resting in the card stage
        const boxOpacity = clamp(tEmerge * 3.5, 0, 1);

        // Interactive smooth floating hover physics (smoothly lerps up and down, no popping)
        const isHovered = hoveredCardIdxRef.current === i && p > 0.70;
        const targetHover = isHovered ? 1.0 : 0.0;
        hoverValuesRef.current[i] = lerp(hoverValuesRef.current[i] || 0, targetHover, 0.09);
        const hVal = hoverValuesRef.current[i];

        const hoverLift = hVal * (deskMode ? -18 : -10);
        const hoverScale = 1.0 + hVal * 0.08;
        const hoverTilt = hVal * Math.sin(elapsedTime * 2.8) * 2.0;

        const finalBoxY = currentY + hoverLift;
        const finalBoxScale = currentScale * hoverScale;
        const finalRotZ = currentRotZ + hoverTilt;

        boxEl.style.opacity = `${boxOpacity}`;
        boxEl.style.transform = `translate3d(${currentX}px, ${finalBoxY}px, 0) rotateY(${currentRotY}deg) rotateZ(${finalRotZ}deg) scale(${finalBoxScale})`;

        if (cardEl) {
          const cardOpacity = out(tLand);
          const cardHoverLift = hVal * (deskMode ? -8 : -5);
          const cardSlideY = targetCardTop + (1 - cardOpacity) * (deskMode ? H * 0.65 : H * 0.40) + cardHoverLift;
          cardEl.style.opacity = `${cardOpacity}`;
          cardEl.style.transform = `translate3d(${ex}px, ${cardSlideY}px, 0)`;
          cardEl.style.pointerEvents = cardOpacity > 0.8 ? 'auto' : 'none';
        }
      });

      renderer.render(scene, camera);
    };

    isLoopRunningRef.current = true;
    animateLoop();

    // Auto-pause Three.js when scrolled out of view and resume when approaching
    const heroObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isVisible = entry ? entry.isIntersecting : true;
        isHeroVisibleRef.current = isVisible;
        if (isVisible && !isLoopRunningRef.current) {
          isLoopRunningRef.current = true;
          animFrameIdRef.current = requestAnimationFrame(animateLoop);
        }
      },
      { rootMargin: '300px 0px 300px 0px', threshold: 0.01 }
    );

    if (containerRef.current) {
      heroObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      heroObserver.disconnect();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
    };
  }, [createProceduralTextures, autoRotate]);

  // -------------------------------------------------------------
  // 5. Zero-Layout-Thrashing Scroll Progress Listener (120 FPS Smooth)
  // -------------------------------------------------------------
  useEffect(() => {
    let cachedOffsetTop = 0;
    let cachedTotalScrollable = 1;
    let cachedTopOffset = 56;

    const measureLayout = () => {
      const el = containerRef.current;
      if (!el) return;
      cachedTopOffset = window.innerWidth >= 640 ? 64 : 56;
      cachedOffsetTop = el.offsetTop;
      cachedTotalScrollable = Math.max(1, el.offsetHeight - (window.innerHeight - cachedTopOffset));
    };

    measureLayout();
    window.addEventListener('resize', measureLayout, { passive: true });

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset || 0;
          const scrolled = scrollY - cachedOffsetTop + cachedTopOffset;
          const p = Math.max(0, Math.min(1, scrolled / cachedTotalScrollable));
          targetProgressRef.current = p;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', measureLayout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToStage = (stageIdx: number) => {
    playSoftClick(560 + stageIdx * 80, 0.04);
    const el = containerRef.current;
    if (!el) return;
    const progressTargets = [0.02, 0.30, 0.62, 0.94];
    const targetP = progressTargets[stageIdx] || 0;
    const topOffset = window.innerWidth >= 640 ? 64 : 56;
    const totalScrollable = el.offsetHeight - (window.innerHeight - topOffset);
    const targetScrollY = el.offsetTop - topOffset + totalScrollable * targetP;
    
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const switchMaterial = (theme: MaterialTheme) => {
    playSoftClick(720, 0.04);
    setActiveTheme(theme);
    if (!materialsRef.current || !rootBoxGroupRef.current) return;

    const chosenBoxMat = materialsRef.current[theme];
    rootBoxGroupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material !== materialsRef.current?.edge) {
        child.material = chosenBoxMat;
      }
    });
  };

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

  const handleSelectCategory = (categoryTag: string) => {
    window.dispatchEvent(new CustomEvent('open_category', { detail: categoryTag }));
    const el = document.getElementById('categories-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentStage = STAGES[currentStageIndex];

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="relative h-[360vh] bg-[#101014] text-white select-none overflow-clip transition-colors duration-500"
    >
      {/* Sticky Fullscreen Viewport */}
      <div 
        className="sticky top-14 sm:top-16 left-0 w-full overflow-hidden flex flex-col justify-between h-[calc(100dvh_-_3.5rem)] sm:h-[calc(100vh_-_4rem)]"
      >
        {/* Subtle Ambient Radial Gradient */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_72%_45%,rgba(255,181,27,0.18)_0%,rgba(16,16,20,0)_65%),radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.03)_0%,rgba(16,16,20,0)_50%)]" />

        {/* Technical Grid Texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.6) 1px, transparent 1px)',
            backgroundSize: '44px 44px'
          }}
        />

        {/* ------------------------------------------------------------- */}
        {/* TOP STATUS BAR (Container Fluid Widescreen) */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-30 pt-3 sm:pt-4 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full max-w-[1920px] mx-auto flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-lg pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-[#FFB51B] animate-pulse shrink-0 shadow-[0_0_8px_#FFB51B]"></span>
            <span className="text-[10px] sm:text-[11px] font-bold text-stone-200 tracking-wider uppercase font-mono">
              {currentStage.badgeText}
            </span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Auto Orbit Toggle */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              aria-label="Toggle Auto Orbit"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition backdrop-blur-xl shadow-lg ${
                autoRotate 
                  ? 'bg-[#FFB51B] text-[#101014] border-[#FFB51B] shadow-[0_0_12px_rgba(255,181,27,0.4)]' 
                  : 'bg-white/[0.06] border-white/10 text-stone-300 hover:bg-white/15'
              }`}
            >
              <Rotate3d className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{autoRotate ? 'Auto Orbiting' : 'Auto Orbit'}</span>
            </button>

            {/* Scroll Percentage Meter */}
            <div className="px-3 py-1.5 rounded-xl bg-white text-[#101014] font-mono text-xs font-black shadow-lg flex items-center gap-1.5">
              <span ref={percentSpanRef}>0%</span>
              <ArrowDown ref={arrowIconRef} className="w-3.5 h-3.5 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TOP TITLE FOR LANDED PHASE (Reveals at p > 62%) */}
        {/* ------------------------------------------------------------- */}
        <div 
          ref={landedHeaderRef}
          className="absolute top-11 sm:top-16 left-0 right-0 z-20 text-center pointer-events-none opacity-0 px-4 will-change-transform"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#FFB51B]/15 border border-[#FFB51B]/40 text-[#FFB51B] text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 backdrop-blur-md">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FFB51B]" />
            <span>Pick the box that fits your product</span>
          </div>
          <h2 className="text-base sm:text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">
            Printed, Packed & Delivered to Your Door
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-medium max-w-xl mx-auto mt-1 hidden sm:block">
            Hover over any box to inspect dieline details • Instant wholesale pricing from factory
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* THREE.JS 3D BOX CANVAS (Background WebGL Stage) */}
        {/* ------------------------------------------------------------- */}
        <div 
          className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Studio Radial Spotlight Halo behind 3D Master Box */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255, 181, 27, 0.08) 0%, rgba(255, 181, 27, 0.02) 50%, transparent 75%)',
              filter: 'blur(60px)'
            }}
          />
          <div ref={canvasMountRef} className="w-full h-full pointer-events-none" />
          
          <div className="absolute bottom-24 right-8 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-white/10 text-white/90 text-[11px] font-medium shadow-xl">
            <MousePointerClick className="w-3.5 h-3.5 text-[#FFB51B]" />
            <span>Drag to rotate 3D box • Scroll to see unbox & reveal</span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 4 LANDING PRODUCT CARDS (Clean White Cards Like Video) */}
        {/* ------------------------------------------------------------- */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
        >
          {PRODUCTS.map((prod, idx) => {
            const isHovered = hoveredCardIdx === idx;
            return (
              <div
                key={prod.id}
                ref={(el) => { cardElsRef.current[idx] = el; }}
                onMouseEnter={() => {
                  setHoveredCardIdx(idx);
                  hoveredCardIdxRef.current = idx;
                  playSoftClick(740, 0.03);
                }}
                onMouseLeave={() => {
                  setHoveredCardIdx(null);
                  hoveredCardIdxRef.current = null;
                }}
                className={`absolute left-1/2 top-0 w-[170px] sm:w-[230px] md:w-[265px] -ml-[85px] sm:-ml-[115px] md:-ml-[132px] bg-white text-stone-900 rounded-[22px] sm:rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] flex flex-col justify-between will-change-transform opacity-0 pointer-events-none transition-[border-color,box-shadow] duration-200 border ${
                  isHovered 
                    ? 'border-[#FFB51B] shadow-[0_20px_40px_-8px_rgba(255,181,27,0.3)] ring-2 ring-[#FFB51B]/40' 
                    : 'border-stone-200/90'
                } overflow-hidden`}
                style={{
                  height: isMobile ? '264px' : (!isDesktop ? '220px' : '296px'),
                  paddingTop: isMobile ? '0px' : (!isDesktop ? '70px' : '110px'),
                  paddingBottom: isMobile ? '0px' : (!isDesktop ? '14px' : '20px'),
                  paddingLeft: isMobile ? '0px' : (!isDesktop ? '12px' : '18px'),
                  paddingRight: isMobile ? '0px' : (!isDesktop ? '12px' : '18px')
                }}
              >
                {/* MOBILE LAYOUT: Clean Luxury Card with Full-Width Button & Guaranteed Bottom Padding */}
                <div 
                  onClick={() => {
                    playSoftClick(880, 0.05);
                    handleSelectCategory(prod.categoryTag);
                  }}
                  className="sm:hidden flex flex-col justify-between h-full w-full select-none text-left cursor-pointer px-3 pt-3 pb-5"
                >
                  {/* Top Product Image Stage (Clean White, Stage for the 3D Flying Box) */}
                  <div className="w-full h-[138px] relative flex items-center justify-center shrink-0">
                    {/* Top-Left: ⚡ 30% OFF Dark Pill */}
                    <div className="absolute top-0 left-0 px-2 py-0.5 rounded-full bg-[#0a1120] text-white flex items-center gap-1 text-[8.5px] font-black shadow-xs z-10 pointer-events-none">
                      <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                      <span>30% OFF</span>
                    </div>

                    {/* Top-Right: Circular Bookmark Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playSoftClick(880, 0.04);
                      }}
                      className="absolute top-0 right-0 w-6 h-6 rounded-full bg-white border border-stone-200/90 shadow-2xs flex items-center justify-center text-stone-900 z-10 active:scale-90 transition pointer-events-auto"
                      title="Save to Collection"
                    >
                      <Bookmark className="w-3 h-3 fill-stone-900 text-stone-900" />
                    </button>
                  </div>

                  {/* Content Area below Image */}
                  <div className="flex flex-col justify-between flex-1 mt-1">
                    {/* Two Yellow Hashtag Pills */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {(prod.tags || ['# PACKAGING', '# LUXURY']).map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className="px-1.5 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400e] text-[8.5px] font-black uppercase tracking-wide inline-block leading-tight"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bold Product Title */}
                    <h3 className="font-bold text-[13px] text-stone-900 tracking-tight leading-snug mt-1 truncate">
                      {prod.name}
                    </h3>

                    {/* Full-Width View Button with Generous Bottom Padding */}
                    <div className="mt-2.5 w-full">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSoftClick(880, 0.05);
                          handleSelectCategory(prod.categoryTag);
                        }}
                        className="w-full py-2 px-3 rounded-full bg-[#f1f3f7] hover:bg-stone-900 text-stone-900 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 active:scale-98 pointer-events-auto shadow-2xs group/btn"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3 text-stone-700 group-hover/btn:text-white transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* DESKTOP & TABLET LAYOUT (Original Luxury 3D Widescreen Layout) */}
                <div className="hidden sm:flex flex-col justify-between h-full w-full">
                  {/* Spec Tag Pill */}
                  <div className="inline-flex items-center justify-center gap-1 mx-auto px-2.5 py-0.5 rounded-full bg-stone-100 text-[9px] font-bold text-stone-600 tracking-wider uppercase">
                    <span>{prod.specPill}</span>
                  </div>

                  {/* Title & Description (3 lines of rich packaging copy) */}
                  <div className="my-auto py-1">
                    <h3 className="font-extrabold text-base md:text-lg text-stone-900 tracking-tight leading-tight group-hover:text-amber-800 transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-[11px] text-stone-500 leading-snug mt-1 font-medium line-clamp-3">
                      {prod.desc}
                    </p>
                  </div>

                  {/* Action Button - Themed Luxury Dark + Brand Amber Gold Hover */}
                  <button
                    onClick={() => {
                      playSoftClick(880, 0.05);
                      handleSelectCategory(prod.categoryTag);
                    }}
                    className="mt-2 w-full py-2 px-3 rounded-full bg-stone-900 hover:bg-[#FFB51B] text-white hover:text-stone-950 font-bold text-xs transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-1.5 active:scale-95 group/btn border border-stone-800 hover:border-[#FFB51B]"
                  >
                    <span className="truncate">{prod.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FFB51B] group-hover/btn:text-stone-950 transition-colors group-hover/btn:translate-x-0.5 shrink-0" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CSS 3D PERSPECTIVE SCENE FOR 4 PRODUCT BOXES (Mobile + Desktop) */}
        {/* ------------------------------------------------------------- */}
        <div 
          className="absolute inset-0 z-30 pointer-events-none"
          style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
        >
          {PRODUCTS.map((p, idx) => (
            <div
              key={p.id}
              ref={(el) => { boxElsRef.current[idx] = el; }}
              className="absolute left-1/2 top-1/2 w-[220px] h-[220px] sm:w-[310px] sm:h-[310px] -ml-[110px] -mt-[110px] sm:-ml-[155px] sm:-mt-[155px] will-change-transform opacity-0 pointer-events-none select-none transition-shadow duration-300"
            >
              <img 
                src={p.img} 
                alt={p.name}
                loading="eager"
                draggable={false}
                className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.30)] sm:drop-shadow-[0_25px_30px_rgba(0,0,0,0.68)] hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TWO-COLUMN HERO CONTENT (Container Fluid Widescreen) */}
        {/* ------------------------------------------------------------- */}
        <div 
          ref={heroCopyRef}
          className="relative z-20 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 flex-1 flex flex-col justify-start pt-8 sm:pt-0 sm:justify-center pointer-events-none transition-opacity duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16 items-center w-full">
            
            {/* Left Column (40–42% fluid width) */}
            <div 
              suppressHydrationWarning
              className="lg:col-span-5 xl:col-span-5 max-w-xl pointer-events-auto text-left px-1 sm:px-0"
            >
              {/* Heritage Pill */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full bg-[#FFB51B]/15 border border-[#FFB51B]/40 text-[#FFB51B] text-[9px] sm:text-[11px] font-black tracking-widest uppercase mb-1.5 sm:mb-3 backdrop-blur-md shadow-xs">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB51B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#FFB51B]"></span>
                </span>
                <span>EST. 1984 • 42 YRS HERITAGE</span>
              </div>

              {/* Headline */}
              <h1 className="text-[22px] sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-[1.12] sm:leading-[1.08] mb-1.5 sm:mb-3 drop-shadow-md">
                Custom Boxes, <br className="hidden sm:inline" />
                Made To Be{' '}
                <span className="relative inline-block text-[#FFB51B]">
                  Remembered.
                  <svg 
                    className="absolute -bottom-1 left-0 w-full h-2 text-[#FFB51B]/80 pointer-events-none" 
                    viewBox="0 0 200 12" 
                    fill="none" 
                    preserveAspectRatio="none"
                  >
                    <path d="M2 9C50 3 150 2 198 8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-[11px] sm:text-sm text-stone-300 font-medium leading-relaxed mb-2 sm:mb-5 max-w-lg line-clamp-2 sm:line-clamp-none drop-shadow-xs">
                From custom concepts to production-ready packaging. Designed to impress, engineered to protect, and built to scale across Pakistan.
              </p>

              {/* Information Pills */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-5">
                <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-semibold text-stone-200 shadow-xs">
                  <Package className="w-3 h-3 text-[#FFB51B]" />
                  <span>No MOQ (From 25)</span>
                </div>

                <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-semibold text-stone-200 shadow-xs">
                  <Zap className="w-3 h-3 text-[#FFB51B]" />
                  <span>4–5 Days Express</span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 text-[11px] sm:text-xs font-semibold text-stone-200 shadow-xs">
                  <Gift className="w-3.5 h-3.5 text-[#FFB51B]" />
                  <span>Free Sample Kits</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href="#quote-section"
                  onClick={() => playSoftClick(600, 0.05)}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-[#FFB51B] hover:bg-[#ffbe33] text-[#101014] font-black text-[11px] sm:text-sm transition-all shadow-[0_0_24px_rgba(255,181,27,0.35)] hover:shadow-[0_0_32px_rgba(255,181,27,0.55)] active:scale-98 shrink-0"
                >
                  <span>Instant Price Calculator</span>
                  <ArrowRight className="w-3 h-3 text-[#101014]" />
                </a>

                <a
                  href="#categories-section"
                  onClick={() => playSoftClick(680, 0.05)}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 font-bold text-[11px] sm:text-sm hover:bg-white/25 hover:border-white/35 transition shadow-xs active:scale-98 shrink-0"
                >
                  <Play className="w-2.5 h-2.5 fill-white text-white" />
                  <span>Explore 55+ Boxes</span>
                </a>
              </div>

              {/* Live Trust & Social Proof Bar */}
              <div className="mt-2.5 sm:mt-4.5 pt-2 sm:pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-stone-300">
                <div className="flex items-center gap-0.5 text-[#FFB51B]">
                  {'★★★★★'.split('').map((star, sIdx) => (
                    <span key={sIdx} className="text-[11px]">★</span>
                  ))}
                  <span className="font-extrabold text-white ml-1">4.9/5</span>
                </div>
                <span className="text-stone-500">•</span>
                <span className="font-medium text-stone-300">5,000+ Brands</span>
                <span className="text-stone-500 hidden sm:inline">•</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Direct Factory Floor
                </span>
              </div>
            </div>

            {/* Right Column (58–60% fluid width area reserved for the 3D Box) */}
            <div className="hidden lg:block lg:col-span-7 xl:col-span-7 h-full pointer-events-none" />

          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* BOTTOM HUD INSPECTION BAR (Container Fluid Widescreen) */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-30 mb-16 sm:mb-0 pb-1 sm:pb-4 px-3 sm:px-8 max-w-[1920px] mx-auto w-full pointer-events-none">
          <div className="w-fit max-w-[340px] sm:max-w-5xl mx-auto p-1 sm:p-2 rounded-2xl bg-stone-950/95 backdrop-blur-2xl border border-white/20 shadow-2xl pointer-events-auto flex items-center justify-between gap-1.5 sm:gap-2">
            
            {/* Stage Progress Tabs */}
            <div className="flex items-center gap-1">
              {STAGES.map((s, idx) => {
                const isActive = currentStageIndex === idx;
                return (
                  <button
                    key={s.step}
                    onClick={() => scrollToStage(idx)}
                    aria-label={s.label}
                    className={`px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold transition flex items-center gap-1 whitespace-nowrap ${
                      isActive 
                        ? 'bg-[#FFB51B] text-[#101014] font-black shadow-[0_0_16px_rgba(255,181,27,0.4)]' 
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#101014]' : 'bg-stone-500'}`} />
                    <span className="sm:hidden font-mono font-bold">{s.step}</span>
                    <span className="hidden sm:inline-block">{s.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-white/20 shrink-0" />

            {/* 3D Box Material Finish Switcher */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-wider hidden md:inline-block px-1">
                FINISH:
              </span>

              <button
                onClick={() => switchMaterial('kraft')}
                className={`p-1 sm:px-2.5 sm:py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${
                  activeTheme === 'kraft'
                    ? 'bg-[#FFB51B] text-[#101014] border-[#FFB51B] font-black'
                    : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/15'
                }`}
                title="Raw Kraft Finish"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#c89d67] border border-white/60" />
                <span className="hidden sm:inline-block text-[11px]">Raw Kraft</span>
              </button>

              <button
                onClick={() => switchMaterial('luxury')}
                className={`p-1 sm:px-2.5 sm:py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${
                  activeTheme === 'luxury'
                    ? 'bg-[#FFB51B] text-[#101014] border-[#FFB51B] font-black'
                    : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/15'
                }`}
                title="Obsidian Gold Foil Finish"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#111215] border border-[#FFB51B]" />
                <span className="hidden sm:inline-block text-[11px]">Gold Foil</span>
              </button>

              <button
                onClick={() => switchMaterial('white')}
                className={`p-1 sm:px-2.5 sm:py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${
                  activeTheme === 'white'
                    ? 'bg-[#FFB51B] text-[#101014] border-[#FFB51B] font-black'
                    : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/15'
                }`}
                title="Arctic White Finish"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-stone-300" />
                <span className="hidden sm:inline-block text-[11px]">Arctic White</span>
              </button>
            </div>

          </div>
        </div>

        {/* Scroll Instruction Hint */}
        <div 
          ref={scrollHintRef}
          className="absolute bottom-28 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center flex flex-col items-center gap-1 opacity-80 transition-opacity"
        >
          <span className="text-[10px] sm:text-[11px] font-bold text-stone-300 tracking-wider uppercase font-mono bg-stone-900/80 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/10 backdrop-blur-md">
            Scroll to unbox 3D packaging
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-[#FFB51B] animate-bounce" />
        </div>

      </div>
    </section>
  );
}
