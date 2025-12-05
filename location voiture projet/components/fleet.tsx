const cars = [
  {
    id: 1,
    name: "Honda Civic",
    category: "Economy",
    price: 45,
    image: "/honda-civic-blue-economy-car.jpg",
    features: ["5 Seats", "Automatic", "Air Conditioning"],
  },
  {
    id: 2,
    name: "Toyota Camry",
    category: "Sedan",
    price: 65,
    image: "/toyota-camry-silver-sedan.jpg",
    features: ["5 Seats", "Automatic", "Leather Seats"],
  },
  {
    id: 3,
    name: "Tesla Model 3",
    category: "Premium",
    price: 120,
    image: "/white-tesla-model-3.png",
    features: ["5 Seats", "Electric", "Autopilot"],
  },
  {
    id: 4,
    name: "Ford Explorer",
    category: "SUV",
    price: 95,
    image: "/ford-explorer-black-suv.jpg",
    features: ["7 Seats", "Automatic", "AWD"],
  },
  {
    id: 5,
    name: "BMW 5 Series",
    category: "Luxury",
    price: 150,
    image: "/bmw-5-series-black-luxury-sedan.jpg",
    features: ["5 Seats", "Automatic", "Premium Sound"],
  },
  {
    id: 6,
    name: "Mercedes Van",
    category: "Van",
    price: 110,
    image: "/mercedes-sprinter-white-van.jpg",
    features: ["8 Seats", "Automatic", "Cargo Space"],
  },
]

export default function Fleet() {
  return (
    <section id="fleet" className="py-20 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Our Fleet</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Choose from our diverse selection of vehicles, from budget-friendly options to luxury vehicles
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-background rounded-xl overflow-hidden border border-border hover:shadow-xl transition"
            >
              <div className="relative h-48 bg-muted overflow-hidden">
                <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-full h-full object-cover" />
                <span className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {car.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{car.name}</h3>

                <ul className="flex flex-wrap gap-2 mb-4">
                  {car.features.map((feature, idx) => (
                    <li key={idx} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">
                    ${car.price}
                    <span className="text-sm">/day</span>
                  </span>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-medium">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
