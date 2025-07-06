/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Blogs from '@/utils/blogs.json'
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { TransitionLink } from '@/components/TransitionLink';


export const generateMetadata = async ({params}) => {
    const { slug } = await params;
    
    // Find the blog post by slug
    const blogPost = Blogs.find(blog => blog.slug === slug);
    if (!blogPost) {
        return {
            title: "LosMovies - Blog Not Found",
            description: "The blog post you are looking for does not exist.",
        }
    }

    return {
        title: `${blogPost.title}`,
        description: `${blogPost.content[0].description}`,
        openGraph: {
            title: `LosMovies - ${blogPost.title}`,
            description: `Read the blog post about ${blogPost.title} on LosMovies`,
            images: [
                {
                    url: blogPost.image,
                    width: 800,
                    height: 600,
                    alt: blogPost.title,
                },
            ],
        },
        description: `Read the blog post about ${blogPost.title} on LosMovies`,
    }
    }

export const generateStaticParams = async () => {
    // Generate static params for each blog post
    return Blogs.map(blog => ({
        slug: blog.slug,
    }));
}


const BlogPage = async ({params}) => {

    const { slug } = await params;

    const blogPost = Blogs.find(blog => blog.slug === slug);
    if (!blogPost) {
        notFound();
    }

  return (
    <div>
        <section className="pt-[150px] max-md:pt-[70px] pb-10 text-white my-container min-h-screen bg-c-back">
            <div className="md:px-20">
            <div className="space-y-3 text-base font-texts">
                <h1 className="text-4xl font-semibold font-titles pb-5">{blogPost.title}</h1>
                <img src={blogPost.image}
                 alt={blogPost.title} className="w-full h-fit object-cover rounded-lg" />
                
                {
                    blogPost.content.map((section, index) => (
                    <section key={index} className={`pb-10 ${index == 0 && 'pt-20'}`}>
                        {section.title && <h2 className="text-2xl font-bold font-titles pb-2">{section.title}</h2>}
                        {section.description && section.description.split("//").map((paragraph, pIndex) => (
                        <p key={pIndex} className="pb-4 text-base font-texts">{paragraph}</p>
                        ))}
                        {section.cta && (
                            <p className="text-base font-texts font-semibold">{section.cta.text}: <TransitionLink className="text-blue-500 hover:underline" href={section.cta.url}>Link</TransitionLink></p>
                        )}
                    </section>
                ))}


            </div>
            </div>
        </section>
    </div>
  )
}

export default BlogPage