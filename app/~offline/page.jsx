import { FaExclamationTriangle } from 'react-icons/fa';


export const metadata = {
    title: "LosMovies - Offline",

}

const NotFound = () => {
  return (
    <section className='pt-[180px] min-h-screen relative bg-c-back my-container'>
        <div className='flex justify-center flex-col items-center w-full mt-20'>
            <FaExclamationTriangle className='text-6xl text-yellow-500 mb-4' />
            <h1 className='font-texts text-white text-4xl text-center'>You&apos;re Offline</h1>
            <p className='text-white font-texts text-lg mt-2'>
                Please check your internet connection and try again.
            </p>

        </div>
    </section>
  )
}

export default NotFound