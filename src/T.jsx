import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ text, speed }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text[index]);
        index++;
        if (index === text.length) {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, [text, speed]);
  
  return (
    <div className="text-2xl font-mono border-r-2 border-black whitespace-pre">
      {displayedText}
      <span className="animate-blink">|</span>
    </div>
  );
};

export default TypingAnimation;