import { motion } from "framer-motion";

const WellnessCard = ({ category, onClick }) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      onClick={onClick}
      className="
        group
        relative
        cursor-pointer
        overflow-hidden

        rounded-[32px]

        border
        border-[#eee5d8]

        bg-[#fffdf9]

        p-3
        sm:p-4

        shadow-[0_10px_30px_rgba(0,0,0,0.05)]

        transition-all
        duration-300

        hover:shadow-[0_20px_45px_rgba(180,140,90,0.10)]
      "
    >
      {/* SOFT BACKGROUND */}
      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_top_left,rgba(241,223,198,0.25),transparent_42%)]

          opacity-90
        "
      />

      {/* LEAF DESIGN */}
      <div
        className="
          pointer-events-none

          absolute
          bottom-[-10px]
          right-[-5px]

          text-[95px]

          opacity-[0.04]
        "
      >
        🌿
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        {/* TOP */}
        <div className="flex items-start justify-between gap-3">
          {/* ICON BOX */}
          <div
            className="
              relative

              flex
              h-[72px]
              w-[72px]

              items-center
              justify-center

              rounded-[26px]

              border
              border-[#f1e7d9]

              bg-[#fffdfa]

              shadow-[0_8px_25px_rgba(220,190,150,0.12)]

              sm:h-[78px]
              sm:w-[78px]
            "
          >
            {/* RING */}
            <div
              className="
                absolute
                inset-[-12px]

                rounded-full

                border
                border-[#f4eadf]

                opacity-70
              "
            />

            <div
              className="
                absolute
                inset-[-24px]

                rounded-full

                border
                border-[#f7efe6]

                opacity-40
              "
            />

            {/* ICON */}
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="
                text-3xl
                sm:text-4xl
              "
            >
              {category.icon}
            </motion.div>
          </div>

          {/* TAG */}
          <div
            className="
              rounded-full

              bg-[#edf3e7]

              px-3
              py-1.5

              text-[11px]
              font-medium

              text-[#5f7a51]

              sm:text-xs
            "
          >
            Wellness
          </div>
        </div>

        {/* TITLE */}
        <h3
          className="
            mt-7

            min-h-[48px]

            font-serif

            text-[22px]
            font-bold

            leading-[1.1]

            tracking-[-0.03em]

            text-[#11281d]

            sm:text-[26px]
            lg:text-[30px]
          "
        >
          {category.label}
        </h3>

        {/* LINE */}
        <div
          className="
            mt-4

            h-[4px]
            w-[70px]

            rounded-full

            bg-[#eeaa28]
          "
        />

        {/* DESCRIPTION */}
        <p
          className="
            mt-3

            max-w-[220px]

            text-[14px]
            leading-[1.8]

            text-[#677267]

            sm:text-[15px]
          "
        >
          {category.description}
        </p>

        {/* FOOTER */}
        <div
          className="
            mt-5

            flex
            items-center
            justify-between
            gap-4
          "
        >
          {/* CTA */}
          <div
            className="
              text-[11px]
              font-medium

              uppercase

              tracking-[0.25em]

              text-[#a16f44]

              sm:text-[12px]
            "
          >
            Begin Journey
          </div>

          {/* BUTTON */}
          <motion.div
            whileHover={{
              x: 3,
            }}
            className="
              flex
              h-[54px]
              w-[54px]

              items-center
              justify-center

              rounded-full

              border
              border-[#efe4d7]

              bg-[#fffdfa]

              text-[24px]

              text-[#9a7248]

              shadow-[0_8px_20px_rgba(0,0,0,0.04)]
            "
          >
            →
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WellnessCard;