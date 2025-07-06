'use client'

import { Suspense, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
// import SearchBar from '@/components/SearchBar'
import Logo from './Logo'
import Link from 'next/link'
import Image from 'next/image'
// import { Input } from './ui/input'
import NewSearchBar from './NewSearchBar'
import { TransitionLink } from './TransitionLink'
import { PlayIcon } from 'lucide-react'
import { Md18UpRating, MdOutline18UpRating } from 'react-icons/md'
// import { Button } from './ui/button'

const navItems = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: "Home",
      path: '/home'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <rect x="2" y="5" width="20" height="15" rx="2" />
            <path d="M2 9h20" />
            <path d="M7 5l2 4" />
            <path d="M13 5l2 4" />
            </svg>
      ),
      label: "Movies",
      path: '/movies'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M16 3 12 7 8 3" />
            <path d="M8 21h8" />
        </svg>
      ),
      label: "TV Shows",
      path  : '/shows'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Discover",
      path: '/discover'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      label: "Search",
      path: '/search'
    },
    {
      icon: (
        <span className="text-sm font-secondary">+18</span>
      ),
      label: "Adults",
      path: '/adults'
    }
  ]

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }



const Nav = () => {

    // const [scrollPosition, setScrollPosition] = useState(0);
    const [activeItem, setActiveItem] = useState("Home")
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (pathname.includes("/discover")) {
            setActiveItem("Discover")
        }else if (pathname.includes("/search")) {
            setActiveItem("Search")
        }else if (pathname.includes("/movies")) {
            setActiveItem("Movies")
        }else if (pathname.includes("/shows")) {
            setActiveItem("TV Shows")
        }else if (pathname.includes("/about")) {
            setActiveItem("Info")
        }else if (pathname == "/home") {
            setActiveItem("Home")
        }
        else if (pathname.includes("/adults")) {
            setActiveItem("Adults")
        }
    }, [pathname])


    const itemClick = async (label, path) => {


        const body = document.querySelector(".main-content");

        router.prefetch(path);

        body?.classList.add("page-transition");

        await sleep(300);

        router.push(path, { scroll: true });

        // if (label == "Home") {
        //     router.push("/")
        //     setActiveItem("Home")
        // }else {
        //     router.push(`/${label.toLowerCase()}`)
        // }


    }

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollPosition(window.scrollY);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   https://t.me/PiggyPiggyofficialbot/game?startapp=share_5312880971


  return (
    <>


        {/* Large Screen Navigation */}
    <div className={`z-30 ${pathname == "/" ? "fixed" : "absolute"} w-full max-md:hidden`}>
    {/* <div className='my-container text-white text-sm bg-c-secondary py-2 text-center font-secondary font-bold'>
    Claim your free tokens now! <a href="https://t.me/PiggyPiggyofficialbot/game?startapp=share_5312880971" className='underline' target="_blank" rel="noopener noreferrer">Don&apos;t miss out!</a> (Instant withdrawal available)
    </div> */}
    <header className="w-full bg-[#2c2c2c] shadow-md max-md:hidden my-container bg-opacity-80 backdrop-blur-sm">
      <div className=" mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">

          <Logo pathname={pathname} />

          {/* Navigation Links */}
          <nav className="flex items-center space-x-4 overflow-x-hidden me-1">
            <TransitionLink
              href="/home"
              className="flex items-center space-x-1 text-lg font-titles font-medium text-white hover:text-c-primary transition-colors"
              title="Home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Home</span>
            </TransitionLink>
            <TransitionLink
              href="/discover"
              className="flex items-center space-x-1 text-lg font-titles font-medium text-white hover:text-c-primary transition-colors"
              title="Discover"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
              <span>Discover</span>
            </TransitionLink>
            <TransitionLink
              href="/movies"
              className="flex items-center space-x-1 text-lg font-titles font-medium text-white hover:text-c-primary transition-colors"
              title="Movies"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <rect x="2" y="5" width="20" height="15" rx="2" />
            <path d="M2 9h20" />
            <path d="M7 5l2 4" />
            <path d="M13 5l2 4" />
            </svg>
              <span>Movies</span>
            </TransitionLink>
            <TransitionLink
              href="/shows"
              className="flex items-center space-x-1 text-lg font-titles font-medium text-white hover:text-c-primary transition-colors"
              title="TV Shows"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M16 3 12 7 8 3" />
            <path d="M8 21h8" />
            </svg>
              <span>TV Shows</span>
            </TransitionLink>
            <TransitionLink
              href="/adults"
              className="flex items-center space-x-1 text-lg font-titles font-medium text-white hover:text-c-primary transition-colors"
              title="Adults Movies"
            >
              <span className="text-sm font-secondary">+18</span>
              <span>Adults</span>
            </TransitionLink>
            {/* <a
              href="https://v3.yassflix.net"
              target="_blank"
              className="flex items-center space-x-1 text-lg font-titles font-medium text-white hover:text-c-primary transition-colors"
            >
              <PlayIcon className="h-4 w-4" />
              <span>Version 3</span>
            </a> */}
          </nav>
        </div>

        {/* Search Bar */}
        <div className={`relative w-1/3 ${pathname == "/" && "hidden"}`}>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 w-full bg-c-back text-white"
          /> */}
            <Suspense fallback={<></>}>
                <NewSearchBar varient="large"/>
            </Suspense>
        </div>

      </div>
    </header>
    </div>


    {/* Small Screen Navigation */}
    <div className='md:hidden backdrop-blur-sm z-50 fixed top-0 left-0 right-0 bg-[#2c2c2c] bg-opacity-85 flex justify-center items-center'>
        <Image 
            src={'/assets/icons/LogoOnly2.png'}
            alt='LosMovies-Logo'
            height={40}
            width={50}
            // className='my-[1px]'
        />
    </div>

    <div className="fixed bottom-0 left-0 right-0 bg-[#2c2c2c] shadow-lg md:hidden z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map(({ icon, label, path }) => (
          <button
            key={label}
            className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ease-in-out ${
              activeItem === label ? "text-c-primary" : "text-gray-400 hover:text-c-primary/90"
            }`}
            onClick={() => itemClick(label, path)}
            aria-label={label}
            aria-current={activeItem === label ? "page" : undefined}
          >
            <div
              className={`p-2 rounded-full transition-all duration-300 ease-in-out ${
                activeItem === label ? "bg-c-primary bg-opacity-20" : ""
              }`}
            >
              {icon}
            </div>
            <span className="text-xs mt-1 font-light font-titles">{label}</span>
          </button>
        ))}
      </nav>
    </div>
    </>

  )
}

export default Nav