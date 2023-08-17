import { get } from "./helper";
import { IParticle, ILine } from "./helper";

interface IParticles {
  [key: string]: IParticle;
}
interface ILines {
  [key: string]: ILine[];
}

interface IAnimate {
  start: () => void,
  end: () => void,

}


export default function animate(canvas: HTMLCanvasElement): IAnimate {
  if (!canvas) {
    return {
      start: () => { },
      end: () => { }
    };
  }
  const ctx: CanvasRenderingContext2D = canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  const createRandomParticle = get(canvas).createRandomParticle;
  const createLine = get(canvas).createLine;

  function createCrystal(count: number) {
    const particlesObj: IParticles = {};
    const linesObj: ILines = {};
    const linesArr: ILine[] = []
    for (let i = 0; i < count; ++i) {
      const randomParticle = createRandomParticle();
      const x = randomParticle.x;
      const y = randomParticle.y;
      particlesObj[`${x}${y}`] = randomParticle;
    }

    const particlesArr = Object.values(particlesObj);

    for (let i = 0; i < particlesArr.length; ++i) {
      for (let j = i; j < particlesArr.length; ++j) {
        const x1 = particlesArr[i].x;
        const y1 = particlesArr[i].y;
        const x2 = particlesArr[j].x;
        const y2 = particlesArr[j].y;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 2 * particlesArr[j].allowedRadius) {
          const line = createLine(x1, y1, x2, y2);
          linesArr.push(line)
          if (linesObj[`${x1}${y1}`]) {
            linesObj[`${x1}${y1}`].push(line);
          } else {
            linesObj[`${x1}${y1}`] = [line];
          }
          if (linesObj[`${x2}${y2}`]) {
            linesObj[`${x2}${y2}`].push(line);
          } else {
            linesObj[`${x2}${y2}`] = [line];
          }
        }
      }
    }

    return {
      particlesObj: particlesObj,
      linesObj: linesObj,
      linesArr: linesArr
    };
  }

  let { particlesObj, linesObj, linesArr } = createCrystal(1);
  return {
    start: () => {
      (function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let key in particlesObj) {
          particlesObj[key].update();
          particlesObj[key].draw();
          const newX = particlesObj[key].x;
          const newY = particlesObj[key].y;
          linesObj[key].forEach((el) => el.update(key, newX, newY));
          const partObj = particlesObj[key];
          delete particlesObj[key];
          particlesObj[`${newX}${newY}`] = partObj;
          const liObj = linesObj[key];
          delete linesObj[key];
          linesObj[`${newX}${newY}`] = liObj;
        }
        linesArr.forEach(el => el.draw());

        requestAnimationFrame(animate);
      })();

    },
    end: () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesObj = {};
      linesObj = {};
      linesArr = [];      
    }
  }

}
