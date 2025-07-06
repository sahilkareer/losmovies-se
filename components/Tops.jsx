
import TitleCard from "@/components/TitleCard";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Loader from '@/components/Loader';
import { Suspense } from "react";
import MySlider from "@/components/MySlider";


const fetchData = async (query) => {
    const response = await fetch(`https://api.themoviedb.org/3/${query}language=en-US&page=1&api_key=${process.env.CHIKH_TMDB_API_KEY}`);
    const data = await response.json();

    const isInappropriate = (title) => {
        const inappropriateWords = ['sex', 'fuck', 'porn'];
        const regex = new RegExp(inappropriateWords.join('|'), 'i');
        return regex.test(title);
    };

    const filtered = data.results.filter(show => show.name ? !isInappropriate(show.name) && !isInappropriate(show.overview) : !isInappropriate(show.title) && !isInappropriate(show.overview))

    const datati = {
        results: filtered
    }

    return datati;
}



// eslint-disable-next-line react/prop-types
const Tops = async ({query, title}) => {

    const data = await fetchData(query);


    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        responsive: [
                {
                breakpoint: 1120,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 1,
                  infinite: true,
                  arrows: true
                }
              },
                {
                breakpoint: 950,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  infinite: true,
                  arrows: false
                }
              },
              {
                breakpoint: 790,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                //   initialSlide: 2,
                  arrows: false
                }
              },
              {
                breakpoint: 320,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  arrows: false
                }
              },
        ]
      };






  return (
    <section className={`bg-c-back px-1 xl:px-6 w-full pt-1 pb-3`}>
        <div className="max-w-full w-full">
            {title.startsWith('Popular') ? <h1 className="color-gradient pl-2 max-sm:pl-1 font-titles my-2 text-3xl max-sm:text-2xl">{title}</h1> 
            : title.startsWith("Trending") ? <h1 className="color-gradient pl-2 max-sm:pl-1 font-titles my-2 text-3xl max-sm:text-2xl">{title}</h1>
            : <h2 className="color-gradient pl-2 max-sm:pl-1 font-titles my-2 text-3xl max-sm:text-2xl">{title}</h2>
            }
            {/* <h2 className="color-gradient pl-2 max-sm:pl-1 font-titles my-2 text-3xl max-sm:text-2xl">{title}</h2> */}
                    <Suspense fallback={<Loader />}>
                    <MySlider settings={settings}>
                    {                        
                        data.results.filter(movie => movie.title ? !movie.title?.toLowerCase().includes('sex') && +movie.release_date?.substr(0, 4) >= 2005 : !movie.name.toLowerCase().includes('sex') && (+movie.first_air_date?.substr(0, 4) >= 2005)).map(movie => (
                            <TitleCard 
                                key={movie.id}
                                img={movie.poster_path}
                                year={movie.release_date ? movie.release_date : movie.first_air_date}
                                titleId={movie.id}
                                title={movie.original_language == "es" ? movie.original_title ? movie.original_title : movie.original_name : movie.title ? movie.title : movie.name}
                                cardType="tops"
                                type={movie.release_date ? "movie" : "serie"}
                                date={movie.release_date ? movie.release_date : movie.first_air_date}
                                unoptimize={true}
                                sizes="(max-width: 640px) 44vw, 60vw"
                            />
                        ))
                    }
                </MySlider>
                </Suspense>
           
        </div>
    </section>
  )
}

export default Tops