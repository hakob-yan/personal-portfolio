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
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.color = '#fff'||`hsl(4,50%,50%)`;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill()

        }
    }
    const particlesArr: Particle[] = []
    for (let i = 0; i < 400; ++i) {
        particlesArr.push(new Particle());
    }
    canvas.addEventListener('mousemove', () => {

    });

    (function animate() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.fillStyle = "rgba(0,0,0,0.01)";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArr.length; ++i) {
            particlesArr[i].draw()
            for (let j = i; j < particlesArr.length; ++j) {
                const dx = particlesArr[i].x - particlesArr[j].x;
                const dy = particlesArr[i].y - particlesArr[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = particlesArr[i].color
                    ctx.lineWidth = particlesArr[i].size / 10
                    ctx.moveTo(particlesArr[i].x, particlesArr[i].y);
                    ctx.lineTo(particlesArr[j].x, particlesArr[j].y);
                    ctx.stroke()
                }
            }
        }

        requestAnimationFrame(animate);
    })();

}