import Banner from '../components/Banner';
import Highlights from '../components/HighLights';
import FeaturedCourses from '../components/FeaturedCourses';

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
      <FeaturedCourses />
      <Highlights />
    </>
  );
}
