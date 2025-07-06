import Image from 'next/image'
import Link from 'next/link'
import { TransitionLink } from './TransitionLink'

const Logo = ({pathname}) => {
  return (
        <div className="logo mr-4 py-4">

            {
                        !pathname || pathname == '/' ? (
                            <Image src='/assets/icons/large.webp' alt="LosMovies Logo" 
                                className="object-contain sm:w-[140px] max-sm:w-[140px]"
                                width={50}
                                height={50}
                                placeholder="blur"
                                blurDataURL='/assets/icons/small.webp'
                                />
                        ) : (
                            <TransitionLink href='/'>
                            <Image src='/assets/icons/large.webp' alt="LosMovies Logo" 
                                className="object-contain sm:w-[140px] max-sm:w-[140px]"
                                width={50}
                                height={50}
                                placeholder="blur"
                                blurDataURL='/assets/icons/small.webp'
                                />
                            </TransitionLink>
                        )
                    }
        </div>
  )
}

export default Logo