// components/TeamSection.tsx hoặc app/components/TeamSection.tsx (Client FE)
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import api from "@/lib/api";

// ==================== INTERFACE ====================
interface TeamMember {
  id: number;
  name: string;
  position: string;
  imageUrl: string;
}

// ==================== COMPONENT ====================
export function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // ✅ Fetch data từ Dashboard API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/api/representatives");
        
        // ✅ SẮP XẾP THEO ID TĂNG DẦN (nhỏ nhất bên trái)
        const sortedMembers = (response.data || []).sort(
          (a: TeamMember, b: TeamMember) => a.id - b.id
        );
        
        setTeamMembers(sortedMembers);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Error fetching team members:", err);
        setError("Failed to load team members");
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // ==================== LOADING STATE ====================
  if (loading) {
    return (
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="archivo-expanded text-5xl md:text-6xl font-medium text-[#000A1D]">
              Meet The Team
            </h2>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000A1D]"></div>
          </div>
        </div>
      </section>
    );
  }

  // ==================== ERROR STATE ====================
  if (error) {
    return (
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="archivo-expanded text-5xl md:text-6xl font-medium text-[#000A1D]">
              Meet The Team
            </h2>
          </div>
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // ==================== EMPTY STATE ====================
  if (teamMembers.length === 0) {
    return (
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="archivo-expanded text-5xl md:text-6xl font-medium text-[#000A1D]">
              Meet The Team
            </h2>
          </div>
          <div className="text-center py-20">
            <p className="text-gray-500">No team members available</p>
          </div>
        </div>
      </section>
    );
  }

  // ==================== MAIN RENDER ====================
  return (
    <section className="bg-white py-20 md:py-32 md:-translate-y-30 md:-mb-40 mb-50">
      <div className="max-w-7xl mx-auto px-8">
        {/* --- Tiêu đề --- */}
        <div className="text-center mb-16">
          <h2 className="archivo-expanded text-5xl md:text-6xl font-medium text-[#000A1D]">
            Meet The Team
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