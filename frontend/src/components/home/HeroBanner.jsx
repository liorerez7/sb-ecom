// src/components/home/HeroBanner.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import { bannerLists } from "../../utils/constant";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const FALLBACK_IMG = "https://via.placeholder.com/1600x600?text=Banner";

const HeroBanner = () => {
  if (!bannerLists?.length) return null;

  return (
    <div className="py-2">
      <div className="relative rounded-2xl overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, A11y]}
          grabCursor={true}
          slidesPerView={1}
          loop
          speed={550}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation
          style={{
            "--swiper-pagination-color": "#ffffff",
            "--swiper-pagination-bullet-inactive-color": "#ffffff",
            "--swiper-pagination-bullet-inactive-opacity": "0.5",
            "--swiper-navigation-color": "#ffffff",
            "--swiper-navigation-size": "20px",
          }}
          className="h-64 sm:h-80 md:h-[440px]"
        >
          {bannerLists.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-full">
                <img
                  src={banner.image}
                  alt={banner.title}
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="max-w-xl rounded-xl bg-white/10 backdrop-blur-md text-white px-5 py-4 shadow-lg">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {banner.title}
                    </h2>
                    <p className="text-sm sm:text-base opacity-95 mt-1">
                      {banner.subtitle}
                    </p>
                    <p className="mt-2 text-xs sm:text-sm opacity-90">
                      {banner.description}
                    </p>

                    <div className="mt-4">
                      <a
                        href="/products"
                        className="inline-flex items-center gap-2 rounded-lg bg-white text-gray-900 px-4 py-2 text-sm font-semibold shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/70 transition"
                      >
                        Shop now
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a.75.75 0 0 1 .75-.75h9.69L10.22 6.03a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroBanner;