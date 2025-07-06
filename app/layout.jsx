import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google'
import { Nunito, Cabin, Raleway } from "next/font/google"
import AdsScript from "@/components/AdsScript";
import Script from "next/script";
// import AdBlockChecker from "@/components/AdBlockChecker";
// import { Toaster } from "sonner";
// import { getAdCashLibrary } from "@/lib/utils";

const nunito = Nunito({
    subsets: ['latin'],
    variable: "--font-nunito",
    display: "swap",
})

const cabin = Cabin({
    subsets: ['latin'],
    variable: "--font-cabin",
    display: "swap",
})

const raleway = Raleway({
    subsets: ['latin'],
    variable: "--font-raleway",
    display: "swap",
})


export const viewport = {
    themeColor: '#1E1E1E',
  }

export const metadata = {
    other: {
        "google-site-verification": "0BBTOUgbFoigDTLWGj_vLlw8Ejm9w9OWvSnjkRhvxwM",
        "robots": "index, follow",
    }
};

export default async function RootLayout({ children }) {

    // const adcash = await getAdCashLibrary();
    // let adcash;


  return (
    <html lang="en" className={`${nunito.variable} ${cabin.variable} ${raleway.variable}`}>
        <head>
        {/* <Script strategy="beforeInteractive" id="monetag">{`(function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('vemtoutcheeg.com',8226306,document.createElement('script'))`}</Script> */}
        
        <Script type='text/javascript' strategy="beforeInteractive" src='//inactionaccompanyingstress.com/c3/4b/a7/c34ba7a318a3c7884ffdb8daac522ad2.js'></Script>
        
        </head>
      <body>
      <Analytics/>
        <Nav />
        <div className="main-content">
        {children}
        </div>
        <Footer />


            <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Send data to both GA properties
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
            gtag('config', 'G-RC3Z7X27CP');
          `,
        }}
      />


        
        <AdsScript  />


      </body>
    </html>
  );
}
