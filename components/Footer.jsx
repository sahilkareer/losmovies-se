import Image from 'next/image'
import Link from 'next/link'
import FeedbackBtn from './FeedbackBtn'
import InstallButton from './InstallButton'
import { TransitionLink } from './TransitionLink'
// import logoOnly from '../assets/icons/LogoOnly2.png'


{/* <div className="container mx-auto">
      <h2 className="text-lg font-bold">Watch Free Movies and TV Shows Online</h2>
      <p>LosMovies offers a variety of movies, TV shows, anime, and documentaries for free without registration. Enjoy popular, new, and classic titles in 4K quality.</p>
      <h3 className="text-md font-semibold mt-4">Popular Searches:</h3>
      <ul>
        <li>Watch movies free online</li>
        <li>Free TV shows no registration</li>
        <li>4K streaming movies</li>
        <li>Trending TV shows</li>
        <li>Popular movies</li>
      </ul>
    </div> */}

const Footer = () => {
  return (
    <>
    <footer className="bg-[#282828] max-md:hidden font-texts my-container text-center text-white py-5 flex flex-col justify-between items-center">
      <div className='flex justify-around items-center flex-col sm:flex-row'>
        <div className="mb-4 sm:mb-0 sm:mx-5">
            {/* <img src={logoOnly} alt="LosMovies Logo" className="w-16" /> */}
            <Image src='/assets/icons/LogoOnly2.png' alt='LosMovies Logo' width={64} height={64} className='w-16' />
        </div>
        <div className="mb-4 sm:mb-0 sm:mx-5">
            <p>LosMovies. &copy;{new Date().getFullYear()}</p>
        </div>
      </div>
      <div className='flex flex-row gap-4 my-2 font-secondary'>
        {/* <FeedbackBtn /> */}
        <span className='cursor-pointer hover:opacity-100 opacity-80 transition duration-200'>
            <TransitionLink href='/dmca'>
                DMCA
            </TransitionLink>
        </span>
        <span className='cursor-pointer hover:opacity-100 opacity-80 transition duration-200'>
            <TransitionLink href='/blogs' title='Blogs'>
                Blogs
            </TransitionLink>
        </span>
        <span className='cursor-pointer hover:opacity-100 opacity-80 transition duration-200'>
            <InstallButton />
        </span>
      </div>
      <div className="text-xs sm:text-sm mt-4 max-sm:pb-14">
        {/* <p>Our content is aggregated from various external providers. As such, we cannot guarantee the availability or functionality of all movies/shows.</p> */}
        <p>This site does not store any files on our server, we only linked to the media which is hosted on 3rd party services</p>
      </div>
    </footer>
    <div className="md:hidden h-[70px] w-full bg-c-back"></div>
    </>

  )
}

export default Footer