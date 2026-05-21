import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import QuestionStep from "./QuestionStep";
import ResultSection from "./ResultSection";

import {
  questionsByCategory,
  generateRecommendations,
} from "../../data/wellnessRecommendationData";

const WellnessModal = ({
  category,
  isOpen,
  onClose,
}) => {

  const [currentStep, setCurrentStep] =
    useState(0);

  const [selectedAnswers, setSelectedAnswers] =
    useState({});

  const [recommendations, setRecommendations] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(false);





  const questions =
    questionsByCategory[category.id] || [];

  const isLastStep =
    currentStep === questions.length - 1;

  const isFirstStep =
    currentStep === 0;






  useEffect(() => {

    if (isOpen) {

      document.body.classList.add(
        "modal-open"
      );

      setCurrentStep(0);

      setSelectedAnswers({});

      setRecommendations(null);

      setIsLoading(false);

    }

    return () => {

      document.body.classList.remove(
        "modal-open"
      );

    };

  }, [isOpen, category]);








  const handleAnswerChange = (
    questionId,
    answer
  ) => {

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));

  };








  const handleNext = () => {

    const currentQuestion =
      questions[currentStep];

    if (
      !selectedAnswers[currentQuestion.id]
    ) {
      return;
    }

    if (isLastStep) {

      handleSubmit();

    } else {

      setCurrentStep((prev) =>
        prev + 1
      );

    }

  };








  const handlePrevious = () => {

    if (currentStep > 0) {

      setCurrentStep((prev) =>
        prev - 1
      );

    }

  };








  const handleSubmit = async () => {

    setIsLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    const generatedRecommendations =
      generateRecommendations(
        category.id,
        selectedAnswers
      );

    setRecommendations(
      generatedRecommendations
    );

    setIsLoading(false);

  };








  const handleClose = () => {

    setCurrentStep(0);

    setSelectedAnswers({});

    setRecommendations(null);

    document.body.classList.remove(
      "modal-open"
    );

    onClose();

  };








  const canProceed =
    selectedAnswers[
      questions[currentStep]?.id
    ];








  return (

    <AnimatePresence>

      {isOpen && (

        <motion.div

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          exit={{
            opacity: 0,
          }}

          className="
          fixed
          inset-0
          z-[999]

          overflow-y-auto

          bg-black/40

          backdrop-blur-md
          "

          onClick={handleClose}
        >






          {/* CENTER WRAPPER */}
          <div
            className="
            flex
            min-h-full

            items-center
            justify-center

            p-3
            sm:p-5
            "
          >







            {/* MODAL */}
            <motion.div

              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}

              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}

              transition={{
                duration: 0.28,
              }}

              onClick={(e) =>
                e.stopPropagation()
              }

              className="
              relative

              flex
              h-[92vh]
              w-full
              max-w-3xl

              flex-col

              overflow-hidden

              rounded-[36px]

              border
              border-[#ece3d7]

              bg-[#fffdf9]

              shadow-[0_30px_90px_rgba(0,0,0,0.08)]
              "
            >







              {/* GLOW */}
              <div
                className="
                absolute
                inset-0

                bg-[radial-gradient(circle_at_top_left,rgba(241,223,198,0.28),transparent_45%)]

                opacity-90
                "
              />








              {/* LEAF */}
              <div
                className="
                pointer-events-none

                absolute
                bottom-[-30px]
                right-[-10px]

                text-[220px]

                opacity-[0.03]
                "
              >

                🌿

              </div>








              {/* MAIN */}
              <div
                className="
                relative
                z-10

                flex
                h-full
                w-full
                flex-col
                "
              >







                  {/* HEADER */}
                  <div
                    className="
                    border-b
                    border-[#efe5d8]

                    px-5
                    py-5

                    sm:px-7
                    "
                  >

                    <div className="flex items-start justify-between gap-4">

                      {/* LEFT */}
                      <div className="flex items-start gap-4">

                        {/* ICON */}
                        <div
                          className="
                          flex
                          h-[72px]
                          w-[72px]

                          items-center
                          justify-center

                          rounded-[24px]

                          border
                          border-[#f1e7d9]

                          bg-[#fffdfa]

                          text-4xl

                          shadow-[0_8px_25px_rgba(220,190,150,0.12)]
                          "
                        >

                          {category.icon}

                        </div>








                        {/* TEXT */}
                        <div>

                          {/* TAG */}
                          <div
                            className="
                            mb-3

                            inline-flex

                            rounded-full

                            bg-[#edf3e7]

                            px-4
                            py-1.5

                            text-[11px]
                            font-medium

                            uppercase

                            tracking-[0.18em]

                            text-[#5f7a51]
                            "
                          >

                            Personalized Healing

                          </div>








                          {/* TITLE */}
                          <h2
                            className="
                            font-serif

                            text-[34px]
                            font-bold

                            leading-none

                            tracking-[-0.03em]

                            text-[#11281d]
                            "
                          >

                            {category.label}

                          </h2>








                          {/* DESC */}
                          <p
                            className="
                            mt-3

                            max-w-[500px]

                            text-[15px]

                            leading-relaxed

                            text-[#667267]
                            "
                          >

                            {category.description}

                          </p>

                        </div>

                      </div>








                      {/* CLOSE */}
                      <button

                        onClick={handleClose}

                        className="
                        flex
                        h-[52px]
                        w-[52px]

                        items-center
                        justify-center

                        rounded-full

                        border
                        border-[#ece3d7]

                        bg-white/80

                        text-2xl

                        text-[#7b7b7b]

                        transition-all
                        duration-300

                        hover:bg-[#f7f2ea]
                        hover:text-[#111]
                        "
                      >

                        ✕

                      </button>

                    </div>

                  </div>









                  {/* CONTENT */}
                  <div
                    className="
                    flex-1

                    overflow-y-scroll

                    overscroll-contain

                    px-5
                    py-6

                    sm:px-7

                    custom-scrollbar
                    "
                  >

                    <AnimatePresence mode="wait">

                      {recommendations === null ? (

                        <motion.div

                          key="questions"

                          initial={{
                            opacity: 0,
                            y: 10,
                          }}

                          animate={{
                            opacity: 1,
                            y: 0,
                          }}

                          exit={{
                            opacity: 0,
                            y: -10,
                          }}
                        >

                          <QuestionStep

                            question={
                              questions[currentStep]
                            }

                            selectedAnswers={
                              selectedAnswers
                            }

                            onAnswerChange={
                              handleAnswerChange
                            }

                            isActive={true}

                            stepNumber={
                              currentStep + 1
                            }

                            totalSteps={
                              questions.length
                            }
                          />

                        </motion.div>

                      ) : isLoading ? (

                        <motion.div

                          key="loading"

                          initial={{
                            opacity: 0,
                          }}

                          animate={{
                            opacity: 1,
                          }}

                          className="
                          flex
                          min-h-[400px]

                          flex-col
                          items-center
                          justify-center
                          "
                        >

                          {/* LOADER */}
                          <motion.div

                            animate={{
                              rotate: 360,
                            }}

                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}

                            className="
                            mb-8

                            h-[70px]
                            w-[70px]

                            rounded-full

                            border-[5px]
                            border-[#efe4d7]

                            border-t-[#d4a25f]
                            "
                          />








                          <h3
                            className="
                            font-serif

                            text-[34px]
                            font-bold

                            text-[#11281d]
                            "
                          >

                            Creating Your Journey...

                          </h3>








                          <p
                            className="
                            mt-3

                            max-w-[500px]

                            text-center

                            text-[15px]
                            leading-relaxed

                            text-[#667267]
                            "
                          >

                            We are preparing a calming,
                            personalized wellness plan
                            designed for your emotional,
                            physical, and spiritual balance.

                          </p>

                        </motion.div>

                      ) : (

                        <motion.div

                          key="results"

                          initial={{
                            opacity: 0,
                            y: 10,
                          }}

                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                        >

                          <ResultSection

                            recommendations={
                              recommendations
                            }

                            category={category}

                            answers={
                              selectedAnswers
                            }
                          />

                        </motion.div>

                      )}

                    </AnimatePresence>

                  </div>









                  {/* FOOTER */}
                  {recommendations === null && (

                    <div
                      className="
                      border-t
                      border-[#efe5d8]

                      bg-[#fffdfa]

                      px-5
                      py-5

                      sm:px-7
                      "
                    >

                      <div className="flex items-center gap-4">

                        {/* PREVIOUS */}
                        <button

                          onClick={handlePrevious}

                          disabled={isFirstStep}

                          className={`
                          rounded-full

                          px-6
                          py-3

                          text-sm
                          font-medium

                          transition-all
                          duration-300

                          ${
                            isFirstStep
                              ? "cursor-not-allowed text-[#bdbdbd]"
                              : "border border-[#e9dfd2] bg-white text-[#11281d] hover:bg-[#f8f4ee]"
                          }
                          `}
                        >

                          ← Previous

                        </button>








                        {/* STEP */}
                        <div
                          className="
                          rounded-full

                          border
                          border-[#efe4d7]

                          bg-[#f8f4ee]

                          px-5
                          py-3

                          text-sm
                          font-semibold

                          text-[#8b6a43]
                          "
                        >

                          {currentStep + 1} /{" "}
                          {questions.length}

                        </div>








                        <div className="flex-1" />








                        {/* NEXT */}
                        <button

                          onClick={handleNext}

                          disabled={!canProceed}

                          className={`
                          rounded-full

                          px-8
                          py-3

                          text-sm
                          font-medium

                          transition-all
                          duration-300

                          ${
                            canProceed
                              ? "bg-[#11281d] text-white hover:opacity-90"
                              : "cursor-not-allowed bg-[#d9d9d9] text-white"
                          }
                          `}
                        >

                          {isLastStep
                            ? "Generate Journey →"
                            : "Continue Journey →"}

                        </button>

                      </div>

                    </div>

                  )}

              </div>

            </motion.div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>

  );

};

export default WellnessModal;