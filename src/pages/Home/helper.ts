import { IParticle, ILine, IGet, IFeaturePath } from "./types";

const clr = "rgba(255,0,0,0.1)"
function getXYSpeedByK(speedK: number, dx?: number, dy?: number) {
  const speed = { x: 0, y: 0 }
  if (dx !== undefined && dy !== undefined) {
    speed.x = Math.sign(dx) * Math.abs(Math.random() * 2 - 1);
    speed.y = Math.sign(dy) * Math.abs(Math.random() * 2 - 1);
  } else {
    speed.x = Math.random() * 2 - 1;
    speed.y = Math.random() * 2 - 1;
  }
  const k = Math.sqrt(speedK / (speed.x * speed.x + speed.y * speed.y))
  speed.x = k * speed.x;
  speed.y = k * speed.y;
  return speed
}

function getFeaturePathData({ speedX, speedY, initialX, initialY, allowedRadius, x, y }: IFeaturePath) {
  const a = { x: speedX, y: speedY }
  const b = { x: initialX - x, y: initialY - y };
  const da = Math.sqrt(a.x * a.x + a.y * a.y)
  const db = Math.sqrt(b.x * b.x + b.y * b.y);
  const cosAngle = (a.x * b.x + a.y * b.y) / (da * db);

  const featureDistance = Math.abs(2 * cosAngle * allowedRadius);
  const k = Math.sqrt(Math.pow(featureDistance, 2) / (speedX * speedX + speedY * speedY));
  const featurePath = { dictance: featureDistance, finalX: x + k * speedX, finalY: y + k * speedY };
  return { featurePath, cosAngle }
}

export function get(canvas: HTMLCanvasElement): IGet {
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
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
    featurePath: {
      dictance: number;
      finalX: number,
      finalY: number,

    };
    constructor() {
      const speed = getXYSpeedByK(0.7)
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.initialX = this.x;
      this.initialY = this.y;
      this.allowedRadius = 100;
      this.size = 5;
      this.color = clr;
      this.speedX = speed.x
      this.speedY = speed.y
      this.newDirection = true;
      const cosAngle = this.speedX / (Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2)));
      const sinAngle = Math.sqrt(1 - Math.pow(cosAngle, 2))
      this.featurePath = { dictance: this.allowedRadius, finalX: this.x + this.allowedRadius * cosAngle, finalY: this.y + this.allowedRadius * sinAngle };

    }
    update() {
      const dx = this.x + this.speedX - this.initialX;
      const dy = this.y + this.speedY - this.initialY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > this.allowedRadius) {
        const speed = getXYSpeedByK(0.7, this.initialX - this.x, this.initialY - this.y);
        this.speedX = speed.x;
        this.speedY = speed.y;
        const info = getFeaturePathData(this);
        this.featurePath = info.featurePath;
      }
      const x0 = this.featurePath.finalX;
      const y0 = this.featurePath.finalY;
      const featureD = this.featurePath.dictance
      const d = Math.sqrt(Math.pow(x0 - this.x, 2) + Math.pow(y0 - this.y, 2)) || 0.000000000001;
      let k = d / featureD;
      if (k < 0.5) {
        k = 0.5
      }
      this.x += (this.speedX * k)
      this.y += (this.speedY * k);
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
      // ctx.fillStyle = 'rgba(10, 2, 50, 0.4)';
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
    allowedDistance: number
    constructor(x1: number, y1: number, x2: number, y2: number) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.allowedDistance = 170
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
      const dx = this.x2 - this.x1
      const dy = this.y2 - this.y1
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < this.allowedDistance) {
        ctx.beginPath();
        ctx.strokeStyle = clr;
        ctx.lineWidth = 1.5;
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
      }
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
