"use client"

export default function AnimatedText() {
    return (
        <section className="min-h-[50vh] flex items-center justify-center px-4 md:px-16 lg:px-24">
            <div className="max-w-7xl w-full mx-auto">
                <div className="relative w-full">
                    <h2
                        className="max-w-4xl mx-auto text-[clamp(2.5rem,6vw,4.2rem)] font-light text-[#000A1D] leading-tight tracking-tight text-center lg:text-center"
                        style={{
                            fontFamily: "'Archivo Expanded', sans-serif",
                        }}
                    >
                        Improved Output, Smarter Structure, Lower Costs
                    </h2>
                </div>
            </div>
        </section>
    )
}
