import React, { ReactElement, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../redux/rootSlice'
import canvasAnimate from './animate'
import Button from '../../components/Button';
import SocialMedia from '../../components/SocialMedia';
import LinkedIn from "../../assets/icons/linkedin";
import Gmail from "../../assets/icons/gmail";
import GitHub from "../../assets/icons/github";
import Phone from "../../assets/icons/phone";
import Location from "../../assets/icons/location";
import Me from '../../assets/images/me.png'

const socialMediaArr = [
  { src: Phone, value: "+374-93-102-122", link: "tel:+374-93-102-122" },
  { src: Location, value: "Yerevan, Armenia", link: "https://goo.gl/maps/F5TodZ4nsdAPjRNZ9" },
  { src: Gmail, value: "devhakob@gmail.com", link: "mailto:devhakob@gmail.com" },
  { src: LinkedIn, value: "linkedin.com/in/hakob-yan", link: "https://www.linkedin.com/in/hakob-yan" },
  { src: GitHub, value: "github.com/hakob-yan", link: "https://github.com/hakob-yan" },

];

const Home = (): ReactElement => {
  const canvasElem = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const animate = canvasAnimate(canvasElem.current as HTMLCanvasElement);
    animate.start();
    return () => animate.end();
    
  }, [])
  return (
    <main className='text-font-color'>
      <section className="h-screen relative flex justify-start items-center	px-20">
        {/* <canvas className='absolute h-full w-full ' ref={canvasElem}></canvas> */}
        <aside className='font-extrabold flex	flex-col gap-y-5 items-start z-10'>
          <p className='relative text-4xl'>Welcome, I'am </p>
          <p className='relative text-6xl'>HAKOB  <span className='text-primary-2'>Web Developer</span></p>
          <p className='relative text-4xl'>I help you to transform your ideas into digital reality. </p>
          <span className='flex  gap-x-5'> {socialMediaArr.map(el => (<SocialMedia link={el.link} src={el.src} color='#7651fc' hoverColor='#fff' />))} </span>
          <div className="flex gap-x-5"><Button text='Download CV' /><Button text='Hire me ' /></div>


        </aside>
        <img src={Me} alt="" className='z-10 self-end w-3/4'/>

      </section>
      <section className="flex min-h-screen ">Hello</section>
    </main>
  );
};

export default Home;
