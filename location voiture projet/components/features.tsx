import { Zap, Shield, Clock, DollarSign } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Instant Booking",
    description: "Reserve your car in minutes with our simple online booking process",
  },
  {
    icon: Shield,
    title: "Full Coverage",
    description: "Complete insurance included in every rental at no extra cost",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer service whenever you need us",
  },
  {
    icon: DollarSign,
    title: "Best Prices",
    description: "Competitive rates with transparent pricing, no hidden fees",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Why Choose DriveEase?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
