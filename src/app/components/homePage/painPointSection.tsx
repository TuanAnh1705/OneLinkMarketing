"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image" // Import Image

const timelineItems = [
    {
        title: "Fragmented Marketing",
        description:
            "Working with multiple agencies leads to inconsistent \n messaging and a lack of control.",
        image: "/assets/mockup1.png",
    },
    {
        title: "High Costs, Low ROI",
        description:
            "You invest heavily, but campaigns lack synergy, \n resulting in an uncertain return on investment.",
        image: "/assets/mockup1.png",
    },
    {
        title: "Weak Brand Identity",
        description:
            "Your brand's message is unclear, and your website \n fails to generate real leads or conversions.",
        image: "/assets/mockup1.png",
    },
    {
        title: "Struggling to Scale Globally",
        description:
            "Lack of a cohesive strategy makes it difficult to \n compete and expand into international markets.",
        image: "/assets/mockup1.png",
    },
]

export default function Page() {
    // 🚀 FIX 1: Thay đổi state mặc định từ 'null' thành '0'
    const [hoveredIndex, setHoveredIndex] = useState<number>(0)

    return (
        // FIX: Thêm padding chung cho mobile
        <main className="min-h-screen px-4 py-12 md:px-8 lg:px-0 lg:py-0">
            <div className="mx-auto max-w-screen-2xl">
                {/* Title Section */}
                <div className="mb-12 lg:mb-20">
                    {/* FIX: Responsive font size và bỏ translate-x trên mobile */}
                    <h1 className="archivo-expanded mb-4 text-4xl md:text-6xl lg:text-7xl font-bold text-[#000A1D] lg:translate-x-36">
                        Are you struggling with <br /> these pain points?
                    </h1>
                </div>

                {/* Content Section */}
                {/* FIX: flex-col trên mobile, lg:flex-row trên desktop */}
                <div className="relative w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    
                    {/* Left Side - Image */}
                    {/* FIX: order-2 (hiển thị sau) trên mobile, lg:order-1 (hiện thị trước) trên desktop */}
                    {/* FIX: w-full trên mobile, lg:w-[450px] trên desktop */}
                    <div className="relative w-full max-w-md lg:max-w-none lg:w-[450px] flex items-center justify-center shrink-0 order-2 lg:order-1">
                        {/* FIX: h-[400px] trên mobile, lg:h-[550px] trên desktop, bỏ translate */}
                        <div className="relative h-[400px] sm:h-[450px] lg:h-[550px] w-full lg:-translate-x-4 lg:translate-y-5">
                            {timelineItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] origin-bottom transform-gpu",
                                        
                                        // 🚀 FIX 2: Đơn giản hóa logic.
                                        // Chỉ cần so sánh 'hoveredIndex === index'.
                                        // Vì 'hoveredIndex' giờ là số (mặc định là 0),
                                        // nó sẽ tự động hiển thị ảnh đầu tiên khi tải trang.
                                        hoveredIndex === index
                                            ? "opacity-100 scale-100 rotate-[18deg] translate-y-0"
                                            : "opacity-0 scale-95 rotate-0 translate-y-6 blur-[2px]"
                                    )}
                                >
                                    {/* Sửa: Dùng <Image> của Next.js nếu ảnh trong /public */}
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill // Dùng fill để lấp đầy div cha
                                        className="object-contain drop-shadow-2xl"
                                        priority={index === 0} // Ưu tiên tải ảnh đầu tiên
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Text List */}
                    {/* FIX: order-1 (hiển thị trước) trên mobile, lg:order-2 (hiển thị sau) trên desktop */}
                    {/* FIX: Bỏ pl-32 và translate-y trên mobile */}
                    <div className="w-full flex-1 flex flex-col justify-center lg:pl-32 lg:translate-y-16 relative order-1 lg:order-2">
                        <div className="relative">
                            {/* Line đầu */}
                            <div className="h-px bg-gradient-to-r from-[#0074E5] to-[#162660]" />

                            {timelineItems.map((item, index) => (
                                <div key={index} className="relative">
                                    <div
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        // 🚀 FIX 3: Xóa 'onMouseLeave'
                                        // onMouseLeave={() => setHoveredIndex(null)} // <--- XÓA DÒNG NÀY
                                        
                                        // Thêm onClick để mobile có thể "chạm" và giữ trạng thái
                                        onClick={() => setHoveredIndex(index)} 
                                        className={cn(
                                            "relative py-8 px-3 cursor-pointer group transition-all duration-300",
                                            hoveredIndex === index
                                                ? "bg-[#162660] z-10"
                                                : "bg-transparent"
                                        )}
                                    >
                                        {/* Title - Description */}
                                        {/* FIX: flex-col trên mobile, lg:flex-row trên desktop */}
                                        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                                            {/* Title */}
                                            <h3
                                                className={cn(
                                                    "archivo-expanded font-medium text-xl lg:text-2xl lg:whitespace-nowrap transition-all duration-300 transform",
                                                    hoveredIndex === index
                                                        ? "text-white lg:translate-x-3"
                                                        : "bg-gradient-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent translate-x-0"
                                                )}
                                            >
                                                {item.title}
                                            </h3>

                                            {/* Description */}
                                            {/* FIX: w-full trên mobile, lg:w-[520px] trên desktop, bỏ translate-x */}
                                            <p
                                                className={cn(
                                                    "neulis-alt-extralight font-semibold text-base leading-relaxed transition-all duration-300 w-full lg:w-[520px] lg:translate-x-8 whitespace-pre-line text-left",
                                                    hoveredIndex === index
                                                        ? "text-white"
                                                        : "text-[#444444]"
                                                )}
                                            >
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Line giữa */}
                                    {index < timelineItems.length - 1 && (
                                        <div
                                            className={cn(
                                                "h-px transition-all duration-300",
                                                hoveredIndex === index ||
                                                    hoveredIndex === index + 1
                                                    ? "bg-[#162660]"
                                                    : "bg-gradient-to-r from-[#0074E5] to-[#162660]"
                                            )}
                                        />
                                    )}
                                </div>
                            ))}

                            {/* Line cuối */}
                            <div className="h-px bg-gradient-to-r from-[#0074E5] to-[#162660]" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}