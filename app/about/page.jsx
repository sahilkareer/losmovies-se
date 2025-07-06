import FeedbackBtn from '@/components/FeedbackBtn'
import InstallButton from '@/components/InstallButton';
import { TransitionLink } from '@/components/TransitionLink';
import Link from 'next/link'
import React from 'react'

export const metadata = {
    title: "LosMovies - Info",
    description: "About LosMovies.."
}

export const runtime = 'edge';


const AboutPage = () => {
  return (
    <section className="relative md:pt-[150px] max-md:pt-[70px] pb-10 max-w-screen px-0.5 text-white xl:px-6 min-h-[90vh] bg-c-back">
        <div className='md:hidden'>

            <TransitionLink href='/dmca' asChild>
                <div className='cursor-pointer rounded-sm mx-1 py-3 hover:text-c-primary bg-[#2b2b2b] pl-5 w-[97%] font-texts text-xl font-semibold transition duration-200'>
                        DMCA
                </div>
            </TransitionLink>

            {/* <div className='cursor-pointer rounded-sm mx-1 my-3 py-3 hover:text-c-primary bg-[#2b2b2b] pl-5 w-[97%] font-texts text-xl font-semibold transition duration-200'>
                <FeedbackBtn varient="mobile"/>
            </div> */}

                <InstallButton />

            <div className="my-10 mx-3 text-center font-secondary text-lg">
                <p><span className='text-c-primary'>Yass</span><span className="text-c-secondary">Flix</span>. &copy;{new Date().getFullYear()}</p>
            </div>


            <div className="text-lg font-secondary my-10 text-center mx-3">
                <p>This site does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</p>
            </div>
        </div>

        <div className='max-md:hidden my-container'>
            <p className='font-texts text-center text-xl'>
            Welcome to LosMovies, your go-to streaming platform for discovering the best TV shows and movies. With a wide range of genres and content to explore, we aim to bring you endless entertainment. Whether you&apos;re into classics or the latest releases, LosMovies has something for everyone. Dive in and start streaming today!
            </p>
        </div>
    </section>
  )
}

export default AboutPage