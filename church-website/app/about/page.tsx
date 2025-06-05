import type { Metadata } from "next"
import Image from "next/image"
import AnimatedSection from "@/components/animated-section"
import StaggeredChildren from "@/components/staggered-children"
import { useIsDesktop } from "@/hooks/use-is-desktop"
import ResponsiveCommitteeGrid from "@/components/ResponsiveCommitteeGrid"


export const metadata: Metadata = {
  title: "About Us | St. Simon's Jacobite Syrian Orthodox Church",
  description:
    "Learn about the history, faith, and community of St. Simon's Jacobite Syrian Orthodox Church in Gloucester.",
}


const managingCommittee = [
  {
    name: "Rev. Fr. Anish Varghese",
    position: "Vicar & President",
    image: "/images/achan.jpg",
  },
  {
    name: "Binoy MK",
    position: "Vice President",
    image: "/images/binoy.jpg",
  },
    {
    name: "Jobi George",
    position: "Secretary",
    image: "/images/jobigeorge.jpg",
  },
  {
    name: "Manoj Mathew",
    position: "Trustee",
    image: "/images/manoj.jpg",
  },
  {
    name: "Jinesh Mathew",
    position: "Joint Secretary",
    image: "/images/jineshmathew.jpg",
  },
  {
    name: "Sibiraj C Mathew",
    position: "Joint Trustee",
    image: "/images/sibiraj.jpg",
  },
      {
    name: "Jomon P Geroge",
    position: "Comitte Member",
    image: "/images/jomon-geroge.jpg",
  },
  {
    name: "Basil Varghese",
    position: "Comitte Member",
    image: "/images/basil.jpg",
  },
    {
    name: "Lalu Paul",
    position: "Comitte Member  & Headmaster of Sunday School",
    image: "/images/lalu.jpg",
  },

]

const VanithaSamajam = [
  {
    name: "Sali Vincent",
    position: "Secretary",
    image: "/images/sali.jpg?height=200&width=200",
  },
    {
    name: "Soumya Jinesh",
    position: "Prayer Fellowship Coordinator",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function AboutPage() {
  // Patron data
  const patrons = [
    {
      name: "His Holiness Moran Mor Ignatius Aphrem II",
      position: "Patriarch of Antioch & All the East",
      image: "/images/Patriarch_Ignatius_Aphrem_II,_seated.jpg?height=300&width=200",
    },
    {
      name: "His Beatitude Mor Baselios Joseph",
      position: "Catholicos of India",
      image: "/images/Baselios_joseph.jpg?height=200&width=200",
    },
    {
      name: "His Grace Issac Mor Osthatheos",
      position: "Metropolitan, UK, Europe & Africa",
      image: "/images/Mor_Osthatheos_Issac.jpg?height=200&width=200",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col pt-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <Image
          src="/placeholder.svg?height=500&width=1200"
          alt="Church interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <AnimatedSection once={true} animation="fadeInUp">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">About Our Church</h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Jacobite Syrian Orthodox Faith Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container">
          <AnimatedSection once={true} animation="fadeInUp" className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-600 mb-4">The Jacobite Syrian Orthodox Faith</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              The Jacobite Syrian Orthodox Church is one of the oldest Christian traditions, tracing its roots to the apostolic era and the See of Antioch. 
              Our faith is deeply rooted in the teachings of Jesus Christ, the Holy Bible, and the rich liturgical and spiritual heritage of Syriac Christianity. 
              We uphold the Nicene Creed, celebrate the Holy Qurbana (Eucharist) in the ancient Syriac tradition, and value the unity of the universal church under the spiritual leadership of the Patriarch of Antioch. 
              Our community is committed to prayer, service, and living out the love of Christ in daily life.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Patrons Section */}
      <section className="bg-gray-100 py-12 md:py-20">
        <div className="container">
          <AnimatedSection once={true} animation="fadeInUp" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-600 mb-6">Our Patrons</h2>
          </AnimatedSection>
          <StaggeredChildren
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center"
            staggerDelay={0.1}
            animation="fadeInUp"
            once={true}
          >
            {patrons.map((patron, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-xs w-full mx-auto"
          >
            <div className="relative h-[480px] w-full rounded-t-lg overflow-hidden bg-white">
              <Image
                src={patron.image}
                alt={patron.name}
                fill
                className="object-contain rounded-t-lg"
              />
            </div>
            <div className="p-2 sm:p-4 text-center">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{patron.name}</h3>
              <p className="text-gray-600 text-sm">{patron.position}</p>
            </div>
          </div>
            ))}
          </StaggeredChildren>
        </div>
      </section>


      {/* Managing Committee Section */}
      <section className="bg-gray-50 py-12 md:py-24">
        <div className="container">
          <AnimatedSection once={true} animation="fadeInUp" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-600 mb-6">Managing Committee</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              The Managing Committee manages the church's activities. It consists of the office bearers, vice office
              bearers, and other general body elected members.
            </p>
          </AnimatedSection>
          <ResponsiveCommitteeGrid members={managingCommittee} />
        </div>
      </section>


      {/* Vanitha Samajam Section */}
      <section className="bg-gray-50 py-12 md:py-24">
        <div className="container">
          <AnimatedSection once={true} animation="fadeInUp" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-600 mb-6">Vanitha Samajam</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              The Managing Committees manages the church's activities. It consists of the office bearers, vice office
              bearers, and other general body elected members.
            </p>
          </AnimatedSection>
          <ResponsiveCommitteeGrid members={VanithaSamajam} />
        </div>
      </section>

    </main>
  )
}