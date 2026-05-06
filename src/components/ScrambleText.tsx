import { useState, useEffect, useRef } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered) {
      let iteration = 0;
      clearInterval(intervalRef.current!);
      
      intervalRef.current = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );
        
        if (iteration >= text.length) {
          clearInterval(intervalRef.current!);
        }
        iteration += 1 / 3;
      }, 30);
    } else {
      setDisplayText(text);
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isHovered, text]);

  return (
    <span 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-crosshair"
    >
      {displayText}
    </span>
  );
};
