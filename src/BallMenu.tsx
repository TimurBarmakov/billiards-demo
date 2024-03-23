import React from 'react';
import { Ball } from './models/Ball';

interface BallMenuProps {
  ball: Ball;
  onColorChange: (color: string) => void;
}

export const BallMenu: React.FC<BallMenuProps> = ({ ball, onColorChange }) => {
  return (
    <div className="ball-menu">
      <div className="ball-menu-header">Выберите цвет:</div>
      <div className="ball-menu-buttons">
        <button className="ball-menu-button" onClick={() => onColorChange('#ffffff')}>Белый</button>
        <button className="ball-menu-button" onClick={() => onColorChange('#000000')}>Черный</button>
        <button className="ball-menu-button" onClick={() => onColorChange('#ed291f')}>Красный</button>
        <button className="ball-menu-button" onClick={() => onColorChange('#126ade')}>Синий</button>
        <button className="ball-menu-button" onClick={() => onColorChange('#a716e0')}>Фиолетовый</button>
        <button className="ball-menu-button" onClick={() => onColorChange('#f5e50a')}>Желтый</button>

      </div>
    </div>
  );
};
