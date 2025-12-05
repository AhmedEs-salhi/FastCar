"use client"

import type React from "react"

import { Calendar, MapPin, Users } from "lucide-react"
import { useState } from "react"

export default function SearchBar() {
  const [formData, setFormData] = useState({
    location: "",
    pickupDate: "",
    returnDate: "",
    drivers: "1",
  })

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching with:", formData)
    // Example: const response = await fetch('http://localhost:8000/api/search-cars/', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
  }

  return (
    <section className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Find Your Perfect Car</h2>

        <form onSubmit={handleSearch} className="bg-secondary rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* Location */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-foreground mb-2">Pickup Location</label>
              <div className="flex items-center gap-2 bg-background rounded-lg px-3 py-2 border border-input">
                <MapPin size={20} className="text-primary" />
                <input
                  type="text"
                  placeholder="City or airport"
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            {/* Pickup Date */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-foreground mb-2">Pickup Date</label>
              <div className="flex items-center gap-2 bg-background rounded-lg px-3 py-2 border border-input">
                <Calendar size={20} className="text-primary" />
                <input
                  type="date"
                  className="flex-1 bg-transparent outline-none text-foreground"
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                />
              </div>
            </div>

            {/* Return Date */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-foreground mb-2">Return Date</label>
              <div className="flex items-center gap-2 bg-background rounded-lg px-3 py-2 border border-input">
                <Calendar size={20} className="text-primary" />
                <input
                  type="date"
                  className="flex-1 bg-transparent outline-none text-foreground"
                  value={formData.returnDate}
                  onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                />
              </div>
            </div>

            {/* Drivers */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-foreground mb-2">Drivers</label>
              <div className="flex items-center gap-2 bg-background rounded-lg px-3 py-2 border border-input">
                <Users size={20} className="text-primary" />
                <select
                  className="flex-1 bg-transparent outline-none text-foreground"
                  value={formData.drivers}
                  onChange={(e) => setFormData({ ...formData, drivers: e.target.value })}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3+</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:opacity-90 transition"
              >
                Search Cars
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
