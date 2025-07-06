import { LoaderContainer } from "@/components/Loader";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <section className="pt-[180px] pb-10 text-white my-container min-h-screen bg-c-back">
            <div className='flex justify-center items-center w-full mt-20'>
                <LoaderContainer />
            </div>
        </section>
    )
  }