import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Ball } from './models/Ball';
import { updateGame } from './gameLogic';

const initialBalls = [
  new Ball(100, 300, 35, '#000000', 0, 0, 1),
  new Ball(200, 300, 35, '#ffffff', 0, 0, 1),
  new Ball(300, 300, 45, '#ffffff', 0, 0, 1),
  new Ball(420, 300, 55, '#ffffff', 0, 0, 1),
  new Ball(570, 300, 65, '#ffffff', 0, 0, 1),
  new Ball(730, 300, 75, '#ffffff', 0, 0, 1),
];

export const PoolCanvas: React.FC<{ onBallSelect: (ball: Ball | null) => void }> = ({ onBallSelect }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const selectedBall = useRef<Ball | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      updateGame(initialBalls, canvas.width, canvas.height); 
      ctx.fillStyle = '#418539';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      initialBalls.forEach(ball => ball.draw(ctx));
      
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    dragStart.current = { x, y };
    setIsDragging(true);
  
    const clickedBall = initialBalls.find(ball =>
      Math.sqrt((ball.x - x) ** 2 + (ball.y - y) ** 2) < ball.radius
    );
    if (!clickedBall) {
      onBallSelect(null);
    } else {
      onBallSelect(clickedBall);
    }
  
    selectedBall.current = clickedBall || null;
  }, [onBallSelect]);

  const handleMouseUp = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedBall.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    const dx = x - dragStart.current.x;
    const dy = y - dragStart.current.y;

    selectedBall.current.vx = dx * 0.1;
    selectedBall.current.vy = dy * 0.1;

    setIsDragging(false);
    selectedBall.current = null;
  }, [isDragging]);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab', display: 'block', width: '100%', height: '100%' }}
    />
  );
};
