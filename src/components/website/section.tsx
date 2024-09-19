import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const sectionVariants = cva(
  "py-14 w-full text-center",
  {
    variants: {
      variant: {
        default: "bg-white text-black",
        green: "bg-[#8BC34A] text-[#FFFDE7]"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface SectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof sectionVariants> {
  asChild?: boolean
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={cn(sectionVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Section.displayName = "Section"

const SectionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col justify-between items-center gap-y-7 container", className)}
    {...props}
  />
))
SectionContent.displayName = "SectionContent"

const SectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col justify-between items-center gap-y-7", className)}
    {...props}
  />
))
SectionHeader.displayName = "SectionHeader"

const SectionTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-[64px] font-bold text-[#1B5E20]",
      className
    )}
    {...props}
  />
))
SectionTitle.displayName = "SectionTitle"

const SectionSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-xl",
      className
    )}
    {...props}
  />
))
SectionSubtitle.displayName = "SectionSubtitle"

const SectionDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-base w-3/4 xl:w-1/2",
      className
    )}
    {...props}
  />
))
SectionDescription.displayName = "SectionDescription"

export { Section, SectionContent, SectionDescription, SectionHeader, SectionSubtitle, SectionTitle, sectionVariants }

