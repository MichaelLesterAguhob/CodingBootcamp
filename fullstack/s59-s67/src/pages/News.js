import newsData from "../data/newsData";
import NewsCard from "../components/NewsCard";

export default function News() {

  const news = newsData.map(news => {
    return(
      <NewsCard key={news.id} newsProp={news} />
    ) 
  })
  
  return (
    <>
        <h1>News</h1>
        {news}
    </>
)
}