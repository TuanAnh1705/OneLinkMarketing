"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ServiceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textGroupRef = useRef<HTMLDivElement>(null)
  const blackLinesRef = useRef<HTMLDivElement[]>([])
  const gradientLinesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      let scrollVelocity = 0
      let lastScrollY = 0
      let velocityCheckInterval: NodeJS.Timeout

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3500",
          scrub: 1.2,
          pin: true,
          onUpdate: (self) => {
            const currentScrollY = self.scroll()
            scrollVelocity = Math.abs(currentScrollY - lastScrollY)
            lastScrollY = currentScrollY
          },
        },
      })

      blackLinesRef.current.forEach((line, i) => {
        // Fast scroll: all lines animate simultaneously with staggered durations
        // Slow scroll: sequential animation with delays
        const baseDuration = 1.4
        const speedMultiplier = i * 0.3 // Line 1: 1.4s, Line 2: 1.7s, Line 3: 2.0s

        tl.to(
          [line, gradientLinesRef.current[i]],
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.inOut",
            duration: baseDuration + speedMultiplier,
          },
          i === 0 ? "+=0.2" : `<${i * 0.15}`, // Overlap animations for fast scroll effect
        )
      })

      tl.to(
        textGroupRef.current,
        {
          scale: 28,
          yPercent: -15,
          opacity: 0,
          transformOrigin: "center center",
          ease: "expo.out",
          duration: 3,
        },
        "+=0.5",
      )

      tl.to(
        containerRef.current,
        {
          backgroundColor: "#000A1D",
          duration: 2.8,
          ease: "power2.inOut",
        },
        "<",
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const services = [
    {
      id: "001",
      title: "Strategy \n Consulting",
      desc: "Laying the strategic \n foundation with brand \n audits and market research.",
    },
    {
      id: "002",
      title: "Digital Asset \n Development",
      desc: "Building your core brand \n identity and creating SEO/ \n UX-optimized websites.",
    },
    {
      id: "003",
      title: "SEO \n Services",
      desc: "Driving organic traffic and \n sustainable growth with \n on-page and off-page SEO.",
    },
    {
      id: "004",
      title: "Paid Media \n & Advertising",
      desc: "Optimizing multi-channel ad \n campaigns for maximum ROI \n and lead generation.",
    },
    {
      id: "005",
      title: "Social Media \n Management",
      desc: "Building and engaging your \n community with consistent \n and high-quality content.",
    },
  ]

  return (
    <>
      {/* SECTION 1 */}
      <section
        ref={containerRef}
        className="relative flex justify-center items-center overflow-hidden h-screen bg-white"
      >
        <div
          ref={textGroupRef}
          className="fixed top-[30%] z-10 flex flex-col justify-center items-center text-center leading-tight pointer-events-none archivo-expanded font-medium text-[clamp(36px,7vw,90px)]"
        >
          {/* LAYER 1: Xám nền */}
          <div className="text-gray-300">
            <div>Comprehensive Services:</div>
            <div>
              From <span>Strategy</span> to
            </div>
            <div>
              <span>Performance Growth</span>
            </div>
          </div>

          {/* LAYER 2: Chữ đen */}
          <div className="absolute text-black">
            {["Comprehensive Services:", "From Strategy to", "Performance Growth"].map((text, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) blackLinesRef.current[i] = el
                }}
                style={{ clipPath: "inset(0% 100% 0% 0%)" }}
              >
                {text}
              </div>
            ))}
          </div>

          {/* LAYER 3: Gradient không viền đen */}
          <div className="absolute text-transparent">
            {[
              { text: "Comprehensive Services:", key: "layer1" },
              {
                text: (
                  <>
                    <span className="bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent">
                      From Strategy
                    </span>{" "}
                    to
                  </>
                ),
                key: "layer2",
              },
              {
                text: (
                  <span className="bg-gradient-to-r from-[#162660] to-[#0074E5] bg-clip-text text-transparent">
                    Performance Growth
                  </span>
                ),
                key: "layer3",
              },
            ].map((item, i) => (
              <div
                key={item.key}
                ref={(el) => {
                  if (el) gradientLinesRef.current[i] = el
                }}
                style={{
                  clipPath: "inset(0% 100% 0% 0%)",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  textShadow: "none",
                  filter: "none",
                  mixBlendMode: "normal",
                  WebkitTextStroke: "0px transparent",
                }}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="relative -translate-y-[5vh] text-white bg-[#000A1D] z-40">
        <div className="flex flex-col w-full relative overflow-visible">
          {/* LINE ĐẦU */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#002B6D] via-[#162660] to-[#0074E5] opacity-90 shadow-[0_0_12px_rgba(0,116,229,0.5)] z-50" />
          {services.map((item, index) => (
            <div key={item.id} className="relative w-full flex justify-center items-center overflow-visible group">
              {/* NỀN DƯỚI */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#002B6D] via-[#162660] to-[#0074E5]" />
              {/* NỘI DUNG */}
              <div className="relative z-10 bg-[#000A1D] transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] flex items-start gap-10 py-20 w-full group-hover:rounded-l-[110px] group-hover:rounded-r-[110px]">
                <div className="absolute left-1 top-20 -translate-y-1/2 text-xl text-white transition-transform duration-500 group-hover:translate-x-20 neulis-alt-extralight">
                  {item.id}
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-10 pl-[10rem] pr-20 w-full">
                  <h2 className="text-7xl text-white leading-[1.15] whitespace-pre-line flex-1 translate-x-16 neulis-alt-extralight font-bold">
                    {item.title}
                  </h2>
                  <p className="flex-1 max-w-xl text-xl leading-relaxed whitespace-pre-line translate-x-80 translate-y-6 neulis-alt-extralight">
                    {item.desc}
                  </p>
                </div>
              </div>
              {/* LINE NGĂN */}
              {index !== services.length - 1 && (
                <div className="absolute -bottom-[1.5px] left-0 w-full h-[2px] bg-gradient-to-r from-[#002B6D] via-[#162660] to-[#0074E5] opacity-90 shadow-[0_0_12px_rgba(0,116,229,0.5)] z-50" />
              )}
            </div>
          ))}
          {/* LINE DƯỚI */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#002B6D] via-[#162660] to-[#0074E5] opacity-90 shadow-[0_0_12px_rgba(0,116,229,0.5)] z-50" />
        </div>
      </section>
    </>
  )
}
