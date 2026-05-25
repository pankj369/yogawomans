import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ScrollReveal from "./ui/animations/ScrollReveal";
import StaggerGroup from "./ui/animations/StaggerGroup";

const testimonials = [
  {
    name: "Ananya R.",
    text: "I found strength and softness in one place. Every class feels designed for real women and real lives."
  },
  {
    name: "Meera K.",
    text: "YogaWomans helped me reduce stress and reconnect with myself after years of burnout."
  },
  {
    name: "Sara M.",
    text: "The instructors are compassionate, powerful, and deeply inspiring. I finally stay consistent."
  }
];

function Testimonials() {
  return (
    <section id="testimonials" className="bg-lightSage py-16 sm:py-20">
      <div className="section-container px-4 sm:px-6 lg:px-0">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <p className="inline-flex items-center justify-center rounded-full bg-white/80 px-4 py-2 text-sm font-semibold tracking-[0.22em] text-primaryOrange shadow-soft mb-4">
              COMMUNITY VOICES
            </p>
            <h2 className="text-center font-heading text-3xl font-extrabold sm:text-4xl">What Women Are Saying</h2>
            <p className="mt-4 text-sm text-grayText sm:text-base">
              A softer, supportive wellness experience built for real-life transformation.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-10">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            loop={true}
            speed={800}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="py-6"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.name}>
                <article className="mx-auto max-w-xl rounded-[28px] bg-cream-100/95 p-6 shadow-soft transition duration-500 ease-out hover:-translate-y-1 hover:shadow-xl md:p-8">
                  <div className="h-12 w-12 rounded-full bg-primaryBlue/20" aria-hidden="true" />
                  <h3 className="mt-5 font-heading text-lg font-bold text-darkText">{item.name}</h3>
                  <p className="mt-4 min-h-[112px] text-sm leading-7 text-grayText sm:text-base">
                    {item.text}
                  </p>
                  <div className="mt-6 flex items-center gap-1 text-primaryOrange" aria-label="5 star rating">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar key={index} />
                    ))}
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </ScrollReveal>
      </div>
    </section>
  );
}
export default Testimonials;
