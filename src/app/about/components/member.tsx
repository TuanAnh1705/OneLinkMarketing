// components/TeamSection.tsx hoặc app/components/TeamSection.tsx (Client FE)
"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { getMediaUrl } from "@vns-core/core/api/media-url";
import type { TeamSection as TeamSectionData } from "@vns-core/core/types/about";

// ==================== INTERFACE ====================
interface TeamMember {
  id: number;
  name: string;
  position: string;
  imageUrl: string;
}

// ⚠️ TẠM THỜI: dùng dữ liệu tĩnh từ Figma thay cho API (/api/representatives đang lỗi)
// Thứ tự lấy từ Neil Cartwright qua phải, bỏ Tuan Nguyen. Ảnh chạy per1 -> per7.
const STATIC_TEAM_MEMBERS: TeamMember[] = [
  { id: 1, name: "Neil Cartwright", position: "Managing Director", imageUrl: "/assets/per1.jpg" },
  { id: 2, name: "Quang Ho Quoc", position: "Head of Marketing", imageUrl: "/assets/per2.jpg" },
  { id: 3, name: "James Sheehan", position: "SEO Executive", imageUrl: "/assets/per3.jpg" },
  { id: 4, name: "Long Nguyen", position: "Content & Growth Executive", imageUrl: "/assets/per4.jpg" },
  { id: 5, name: "Trang Hoang", position: "Creative Executive", imageUrl: "/assets/per5.jpg" },
  { id: 6, name: "Anh Tran Tuan", position: "Website Developer", imageUrl: "/assets/per6.jpg" },
  { id: 7, name: "Nguyen Tan", position: "Social Media Executive", imageUrl: "/assets/per7.jpg" },
];

// ==================== COMPONENT ====================
export function TeamSection({ data }: { data?: TeamSectionData | null }) {
  const heading = data?.heading || "Meet The Team";
  const teamMembers: TeamMember[] = data?.members?.length
    ? data.members.map((m) => ({
        id: m.id,
        name: m.name,
        position: m.position,
        imageUrl: m.image?.url ? getMediaUrl(m.image.url) : "",
      }))
    : STATIC_TEAM_MEMBERS;

  const [emblaRef] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      dragFree: true,
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnLastSnap: false,
      }),
    ]
  );

  // ==================== MAIN RENDER ====================
  return (
    <section className="bg-white py-20 md:py-32 md:-translate-y-30 md:-mb-40 mb-50">
      <div className="max-w-7xl mx-auto px-8">
        {/* --- Tiêu đề --- */}
        <div className="text-center mb-16">
          <h2 className="archivo-expanded text-5xl md:text-6xl font-medium text-[#000A1D]">
            {heading}
          </h2>
        </div>
      </div>

      {/* --- Carousel Container với padding 2 bên --- */}
      <div className="px-4 sm:px-8 lg:px-5">
        <div className="embla w-full overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex -ml-4 sm:-ml-6 lg:-ml-8">
            {teamMembers.map((member) => (
              <div
                className="embla__slide relative min-w-0 shrink-0 grow-0
                           basis-full pl-4 sm:pl-6 lg:pl-8 sm:basis-1/2 lg:basis-1/4"
                key={member.id}
              >
                <div className="group text-left">
                  {/* Container chứa ảnh */}
                  <div className="relative w-full aspect-3/4 bg-gray-300 overflow-hidden mb-4 shadow-md">
                    <Image
                      src={member.imageUrl}
                      alt={`Photo of ${member.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  {/* Tên và Chức vụ */}
                  <h3 className="archivo-expanded text-xl font-medium text-[#000A1D]">
                    {member.name}
                  </h3>
                  <p className="generalsans-regular text-[#444444]">
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}