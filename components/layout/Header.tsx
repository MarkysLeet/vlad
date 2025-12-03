"use client";

import Link from "next/link";
import { Menu, Send } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/60 backdrop-blur-md border-b border-forest/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group relative">
           <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M10 30V10H20C25.5228 10 30 14.4772 30 20C30 25.5228 25.5228 30 20 30H10Z" 
                className="fill-forest group-hover:fill-lime transition-colors duration-500"
              />
              <path 
                d="M10 30V40" 
                stroke="currentColor" 
                strokeWidth="4"
                className="text-forest"
              />
           </svg>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase text-forest/80">
          {["Для Бизнеса", "Для Маркетинга", "Для Подарков", "Академия"].map((item) => (
            <Link 
              key={item} 
              href="#" 
              className="hover:text-forest hover:tracking-wider transition-all duration-300"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Action & Mobile Menu */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 bg-forest text-white px-5 py-2.5 rounded-full hover:bg-lime hover:text-forest transition-all duration-300 font-medium group shadow-tactile hover:shadow-neon">
            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <span>Войти</span>
          </button>
          
          <button className="md:hidden text-forest">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </header>
  );
}
