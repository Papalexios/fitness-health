import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { AssessmentData, MilestonePrediction } from '../types';
import Card from './ui/Card';

interface BodyVisualizerProps {
  assessment: AssessmentData;
  predictions: MilestonePrediction[];
}

const estimateInitialBodyMetrics = (assessment: AssessmentData) => {
  const { gender, weight, height, age } = assessment;
  const bmi = weight / ((height / 100) ** 2);
  let body_fat_percentage;

  if (gender === 'male') {
    body_fat_percentage = 1.20 * bmi + 0.23 * age - 16.2;
  } else {
    body_fat_percentage = 1.20 * bmi + 0.23 * age - 5.4;
  }
  body_fat_percentage = Math.max(8, Math.min(50, body_fat_percentage));

  const lean_mass_kg = weight * (1 - body_fat_percentage / 100);
  return { lean_mass_kg, body_fat_percentage, strength_gain_percentage: 0 };
};


const BodyVisualizer: React.FC<BodyVisualizerProps> = ({ assessment, predictions }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const bodyGroupRef = useRef<THREE.Group | null>(null);

  const [timelineMonth, setTimelineMonth] = useState(0);

  const initialMetrics = estimateInitialBodyMetrics(assessment);
  const timelineData = [
    { month: 0, weight_kg: assessment.weight, ...initialMetrics },
    ...predictions,
  ];
  
  const currentData = timelineData.find(d => d.month === timelineMonth) || timelineData[0];

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current.setSize(currentMount.clientWidth, currentMount.clientHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(rendererRef.current.domElement);

    cameraRef.current.position.set(0, 0.5, 5);
    cameraRef.current.lookAt(0, 0.5, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    sceneRef.current.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(5, 5, 5);
    sceneRef.current.add(directionalLight);

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x0891b2),
      metalness: 0.2,
      roughness: 0.7,
    });
    
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), material);
    head.position.y = 1.8;
    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.5, 0.6), material);
    torso.name = 'torso';
    torso.position.y = 0.75;
    const hips = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.4, 0.55), material);
    hips.name = 'hips';
    
    const createLimb = (radius: number, height: number) => new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 0.8, height, 32), material);
    const leftArm = createLimb(0.18, 1.6);
    leftArm.name = 'leftArm';
    leftArm.position.set(-0.8, 0.7, 0);
    const rightArm = createLimb(0.18, 1.6);
    rightArm.name = 'rightArm';
    rightArm.position.set(0.8, 0.7, 0);
    const leftLeg = createLimb(0.22, 1.8);
    leftLeg.name = 'leftLeg';
    leftLeg.position.set(-0.4, -0.9, 0);
    const rightLeg = createLimb(0.22, 1.8);
    rightLeg.name = 'rightLeg';
    rightLeg.position.set(0.4, -0.9, 0);
    
    bodyGroupRef.current = new THREE.Group();
    bodyGroupRef.current.add(head, torso, hips, leftArm, rightArm, leftLeg, rightLeg);
    bodyGroupRef.current.name = 'bodyGroup';
    sceneRef.current.add(bodyGroupRef.current);
    
    const clock = new THREE.Clock();
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !bodyGroupRef.current) return;
      requestAnimationFrame(animate);
      bodyGroupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.4;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    animate();

    const handleResize = () => {
      if (!currentMount || !rendererRef.current || !cameraRef.current) return;
      cameraRef.current.aspect = currentMount.clientWidth / currentMount.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount && rendererRef.current) {
        currentMount.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!bodyGroupRef.current) return;

    const baseHeightScale = assessment.height / 180; // Scale model relative to a 180cm baseline
    bodyGroupRef.current.scale.y = baseHeightScale;
    
    const muscleGainFactor = 1 + ((currentData.lean_mass_kg / initialMetrics.lean_mass_kg) - 1) * 0.25;
    const fatChangeFactor = 1 + ((currentData.body_fat_percentage / initialMetrics.body_fat_percentage) - 1) * 0.3;

    const scaleFactor = baseHeightScale * fatChangeFactor;
    bodyGroupRef.current.scale.x = scaleFactor;
    bodyGroupRef.current.scale.z = scaleFactor;

    const torso = bodyGroupRef.current.getObjectByName('torso') as THREE.Mesh;
    const hips = bodyGroupRef.current.getObjectByName('hips') as THREE.Mesh;
    const leftArm = bodyGroupRef.current.getObjectByName('leftArm') as THREE.Mesh;
    const rightArm = bodyGroupRef.current.getObjectByName('rightArm') as THREE.Mesh;
    const leftLeg = bodyGroupRef.current.getObjectByName('leftLeg') as THREE.Mesh;
    const rightLeg = bodyGroupRef.current.getObjectByName('rightLeg') as THREE.Mesh;
    
    const limbScale = muscleGainFactor / fatChangeFactor;

    if(torso) torso.scale.set(limbScale, 1, 1);
    if(hips) hips.scale.set(limbScale * 0.95, 1, 1);
    if(leftArm) leftArm.scale.set(limbScale, 1, limbScale);
    if(rightArm) rightArm.scale.set(limbScale, 1, limbScale);
    if(leftLeg) leftLeg.scale.set(limbScale, 1, limbScale);
    if(rightLeg) rightLeg.scale.set(limbScale, 1, limbScale);

  }, [currentData, assessment.height, initialMetrics]);


  return (
    <Card className="animate-fade-in">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-300">Transformation Visualizer</h2>
        <p className="text-stone-400 mt-1 mb-4">Drag the slider to see your predicted progress over 12 months.</p>
      
        <div ref={mountRef} style={{ width: '100%', height: '400px', cursor: 'grab', borderRadius: '1rem', background: 'radial-gradient(circle, rgba(23,43,58,1) 0%, rgba(12,10,9,0) 70%)' }} />

        <div className="mt-6 px-2">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="timeline" className="block text-sm font-medium text-stone-300">
                Timeline
            </label>
            <span className="font-bold text-lg text-cyan-400">Month {timelineMonth}</span>
          </div>
          <input
            id="timeline"
            type="range"
            min="0"
            max={timelineData[timelineData.length - 1].month}
            step={predictions.length > 0 ? predictions[0].month : 1}
            value={timelineMonth}
            onChange={(e) => setTimelineMonth(Number(e.target.value))}
            className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
           <div className="flex justify-between text-xs text-stone-500 mt-1">
                {timelineData.map(d => <span key={d.month} className="transform -translate-x-1/2">{d.month}M</span>)}
            </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {(['Weight', 'Body Fat %', 'Lean Mass', 'Strength Gain'] as const).map(label => {
                let value, unit;
                switch (label) {
                    case 'Weight': value = currentData.weight_kg.toFixed(1); unit = 'kg'; break;
                    case 'Body Fat %': value = currentData.body_fat_percentage.toFixed(1); unit = '%'; break;
                    case 'Lean Mass': value = currentData.lean_mass_kg.toFixed(1); unit = 'kg'; break;
                    case 'Strength Gain': value = `+${currentData.strength_gain_percentage?.toFixed(0) ?? 0}`; unit = '%'; break;
                }
                return (
                    <div key={label} className="bg-stone-800/50 p-3 rounded-lg border border-stone-700/50">
                        <p className="text-sm text-stone-400">{label}</p>
                        <p className="text-xl font-bold text-stone-100">{value} <span className="text-base font-normal text-stone-400">{unit}</span></p>
                    </div>
                );
            })}
        </div>
    </Card>
  );
};

export default BodyVisualizer;