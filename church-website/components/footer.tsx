import Link from "next/link"
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">St. Simon&apos;s Church</h3>
            <p className="mb-4 max-w-xs">
              A Jacobite Syrian Orthodox Church serving the community in Gloucester and surrounding areas.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white hover:underline">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Service Times</h3>
            <ul className="space-y-2">
              <li>
                <span className="block font-medium text-white">Sunday</span>
                <span>12:30 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Contact Info</h3>
            <address className="not-italic">
              <p className="mb-2">Coney Hill Rd, Coney Hill</p>
              <p className="mb-2">Gloucester, GL4 4LX</p>
              <p className="mb-2">United Kingdom</p>
              <p className="mb-2">
                <span className="block">Phone: +44 7949864424</span>
              </p>
              <p>
                <span className="block">Email: stsimonsjsocgloucester@gmail.com</span>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} St. Simon&apos;s Jacobite Syrian Orthodox Church. All rights reserved.
          </p>
          <p>
            Designed and developed by <Link href="https://www.linkedin.com/in/johan-jobi/">Johan Jobi</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
