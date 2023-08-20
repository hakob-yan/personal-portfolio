import React, { ReactElement, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../redux/rootSlice'
import canvasAnimate from './animate'
import Image from "../../assets/images/galaxy.jpg"


const Home = (): ReactElement => {
  const canvasElem = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const animate = canvasAnimate(canvasElem.current as HTMLCanvasElement);
    animate.start();
    return () => animate.end();
  }, [])
  return (
    <main>
      <section className="h-screen bg-primary-1">
        <canvas  className='h-full w-full' ref={canvasElem}></canvas>
      </section>
      <section className="flex min-h-screen bg-primary-1">Hello</section>
    </main>
  );
};

export default Home;
