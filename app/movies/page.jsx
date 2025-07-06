

import MainScreen from "@/components/MainScreen";
import 'tailwindcss/tailwind.css';
import Tops from "@/components/Tops";
import { movieGenres } from "@/utils/genres";
// import { LoaderContainer } from "@/components/Loader";


  export const metadata = {
    title: "LosMovies - Movies",
    description: "Watch free films, movies, and TV shows online in 4K with no registration on LosMovies. Enjoy seamless streaming, minimal ads, and endless entertainment.",
    author: "Juju",
    keywords: "LosMovies, LosMovies movies, LosMovies TV shows, LosMovies streaming, LosMovies watch, LosMovies online, LosMovies anime, LosMovies documentaries, movies, series, TV Shows",
    openGraph: {
        type: 'website',
        title: 'LosMovies - Movies',
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
    let random1 = randomNum(movieGenres.length);
    let random2 = randomNum(movieGenres.length);
    let random3 = randomNum(movieGenres.length);
    let random4 = randomNum(movieGenres.length);


    while (random1 === random2 || random1 === random3 || random1 === random4 || random2 === random3 || random2 === random4 || random3 === random4) {
        random1 = randomNum(movieGenres.length);
        random2 = randomNum(movieGenres.length);
        random3 = randomNum(movieGenres.length);
        random4 = randomNum(movieGenres.length);
    }

    const randomMovieGenre1 = movieGenres[random1];
    const randomMovieGenre2 = movieGenres[random2];
    const randomMovieGenre3 = movieGenres[random3];
    const randomMovieGenre4 = movieGenres[random4];


  return (
      <div>
        <MainScreen screen={"movies"} />
        <Tops
            query="trending/movie/day?"
            title="Trending Movies"
        />
        <Tops
            query="trending/movie/week?"
            title="Hot this Week"
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
            query={`discover/movie?include_adult=true&include_video=false&sort_by=popularity.desc&with_genres=${randomMovieGenre3.id}&`}
            title={`${randomMovieGenre3.name} Movies`}
        />
        <Tops 
            query={`discover/movie?include_adult=true&include_video=false&sort_by=popularity.desc&with_genres=${randomMovieGenre4.id}&`}
            title={`${randomMovieGenre4.name} Movies`}
        />

      </div>
  )
}

export default Home