"use client"

import { motion } from "framer-motion"
import Image from "next/image"

// ============================================================================
// 🔹 Định nghĩa Type và Dữ liệu (Không đổi)
// ============================================================================
interface PostItem {
    src: string
    title: string
    author: string
    year: string
}

const relatedPostsData: PostItem[] = [
    {
        src: "/assets/steel.jpg", // Thay bằng đường dẫn ảnh thật của bạn
        title: "What a Full-Service Marketing Agency Can Do for Your Brand ©",
        author: "Olma",
        year: "2025",
    },
    {
        src: "/assets/tag.png", // Thay bằng đường dẫn ảnh thật của bạn
        title: "Various ideas and creative concepts based on market research ©",
        author: "Olma",
        year: "2025",
    },
    {
        src: "/assets/steel.jpg", // Thay bằng đường dẫn ảnh thật của bạn
        title: "Understanding the Full Spectrum of Services Provided by Digital Agencies",
        author: "Olma",
        year: "2025",
    },
]

// ============================================================================
// 🔹 Component RelatedPosts chính
// ============================================================================
export function RelatedPosts() {
    return (
        <section className="bg-white pt-20 pb-32 px-8 md:px-16 lg:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Dòng kẻ ngang - ĐÃ LÀM DÀI HƠN */}
                <div className="w-[1250px]  h-[1px] bg-gradient-to-r from-[#0074E5] to-[#162660] mx-auto mb-6"></div>

                <h2 className="archivo-expanded text-4xl md:text-5xl font-medium text-center text-[#000A1D] mb-16">Related Posts</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedPostsData.map((item, index) => (
                        <PostCard
                            key={index}
                            item={item}
                            index={index}
                            totalItems={relatedPostsData.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

// ============================================================================
// 🔹 Component PostCard con (ĐÃ CẬP NHẬT HIỆU ỨNG HOVER)
// ============================================================================
function PostCard({ item, index, totalItems }: { item: PostItem; index: number; totalItems: number }) {
    return (
        <motion.div
            className="relative text-left cursor-pointer group"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
                duration: 1.2,
                ease: [0.25, 1, 0.3, 1],
                delay: index * 0.2,
            }}
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Đường line ngăn cách dọc */}
            {index < totalItems - 1 && (
                <div className="absolute top-0 -right-4 w-[1px] h-full bg-gradient-to-b from-[#0074E5] to-[#162660] hidden md:block" />
            )}

            {/* Khung ảnh - có overflow-hidden để cắt ảnh khi scale */}
            <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-[#E9E9E9]">
                {/* motion.div bao quanh Image để áp dụng hiệu ứng */}
                <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {/* THÊM LẠI THẺ IMAGE ĐỂ HIỆU ỨNG HOẠT ĐỘNG */}
                    <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover object-center"
                    />
                </motion.div>
            </div>

            {/* Tiêu đề bài viết */}
            <h3 className="archivo-expanded mt-6 font-medium text-lg text-[#2d2d2d] leading-tight duration-300">
                {item.title}
            </h3>

            {/* Thông tin tác giả */}
            <p className="neulis-alt-regular mt-2 text-sm font-medium text-[#666666]">
                By {item.author} - {item.year}
            </p>
        </motion.div>
    )
}