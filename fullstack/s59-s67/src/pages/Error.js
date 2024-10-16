import React from 'react';
import Banner from '../components/Banner';

const ErrorPage = () => {
  const errorBannerData = {
    title: "404 - Not found",
    content: "The page you are looking for cannot be found",
    destination: "/",
    buttonLabel: "Back home",
  };

  return (
    <div className='text-center'>
      <Banner data={errorBannerData} />
    </div>
  );
};

export default ErrorPage;
