import wellbeingImg from "../assests/images/yogabenefit1.png";
import flexibilityImg from "../assests/images/yogabenefit2.png";
import stressImg from "../assests/images/yogabenefit3.png";

import { FaHeart, FaLeaf, FaSpa } from "react-icons/fa";

const cards = [
  {
    icon: FaHeart,
    title: "Enhance Well-being",
   
    image: wellbeingImg,
  },

  {
    icon: FaLeaf,
    title: "Improve Flexibility",
    
    image: flexibilityImg,
  },

  {
    icon: FaSpa,
    title: "Reduce Stress",
    
    image: stressImg,
  },
];

function Slider() {
  return (
    <section
      id="discover"
      className="bg-lightSage py-14 sm:py-16"
    >
      <div className="section-container">

        {/* Heading */}
        <h2
          className="
            text-center
            font-heading
            text-3xl
            font-extrabold
            text-darkText
            sm:text-4xl
          "
        >
          Your Yoga Benefits
        </h2>

        {/* Paragraph */}
        <p
          className="
            mx-auto
            mt-3
            max-w-2xl
            text-center
            text-sm
            leading-7
            text-grayText
            sm:text-base
          "
        >
          Auto-flowing wellness highlights crafted for women
          balancing strength and serenity.
        </p>

        {/* Cards */}
        <div
          className="
            mt-10
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {cards.map((card) => (
            <article
              key={card.title}
              className="
                overflow-hidden
                rounded-[24px]
                bg-white
                shadow-soft
                transition
                duration-500
                hover:-translate-y-2
              "
            >

              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="
                    h-44
                    w-full
                    object-cover
                    transition
                    duration-700
                    hover:scale-110
                  "
                />
              </div>

              {/* Content */}
              <div className="p-5">

                {/* Icon */}
                <card.icon
                  className="
                    text-2xl
                    text-primaryBlue
                  "
                  aria-hidden="true"
                />

                {/* Title */}
                <h3
                  className="
                    mt-3
                    font-heading
                    text-xl
                    font-bold
                    text-darkText
                  "
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-grayText
                  "
                >
                  {card.desc}
                </p>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Slider;