"use client"
import { useIsDesktop } from "@/hooks/use-is-desktop"
import AnimatedSection from "@/components/animated-section"
import Image from "next/image"
import StaggeredChildren from "@/components/staggered-children"

export default function ResponsiveCommitteeGrid({ members }) {
  const isDesktop = useIsDesktop(1024)
  const gridClass = "grid min-w-0 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"

  if (isDesktop) {
    // Desktop: staggered animation
    return (
      <StaggeredChildren
        className={gridClass}
        staggerDelay={0.1}
        animation="fadeInUp"
        once={true}
      >
        {members.map((member) => (
          <div
            key={member.name}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full sm:max-w-xs mx-auto"
          >
            <div className="aspect-square h-[380px] w-full relative rounded-t-lg overflow-hidden">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <div className="p-2 sm:p-4 text-center">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.position}</p>
            </div>
          </div>
        ))}
      </StaggeredChildren>
    )
  }

  // Mobile: fade each card independently
  return (
    <div className={gridClass}>
      {members.map((member) => (
        <AnimatedSection
          key={member.name}
          animation="fadeInUp"
          once={true}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full sm:max-w-xs mx-auto">
            <div className="aspect-square h-[380px] w-full relative rounded-t-lg overflow-hidden">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                className="object-cover object-[center_35%] sm:object-center rounded-t-lg"
              />
            </div>
            <div className="p-2 sm:p-4 text-center">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.position}</p>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  )
}