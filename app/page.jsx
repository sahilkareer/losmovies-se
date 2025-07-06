// 100% Server Side Rendering


// import MainScreen from "@/components/MainScreen";
// import Info from "@/components/Info";
import 'tailwindcss/tailwind.css';
// import Tops from "@/components/Tops";
// import { tvGenres, movieGenres } from "@/utils/genres";
// import { LoaderContainer } from "@/components/Loader";
import Image from "next/image";
import NewSearchBar from "@/components/NewSearchBar";
import { Suspense } from "react";
import MainPageContent from '@/components/MainPageContent';
import { Button } from '@/components/ui/button';
import { ArrowRightCircle } from 'lucide-react';
import { TransitionLink } from '@/components/TransitionLink';
// import SearchBar, { SearchInput } from "@/components/SearchBar";
// import AdsFrame from "@/components/AdsFrame";

  export const metadata = {
    title: "LosMovies - Free Movies Online, Stream HD Tv Shows",
    description: "LosMovies: A top, trusted site for free, high-quality movies and series. Watch all your favorite films and TV shows here!",
    author: "Juju",
    keywords: "LosMovies, LosMovies movies, LosMovies TV shows, LosMovies streaming, LosMovies watch, LosMovies online, LosMovies anime, LosMovies documentaries, movies, series, TV Shows",
    openGraph: {
        type: 'website',
        title: 'LosMovies - Watch TV Shows & Movies Online',
        description: 'LosMovies offers a variety of award-winning TV shows, movies, anime, and documentaries.',
        image: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/icons/LogoOnly2.png`,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}`
    },
 };


//  const faqs = [
//   { question: "Welcome to LosMovies – Your Home of Free Streaming Entertainment",
//      answer: "Watch. Stream. Enjoy. – No Limits. No Fees. LosMovies is an innovative response to a timeless enjoyment: the streaming of movies or TV shows. If you are situated in the U.S, UK, Netherlands, Mexico, Canada or Australia, rest assured that LosMovies is tailored to your needs, serving as a central free online entertainment portal that is always willing to meet your expectations. Visualize a setting where you can have your favorite movies without the need for subscriptions, irritating pop-up adverts or sign-up barriers. This is precisely what LosMovies provides. Our aim is unrestricted:  Our focus is to integrage the latest movies, the most popular TV shows and even the best ever made all on one great platform… and at no cost to you. LosMovies is not just a website – it’s an experience. Whether you are ready for a weekend binge, want to indulge in horror marathons, or are simply seeking romance,thriller, mystery, action, fantasy, anime or drama, you are sure to find them all at this website, complete with an enchanting escape in hyper-realistic, high definition deffinition." },
//   { question: "Why So Many People Love LosMovies?",
//      answer: "From students binging sitcoms while pulling all-nighters, to families who love spending the weekend cuddled up for family movie nights, it is clear how LosMovies has managed to become the filmmaking powerhouse of filmmaking that is enjoyed by millions of users around the globe.n Here’s why: 📺 Access to 30,000+ Movies & TV Shows They are never behind on the latest or the hottest international films; rather, they also possess gems. Plus, they ensure that their stocks are fresh, and I have used ‘stacks’ because that is how I treat their shelves. ⚡ Fast Streaming, No Buffering If you do have slowish connections, thanks to our Cloud Delivery system the customers have been telling us they feel relaxed streaming with no interruptions. 💻 Works On All Devices Whether it is a smartphone, fuel gadgets, tablets, PCs, laptops, and even smart TVs, LosMovies stand to that statute, as it works marvelously on all. 🔍 Powerful Search + Smart Filters If you are in need of being particular, don’t worry we have something for that, cloud delivery shows savers that can filter through genre, year, language, rating on IMDB and even how popular it is, so they can have a blast. 🔒 No Login Needed – Total Privacy Again, we do not require an email. Your personal information is not needed, nor is an account required. All you have to do is press play. 🆓 Completely Free Forever There are no concealed costs, nor are there subscriptions. Everything is free because we believe in unobstructed entertainment without restrictions." },
//   { question: "Built for a Global Audience", answer: "LosMovies appreciates by viewers globally. From cafes in London, dorm rooms in New York and living rooms in Sydney – the streamer provides a smooth, personalized experience everywhere. We provide support for: Subtitles in multiple languages Content availability across multiple regions Regions popularity are based on geo-optimization 🇺🇸 USA – 90.5K searches/month 🇬🇧 UK – 49.5K 🇳🇱 Netherlands – 33.1K 🇲🇽 Mexico – 22.2K 🇦🇺 Australia – 18.1K 🇨🇦 Canada – 18.1K …and over 100K users from “other” countries! LosMovies’s clean interface, HD quality, and content diversity make it the ultimate free streaming site across continents." },
//   { question: "Endless Genres – Something for Every Mood and Every Viewer", answer: "Regarding content, it seems that LosMovies has no limitation on your imagination. It has a wide movie universe, including every category, language, and type of movie. LosMovies offers everything from a sweet love story to an intellectually challenging thriller, or slapstick comedy. Our categorized Libraries has everything you can think of, and some things you may not have thought about. Below are the main categories available on LosMovies that you can access 24/7: 🎥 Top Genres You’ll Love ❤️ Romance : LosMovies is an excellent platform for watching tearjerkers and rom-coms. It allows you to fall in love with the genre all over again. 🎭 Drama : Powerfully crafted storylines with emotional and character depth colled together in a single drama. Award winning movies + multiples seasons binge worthy series. Lets us you speechless. 👻 Horror : Are you yearning for something spine chilling? The whack job that lies in the hypnogogic state is ready for stories of fainting spirits and unsettling manors, and mind warping thrillers. It’s best to watch with the curtain lights on. 🕵️ Mystery & Thriller : For those who love suspense filled audiences and detective shows, action packed copy cat based stories strive for best sellers in plots set in telling need solving. 🎬 Action & Adventure : Boosting Blockbuster’s finest à la Rockets full of verve, drama, movement, action, tasks , incentives. Quests, fight, chase awaits you. 😂 Comedy : The feel good genre. Best enjoyed alone or together while enjoying situational, slap stick, stand up, and funny specials alongside one an other. 🛸 Sci-Fi & Fantasy : Travel to distant planets or mystical lands. Our science fiction and fantasy genres let you escape reality and embrace the impossible. 👨‍👩‍👧 Family & Kids : Bubble wrapped safe and good wholesome fun is ideal for charming family nights. Theater movies, fairy tales cartoons educational series are part of this enticing collection. 🎶 Musical & Biopics : Engage with biographical documentaries and music-driven narratives while listening to captivating soundtracks or following the lives of renowned figures 🎞️ Anime & Animated : Our collection of anime is loved globally, containing countless colorful titles and receiving frequent updates. From slice-of-life to epic battles — all genres included." },
//   { question: "Always Updated, Always Fresh", answer: "In the site, you will find updates on: Recently released titles Most watched Netflix/Amazon/Disney+ series Popular web series Movies in IMDB’s top listings Specials for holidays and seasons With LosMovies, you won’t have to look for information that grabs attention; it either is or will be available shortly." },
//   { question: "Multilingual Content with Subtitles", answer: "LosMovies is built for a truly international audience. That’s why we support: 🌐 English, Spanish, Dutch, French, Hindi, and more 📝 Subtitles in multiple languages 🎧 Dubbed versions for non-English content Whether you’re a native English speaker or a global viewer exploring international cinema, you’ll feel right at home." },
//   { question: "Seamless Browsing, Instant Access", answer: "" },
//   { question: "How LosMovies Works – Stream Instantly, Anytime, Anywhere", answer: "" },
//   { question: "Adaptive Streaming for Smooth Playback", answer: "" },
//   { question: "Built-In Privacy and Security", answer: "" },
//   { question: "Smart Search + Discovery Tools", answer: "" },
//   { question: "Offline Viewing Options (For Mobile Users)", answer: "" },
//   { question: "100% Free — Forever", answer: "" },
//   { question: "Why LosMovies Is Loved by Millions – Real Reasons to Make It Your Streaming Home", answer: "" },
//   { question: "LosMovies on Mobile – Your Pocket-Sized Theater Experience", answer: "" },
//   { question: "LosMovies on Mobile – Instant Access, Zero Barriers", answer: "" },
//   { question: "Can You Download Movies for Offline Viewing?", answer: "" },
//   { question: "Why There’s No Official App (Yet)", answer: "" },
//   { question: "Will There Ever Be a LosMovies App?", answer: "" },
//   { question: "Is LosMovies Legal & Safe? What You Should Know", answer: "" },
//   { question: "Is LosMovies Safe to Use?", answer: "" },
//   { question: "Is LosMovies Legal?", answer: "" },
//   { question: "What About Security?", answer: "" },
//   { question: "LosMovies’s Core Values", answer: "" },
//   { question: "Legal Streaming Alternatives We Recommend", answer: "" },
//   { question: "Top Alternatives to LosMovies in 2025 – If You’re Exploring Options", answer: "" },
//   { question: "Free Streaming Alternatives", answer: "" },
//   { question: "Premium & Legal Platforms", answer: "" },
//   { question: "Community Picks", answer: "" },
//   { question: "The Bottom Line", answer: "" },
//   { question: "Frequently Asked Questions – Everything You Might Want to Know", answer: "" },
//   { question: "Does LosMovies have ads?", answer: "" },
//   { question: "Is the streaming quality good?", answer: "" },
//   { question: "Can I download content from LosMovies?", answer: "" },
//   { question: "Is it legal to use LosMovies?", answer: "" },
//   { question: "How often is new content added?", answer: "" },
//   { question: "What if I can't find the movie I want?", answer: "" },
//   { question: "How can I support LosMovies?", answer: "" }
// ];




const Page = () => {


  return (
      <section className="pt-[170px] pb-10 text-white my-container min-h-screen bg-c-back">
        <Image 
            src={'/assets/icons/medium.webp'}
            alt='LosMovies-Logo'
            height={100}
            width={250}
            className='my-[1px] mx-auto mb-10'
        />

        <Suspense fallback={<></>}>
        <NewSearchBar varient="large" page="main" />
        </Suspense>

        <div className="w-full flex justify-center items-center">
        <TransitionLink href="/movies" >
        <Button className="bg-c-primary hover:bg-c-primary/80 text-white font-titles font-bold rounded-full my-10 mx-auto">
            View Full Site <ArrowRightCircle className="inline-block ml-2" />
        </Button>
        </TransitionLink>
        </div>

        {/* heading, and description */}
        {/* <div className="text-center mt-20 mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Introduction to LosMovies</h1>
          <p className="text-lg md:text-xl text-gray-400">In the digital age we live in, it can be difficult to find a reputable place to watch movies and TV shows. That’s where LosMovies comes into the picture—a go-to site for entertainment seekers all around the world. Well whether you’ve known it as los movies, losmovie, or even found it through old links like LosMovies. se or LosMoviesz.to, this platform remains the go-to for all the right reasons.

            Upon the heart of LosMovies, it provides what most public look for: convenient access to a massive collection of movies for free, along with famous TV shows and international releases—all under one roof. It’s not only that volume, it’s experience. Ad free, Beast quality, High quality and of course LosMovies ️ Don’t forget to visit our movies collection 250k+ movies 1Movies – Watch Movies Online for Free in HD 1Movies – Watch Movies Online for Free in HD.

            What makes LosMovies so great is it doesn’t forget who and why it’s streaming it’s movies, whether for a casual watcher, families, or even the most devoted cineastes. The platform is updated regularly to keep up with new releases while at the same time maintaining the appeal of LosMovies old, which the old-guard fans cherish.

            So whether you are returning to LosMovies ru or trying LosMoviesz for the first time, you are sure to find out why so many people are flocking to los movies as their go-to for legal, free, and high-quality entertainment.

            </p>
        </div>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">What is LosMovies?</h2>
          <p className="text-lg md:text-xl text-gray-400">
            LosMovies is an online movie streaming relatform that has won the hearts of many users for being ad-free and providing as little inconvenience as possible. It was first debuted on domains such as LosMovies. se and LosMovies ru, the site has changed over time but it’s always maintained the same core promise: to provide the ability to access movies and TV shows in an easy and friendly way for users.

            Unlike some boring streaming sites with annoying pop-ups, fake, or of bad quality links, we share nice and quality photos and videos from all around the world, in your hand – it’s 100% free and safe! If you are typing losmovie, los movies or even checking links such as LosMoviesz.to or LosMoviesz, you’re still entering the same ecosystem — one that at its center is laser-focused on best-in-class experiences without concessions.

            For many long-time users LosMovies old was one of a small number of sites that really showed a commitment to user experience. Even now, the current iteration cements that reputation with mobile optimization, options to view offline and adaptive streaming. It is still a reputable free movies website, streaming movies without interruption legally.

            For those who don’t know….LosMovies is actually more than just a streaming site – it’s a legacy and a community. Whether you’re a cinephile in search of an obscure foreign film or you like kicking back and watching the latest blockbuster on a Friday night, los movies has something for everyone — all within the boundaries of the law and without taking safety for granted.
            </p>
        </div>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">Features and Benefits of LosMovies</h2>
          <p className="text-lg md:text-xl text-gray-400">
            When choosing an online streaming sites, it’s all about the features — and LosMovies has them all. Full of diverse content, a clean interface, and with a stringent policy of enviable customer satisfaction, los movies is one of the diamonds in the rough among all streaming sites.

        Extensive and Diverse Library.

        What makes LosMovies one of the best is its huge variety. With everything from the old-school to the newest releases, users can dive into thousands of options from every thinkable genre action, drama, comedy, romance, horror, sci-fi and beyond. Find here whether you are looking through LosMovies.se, LosMovies ru, or LosMoviesz, the material is still amazingly wide and expertly selected.

        Unlike the slim selection found on mainstream services, los movies free movies boasts an array of indie films, documentaries and international titles you’re less likely to find everywhere else. It is a refuge for casual viewers as well as hard-core film enthusiasts.

        Ad-Free Streaming Experience.

        Sick of having ads injected into your movie night? With LosMovies, you will be able to experience an entirely ad-free browsing, that will allow you to enjoy your stream without being hampered with relentless pop-ups in-between your viewing. This differentiates it from a host of so-called “free” platforms that overload users with pop-ups. Whether you’re using LosMoviesz.to or a newer domain, the no-ads model holds strong.

        High-Quality Streaming with Adaptive Technology.

        LosMovies provides HD streaming with an adaptive feature which decides on the quality of the video based on your internet speed. That means clear video without buffering on mobile and high-speed streaming quality from your smartphone.

        Mobile and Multi-Device Compatibility. 

        Whether you are watching movies on computer, on your phone, on a laptop, or a smart TV, los movies will load up in an instant providing you the best video quality. And you can download things to watch offline — great for travel or areas with spotty internet access.

        User-Friendly Interface.

        The design of the site is simple and user friendly. Categories are easy to browse, searching is simple and finding hidden gems is a breeze, even for new users. If you’re coming from los movie links or newer paths like LosMoviesz, you’ll notice the interface is conveniently user-oriented.

        Constantly Updated Content.

        New movies and series are added weekly. There is no need to fret over missing the recent titles, as Los Movies updates the library regularly, to ensure that you are always up-to-date with new releases.

        In a nutshell, Los Movies is a combination of all the necessary qualities in a single powerful platform- high-def, ad-free, mobile-friendly, and 100% legal streaming of a massive range of free movies and TV shows.
        </p>
        </div>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">How LosMovies Stands Out From Other Streaming Platforms?</h2>
          <p className="text-lg md:text-xl text-gray-400">
            In a world of overcrowded stream farms, LosMovies is one of the few out there that really deserve these pleasantries that most services online will promise you, yet never fulfill—completely prompt, ad free, and enjoyable to use. Although many free movie sites are plagued with pop-ups, malware risk or low quality streams, LosMovies.se is not, keeping it simple and user-first.

            The thing that sets Los Movies apart is its commitment to the viewer. Compared to other streaming services that put their best content behind a paywall, los movies free movies are genuinely free. You don’t have to register, give up your credit card details or download unknown software to begin watching. Both if the los movies old is or if the los movies new site exists, through whichever of los movies new or los movies old you visit, you’ll gain access to the same thing. It’s also always reliable and perfectly safe.

            The interface of LosMovies also is far better than any other free streaming sites. Fast, minimalistic, intuitive — the opposite, in every sense, of websites that seem overcrowded or outmoded. Finding a movie on los movie or LosMoviesz takes seconds, with no confusion about what to click on or how to watch.

            Another major differentiator? Ad-free streaming. Most free services are heavily ad-supported, so enjoy a frustrating viewing experience. But LosMovies values your time and your immersion. No interruptions, no pre-rolls, no sleight of hand — just movies, as they were intended to be watched.

            And in conclusion, LosMovies is a worldwide favorite since it supports the rest of the world with international movies and multi language feature. Though some services focus on regional tastes only, LosMovies ru and other regional versions make it a desirable option for the worldwide viewers.

            In short, if you’re comparing platforms, Los Movies isn’t just another name—it’s a better way to stream.
        </p>
        </div>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">Is LosMovies Safe? Here&apos;s How to Stay Protected</h2>
          <p className="text-lg md:text-xl text-gray-400">
            Searching for free movies online, you have probably stumbled on LosMovies—or one of its impermanent domains like LosMovies. se, LosMoviesz.to, or LosMovies ru. But, counting yourself among most users you may wonder: is using LosMovies safe? The short answer is yes, provided you can manage the platform in a responsible way.

            Now, we are clear: LosMovies has won itself a regard of being safer than most of the free streaming sites. It doesn’t ask users to register or give personal information, which is the first red flag on many dodgy services. You don’t even have to sign up for an account if you opt to use the LosMovies old site or any updated version of it such as LosMoviesz, effectively minimizing the risk of any data theft or spam.

            That said, it’s important to remember that safety also depends on how you use the platform. Los Movies tries to deliver legitimate content, nevertheless some mirror sites or unofficial clones could get you into trouble. If you’re directed to a version that’s plastered with pop-ups or messages asking you to download software, then it’s probably not the official los movies domain.

            This is how you can remain protected whilst streaming on LosMovies:

            Use a VPN: By masking your IP address and applying an extra layer of encryption to your web activity, this is particularly handy if you’re worried about regional streaming laws.

            Use Ad Blockers: Although Nyaa.si is almost completely ad-free, there might be some pop-ups when you download torrents or click on them. An ad blocker ensures you’re not the victim of annoying interruptions or shady redirects.

            Avoid Downloading Files: Just stream directly from the site. Downloading files from questionable sources or clicking on “watch now” buttons from outside players are other ways these threats can be introduced into your machine.

            Check the Domain: You are recommended to confirm that you are on the official source like LosMoviesz.to, LosMovies ru, LosMovies.se protect against phishing scams and fake clones.

            So yes LosMovies is safe to use if you do it in the right way. But with a few easy precautions, you can be the one in charge of los movies streaming — instead of the other way around.
            </p>
        </div>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">Legality and Safety of Using LosMovies.</h2>
          <p className="text-lg md:text-xl text-gray-400">
            Perhaps the biggest worry when you’re considering using online streaming websites is legality — and it’s a valid one. Good news is, LosMovies works with a stated dedication to security and respect for copyright laws. LA or a returning user, you must have noticed by now that there are quite a few videos to see on los movies. se, someone who was there on the los movies old days, or checking a current version such as LosMoviesz.to, the site is intended to provide peace of mind as well as entertainment.

            It was not like those shady streaming websites which are in the gray area of the law, LosMovies has transparency to its core. There is no need to install potentially risky software, and no need to play using fake “play” buttons, some of which may lead to spam or malicious ads. That’s one of the things that sets LosMovies.se apart from the regular free movie sites you can find in a Google search or on social media.

            Another thing that gives users peace of mind is LosMovies’ no-registration policy. The content is accessible without your having to submit personal details or payment information. This means you’re not putting your sensitive information out there, and there’s little to no risk of identity theft or phishing—or other shady practices that have been known to affect the lower tier of platforms.

            But it’s also worth noting that streaming laws are different in every country. LosMovies features only legally available links, and users may need to check out local laws to ascertain legality. In practice, for the most part, users report that their access experience is “smooth” and “safe,” with “no legal repercussions,” especially when compared to obviously infringing sites.

            What’s more, LosMovies ru, LosMovies.se and other localised versions of the site are designed to provide localised assistance and safer links, it’s easier to use and the content is still legitimate. As always, the best way to enjoy LosMovies old content is to not download anything suspicious and go directly to the website.

            In conclusion, LosMovies offers one of the safest, most legitimate streaming experiences you will find on the internet— especially when it comes to free movies.
            </p>
        </div>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">LosMovies on the Go: Mobile and Offline Use</h2>
          <p className="text-lg md:text-xl text-gray-400">
            LosMovies site is mobile-friendly so you can access it anywhere and anytime. With any device you use, you could always have a fantastic watching experience with losmovie for easy access and navigation. For those not wishing to depend on internet, LosMovies free movies are downloadable so that you can watch them without the internet. This feature is perfect for when you’re on the go, whether traveling or when you’re short on an internet connection.

            LosMovies also comes with both 4G and 5G network support, and it has customizable bandwidth settings to let you stream smoothly no matter your connection. This also enhances HD quality without buffering and saves data where applicable. No matter if you’re streaming on cellular or Wi-Fi, the platform will automatically adjust to the best delivery to provide the best experience.

            Thanks to these benefits, LosMovies continues to be one of the best sources for free movie streaming, available anytime, from any location, with no restrictions and minimal buffering. Get portable music without messy cables.
            </p>
        </div>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">LosMovies Troubleshooting and Support</h2>
          <p className="text-lg md:text-xl text-gray-400">
            The unmatched viewing experience is what LosMovies is known for. For any issues related to streaming, buffering, downloading, etc, please contact our support team They are more than happy to help you out. Whether you’re on LosMovies old com or using LosMovies ru, our handy help center has instant answers to the most commonly asked questions.

            If you’re seeing a lot of buffering, you might want to test your internet connection, or try adjusting the video quality to a lower setting in the settings menu. And for download problems, make certain there’s plenty of device space and a strong connection. RecoverStrong along with our FAQ will make handling login issues easy and quick.

            If you need more help, contact our support team through the contact page—prompt and friendly service is only a click away. With LosMovies also, it’s just as easy to support as it is to stream.
            </p>
        </div>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">Suitable for All Kinds of Users</h2>
          <p className="text-lg md:text-xl text-gray-400">
            No matter who you are and what you are, LosMovies has been developed with every viewer in mind, being accessible to anybody and everybody. Whether you’re a hardcore film buff or somebody who just likes to kick back and watch a movie every once in a while, LosMovies.se free movies has something for everyone.

            Families are going to love our curated selection of kid-friendly programming: educational shows, fun animations, and family-friendly movies that parents will enjoy, too, all safe and kid-approved for unlimited viewing. Film enthusiasts can peruse a vast catalogue of timeless cinema, acclaimed indie films and popular blockbusters, all with expert-curated descriptions and ratings to match for an informed viewing experience.

            Television series addicts will find all manners of bingeable content in every genre — think: drama, comedy, mystery, and sci-fi — and international viewers can switch over to multilingual options and global titles with subtitles.

            We also focus on accessibility, and we have closed captions and audio description to enable all viewers to enjoy the platform. From casual viewers, to busy professionals the intuitive interface, personalizing recommendations and offline viewing make it seemless to add quality entertainment to any day.

            And with community features like reviews and forums, LosMovies turns solo watching into a social event. No matter of what walk of life you are from and what kind of movies you like, LosMovies has something for everybody.
            </p>
        </div>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">No Ads Interruption</h2>
          <p className="text-lg md:text-xl text-gray-400">
            One of LosMovies key aspects is that it is ad-free enabling free streaming without unnecessary interruptions. In an era of so many distractions, LosMovies is the place to visit if you want to avoid being bombarded with pop-ups or bombarded by a commercial while you’re trying to watch something!

            By removing ads, we give our users a cleaner, more seamless experience. Now, whether watching that thrilling drama or touching romance, you will stay engaged from one episode to the next without being interrupted by The Dust!

            And our ad-free model is a plus when it comes to getting to your favorite content faster—click and watch with no commercials involved. This lends an air of prestige, especially for users accustomed to watching ads on other free platforms.

            This is particularly good for families, where kids get to see their favorite movies in a fun, safe environment minus the distractions! And, away from ad-related buffering, users get better streaming quality, continuous playback and reduced annoyances.

            LosMovies proves that free streaming doesn’t have to come at the cost of quality. By putting your experience first, we offer one of the most enjoyable, ad-free streaming platforms available today.
            </p>
        </div> */}

        {/* {
            faqs.map((faq, index) => (
                <div key={index} className={`mb-10 text-center ${index == 0 && "mt-20"} `} >
                <h2 className="text-xl md:text-2xl font-bold mb-2">{faq.question}</h2>
                <p className="text-lg text-gray-400">{faq.answer}</p>
                </div>
            ))
        } */}

        <MainPageContent />
        
      </section>
  )
}

export default Page