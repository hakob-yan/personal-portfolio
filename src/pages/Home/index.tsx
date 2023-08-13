import React, { ReactElement, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../redux/rootSlice'
import animate from './animate'
const Home = (): ReactElement => {
  const canvasElem = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    animate(canvasElem.current as HTMLCanvasElement)
  }, [])
  return (
    <main>
      <section className="h-screen">
        <canvas  className='bg-gradient-to-r from-indigo-500  h-full w-full' ref={canvasElem}></canvas>
      </section>
      <section className="flex">Hello</section>
    </main>
  );
};

export default Home;
