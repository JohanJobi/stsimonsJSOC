"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false)
  }, [pathname])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ]

  // Show church name on all pages except home, or when scrolled on home page
  const showChurchName = pathname !== "/" || isScrolled

  const handleNavClick = () => {
    // Close mobile menu and scroll to top
    setIsOpen(false)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || pathname !== "/" ? "bg-white shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={handleNavClick}>
          <Image
            src="/images/e1.png" 
            alt="St. Simon's Church Logo"
            width={50}
            height={50}
            className={` ${
              showChurchName ? "text-amber-800 opacity-100" : "text-white opacity-0"
            }`}
            priority
          />
          <Image
            src="/images/e2.png" 
            alt="St. Simon's Church Logo"
            width={50}
            height={50}
            className={` ${
              showChurchName ? "text-amber-800 opacity-100" : "text-white opacity-0"
            }`}
            priority
          />
          <motion.span
            className={`text-xl font-bold transition-all duration-300 ${
              showChurchName ? "text-amber-800 opacity-100" : "text-white opacity-0"
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            St. Simon&apos;s Church
          </motion.span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={handleNavClick}>
              <motion.span
                className={`text-sm font-medium transition-colors hover:text-amber-800 ${
                  isScrolled || pathname !== "/" ? "text-gray-700" : "text-white"
                } ${pathname === link.href ? "underline decoration-amber-800 decoration-2 underline-offset-4" : ""}`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.span>
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu className={`h-6 w-6 ${isScrolled || pathname !== "/" ? "text-gray-700" : "text-white"}`} />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-white p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="mt-8 flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-lg font-medium ${pathname === link.href ? "text-amber-800" : "text-gray-700"}`}
                      onClick={handleNavClick}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
