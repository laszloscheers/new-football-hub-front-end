import { Separator } from "@/components/ui/separator"

export default function CookiesPage() {
  return (
    <div className="container max-w-4xl py-6 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Cookie Policy</h1>
      
      <nav className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Table of Contents</h2>
        <ul className="space-y-2">
          <li><a href="#introduction" className="text-primary hover:text-primary-foreground transition-colors">Introduction</a></li>
          <li><a href="#types-of-cookies" className="text-primary hover:text-primary-foreground transition-colors">1. Types of Cookies Used</a></li>
          <li><a href="#consent-and-configuration" className="text-primary hover:text-primary-foreground transition-colors">2. Consent and Configuration</a></li>
          <li><a href="#data-processing" className="text-primary hover:text-primary-foreground transition-colors">3. Data Processing Through Cookies</a></li>
          <li><a href="#your-rights" className="text-primary hover:text-primary-foreground transition-colors">4. Your Rights</a></li>
          <li><a href="#modifications" className="text-primary hover:text-primary-foreground transition-colors">5. Modifications to the Cookie Policy</a></li>
        </ul>
      </nav>
      
      <section className="space-y-8">
        <div id="introduction">
          <h2 className="text-xl sm:text-2xl font-semibold">Introduction</h2>
          <Separator className="my-4" />
          <p className="text-sm sm:text-base">
            Football Hub uses cookies to enhance user experience on our Website. Cookies are small files stored on your device when you visit the Website.
          </p>
        </div>
        
        <div id="types-of-cookies">
          <h2 className="text-xl sm:text-2xl font-semibold">1. Types of Cookies Used</h2>
          <Separator className="my-4" />
          <p className="text-sm sm:text-base mb-4">
            We use the following types of cookies:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
            <li><strong>Essential Cookies:</strong> Necessary for the Website's functionality.</li>
            <li><strong>Analytics Cookies:</strong> To analyze user behavior and improve the Website.</li>
          </ul>
        </div>
        
        <div id="consent-and-configuration">
          <h2 className="text-xl sm:text-2xl font-semibold">2. Consent and Configuration</h2>
          <Separator className="my-4" />
          <p className="text-sm sm:text-base">
            Upon accessing the Website, you will be prompted to consent to cookies through a cookie banner. You can modify your cookie preferences or withdraw consent at any time through the settings provided on the Website.
          </p>
        </div>
        
        <div id="data-processing">
          <h2 className="text-xl sm:text-2xl font-semibold">3. Data Processing Through Cookies</h2>
          <Separator className="my-4" />
          <h3 className="text-lg font-medium mb-2">Purpose</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base mb-4">
            <li>To ensure the Website's functionality and optimize its performance.</li>
            <li>To analyze user interactions for improvement purposes.</li>
          </ul>
          <h3 className="text-lg font-medium mb-2">Legal Basis</h3>
          <p className="text-sm sm:text-base mb-4">
            Your explicit consent, as per applicable data protection laws.
          </p>
          <h3 className="text-lg font-medium mb-2">Retention Period</h3>
          <p className="text-sm sm:text-base">
            Cookie data is retained based on the type of cookie. Detailed information about the duration is provided in the cookie settings section of the Website.
          </p>
        </div>
        
        <div id="your-rights">
          <h2 className="text-xl sm:text-2xl font-semibold">4. Your Rights</h2>
          <Separator className="my-4" />
          <p className="text-sm sm:text-base">
            You may request access to or deletion of your cookie-related data. You also have the right to withdraw consent at any time without affecting the lawfulness of processing prior to withdrawal.
          </p>
        </div>
        
        <div id="modifications">
          <h2 className="text-xl sm:text-2xl font-semibold">5. Modifications to the Cookie Policy</h2>
          <Separator className="my-4" />
          <p className="text-sm sm:text-base">
            This Cookie Policy may be updated to reflect changes in laws or practices. Updates will be communicated on the Website.
          </p>
        </div>
      </section>
      
      <footer className="mt-12 text-sm text-muted-foreground">
        <p>For any questions about these policies, please contact us at <a href="mailto:info@footballhub.es" className="text-blue-600 hover:text-blue-800 transition-colors" >info@footballhub.es</a>.</p>
        <p className="mt-4">Last Updated: December 1, 2024</p>
        <p>Football Hub</p>
      </footer>
    </div>
  )
}