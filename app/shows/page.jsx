

import MainScreen from "@/components/MainScreen";
import 'tailwindcss/tailwind.css';
import Tops from "@/components/Tops";
import { tvGenres } from "@/utils/genres";
import { LoaderContainer } from "@/components/Loader";


  export const metadata = {
    title: "LosMovies - TV Shows",
    description: "Watch free films, movies, and TV shows online in 4K with no registration on LosMovies. Enjoy seamless streaming, minimal ads, and endless entertainment.",
    author: "Juju",
    keywords: "LosMovies, LosMovies movies, LosMovies TV shows, LosMovies streaming, LosMovies watch, LosMovies online, LosMovies anime, LosMovies documentaries, movies, series, TV Shows",
    openGraph: {
        type: 'website',
        title: 'LosMovies - TV Shows',
        description: 'LosMovies offers a variety of award-winning TV shows, movies, anime, and documentaries.',
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
    let random2 = randomNum(tvGenres.length);
    let random3 = randomNum(tvGenres.length);
    let random4 = randomNum(tvGenres.length);


    while (random1 === random2 || random1 === random3 || random1 === random4 || random2 === random3 || random2 === random4 || random3 === random4) {
        random1 = randomNum(tvGenres.length);
        random2 = randomNum(tvGenres.length);
        random3 = randomNum(tvGenres.length);
        random4 = randomNum(tvGenres.length);
    }

    const randomMovieGenre1 = tvGenres[random1];
    const randomMovieGenre2 = tvGenres[random2];
    const randomMovieGenre3 = tvGenres[random3];
    const randomMovieGenre4 = tvGenres[random4];




  return (
      <div>
        <MainScreen screen={"shows"} />
        <Tops 
            query="trending/tv/day?"
            title="Trending TV Shows"
        />
        <Tops 
            query="trending/tv/week?"
            title="Hot this week"
        />
        <Tops 
            query={`discover/tv?include_adult=true&include_video=false&sort_by=popularity.desc&with_genres=${randomMovieGenre1.id}&`}
            title={`${randomMovieGenre1.name} TV Shows`}
            />
        <Tops 
            query={`discover/tv?include_adult=true&include_video=false&sort_by=popularity.desc&with_genres=${randomMovieGenre2.id}&`}
            title={`${randomMovieGenre2.name} TV Shows`}
        />
        <Tops 
            query={`discover/tv?include_adult=true&include_video=false&sort_by=popularity.desc&with_genres=${randomMovieGenre3.id}&`}
            title={`${randomMovieGenre3.name} TV Shows`}
        />
        <Tops 
            query={`discover/tv?include_adult=true&include_video=false&sort_by=popularity.desc&with_genres=${randomMovieGenre4.id}&`}
            title={`${randomMovieGenre4.name} TV Shows`}
        />

      </div>
  )
}

export default Home