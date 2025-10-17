"use client"

import Image from "next/image"

// ==================== DỮ LIỆU TEAM ====================
// ✨ Chỉ cần chỉnh sửa thông tin trong mảng này
const teamMembers = [
    {
        name: "Tom Daniels",
        role: "Director",
        imageUrl: "/assets/mem2.webp", // Thay bằng đường dẫn ảnh của bạn
    },
    {
        name: "Sam Sheehan",
        role: "Director",
        imageUrl: "/assets/mem3.webp", // Thay bằng đường dẫn ảnh của bạn
    },
    {
        name: "Bheki Mhlanga",
        role: "General Manager",
        imageUrl: "/assets/mem4.webp", // Thay bằng đường dẫn ảnh của bạn
    },
    {
        name: "Quang Ho Quoc",
        role: "Head of Marketing",
        imageUrl: "/assets/mem1.webp", // Thay bằng đường dẫn ảnh của bạn
    },
]

// ==================== COMPONENT ====================
export function TeamSection() {
    return (
        <section className="bg-white py-20 md:py-32 px-8">
            <div className="max-w-7xl mx-auto">
                {/* --- Tiêu đề --- */}
                <div className="text-center mb-16">
                    <h2 className="archivo-expanded text-5xl md:text-6xl font-medium text-[#000A1D]">Meet Our Team</h2>
                </div>

                {/* --- Lưới danh sách thành viên --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="group text-left">
                            {/* Container chứa ảnh (để tạo hiệu ứng) */}
                            <div className="relative w-full aspect-[3/4] bg-gray-300  overflow-hidden mb-4 shadow-md">
                                <Image
                                    src={member.imageUrl}
                                    alt={`Photo of ${member.name}`}
                                    fill
                                    className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                                />
                            </div>
                            {/* Tên và Chức vụ */}
                            <h3 className="archivo-expanded text-xl font-medium text-[#000A1D]">{member.name}</h3>
                            <p className="neulis-alt-regular font-medium text-[#444444]">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}