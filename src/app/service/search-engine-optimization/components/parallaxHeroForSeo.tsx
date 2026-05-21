import Image from "next/image"

export function ParallaxHeroForSeo() {
  return (
    <div className="relative min-h-[110vh] w-full overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Image
          src="/assets/29.jpg"
          alt="Aurora parallax background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>
    </div>
  )
}
