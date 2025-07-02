import AnimatedSection from "@/components/animated-section"

export default function DonatePage() {
  return (
    <main className="flex min-h-screen flex-col pt-16">
      <section className="bg-amber-50 py-12 md:py-24">
        <div className="container">
          <AnimatedSection once={false} animation="fadeInUp" className="flex flex-col items-center justify-center text-center mb-12">
            <div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800 mb-4">Support Our Mission</div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">How You Can Donate</h1>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[700px] mb-8">
              Your generosity helps us continue our ministry, support our community, and maintain our church. Thank you for your support!
            </p>
            <div className="grid gap-8 md:grid-cols-3 w-full max-w-4xl">
              {/* In Person */}
              <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <span className="text-amber-700 text-3xl mb-2">🤝</span>
                <h2 className="text-xl font-bold mb-2">In Person</h2>
                <p className="text-gray-600">You can make a donation during any of our services or events. Please speak to a committee member or the vicar for assistance.</p>
              </div>
              {/* Online */}
              <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <span className="text-amber-700 text-3xl mb-2">💻</span>
                <h2 className="text-xl font-bold mb-2">Online</h2>
                <p className="text-gray-600">Online giving coming soon! For now, please contact us for bank details or other online options.</p>
              </div>
              {/* By SMS */}
              <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <span className="text-amber-700 text-3xl mb-2">🏦</span>
                <h2 className="text-xl font-bold mb-2">Bank Transfer</h2>
                <p className="text-gray-600  md:px-1">
                  <span className="font-bold">Name:</span><br />St. Simon’s Jacobite Syrian Orthodox Church<br />
                  <span className="font-bold">Sort Code:</span><br />40-22-09<br />
                  <span className="font-bold">Account Number:</span> 52787733
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
