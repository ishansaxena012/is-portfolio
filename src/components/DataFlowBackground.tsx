import { useEffect, useState } from 'react';

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export const DataFlowBackground = () => {
  const [packets, setPackets] = useState<Array<{ id: number, top: string, left: string, duration: string, delay: string, vertical: boolean }>>([]);

  useEffect(() => {
    const newPackets = Array.from({ length: 15 }).map((_, i) => {
      const isVertical = Math.random() > 0.5;
      return {
        id: i,
        top: isVertical ? '-10%' : `${Math.floor(random(5, 95) / 4) * 4}rem`,
        left: isVertical ? `${Math.floor(random(5, 95) / 4) * 4}rem` : '-10%',
        duration: `${random(8, 20)}s`,
        delay: `${random(0, 15)}s`,
        vertical: isVertical
      };
    });
    setPackets(newPackets);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        className="absolute inset-0 opacity-[0.001]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #06b6d4 1px, transparent 1px),
            linear-gradient(to bottom, #06b6d4 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          backgroundPosition: 'center center'
        }}
      />
      
      {packets.map((packet) => (
        <div
          key={packet.id}
          className="absolute bg-cyan-400 rounded-full shadow-[0_0_10px_1px_rgba(34,211,238,0.4)]"
          style={{
            top: packet.vertical ? '-50px' : `calc(50% - 50vh + ${packet.top})`,
            left: packet.vertical ? `calc(50% - 50vw + ${packet.left})` : '-50px',
            width: packet.vertical ? '2px' : '40px',
            height: packet.vertical ? '40px' : '2px',
            animation: `${packet.vertical ? 'flow-vertical' : 'flow-horizontal'} ${packet.duration} linear infinite`,
            animationDelay: packet.delay,
            opacity: 0.25
          }}
        />
      ))}
    </div>
  );
};
