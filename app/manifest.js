export default function manifest() {
    return {
        name: "LosMovies",
        short_name: "LosMovies",
        theme_color: "#009ACD",
        background_color: "#1E1E1E",
        display: "standalone",
        start_url: "/",
        icons: [
            // {
            //     src: "/newFavicons/maskable_icon_x192.png",
            //     sizes: "192x192",
            //     type: "image/png",
            //     purpose: "maskable"
            // },
            {
                src: "/newFavicons/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any"
            },
            // {
            //     src: "/newFavicons/maskable_icon_x512.png",
            //     sizes: "512x512",
            //     type: "image/png",
            //     purpose: "maskable"
            // },
            {
                src: "/newFavicons/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any"
            }
        ],
        id: "LosMoviesapp",
        description: "Stream your favorite movies and TV shows with minimal ads. Enjoy endless entertainment, from the latest blockbusters to classic favorites, all in one place.",
        dir: "ltr",
        lang: "en",
        orientation: "portrait",
        display_override: [
            "standalone",
            "fullscreen",
            "browser",
            "window-controls-overlay"
        ],
        categories: [
            "entertainment"
        ]
    };
}