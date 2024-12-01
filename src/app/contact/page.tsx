import Image from "next/image"
import { ContactForm } from "./_components/ContactForm"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side content */}
      <div className="lg:w-2/5 p-8 lg:p-16 flex items-center justify-center bg-background">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
            Contact Us
          </h1>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Welcome to Football Hub, your premier destination for football statistics, live scores, and comprehensive match coverage.
            </p>
            <p>
              Have questions about our services? Want to report an issue? Or perhaps you'd like to suggest new features?
            </p>
            <p>
              We're here to help! Fill out the form and we'll get back to you as soon as possible.
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
            <div className="space-y-1 text-muted-foreground">
              <a href="mailto:info@footballhub.es" className="text-blue-600 hover:text-blue-800 transition-colors" >info@footballhub.es</a>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="lg:w-3/5 relative flex items-center justify-center min-h-[600px] lg:min-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/football-stadium.webp"
            alt="Football stadium"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 w-full max-w-xl mx-auto p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
