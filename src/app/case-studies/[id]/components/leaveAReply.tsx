/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

// ============================================================================
// 🔹 Component Toast (Thông báo Custom)
// ============================================================================
interface ToastProps {
    message: string
    type: "success" | "error"
    onClose: () => void
}

const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`
                    pointer-events-auto px-8 py-4 rounded-xl shadow-2xl flex flex-col items-center gap-2 min-w-[300px] text-center
                    ${type === "success"
                        ? "bg-[#162660] text-green-500 border border-[#162660]"
                        : "bg-white text-red-600 border-2 border-red-100"
                    }
                `}
            >
                <div className={`text-3xl mb-1`}>
                    {type === "success" ? " ✔ " : "✘"}
                </div>
                <span className="generalsans-regular text-lg">
                    {message}
                </span>
            </motion.div>
        </div>
    )
}

// ============================================================================
// 🔹 Component FormField
// ============================================================================
interface FormFieldProps {
    placeholder: string
    name: string
    type?: string
    isTextarea?: boolean
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    disabled?: boolean
}

function FormField({
    placeholder,
    name,
    type = "text",
    isTextarea = false,
    value,
    onChange,
    disabled
}: FormFieldProps) {
    const commonClasses =
        "w-full bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-gray-500 text-slate-800 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"

    return (
        <div className="relative w-full">
            {isTextarea ? (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    rows={1}
                    className={commonClasses}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className={commonClasses}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required
                />
            )}
            <div className="h-[0.8px] w-full bg-linear-to-r from-[#0074E5] to-[#162660]" />
        </div>
    )
}

// ============================================================================
// 🔹 Main Reply Form Component
// ============================================================================
export function ReplyForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
        show: false,
        message: "",
        type: "success"
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const showToast = (message: string, type: "success" | "error") => {
        setToast({ show: true, message, type })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsLoading(true)

        try {
            const response = await fetch("/api/sheet/reply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong")
            }

            showToast("Reply sent successfully!", "success")

            // Reset form
            setFormData({
                name: "",
                email: "",
                message: ""
            })

        } catch (error: any) {
            console.error("Error submitting reply:", error)
            showToast("Failed to send reply. Please try again.", "error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="bg-white py-20 px-4">
            {/* Toast Notification */}
            <AnimatePresence>
                {toast.show && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(prev => ({ ...prev, show: false }))}
                    />
                )}
            </AnimatePresence>

            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <h2 className="archivo-expanded text-4xl md:text-5xl font-medium text-slate-800 mb-2">
                    Leave a Reply
                </h2>
                <p className="generalsans-regular text-[#444444] mb-12 mt-10 text-xl">
                    Your email address will not be published. Required fields are marked{" "}
                    <span className="text-red-500">*</span>
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Name and Email Fields */}
                    <div className="generalsans-regular grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mb-12">
                        <FormField
                            placeholder="Name *"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        <FormField
                            placeholder="Email *"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Message Field */}
                    <div className="generalsans-regular mb-12">
                        <FormField
                            placeholder="Message *"
                            name="message"
                            isTextarea
                            value={formData.message}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex">
                        <motion.div transition={{ type: "spring", stiffness: 300 }}>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="relative overflow-hidden px-5 py-3 rounded-full font-medium text-sm group border border-slate-400 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {/* Chữ */}
                                <span className="generalsans-regular relative z-30 flex items-center justify-center w-full h-full text-white group-hover:text-slate-700 transition-colors duration-300">
                                    {isLoading ? "Sending..." : "Send Us Now"}
                                </span>

                                {/* Nền trắng hover */}
                                {!isLoading && (
                                    <span
                                        className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full z-20"
                                        aria-hidden="true"
                                    ></span>
                                )}

                                {/* Nền gradient xanh */}
                                <span
                                    className="absolute inset-0 bg-linear-to-r from-[#0074E5] to-[#162660] rounded-full z-10"
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