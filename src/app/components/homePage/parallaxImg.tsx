export default function ParallaxImage() {
    return (
        <section className="w-full px-4 lg:px-0 mt-6 md:mt-0">
            <div className="flex justify-center lg:justify-end w-full max-w-7xl mx-auto">
                <div
                    className="relative overflow-hidden bg-white/5
                               w-full h-64 sm:h-96
                               md:h-130
                               lg:ml-auto lg:w-[calc(100%-2rem)] lg:h-190 lg:translate-x-10"
                >
                    <div
                        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
                        style={{ backgroundImage: `url(/assets/section1.png)` }}
                    />
                </div>
            </div>
        </section>
    )
}
