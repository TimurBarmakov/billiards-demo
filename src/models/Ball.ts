export class Ball {
    constructor(
        public x: number, 
        public y: number, 
        public radius: number, 
        public color: string, 
        public vx: number = 0, 
        public vy: number = 0,
        public mass: number = 1
    ) {}

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
