import React, { ReactElement, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../redux/rootSlice'
import canvasAnimate from './animate'
import Button from '../../components/Button';

const Home = (): ReactElement => {
  const canvasElem = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const animate = canvasAnimate(canvasElem.current as HTMLCanvasElement);
    animate.start();
    return () => animate.end();
  }, [])
  return (
    <main className='text-font-color'>
      <section className="h-screen bg-primary-1 relative flex justify-start items-center	p-20">
        {/* <canvas className='absolute h-full w-full' ref={canvasElem}></canvas> */}
        <aside className='font-extrabold flex	flex-col gap-y-5 items-start'>
          <p className='relative text-4xl'>Welcome, I'am </p>
          <p className='relative text-6xl'>HAKOB  <span className='text-primary-2'>Web Developer</span></p>
          <p className='relative text-4xl'>I help you to transform your ideas into digital reality. </p>

          <Button text='Download CV' />
        </aside>

      </section>
      <section className="flex min-h-screen bg-primary-1">Hello</section>
    </main>
  );
};

export default Home;
