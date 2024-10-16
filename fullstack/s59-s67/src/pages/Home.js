import Banner from '../components/Banner';
import Highlights from '../components/HighLights';

export default function Home() {
  const homeBannerData = {
    title: "Zuitt Coding Bootcamp",
    content: "Opportunities for everyone, everywhere",
    destination: "/courses",
    buttonLabel: "Enroll now!",
  };

  return (
    <>
     
      <Banner data={homeBannerData} />
      
      
      <Highlights />
    </>
  );
}
