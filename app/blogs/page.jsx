/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Blogs from '@/utils/blogs.json'
import Image from 'next/image'
import { TransitionLink } from '@/components/TransitionLink'

export const metadata = {
    title: "LosMovies - Blogs",
    description: "DMCA Notice",
}


const page = () => {

    // each blog has a title and an image and a slug

  return (
    // <section className="pt-[180px] pb-10 text-white my-container min-h-screen bg-c-back">
    <section className="pt-[150px] pb-10 text-white my-container min-h-screen bg-c-back">
        <div className="layout-container">
            <div className="space-y-3 text-base font-texts">
                <h1 className="text-2xl font-semibold font-titles">LosMovies Blogs</h1>
                    {/* blogs map */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Blogs.map((blog, index) => (
                            <div key={index} className="bg-c-back/10 p-4 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                                <h2 className="text-lg font-semibold font-titles">{blog.title}</h2>
                                <TransitionLink href={`/blogs/${blog.slug}`} className="text-blue-500 hover:underline mt-3 inline-block">Read more</TransitionLink>
                            </div>
                        ))}

                </div>
            </div>
        </div>
    </section>
  )
}

export default page