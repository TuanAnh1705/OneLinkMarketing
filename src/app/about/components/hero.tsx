"use client"

// Đường line gradient
function GradientBorder() {
    return <div className="h-[0.8px] w-full bg-linear-to-r from-[#0074E5] to-[#162660]" />
}

// Section chính
export default function Hero() {
    return (
        <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="archivo-expanded text-5xl md:text-8xl font-bold text-center tracking-wider bg-linear-to-r from-[#0074E5] to-[#162660] bg-clip-text text-transparent ">
                        MADE IN
                    </h1>
                    {/* THAY ĐỔI TẠI ĐÂY: Thay 'to-[60%]' thành 'to-[30%]' */}
                    <h1 className="archivo-expanded text-5xl md:text-8xl font-bold text-center tracking-wider bg-[#FC0000] bg-clip-text text-transparent mb-8">
                        VIETNAM
                    </h1>
                    <GradientBorder />
                    <p className="generalsans-regular font-medium text-[#000A1D] text-center text-xl md:text-5xl max-w-5xl mx-auto leading-none py-8">
                        International Team
                        <br />Global Mindset
                        <br />Vietnamese Resources
                    </p>
                    <GradientBorder />
                </div>
            </div>
        </section>
    )
}