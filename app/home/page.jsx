// 100% Server Side Rendering


import MainScreen from "@/components/MainScreen";
// import Info from "@/components/Info";
import 'tailwindcss/tailwind.css';
import Tops from "@/components/Tops";
import { tvGenres, movieGenres } from "@/utils/genres";
import { LoaderContainer } from "@/components/Loader";
// import AdsFrame from "@/components/AdsFrame";

  export const metadata = {
    title: "LosMovies - Watch Free Films and TV Shows Online",
    description: "Watch free films, movies, and TV shows online in 4K with no registration on LosMovies. Enjoy seamless streaming, minimal ads, and endless entertainment.",
    author: "Juju",
    keywords: "LosMovies, LosMovies movies, LosMovies TV shows, LosMovies streaming, LosMovies watch, LosMovies online, LosMovies anime, LosMovies documentaries, movies, series, TV Shows",
    openGraph: {
        type: 'website',
        title: 'LosMovies - Watch TV Shows & Movies Online',
        description: 'LosMovies offers a variety of award-winning TV shows, movies, anime, and documentaries.',
        image: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/icons/LogoOnly2.png`,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}`
    },
 };

export const revalidate = 43200;

export const runtime = 'edge';

const Home = () => {


       // random two different numbers
       const randomNum = (max) => {
        return Math.floor(Math.random() * max);
    }
    let random1 = randomNum(tvGenres.length);
    let random2 = randomNum(movieGenres.length);
    let random3 = randomNum(tvGenres.length);
    let random4 = randomNum(movieGenres.length);
    while (random1 === random3) {
        random3 = randomNum(tvGenres.length);
    }
    while (random2 === random4) {
        random4 = randomNum(movieGenres.length);
    }

    const randomTvGenre1 = tvGenres[random1];
    const randomMovieGenre1 = movieGenres[random2];
    const randomTvGenre2 = tvGenres[random3];
    const randomMovieGenre2 = movieGenres[random4];


  return (
      <div>
        <MainScreen screen={"home"} />
        <Tops
            query="movie/popular?"
            title="Popular Movies"
        />
        <Tops 
            query="trending/tv/week?"
            title="Trending TV Shows"
        />
        <Tops 
            query={`discover/movie?include_adult=true&include_video=false&sort_by=popularity.desc&with_genres=${randomMovieGenre1.id}&`}
            title={`${randomMovieGenre1.name} Movies`}
            />
        <Tops 
            query={`discover/movie?include_adult=true&include_video=false&sort_by=popularity.desc&with_genres=${randomMovieGenre2.id}&`}
            title={`${randomMovieGenre2.name} Movies`}
        />
        <Tops 
            query={`discover/tv?include_adult=true&include_video=false&sort_by=popularity.desc&with_genres=${randomTvGenre1.id}&`}
            title={`${randomTvGenre1.name} TV Shows`}
        />
        <Tops 
            query={`discover/tv?include_adult=true&include_video=false&sort_by=popularity.desc&with_genres=${randomTvGenre2.id}&`}
            title={`${randomTvGenre2.name} TV Shows`}
        />
        {/* // <AdsFrame /> */}
      </div>
  )
}

export default Home