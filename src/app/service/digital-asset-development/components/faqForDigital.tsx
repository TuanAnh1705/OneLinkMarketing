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
    question: "What makes a website truly SEO-optimized from the start?",
    answer:
      "It involves a fast-loading infrastructure, clean code, mobile-first design, logical site structure, and foundational on-page elements like meta tags and schema markup, all built around target keywords.",
  },
  {
    id: "02",
    question: "How does an improved user experience (UX) lead to more customers?",
    answer:
      "A great UX makes it easy and enjoyable for visitors to find what they need and take action. This reduces bounce rates, builds trust, and directly increases the likelihood of a visitor becoming a lead or customer.",
  },
  {
    id: "03",
    question: "What is your process for conversion rate optimization (CRO) on a new website?",
    answer:
      "Our CRO process involves placing clear calls-to-action (CTAs), designing intuitive navigation, ensuring fast page speeds, and creating compelling copy, all based on proven principles of user psychology.",
  },
  {
    id: "04",
    question: "What does your website redesign process look like from start to finish?",
    answer:
      "Our process includes discovery & strategy, wireframing & UX design, visual design & branding, development & SEO implementation, content migration, and finally, testing & launch, with your feedback incorporated at each stage.",
  },
  {
    id: "05",
    question: "Can you integrate the website with my existing tools like a CRM or email platform?",
    answer:
      "Yes, we specialize in seamless integrations. We can connect your website to CRMs (like HubSpot, Salesforce), email marketing tools (like Mailchimp), analytics platforms, and other essential business software.",
  },
]

export default function FaqForDigital() {
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