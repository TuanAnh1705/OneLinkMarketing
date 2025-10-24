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

// 🔹 Dữ liệu FAQ
const faqData = [
  {
    id: "01",
    question: "How does a brand audit identify growth opportunities?",
    answer:
      "A brand audit analyzes your internal branding, external perception, and customer experience to find gaps and inconsistencies. By fixing these, we uncover opportunities to strengthen your market position and attract more customers.",
  },
  {
    id: "02",
    question: "What's included in your market entry strategy for international markets like the US/UK?",
    answer:
      "Our market entry strategy includes competitor analysis, target audience profiling, cultural nuance adaptation, legal compliance checks, and a phased marketing roadmap to ensure a successful launch.",
  },
  {
    id: "03",
    question: "How does your competitor analysis give my business a competitive edge?",
    answer:
      "We go beyond surface-level analysis to identify your competitors' weaknesses, untapped customer segments, and ineffective marketing tactics. This allows us to position your brand in a unique space where you can win.",
  },
  {
    id: "04",
    question: "How do you ensure the strategy will deliver a positive marketing ROI?",
    answer:
      "Every recommendation in our strategy is tied to specific, measurable KPIs (Key Performance Indicators). We build financial models and forecasts to project potential ROI before you invest heavily in execution.",
  },
  {
    id: "05",
    question: "What's the difference between your strategic consulting and just hiring a marketing manager?",
    answer:
      "A marketing manager executes day-to-day tasks. Our strategic consulting provides a high-level, data-backed roadmap built by a team of specialists (in research, branding, SEO) that a single manager can then execute effectively. We build the 'what' and 'why' so your team can focus on the 'how'.",
  },
]

export default function FaqAccordion() {
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
