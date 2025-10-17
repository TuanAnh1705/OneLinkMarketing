"use client"

import { motion } from "framer-motion"
import type { ComponentProps } from "react"

// --- Reusable Form Field Component ---
// Component con để tái sử dụng cho các ô input (Name, Email, Message)
interface FormFieldProps {
    placeholder: string
    name: string
    type?: string
    isTextarea?: boolean
}

function FormField({ placeholder, name, type = "text", isTextarea = false }: FormFieldProps) {
    // Các class chung cho cả input và textarea để dễ quản lý
    const commonClasses =
        "w-full bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-gray-500 text-slate-800 py-2"

    return (
        <div className="relative w-full">
            {isTextarea ? (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    rows={1} // Tăng số dòng cho ô message
                    className={commonClasses}
                />
            ) : (
                <input type={type} name={name} placeholder={placeholder} className={commonClasses} />
            )}
            {/* Gradient line với độ dày 0.5px */}
            <div className="h-[0.5px] w-full bg-gradient-to-r from-[#0074E5] to-[#162660]" />
        </div>
    )
}

// --- Main Reply Form Component ---
export function ReplyForm() {
    return (
        <section className="bg-white py-20 px-4">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">Leave a Reply</h2>
                <p className="neulis-alt-regular text-[#444444] mb-12 mt-10 text-xl">
                    Your email address will not be published. Required fields are marked <span className="text-red-500">*</span>
                </p>

                {/* Form */}
                <form onSubmit={e => e.preventDefault()}>
                    {/* Name and Email Fields */}
                    <div className="neulis-alt-regular grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mb-12">
                        <FormField placeholder="Name *" name="name" />
                        <FormField placeholder="Email *" name="email" type="email" />
                    </div>

                    {/* Message Field */}
                    <div className="neulis-alt-regular mb-12">
                        <FormField placeholder="Message *" name="message" isTextarea />
                    </div>

                    {/* Submit Button */}
                    <div className="flex">
                        <motion.div  transition={{ type: "spring", stiffness: 300 }}>
                            <button className="relative overflow-hidden px-5 py-3 rounded-full font-medium text-sm group border border-slate-400">
                                {/* Lớp 3 (Trên cùng): Chữ. Bắt đầu màu trắng, hover chuyển màu tối */}
                                <span className="neulis-alt-regular relative z-30 flex items-center justify-center w-full h-full text-white group-hover:text-slate-700 transition-colors duration-300">
                                    Send Us Now
                                </span>

                                {/* Lớp 2 (Ở giữa): Nền trắng trượt lên. Bắt đầu ở dưới, hover trượt lên */}
                                <span
                                    className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-20"
                                    aria-hidden="true"
                                ></span>

                                {/* Lớp 1 (Dưới cùng): Nền gradient xanh. Lớp này đứng yên */}
                                <span
                                    className="absolute inset-0 bg-gradient-to-r from-[#0074E5] to-[#162660] rounded-full z-10"
                                    aria-hidden="true"
                                ></span>
                            </button>
                        </motion.div>
                    </div>
                </form>
            </div>
        </section>
    )
}