// import ReportComponent from '@/components/ReportComponent';
import { FaExclamationTriangle } from 'react-icons/fa';


export const metadata = {
    title: "LosMovies - Page Not Found",

}


const NotFound = () => {




  return (
    <section className='pt-[180px] min-h-screen relative bg-c-back my-container'>
        <div className='flex justify-center flex-col items-center w-full mt-20'>
            <FaExclamationTriangle className='text-6xl text-yellow-500 mb-4' />
            <h1 className='font-texts text-white text-4xl text-center'>Page Not Found</h1>
            <p className='text-white font-texts text-lg mt-2'>The page you are looking for does not exist.</p>
        </div>
        {/* <ReportComponent /> */}
    </section>
  )
}

export default NotFound