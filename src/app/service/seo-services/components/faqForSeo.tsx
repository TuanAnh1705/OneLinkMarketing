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
    question: "How long does it really take to see significant SEO results?",
    answer:
      "While you may see initial movement in 3-6 months, significant results like a substantial increase in organic traffic and leads typically take 6-12 months. SEO is a long-term investment in sustainable growth.",
  },
  {
    id: "02",
    question: "Why can't you guarantee a #1 ranking on Google?",
    answer:
      "No reputable agency can guarantee rankings because Google's algorithm is complex and constantly changing. We guarantee a transparent process using proven, best-practice strategies to achieve the highest possible rankings for you.",
  },
  {
    id: "03",
    question: "What's more important for my business: on-page or off-page SEO?",
    answer:
      "Both are critical and work together. On-page SEO is the foundation (your house), while off-page SEO builds authority and trust (your reputation in the neighborhood). You need both to succeed.",
  },
  {
    id: "04",
    question: "Do you specialize in Local SEO for businesses serving specific areas?",
    answer:
      "Yes, Local SEO is one of our core strengths. We help businesses optimize their Google Business Profile, build local citations, and create locally-relevant content to dominate search results in their service area.",
  },
  {
    id: "05",
    question: "How do you adapt my SEO strategy when Google algorithm updates happen?",
    answer:
      "Our team constantly monitors algorithm updates. Since our strategy is built on creating quality content and a great user experience—what Google wants—we are often well-positioned for updates. We then make proactive adjustments as needed.",
  },
]

export default function FaqForSeo() {
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