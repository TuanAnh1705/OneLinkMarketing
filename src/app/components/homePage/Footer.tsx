"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUp, Send } from "lucide-react"
import { useEffect, useState } from "react"

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <footer className="text-gray-800 pt-20 pb-10 px-4 md:px-8 relative overflow-hidden bg-white">
            {/* 🌈 Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#0074E5] to-[#162660]" />

            <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column */}
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        {/* Container có width bằng logo */}
                        {/* FIX: Thay w-[500px] bằng w-full max-w-[500px] để responsive.
                          Thêm mx-auto lg:mx-0 để căn giữa trên mobile và căn trái trên desktop.
                        */}
                        <div className="w-full max-w-[500px] mx-auto lg:mx-0 flex flex-col items-center lg:items-start text-center lg:text-left">
                            {/* Logo */}
                            {/* FIX: Chiều cao responsive cho logo */}
                            <div className="mb-6 w-full h-[120px] lg:h-[150px] relative">
                                <Image
                                    src="/assets/logo.png"
                                    alt="Onelink Logo"
                                    fill
                                    unoptimized
                                    className="object-contain"
                                />
                            </div>

                            {/* Social icons */}
                            {/* FIX: lg:justify-start để khớp với lg:items-start của cha */}
                            <div className="flex justify-center lg:justify-start gap-5 mt-6 w-full">
                                <svg
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8 fill-black"
                                >
                                    <title>Instagram</title>
                                    <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                                </svg>
                                <svg
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8 fill-black"
                                >
                                    <title>Facebook</title>
                                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                                </svg>
                                <svg
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8 fill-black"
                                >
                                    <title>Pinterest</title>
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                                </svg>
                                <svg
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8 fill-black"
                                >
                                    <title>Behance</title>
                                    <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" />
                                </svg>
                            </div>

                            {/* Privacy & Copyright — căn giữa theo logo */}
                            {/* FIX: lg:text-left để khớp với lg:items-start của cha */}
                            <a
                                href="#"
                                className="neulis-alt-extralight mt-8 text-[#000A1D] underline font-bold text-center lg:text-left w-full"
                            >
                                Privacy Policy
                            </a>

                            {/* FIX: lg:text-left để khớp với lg:items-start của cha */}
                            <p className="neulis-alt-extralight font-bold mt-14 text-[#000A1D] text-center lg:text-left w-full">
                                <span className="text-[#ADADAD]">©</span>2025{" "}
                                <span className="text-[#ADADAD]"> Onelink Marketing. </span>All
                                rights reserved.
                            </p>
                        </div>
                    </div>

                    {/* Right Column */}
                    {/* Cột này về cơ bản đã responsive tốt */}
                    <div className="flex flex-col lg:items-end text-center lg:text-left">
                        {/* Chat Box */}
                        <div className="w-full max-w-md lg:self-end">
                            <h3 className="neulis-alt-regular text-4xl font-medium mb-6 text-[#000A1D] text-center lg:text-left">
                                Planning Something?
                            </h3>
                            <div className="relative w-full">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="neulis-alt-extralight font-medium w-full h-14 pr-14 bg-gray-100 border-none rounded-full text-gray-600 placeholder:text-gray-400"
                                />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-none w-10 h-10 flex items-center justify-center"
                                >
                                    <Send className="w-4 h-4 text-black" />
                                </Button>
                            </div>
                        </div>

                        {/* Company & Services — thẳng hàng với khung chat */}
                        {/* Layout md:flex-row đã xử lý responsive tốt */}
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mt-14 w-full max-w-md lg:self-end">
                            {/* Company */}
                            <div className="text-center md:text-left flex-1">
                                <h4 className="neulis-alt-regular text-xl mb-4 text-[#444444]">
                                    Company
                                </h4>
                                <ul className="neulis-alt-extralight font-bold space-y-2 text-[#444444]">
                                    {["About Us", "Portfolios", "Contact Us"].map(
                                        (item) => (
                                            <li
                                                key={item}
                                                className="flex items-start justify-center md:justify-start gap-2"
                                            >
                                                <span className="text-[#444444] text-lg leading-[1.2]">
                                                    •
                                                </span>
                                                <a
                                                    href="#"
                                                    className="hover:text-[#444444] transition-colors"
                                                >
                                                    {item}
                                                </a>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>

                            {/* Services */}
                            <div className="text-center md:text-left flex-1 flex flex-col">
                                <h4 className="neulis-alt-regular text-xl mb-4 text-[#444444] text-center md:text-left">
                                    Services
                                </h4>
                                <ul className="neulis-alt-extralight font-bold space-y-2 text-[#444444]">
                                    {[
                                        "Strategy Consulting",
                                        "Digital Asset Development",
                                        "SEO Services",
                                        "Paid Media & Advertising",
                                        "Social Media Management",
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start justify-center md:justify-start gap-2"
                                        >
                                            <span className="text-[#444444] text-lg leading-[1.2]">
                                                •
                                            </span>
                                            <a
                                                href="#"
                                                className="hover:text-[#444444] transition-colors"
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient line */}
            {/* FIX: w-full thay vì w-screen */}
            <div className="absolute bottom-5 left-0 w-full h-[1px] bg-gradient-to-r from-[#0074E5] to-[#162660]" />

            {/* Scroll to Top — Nền trong suốt + hiệu ứng âm bản */}
            {/* FIX: Thêm các lớp Tailwind để tạo kiểu cho nút */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-100 mix-blend-difference"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-6 w-6 text-current" />
                </button>
            )}
        </footer>
    )
}