import React, { useState, useMemo, Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center } from "@react-three/drei";

function WireframeModel() {
  const { scene, materials } = useGLTF("/winged_cherub_throne.glb");
  
  // Cleanly override all materials in the loaded GLTF to be glowing white wireframes
  useMemo(() => {
    Object.values(materials).forEach((material: any) => {
      material.wireframe = true;
      
      // Strip any baked textures that might be interfering with the color
      material.map = null;
      material.emissiveMap = null;
      material.normalMap = null;
      material.roughnessMap = null;
      material.metalnessMap = null;
      material.aoMap = null;

      // Force pure white color and glowing emissive
      if (material.color) material.color.setHex(0xffffff);
      if (material.emissive) {
        material.emissive.setHex(0xffffff);
        material.emissiveIntensity = 1;
      }
      
      material.needsUpdate = true;
    });
  }, [materials]);

  return (
    <Center>
      <primitive object={scene} scale={1.5} />
    </Center>
  );
}

const imgDsc017161 = "/92564c2a0cdc1764ffdba6f3ebe8c895e1944adc.png";
const imgWingExtrudeRemesh31 = "/a167a63da3a194811d3850017ff4075bca301cf5.png";
const imgDsc036131 = "/afd22c166ec3a0112cbb893d1e226303d96abcb4.png";
const imgDsc036321 = "/1801fad61c7e171e8a5ccb7c62cd650ad0004f95.png";
const imgDsc039501 = "/ba1f556dc518998524751ef0c56e279aa95614f8.png";
const imgAngelWingThermal1 = "/2ab74fa083c7775b3863c8f5eaf90fecd4284f43.png";
const imgDsc036641 = "/35666addb8177121eba2033c256f9293edb169c0.png";

const imgIconContainer = "/fad876a63755c951ec53fdab730459bcd738ac14.svg";
const imgIconContainer1 = "/0bb01c7151339471d2c5476c1488396eb5f7ce1e.svg";
const imgInfoContainer = "/b4a0dbd6c98c647883bd0a2bd402f17b080b7891.svg";

function AnimatedNumbers({ targetText, className, dataNodeId }: { targetText: string, className?: string, dataNodeId?: string }) {
  const [text, setText] = useState(targetText.replace(/\d/g, "0"));
  const ref = useRef<HTMLParagraphElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const duration = 300; // 0.3s
          const startTime = performance.now();
          const parts = targetText.split(' ');
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            if (progress < 1) {
              const currentParts = parts.map(part => {
                if (!isNaN(Number(part)) && part.trim() !== '') {
                  const max = Math.pow(10, part.length) - 1;
                  return Math.floor(Math.random() * (max + 1)).toString().padStart(part.length, '0');
                }
                return part;
              });
              setText(currentParts.join(' '));
              requestAnimationFrame(animate);
            } else {
              setText(targetText);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [targetText, hasAnimated]);

  return (
    <p ref={ref} className={className} data-node-id={dataNodeId}>
      {text}
    </p>
  );
}

export default function App() {
  const [boxPos, setBoxPos] = useState({ x: 893, y: 4136 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);

    const startX = e.pageX;
    const startY = e.pageY;
    const startBoxX = boxPos.x;
    const startBoxY = boxPos.y;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.pageX - startX;
      const dy = moveEvent.pageY - startY;
      setBoxPos({ x: startBoxX + dx, y: startBoxY + dy });
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      target.releasePointerCapture(upEvent.pointerId);
      target.removeEventListener("pointermove", handlePointerMove);
      target.removeEventListener("pointerup", handlePointerUp);
    };

    target.addEventListener("pointermove", handlePointerMove);
    target.addEventListener("pointerup", handlePointerUp);
  };

  return (
    <div className="bg-black relative w-full overflow-hidden" style={{ height: "6145px" }} data-name="Merch Temp Page" data-node-id="2508:826">
      <div className="absolute h-[1328px] left-0 top-0 w-full" data-name="DSC01716 1" data-node-id="2519:178">
        <div className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute h-[108.77%] left-0 max-w-none top-[-8.02%] w-[1924px] object-cover [mask-image:radial-gradient(50%_50%_at_center,black_60%,transparent_100%)] [-webkit-mask-image:radial-gradient(50%_50%_at_center,black_60%,transparent_100%)]" src={imgDsc017161} />
        </div>
      </div>
      <div className="absolute bg-black border border-solid border-white left-[71px] rounded-[5px] size-[43px] top-[43px]" data-name="Brand Icon" data-node-id="2519:179" />
      <p className="absolute font-satoshi leading-[70px] left-[127px] not-italic text-[32px] text-white top-[30px] tracking-[-0.64px] whitespace-nowrap" data-node-id="2519:180">
        Dedalus Labs
      </p>
      <div className="absolute h-[27px] left-[80px] top-[50px] w-[25px]" data-name="wing extrude remesh 3 1" data-node-id="2519:181">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[167.52%] left-0 max-w-none top-[-33.76%] w-full" src={imgWingExtrudeRemesh31} />
        </div>
      </div>
      <p className="-translate-x-1/2 absolute font-geist-mono font-normal leading-[16px] left-[1126.5px] text-[16px] text-center text-white top-[63px] tracking-[-0.32px] uppercase w-[103px]" data-node-id="2519:182">
        Marketplace
      </p>
      <p className="-translate-x-1/2 absolute font-geist-mono font-normal leading-[16px] left-[1275px] text-[16px] text-center text-white top-[63px] tracking-[-0.32px] uppercase w-[66px]" data-node-id="2519:183">
        Pricing
      </p>
      <p className="-translate-x-1/2 absolute font-geist-mono font-normal leading-[16px] left-[1396px] text-[16px] text-center text-white top-[63px] tracking-[-0.32px] uppercase w-[48px]" data-node-id="2519:184">
        Blogs
      </p>
      <p className="-translate-x-1/2 absolute font-geist-mono font-normal leading-[16px] left-[1503px] text-[16px] text-center text-white top-[63px] tracking-[-0.32px] uppercase w-[38px]" data-node-id="2519:185">
        Docs
      </p>
      <div className="absolute bg-white h-[45px] left-[1699px] rounded-[50px] top-[48px] w-[142px]" data-name="Dashboard Background" data-node-id="2519:186" />
      <p className="-translate-x-1/2 absolute font-uncut-sans leading-[28px] left-[1769px] not-italic text-[20px] text-black text-center top-[57px] tracking-[-0.4px] whitespace-nowrap" data-node-id="2519:187">
        Dashboard
      </p>
      <div className="absolute inset-[0.98%_13.12%_98.67%_85.73%]" data-name="Icon Container" data-node-id="2519:188">
        <div className="absolute inset-[-4.54%]">
          <img alt="" className="block max-w-none size-full" src={imgIconContainer} />
        </div>
      </div>
      <div className="absolute h-[737px] left-0 right-0 top-[1517px] flex justify-center gap-[190px]">
        <div className="relative h-[737px] w-[636px]" data-name="DSC03613 1" data-node-id="2519:198">
          <div className="absolute inset-0 pointer-events-none">
            <img alt="" className="absolute h-[129.06%] left-0 max-w-none top-[-14.59%] w-full object-cover [mask-image:radial-gradient(50%_50%_at_center,black_60%,transparent_100%)] [-webkit-mask-image:radial-gradient(50%_50%_at_center,black_60%,transparent_100%)]" src={imgDsc036131} />
          </div>
        </div>
        <div className="relative h-[737px] w-[640px]" data-name="DSC03632 1" data-node-id="2519:199">
          <div className="absolute inset-0 pointer-events-none">
            <img alt="" className="absolute h-[129.93%] left-[-0.05%] max-w-none top-[-15.05%] w-full object-cover [mask-image:radial-gradient(50%_50%_at_center,black_60%,transparent_100%)] [-webkit-mask-image:radial-gradient(50%_50%_at_center,black_60%,transparent_100%)]" src={imgDsc036321} />
          </div>
        </div>
      </div>
      <div className="absolute h-[1217px] left-0 top-[2444px] w-full" data-name="DSC03950 1" data-node-id="2519:200">
        <div className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute h-[137.75%] left-[50%] -translate-x-1/2 max-w-none top-[-27.04%] w-[1920px] object-cover [mask-image:radial-gradient(50%_50%_at_center,black_60%,transparent_100%)] [-webkit-mask-image:radial-gradient(50%_50%_at_center,black_60%,transparent_100%)]" src={imgDsc039501} />
        </div>
      </div>
      <div className="absolute contents left-[174px] top-[572px]" data-name="Header Container" data-node-id="2519:201">
        <div className="absolute font-polysans-median leading-[48px] left-[381px] not-italic text-[52px] text-justify text-white top-[582px] tracking-[-1.04px] uppercase w-[325.308px] whitespace-pre-wrap" data-node-id="2519:202">
          <p className="mb-0">{`Dedalus `}</p>
          <p className="mb-0">{`workshop `}</p>
          <p>originals</p>
        </div>
        <div className="absolute h-[159.461px] left-[174px] top-[572px] w-[174.414px]" data-name="Icon Container" data-node-id="2519:203">
          <div className="absolute inset-[-0.47%_-0.43%] z-0 pointer-events-none">
            <img alt="" className="block max-w-none size-full" src={imgIconContainer1} />
          </div>
          <div className="absolute inset-0 z-10" style={{ cursor: "grab" }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <Suspense fallback={null}>
                <WireframeModel />
              </Suspense>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
          </div>
        </div>
      </div>
      <div className="absolute h-[146px] left-[818px] top-[1840px] w-[284px]" data-name="Info Container" data-node-id="2519:208">
        <img alt="" className="absolute block max-w-none size-full" src={imgInfoContainer} />
      </div>
      <div className="absolute border border-solid border-white/50 h-[265px] left-[214px] top-[3983px] w-[301px] flex flex-col justify-between p-6" data-name="Left Stats Box">
        <div className="flex items-center gap-2">
          <div className="size-[6px] rounded-full bg-[#cac9ff]" />
          <p className="font-polysans-neutral text-[#cac9ff] text-[14px] tracking-wide uppercase whitespace-nowrap m-0">
            calculating wings...
          </p>
        </div>
        <p className="font-polysans-neutral text-[13px] text-white tracking-wide uppercase whitespace-nowrap m-0">
          triangulating agent flight path
        </p>
      </div>
      <p className="-translate-x-full absolute font-polysans-median leading-[60px] left-[calc(50%+705px)] not-italic text-[48px] text-right text-white top-[3001px] tracking-[-0.96px] uppercase whitespace-nowrap" data-node-id="2519:215">
        zipup
      </p>
      <p className="-translate-x-full absolute font-polysans-median leading-[60px] left-[calc(50%+693px)] not-italic text-[48px] text-right text-white top-[3887px] tracking-[-0.96px] uppercase whitespace-nowrap" data-node-id="2519:216">
        thermal
      </p>
      <p className="-translate-x-1/2 absolute font-polysans-median leading-[60px] left-[calc(50%-640px)] not-italic text-[48px] text-center text-white top-[3001px] tracking-[-0.96px] uppercase whitespace-nowrap" data-node-id="2519:217">
        Cloud
      </p>
      <p className="-translate-x-1/2 absolute font-polysans-median h-[98px] leading-[120px] left-[calc(50%-733px)] text-[85px] text-center text-white top-[3452px] tracking-[-1.7px] uppercase w-[26px]" data-node-id="2519:218">
        (
      </p>
      <p className="-translate-x-1/2 absolute font-polysans-median h-[98px] leading-[120px] left-[calc(50%-487px)] text-[85px] text-center text-white top-[3452px] tracking-[-1.7px] uppercase w-[26px]" data-node-id="2519:219">
        )
      </p>
      <AnimatedNumbers 
        className="absolute font-geist-mono font-normal leading-[16px] left-[calc(50%+603px)] text-[16px] text-white top-[3474px] tracking-[-0.32px] uppercase whitespace-nowrap" 
        dataNodeId="2519:220"
        targetText="238 238 238"
      />
      <AnimatedNumbers 
        className="absolute font-geist-mono font-normal leading-[16px] left-[calc(50%+631px)] text-[16px] text-white top-[3500px] tracking-[-0.32px] uppercase whitespace-nowrap" 
        dataNodeId="2519:221"
        targetText="31 31 31"
      />
      <AnimatedNumbers 
        className="absolute font-geist-mono font-normal leading-[16px] left-[calc(50%+611px)] text-[16px] text-white top-[3526px] tracking-[-0.32px] uppercase whitespace-nowrap" 
        dataNodeId="2519:223"
        targetText="85 157 179"
      />
      <div className="absolute h-[877px] left-[635px] top-[3891px] w-[673px]" data-name="angel wing thermal 1" data-node-id="2519:224">
        <div className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute inset-0 max-w-none object-cover size-full [mask-image:radial-gradient(50%_50%_at_center,black_60%,transparent_100%)] [-webkit-mask-image:radial-gradient(50%_50%_at_center,black_60%,transparent_100%)]" src={imgAngelWingThermal1} />
        </div>
      </div>
      <div className="absolute h-[1228px] left-0 top-[4917px] w-full" data-name="DSC03664 1" data-node-id="2519:225">
        <div className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute h-[253.6%] left-[50%] -translate-x-1/2 max-w-none top-[-66.11%] w-[1925px] object-cover [mask-image:radial-gradient(50%_50%_at_center,black_60%,transparent_100%)] [-webkit-mask-image:radial-gradient(50%_50%_at_center,black_60%,transparent_100%)]" src={imgDsc036641} />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[#eee] left-[calc(50%-676px)] size-[43px] top-[3490px]" data-name="Icon" data-node-id="2519:226" />
      <div className="-translate-x-1/2 absolute bg-[#1f1f1f] left-[calc(50%-610px)] size-[43px] top-[3490px]" data-name="Icon" data-node-id="2519:227" />
      <div className="-translate-x-1/2 absolute bg-[#559db3] left-[calc(50%-544px)] size-[43px] top-[3490px]" data-name="Icon" data-node-id="2519:228" />
      {/* Dynamic L-Shape Arm */}
      {(() => {
        // Smart attachment logic: attach to the side closest to the anchor point
        const anchorX = 1539.5;
        const anchorY = 3947;
        const isBoxOnLeft = boxPos.x + 200.5 < anchorX;
        
        // Attach to right edge if box is on the left, otherwise attach to left edge
        const attachX = isBoxOnLeft ? boxPos.x + 400.5 : boxPos.x + 0.5;
        const attachY = boxPos.y + 200.5;

        return (
          <svg
            className="absolute left-0 top-0 pointer-events-none"
            style={{ width: "100%", height: "100%", zIndex: 10 }}
          >
            <path
              d={`M ${attachX} ${attachY} L ${anchorX} ${attachY} L ${anchorX} ${anchorY}`}
              stroke="white"
              strokeWidth="1"
              fill="none"
            />
            <circle
              cx={attachX}
              cy={attachY}
              r="6.5"
              fill="white"
            />
          </svg>
        );
      })()}

      <div 
        className="absolute size-[401px] cursor-grab active:cursor-grabbing"
        style={{ left: boxPos.x, top: boxPos.y, touchAction: "none", zIndex: 20 }}
        onPointerDown={handlePointerDown}
        data-name="Image Container" 
        data-node-id="2519:232"
      >
        {/* Blurry masked background layer */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            WebkitBackdropFilter: "blur(20px)",
            backdropFilter: "blur(20px)",
            maskImage: "radial-gradient(circle, transparent 30%, black 70%)",
            WebkitMaskImage: "radial-gradient(circle, transparent 30%, black 70%)"
          }}
        />
        {/* Border and shadow layer */}
        <div 
          className="absolute inset-0 border border-solid border-white/50 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),0_8px_32px_0_rgba(0,0,0,0.1)] pointer-events-none" 
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 100%), radial-gradient(circle, transparent 30%, rgba(255,255,255,0.05) 70%)"
          }}
          data-name="Image Background" 
          data-node-id="2519:233" 
        />
      </div>
      <div className="absolute font-polysans-median leading-[48px] left-[calc(50%-766px)] not-italic text-[48px] text-white top-[5903px] tracking-[-0.96px] uppercase whitespace-nowrap" data-node-id="2519:236">
        <p className="mb-0">wing</p>
        <p>Hoodie</p>
      </div>
      <p className="absolute font-polysans-neutral-mono leading-[16px] left-[838px] not-italic text-[10px] text-white top-[1930px] tracking-[-0.2px] uppercase whitespace-nowrap" data-node-id="2519:237">
        branch
      </p>
      <p className="absolute font-polysans-neutral-mono leading-[16px] left-[838px] not-italic text-[10px] text-white top-[1961px] tracking-[-0.2px] uppercase whitespace-nowrap" data-node-id="2519:238">
        status
      </p>
      <p className="absolute font-inter-tight font-bold leading-[16px] left-[835px] not-italic text-[25px] text-white top-[1859px] tracking-[-0.5px] uppercase whitespace-nowrap" data-node-id="2519:239">
        Dedalus
      </p>
      <p className="absolute font-offbit leading-[16px] left-[956px] not-italic text-[27px] text-white top-[1861px] tracking-[0.54px] uppercase whitespace-nowrap" data-node-id="2519:240">
        automata
      </p>
      <p className="-translate-x-full absolute font-inter-tight font-semibold leading-[12px] left-[1084px] not-italic text-[11px] text-right text-white top-[1900px] tracking-[-0.22px] uppercase whitespace-nowrap" data-node-id="2519:241">
        dedalus workshop originals
      </p>
      <p className="-translate-x-full absolute font-inter-tight font-semibold leading-[12px] left-[1084px] not-italic text-[11px] text-right text-white top-[1932px] tracking-[-0.22px] uppercase whitespace-nowrap" data-node-id="2519:242">{`latest-merch-collection `}</p>
      <p className="-translate-x-full absolute font-inter-tight font-semibold leading-[12px] left-[1084px] not-italic text-[11px] text-right text-white top-[1962px] tracking-[-0.22px] uppercase whitespace-nowrap" data-node-id="2519:243">{`logistics configured; eta march 15 `}</p>
      <p className="absolute font-polysans-neutral-mono leading-[16px] left-[838px] not-italic text-[10px] text-white top-[1899px] tracking-[-0.2px] uppercase whitespace-nowrap" data-node-id="2519:244">
        pull origin
      </p>
    </div>
  );
}
