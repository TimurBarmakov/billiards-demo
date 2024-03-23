import { Ball } from './models/Ball';

const elasticity = 0.5;

export const updateGame = (balls: Ball[], canvasWidth: number, canvasHeight: number) => {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const ball1 = balls[i];
            const ball2 = balls[j];
            if (areBallsColliding(ball1, ball2)) {
                handleBallCollision(ball1, ball2, elasticity);
            }
        }
    }

    balls.forEach(ball => {
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvasWidth) {
            ball.vx = -ball.vx * elasticity;
            ball.x = Math.max(ball.radius, Math.min(canvasWidth - ball.radius, ball.x));
        }
        if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvasHeight) {
            ball.vy = -ball.vy * elasticity;
            ball.y = Math.max(ball.radius, Math.min(canvasHeight - ball.radius, ball.y));
        }
    });
};

const areBallsColliding = (ball1: Ball, ball2: Ball): boolean => {
    const dx = ball1.x - ball2.x;
    const dy = ball1.y - ball2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < ball1.radius + ball2.radius; 
};

const handleBallCollision = (ball1: Ball, ball2: Ball, elasticity: number) => {
    const dx = ball2.x - ball1.x;
    const dy = ball2.y - ball1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const nx = dx / distance;
    const ny = dy / distance;

    const dvx = ball2.vx - ball1.vx;
    const dvy = ball2.vy - ball1.vy;

    const vAlongNormal = dvx * nx + dvy * ny;

    if (vAlongNormal > 0) return;

    const impulse = (-(1 + elasticity) * vAlongNormal) / (1 / ball1.mass + 1 / ball2.mass);

    ball1.vx -= (impulse / ball1.mass) * nx;
    ball1.vy -= (impulse / ball1.mass) * ny;
    ball2.vx += (impulse / ball2.mass) * nx;
    ball2.vy += (impulse / ball2.mass) * ny;
};


