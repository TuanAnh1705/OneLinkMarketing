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
    question: "What is the next step after submitting the form?",
    answer:
      "Our team will review your inquiry and schedule a free consultation call to discuss your needs in detail.",
  },
  {
    id: "02",
    question: "How quickly can I expect a response?",
    answer:
      "Our team monitors inquiries constantly, so you’ll typically hear back from us within a few hours during business days. We aim to get your questions answered so we can get your project moving.",
  },
  {
    id: "03",
    question: "Is the initial consultation really free?",
    answer:
      "We offer it at no cost so you can clearly understand our approach, discuss your needs, and evaluate whether we’re the right partner without any obligation.",
  },
  {
    id: "04",
    question: "Do you have a physical office I can visit?",
    answer:
      "\"We are everywhere you need us to be.\" Yes, we have a physical HQ in Danang, Vietnam and welcome your visit! However, we know you're busy, so we are also fully equipped for high-efficiency remote meetings via Zoom or Google Meet. Your choice.",
  },
  {
    id: "05",
    question: "What information should I prepare for the consultation?",
    answer:
      "\"Just bring your goals and your challenges.\" You don't need a perfect plan, that's exactly what we are here to build. If you have access to past campaign data or Google Analytics, that’s a great bonus, but your vision for where you want to take the business is the only requirement.",
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggleItem = (index: number) =>
    setOpenIndex(openIndex === index ? null : index)

  return (
    <div className="relative w-full z-20 mb-40">
      <div className="mx-auto max-w-5xl mt-40 mb-60 md:mb-0">
        {/* --- HEADER --- */}
        <div className="relative mb-12">
          <GradientLine />
          <h1 className="archivo-expanded py-12 text-center font-serif text-4xl font-medium tracking-wide text-[#000A1D] md:text-5xl">
            Frequently Asked Questions
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
                className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors duration-300 hover:bg-white/0"
              >
                <div className="flex items-center gap-6 pl-6">
                  <span className="archivo-expanded text-lg font-medium text-[#000000] min-w-[48px] text-left">
                    {item.id}
                  </span>
                  <h3 className="generalsans-regular text-xl font-medium text-[#000A1D] md:text-2xl">
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
                      <p className="generalsans-regular text-xl leading-relaxed text-[#444444]">
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
