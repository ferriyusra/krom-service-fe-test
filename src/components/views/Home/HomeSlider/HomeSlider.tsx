import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Button } from "@heroui/react";
import Image from "next/image";

const slides = [
  {
    title: (
      <>
        Find Your <span className="text-teal-600">Dream Job</span> <br />
        Join <span className="text-teal-600">2.5K+</span> Professionals Today
      </>
    ),
    cta: 'Explore Jobs',
    bg: 'https://res.cloudinary.com/dy3gbrxvy/image/upload/v1744862579/bg-banner1_qojd41.png',
  },
  {
    title: (
      <>
        <span className="text-teal-600">Apply</span> to Opportunities <br />
        From <span className="text-teal-600">Anywhere</span> with Ease
      </>
    ),
    cta: 'Get Started',
    bg: 'https://res.cloudinary.com/dy3gbrxvy/image/upload/v1744862576/bg-banner2_qjh1m9.png',
  },
  {
    title: (
      <>
        Grow Your <span className="text-teal-600">Career,</span> <br />
        Get <span className="text-teal-600">Noticed & Hired</span> Faster
      </>
    ),
    cta: 'Join Now',
    bg: 'https://res.cloudinary.com/dy3gbrxvy/image/upload/v1744862575/bg-banner3_r47kw3.png',
  },
];

const HomeSlider = () => {
  return (
    <header className="relative w-full h-[724px] -mb-[54px] z-0">
      <div className="absolute inset-0">
        <Swiper className="h-full w-full">
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative flex flex-col h-full w-full">
                {/* Hero Text */}
                <div className="flex flex-col items-center text-center gap-4 max-w-[90%] sm:max-w-[555px] mx-auto mt-10 z-10">
                  <h1 className="font-extrabold text-[28px] sm:text-[40px] leading-tight sm:leading-[60px]">
                    {slide.title}
                  </h1>
                  <p className="leading-[28px] text-sm sm:text-base">
                    Join and grow with Career <br />
                    contribute to digital bank indonesia
                  </p>
                  <Button
                    className="inline-flex items-center justify-center gap-2 rounded-full py-3 px-6 bg-teal-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_8px_20px_0_#14b8a680]"
                  >
                    {slide.cta}
                  </Button>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_23.23%,rgba(255,255,255,0)_52.64%)] -z-10" />

                {/* Background Image */}
                <div className="absolute inset-0 -z-20">
                  <Image
                    src={slide.bg}
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </header>
  )
}

export default HomeSlider;