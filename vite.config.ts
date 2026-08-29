import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { visualizer } from "rollup-plugin-visualizer";
import Sitemap from "vite-plugin-sitemap";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://irina-design.vercel.app";

export default defineConfig(() => ({
  base: process.env.BASE_PATH || "/",
  plugins: [
    react(),
    ViteImageOptimizer({ webp: { quality: 80 } }),
    visualizer({ filename: "stats.html", open: false, gzipSize: true }),
    Sitemap({
      hostname: SITE_URL,
      dynamicRoutes: [
        "/about",
        "/portfolio",
        "/services",
        "/useful",
        "/useful/shcho-take-dyzain-proiekt-interieru",
        "/useful/navishcho-potriben-dyzainer-interieru-pered-remontom",
        "/useful/skilky-koshtuie-dyzain-interieru-u-vinnytsi",
        "/useful/yak-formuietsia-tsina-dyzain-proiektu",
        "/useful/yak-pravylno-postavyty-zavdannia-dyzaineru-interieru",
        "/useful/yak-prokhodyt-robota-nad-dyzain-proiektom",
        "/useful/skilky-chasu-zaimaie-rozrobka-dyzain-proiektu",
        "/useful/dyzain-proiekt-chy-samostiinyi-remont",
        "/useful/planuvannia-chy-povnyi-dyzain-proiekt",
        "/useful/3d-vizualizatsiia-interieru-navishcho-potribna",
        "/useful/robochi-kreslennia-dyzainera",
        "/useful/yak-dyzain-proiekt-dopomahaie-kontroliuvaty-biudzhet",
        "/useful/yak-pravylno-splanuvaty-kvartyru-pered-remontom",
        "/useful/typovi-pomylky-planuvannia-kvartyry",
        "/useful/yak-pravylno-zonuvaty-prostir-kvartyry",
        "/useful/yak-zrobyty-malenku-kvartyru-zruchnoiu",
        "/useful/yak-splanuvaty-kvartyru-studiiu",
        "/useful/yak-obiednaty-kukhniu-ta-vitalniu",
        "/useful/kukhnia-vitalnia-perevahy-nedoliky-planuvannia",
        "/useful/yak-pravylno-splanuvaty-spalniu",
        "/useful/yak-splanuvaty-dytiachu-kimnatu-na-vyrist",
        "/useful/yak-pravylno-splanuvaty-harderobnu",
        "/useful/yak-orhanizuvaty-zberihannia-u-nevelykii-kvartyri",
        "/useful/yak-splanuvaty-vannu-kimnatu",
        "/useful/yak-pravylno-roztashuvaty-santekhniku-u-vannii",
        "/useful/yak-splanuvaty-pryvatnyi-budynok",
        "/useful/planuvannia-kvartyry-ta-pryvatnoho-budynku",
        "/useful/z-choho-pochaty-remont-kvartyry",
        "/useful/pravylna-poslidovnist-remontu-kvartyry",
        "/useful/roboty-do-pochatku-ozdoblennia",
        "/useful/skilky-koshtuie-remont-kvartyry-u-vinnytsi",
        "/useful/yak-sklasty-biudzhet-remontu-kvartyry",
        "/useful/yak-ne-vyity-za-mezhi-biudzhetu-remontu",
        "/useful/na-chomu-mozhna-ekonomyty-pid-chas-remontu",
        "/useful/pomylky-yaki-zbilshuiut-vartist-remontu",
        "/useful/skilky-chasu-zaimaie-remont-kvartyry",
        "/useful/yak-kontroliuvaty-yakist-remontu",
        "/useful/shcho-robyty-yakshcho-remont-perevyshchyv-biudzhet",
        "/useful/yak-pidhotuvaty-kvartyru-do-remontu",
        "/useful/skilky-rozetok-potribno-u-kvartyri",
        "/useful/yak-pravylno-splanuvaty-elektryku-u-kvartyri",
        "/useful/de-roztashovuvaty-rozetky-ta-vymykachi",
        "/useful/rozetky-na-kukhni-skilky-i-de",
        "/useful/elektryka-u-vannii-kimnati",
        "/useful/yak-splanuvaty-elektryku-u-spalni",
        "/useful/yak-pravylno-splanuvaty-osvitlennia-kvartyry",
        "/useful/skilky-svitylnykiv-potribno-dlia-kimnaty",
        "/useful/teple-chy-kholodne-svitlo-v-interieri",
        "/useful/tochkovi-svitylnyky-treky-chy-liustra",
        "/useful/yak-splanuvaty-pidsvichuvannia-kukhni",
        "/useful/pomylky-planuvannia-elektryky-ta-osvitlennia",
        "/useful/avtorskyi-nahliad-shcho-tse-i-navishcho",
        "/contact",
      ],
      exclude: ["/404", "/google5b6109d09ed90c5a"],
    }),
  ].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  server: {
    host: "127.0.0.1",
    port: 5173,
    proxy: {
      "/dev-api": { target: "http://127.0.0.1:5174", changeOrigin: true },
      "/api": { target: "http://127.0.0.1:5174", changeOrigin: true },
      "/.netlify": {
        target: "http://localhost:8888",
        bypass: req => (req.url?.includes("/.netlify/functions/") ? null : req.url),
      },
    },
  },
}));
