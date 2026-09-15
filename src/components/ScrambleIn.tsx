import React, { useEffect, useState } from 'react';

interface ScrambleInProps {
  text: string;
  delay?: number;
  triggered: boolean;
  className?: string;
}

const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

export const ScrambleIn: React.FC<ScrambleInProps> = ({
  text,
  delay = 0,
  triggered,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    if (!triggered) {
      setDisplayText('');
      setHasStarted(false);
      return;
    }

    let intervalId: ReturnType<typeof setInterval> | null = null;
    let cursor = 0;

    const timeoutId = setTimeout(() => {
      setHasStarted(true);

      intervalId = setInterval(() => {
        cursor += 0.5;
        const revealedCount = Math.floor(cursor);

        if (revealedCount >= text.length) {
          setDisplayText(text);
          if (intervalId) clearInterval(intervalId);
          return;
        }

        let result = '';
        for (let i = 0; i < text.length; i++) {
          if (i >= revealedCount + 3) {
            break;
          }
          if (text[i] === ' ') {
            result += ' ';
          } else if (i < revealedCount) {
            result += text[i];
          } else {
            const randomChar = CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
            result += randomChar;
          }
        }
        setDisplayText(result);
      }, 25);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [triggered, delay, text]);

  if (!triggered || !hasStarted) {
    return <span className={className}>&nbsp;</span>;
  }

  return <span className={className}>{displayText || '\u00A0'}</span>;
};

export default ScrambleIn;
