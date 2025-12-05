"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-foreground">DriveEase</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition">
              Features
            </a>
            <a href="#fleet" className="text-foreground hover:text-primary transition">
              Fleet
            </a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition">
              Reviews
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition">
              Contact
            </a>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-medium">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <a href="#features" className="text-foreground hover:text-primary">
              Features
            </a>
            <a href="#fleet" className="text-foreground hover:text-primary">
              Fleet
            </a>
            <a href="#testimonials" className="text-foreground hover:text-primary">
              Reviews
            </a>
            <a href="#contact" className="text-foreground hover:text-primary">
              Contact
            </a>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium w-full">
              Sign In
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}
