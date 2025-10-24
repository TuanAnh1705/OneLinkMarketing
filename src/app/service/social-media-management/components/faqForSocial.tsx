"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// 🔹 Gradient line (mỏng, đều, di chuyển theo layout)
function GradientLine() {
  return (
    <div className="relative w-full">
      <div className="w-full h-[0.5px] bg-gradient-to-r from-[#0074E5] to-[#162660] will-change-transform" />
    </div>
  )
}

// 🔹 Dữ liệu FAQ (ĐÃ CẬP NHẬT)
const faqData = [
  {
    id: "01",
    question: "Which social media platform is most important for my industry?",
    answer:
      "This depends on your target audience. We conduct research to determine where your customers are most active, whether it's visual platforms like Instagram for B2C or professional networks like LinkedIn for B2B.",
  },
  {
    id: "02",
    question: "What does your social media content creation process involve?",
    answer:
      "Our process includes developing content pillars based on your strategy, creating a monthly content calendar, professional copywriting, graphic design/video production, and scheduling for optimal engagement.",
  },
  {
    id: "03",
    question: "How do you measure the ROI of social media management?",
    answer:
      "We measure success through a combination of metrics: engagement rates, follower growth, website traffic from social channels, lead generation, and ultimately, sales attributed to social media efforts.",
  },
  {
    id: "04",
    question: "How do you handle negative comments as part of community management?",
    answer:
      "We establish a clear protocol with you for handling feedback. Our approach is to respond publicly in a professional and empathetic manner when appropriate, and take conversations offline to resolve specific issues privately.",
  },
  {
    id: "05",
    question: "Should I run social media ads alongside organic posting?",
    answer:
      "Yes, we highly recommend it. Organic posting builds your community, while paid ads allow you to reach a much larger, highly targeted audience to accelerate lead generation and sales.",
  },
]

export default function FaqForPaid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggleItem = (index: number) =>
    setOpenIndex(openIndex === index ? null : index)

  return (
    <div className="relative w-full z-20 -top-20">
      <div className="mx-auto max-w-5xl mt-60">
        {/* --- HEADER --- */}
        <div className="relative mb-12">
          <GradientLine />
          <h1 className="archivo-expanded py-12 text-center font-serif text-4xl font-medium tracking-wide text-[#000A1D] md:text-5xl">
            FAQ’s
          </h1>
          <GradientLine />
        </div>

        {/* --- FAQ LIST --- */}
        <div className="divide-y divide-transparent">
          {faqData.map((item, index) => (
            <div key={item.id} className="relative">
              {/* Nút câu hỏi */}
              <button
                onClick={() => toggleItem(index)}
                className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors duration-300 hover:bg-gray-50/50"
              >
                <div className="flex items-center gap-6 pl-6">
                  <span className="archivo-expanded text-lg font-medium text-[#000000] w-12">
                    {item.id}
                  </span>
                  <h3 className="neulis-alt-regular text-xl font-medium text-[#000A1D] md:text-2xl">
                    {item.question}
                  </h3>
                </div>

                {/* 🔹 Dấu cộng / trừ */}
                <motion.div
                  initial={false}
                  className="relative w-6 h-6 flex items-center justify-center text-[#000A1D] pr-6"
                >
                  <motion.span
                    animate={{
                      rotate: openIndex === index ? 90 : 0,
                      opacity: openIndex === index ? 0 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute w-5 h-[2px] bg-[#000A1D]"
                  />
                  <motion.span
                    animate={{
                      rotate: openIndex === index ? 0 : 90,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute w-5 h-[2px] bg-[#000A1D]"
                  />
                </motion.div>
              </button>

              {/* 🔹 Câu trả lời */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.25, 0.8, 0.25, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-24 pr-12">
                      <p className="neulis-alt-regular font-medium leading-relaxed text-xl text-[#444444]">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 🔹 Line chia cách — bỏ ở item cuối cùng */}
              {index < faqData.length - 1 && <GradientLine />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}