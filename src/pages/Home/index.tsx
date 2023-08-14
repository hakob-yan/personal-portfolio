import React, { ReactElement, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../redux/rootSlice'
import animate from './animate'
import Image from "../../assets/images/galaxy.jpg"


const Home = (): ReactElement => {
  const canvasElem = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    animate(canvasElem.current as HTMLCanvasElement)
  }, [])
  return (
    <main>
      <section className="h-screen">
        <canvas style={{backgroundImage:`linear-gradient(to right, #000000, #000000, #000000, #000000, #000000, #0f0306, #1a070b, #210a0f, #320d14, #440d15, #560d14, #670f0f)`}}  className='h-full w-full' ref={canvasElem}></canvas>
      </section>
      <section className="flex">Hello</section>
    </main>
  );
};

export default Home;
