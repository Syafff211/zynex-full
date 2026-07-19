// app/page.tsx
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#060606] text-[#F4F0E8]">
      {/* 1. Hero Section (Landing Utama) */}
      <div className="relative h-screen w-full">
        <Hero />
      </div>

      {/* 2. Services Section */}
      <section id="services" className="py-32 px-6 md:px-14 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-16 tracking-tight">
            OUR <span className="text-[#D8C6A4]">SERVICES</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Modern Website", desc: "High-performance sites built with Next.js and React.", icon: "⚡" },
              { title: "Branding Identity", desc: "Strategic brand development for digital-first companies.", icon: "🎨" },
              { title: "Automation Solutions", desc: "Streamline workflows with custom automation tools.", icon: "⚙️" }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-white/10 rounded-xl hover:border-[#D8C6A4]/50 transition-colors duration-300 group">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-4 font-display">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Pricing Section */}
      <section id="pricing" className="py-32 px-6 md:px-14 bg-white/[0.02] relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-16 tracking-tight text-center">
            SIMPLE <span className="text-[#D8C6A4]">PRICING</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { plan: "Starter", price: "$999", features: ["Custom Design", "Basic SEO", "3 Revisions"] },
              { plan: "Professional", price: "$2,499", features: ["Full Branding", "SEO Optimization", "Unlimited Revisions", "Priority Support"], popular: true },
              { plan: "Enterprise", price: "Custom", features: ["Full Stack Dev", "Analytics Dashboard", "24/7 Support", "Slack Channel"] }
            ].map((pkg, i) => (
              <div key={i} className={`p-10 rounded-2xl border flex flex-col ${pkg.popular ? 'border-[#D8C6A4] bg-[#D8C6A4]/5' : 'border-white/10'}`}>
                <h3 className="text-xl font-semibold mb-2">{pkg.plan}</h3>
                <div className="text-3xl font-bold mb-6">{pkg.price}</div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-[#D8C6A4]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 border border-white/20 hover:bg-[#D8C6A4] hover:text-black hover:border-[#D8C6A4] transition-all font-medium">
                  GET STARTED
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Portfolio Section */}
      <section id="portfolio" className="py-32 px-6 md:px-14 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-16 tracking-tight">
            SELECTED <span className="text-[#D8C6A4]">WORK</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {[1, 2, 3, 4].map((n) => (
               <div key={n} className="group relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-white/5 cursor-pointer">
                 {/* Placeholder Image */}
                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="absolute bottom-6 left-6 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                   <h4 className="text-lg font-bold">Project Title {n}</h4>
                   <p className="text-sm text-gray-400">Web Development • Branding</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-14 bg-[#0a0a0a] relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            LET'S BUILD <span className="text-[#D8C6A4]">SOMETHING</span><br/>AMAZING TOGETHER
          </h2>
          <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
            Ready to transform your digital presence? We're here to help you scale and grow.
          </p>
          <form className="max-w-md mx-auto space-y-4 text-left">
             <input type="email" placeholder="Enter your email" className="w-full p-4 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-[#D8C6A4] text-white" />
             <textarea placeholder="Tell us about your project" rows={4} className="w-full p-4 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-[#D8C6A4] text-white" />
             <button type="button" className="w-full py-4 bg-[#F4F0E8] text-[#060606] font-bold hover:bg-[#D8C6A4] transition-colors rounded">
               SEND MESSAGE
             </button>
          </form>
        </div>
      </section>

      {/* Footer Sederhana */}
      <footer className="py-12 text-center text-gray-500 text-sm border-t border-white/5">
        <p>&copy; 2025 Zynex Studio. All rights reserved.</p>
      </footer>
    </main>
  );
}
