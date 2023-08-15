export interface IParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  initialX: number;
  initialY: number;
  allowedRadius: number;
  newDirection: boolean;
  update: () => void;
  draw: () => void;
}

function getRandomSpeed(delta: number, start: number) {
  const deltaSpeed = Math.random() * delta - 0.5 * delta;
  const finalSpeed = deltaSpeed / Math.abs(deltaSpeed) * start + deltaSpeed;
  return finalSpeed;
}

export interface ILine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  update: (key: string, x: number, y: number) => void;
  draw: () => void;
}

interface IGet {
  createRandomParticle: () => IParticle;
  createLine: (x1: number, y1: number, x2: number, y2: number) => ILine;
}

export function get(canvas: HTMLCanvasElement): IGet {
  const ctx: CanvasRenderingContext2D = canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;
  class Particle implements IParticle {
    x: number;
    y: number;
    size: number;
    color: string;
    speedX: number;
    speedY: number;
    initialX: number;
    initialY: number;
    allowedRadius: number;
    newDirection: boolean;
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.initialX = this.x;
      this.initialY = this.y;
      this.allowedRadius = 100;
      this.size = 5;
      this.color = "rgba(103, 17, 05, 0.2)";
      this.speedX = getRandomSpeed(0.5, 0.3);
      this.speedY = getRandomSpeed(0.5, 0.3);
      this.newDirection = true;
    }
    update() {
      const dx = this.x + this.speedX - this.initialX;
      const dy = this.y + this.speedY - this.initialY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.allowedRadius) {
        this.x += this.speedX;
        this.y += this.speedY;
      } else {
        const newSpeedX = getRandomSpeed(0.5, 0.3);
        const newSpeedY = getRandomSpeed(0.5, 0.3);
        this.speedX = newSpeedX;
        this.speedY = newSpeedY;
        // this.x += this.speedX;
        // this.y += this.speedY;
        const a = { x: this.initialX - this.x, y: this.initialY - this.y };
        const b = { x: this.speedX, y: this.speedY };
        const cosAngle = (a.x * b.x + a.y * b.y) / (Math.sqrt(a.x * a.x + a.y * a.y) * Math.sqrt(b.x * b.x + b.y * b.y));
        const featureDistance = 2 * cosAngle * this.allowedRadius;

        






      }

    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();

      // ctx.fillStyle = 'rgba(103, 17, 05, 0.1)';
      // ctx.beginPath();
      // ctx.arc(this.initialX, this.initialY, this.allowedRadius, 0, 2 * Math.PI);
      // ctx.fill();
    }
  }

  class Line implements ILine {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    constructor(x1: number, y1: number, x2: number, y2: number) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
    }
    update(key: string, x: number, y: number): void {
      if (key === `${this.x1}${this.y1}`) {
        this.x1 = x;
        this.y1 = y;
      } else if (key === `${this.x2}${this.y2}`) {
        this.x2 = x;
        this.y2 = y;
      }
    }

    draw(): void {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(103, 17, 05, 0.2)";
      ctx.lineWidth = 1;
      ctx.moveTo(this.x1, this.y1);
      ctx.lineTo(this.x2, this.y2);
      ctx.stroke();
    }
  }

  return {
    createRandomParticle(): IParticle {
      return new Particle();
    },
    createLine(x1: number, y1: number, x2: number, y2: number): ILine {
      return new Line(x1, y1, x2, y2);
    },
  };
}
