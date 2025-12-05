import { Star } from "lucide-react"

const testimonials = [
  {
    name: "John Smith",
    role: "Business Traveler",
    content:
      "Excellent service! The booking was seamless and the car was in perfect condition. Will definitely use again.",
    rating: 5,
    avatar: "/professional-man-avatar.png",
  },
  {
    name: "Sarah Johnson",
    role: "Vacation Planner",
    content:
      "Amazing experience from start to finish. The staff was friendly and helpful. Best car rental service I've used!",
    rating: 5,
    avatar: "/professional-woman-avatar.png",
  },
  {
    name: "Michael Chen",
    role: "Corporate Manager",
    content:
      "Professional service with great attention to detail. The transparent pricing is refreshing. Highly recommended!",
    rating: 5,
    avatar: "/professional-asian-man-avatar.png",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">What Our Customers Say</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust DriveEase for their car rental needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>

              <p className="text-muted-foreground">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
