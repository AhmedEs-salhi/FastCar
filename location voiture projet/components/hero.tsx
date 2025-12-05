export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Your Perfect Drive Awaits
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover premium car rentals with transparent pricing, flexible booking options, and 24/7 customer
              support. Drive with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold">
                Browse Fleet
              </button>
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition font-semibold">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center overflow-hidden">
            <img src="/luxury-car-rental-sedan-in-premium-parking-lot.jpg" alt="Premium car rental" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
