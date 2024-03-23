import React, { useState, useCallback } from 'react';
import { PoolCanvas } from './PoolCanvas'; 
import { BallMenu } from './BallMenu';
import { Ball } from './models/Ball'; 

export const PoolGame = () => {
    const [selectedBall, setSelectedBall] = useState<Ball | null>(null);

    const handleBallSelect = useCallback((ball: Ball | null) => {
        setSelectedBall(ball);
    }, []);

    const handleColorChange = useCallback((color: string) => {
        if (selectedBall) {
            selectedBall.color = color;
            setSelectedBall(null);
        }
    }, [selectedBall]);

    return (
        <div>
            <PoolCanvas onBallSelect={handleBallSelect} />
            {selectedBall && <BallMenu ball={selectedBall} onColorChange={handleColorChange} />}
        </div>
    );
};
