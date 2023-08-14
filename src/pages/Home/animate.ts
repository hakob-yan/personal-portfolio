export default function animate(canvas: HTMLCanvasElement): void {
    if (!canvas) { return };
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    class Particle {
        x: number;
        y: number;
        size: number;
        color: string;
        speedX: number;
        speedY: number;
        initialX: number;
        initialY: number;
        allowedRadius: number;
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.initialX = this.x;
            this.initialY = this.y;
            this.allowedRadius = 70;
            this.size = Math.random() * 8 + 1;
            this.color = '#3a0ca3' || `hsl(4,50%,50%)`;
            this.speedX = 0.2 * (Math.random() - 0.5);
            this.speedY = 0.2 * (Math.random() - 0.5);
        }
        update() {
            const dx = this.x + this.speedX - this.initialX;
            const dy = this.y + this.speedY - this.initialY;
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < this.allowedRadius) {
                this.x += this.speedX;
                this.y += this.speedY;
            }
            else {
                const newSpeedX = 0.2 * (Math.random() - 0.5);
                const newSpeedY = 0.2 * (Math.random() - 0.5);
                this.speedX = newSpeedX;
                this.speedY = newSpeedY;
                this.x += this.speedX;
                this.y += this.speedY;
            }
            this.speedX = this.speedX + this.speedX * 0.05 * Math.abs(this.speedX);
            this.speedY = this.speedY + this.speedY * 0.05 * Math.abs(this.speedY);


        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill()

        }
    }

    class Line {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        constructor(x1: number, y1: number, x2: number, y2: number) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2
        }
        update(x1: number, y1: number, x2: number, y2: number) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
        }
        draw() {
            ctx.beginPath();
            ctx.strokeStyle = 'white'
            ctx.lineWidth = 2
            ctx.moveTo(this.x1, this.y1);
            ctx.lineTo(this.x2, this.y2);
            ctx.stroke()
        }
    }

    const particlesArr: Particle[] = []
    const lineArr: Line[] = []
    for (let i = 0; i < 200; ++i) {
        particlesArr.push(new Particle());

    }
    for (let i = 0; i < particlesArr.length; ++i) {
        for (let j = i; j < particlesArr.length; ++j) {
            const x1 = particlesArr[i].x;
            const y1 = particlesArr[i].y;
            const x2 = particlesArr[j].x;
            const y2 = particlesArr[j].y;
            const dx = x2 - x1;
            const dy = y2 - y1;
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 50) {
                lineArr.push(new Line(x1, y1, x2, y2))
            }

        }
    }

    (function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.fillStyle = "rgba(0,0,0,0.01)";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArr.length; ++i) {
            particlesArr[i].update()
            particlesArr[i].draw()
            for (let j = i; j < particlesArr.length; ++j) {
                const dx = particlesArr[i].x - particlesArr[j].x;
                const dy = particlesArr[i].y - particlesArr[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 50) {
                    lineArr[i].draw()
                }
            }
        }

        requestAnimationFrame(animate);
    })();

}