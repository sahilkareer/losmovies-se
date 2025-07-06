'use client'

import dynamic from 'next/dynamic';

const SlickSlider = dynamic(() => import('react-slick'), { ssr: false });

const MySlider = ({ settings, children }) => {

  return (
    <SlickSlider {...settings}>
      {children}
    </SlickSlider>
  );
};

export default MySlider;
