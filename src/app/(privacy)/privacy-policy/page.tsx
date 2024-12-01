import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-4xl py-6 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Privacy Policy of Football Hub</h1>
      
      <nav className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Table of Contents</h2>
        <ul className="space-y-2">
          <li><a href="#introduction" className="text-primary hover:text-muted-foreground transition-colors">1. Introduction</a></li>
          <li><a href="#controller" className="text-primary hover:text-muted-foreground transition-colors">2. Controller Identity and Contact Information</a></li>
          <li><a href="#data-processing" className="text-primary hover:text-muted-foreground transition-colors">3. Data Processing</a></li>
          <li><a href="#marketing" className="text-primary hover:text-muted-foreground transition-colors">4. Direct Marketing</a></li>
          <li><a href="#security" className="text-primary hover:text-muted-foreground transition-colors">5. Security Measures</a></li>
          <li><a href="#cookies" className="text-primary hover:text-muted-foreground transition-colors">6. Cookie Policy</a></li>
          <li><a href="#rights" className="text-primary hover:text-muted-foreground transition-colors">7. Your Rights</a></li>
          <li><a href="#modifications" className="text-primary hover:text-muted-foreground transition-colors">8. Policy Updates</a></li>
        </ul>
      </nav>
      
      <section className="space-y-8">
        <div id="introduction">
          <h2 className="text-xl sm:text-2xl font-semibold">1. INTRODUCTION</h2>
          <Separator className="my-4" />
          <p className="mb-4">
            Football Hub (&quot;we&quot; or &quot;our&quot;) respects the privacy of its users (&quot;you&quot; or &quot;your&quot;). This Privacy Policy explains how we collect, use, disclose, and protect your personal data in connection with our website (&quot;Website&quot;). We process your personal data when you use our Website, register an account, engage in direct marketing communications, or allow HTTP cookies on your device.
          </p>
        </div>

        <div id="controller">
          <h2 className="text-xl sm:text-2xl font-semibold">2. CONTROLLER IDENTITY AND CONTACT INFORMATION</h2>
          <Separator className="my-4" />
          <p className="mb-4">
            We, Football Hub, located at Pasaje de las Gitanillas, N 2, Escalera D 2-1, are the controllers of your personal data. For inquiries, you can contact us via email at{' '}
            <a href="mailto:info@footballhub.es" className="text-primary hover:text-primary/80 transition-colors">
              info@footballhub.es
            </a>.
          </p>
        </div>

        <div id="data-processing">
          <h2 className="text-xl sm:text-2xl font-semibold">3. DATA PROCESSING</h2>
          <Separator className="my-4" />
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Purpose of Data Collection</h3>
          <p className="mb-4">We process your personal data for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To create and manage your user account (e.g., email, age, preferences)</li>
            <li>To ensure the technical functionality and security of the Website</li>
            <li>To comply with legal obligations, particularly those related to financial, accounting, and advertising regulations</li>
          </ul>

          <h3 className="text-lg sm:text-xl font-medium mb-2">Legal Basis</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Contractual necessity for user registration</li>
            <li>Legitimate interest to ensure the proper functioning and optimization of the Website</li>
            <li>Compliance with legal obligations under applicable laws</li>
          </ul>

          <h3 className="text-lg sm:text-xl font-medium mb-2">Retention Period</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Contractual data is retained for three (3) years after contract termination</li>
            <li>Technical data is retained for one (1) month after Website use if no account is created</li>
          </ul>
        </div>

        <div id="marketing">
          <h2 className="text-xl sm:text-2xl font-semibold">4. DIRECT MARKETING</h2>
          <Separator className="my-4" />
          <p className="mb-4">
            If you have registered on the Website, we may send you promotional communications about similar services. This processing is based on our legitimate interest, as permitted under applicable laws.
          </p>
          <h3 className="text-lg sm:text-xl font-medium mb-2">Retention Period</h3>
          <p className="mb-4">
            Marketing data will be processed for three (3) years unless you withdraw consent or object to the processing.
          </p>
        </div>

        <div id="security">
          <h2 className="text-xl sm:text-2xl font-semibold">5. SECURITY MEASURES</h2>
          <Separator className="my-4" />
          <p className="mb-4">
            We implement administrative, technical, and physical safeguards to protect your personal data, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Access controls and authentication measures</li>
            <li>Employee training on data protection</li>
            <li>Incident response procedures</li>
          </ul>
        </div>

        <div id="cookies">
          <h2 className="text-xl sm:text-2xl font-semibold">6. COOKIE POLICY</h2>
          <Separator className="my-4" />
          <p className="mb-4">
            Our Website uses cookies and similar technologies to enhance your browsing experience. These include:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Essential cookies for website functionality</li>
            <li>Analytics cookies to understand user behavior</li>
            <li>Preference cookies to remember your settings</li>
            <li>Marketing cookies for targeted advertising</li>
          </ul>
          <p className="mb-4">
            You can manage your cookie preferences through your browser settings at any time.
          </p>
        </div>

        <div id="rights">
          <h2 className="text-xl sm:text-2xl font-semibold">7. YOUR RIGHTS</h2>
          <Separator className="my-4" />
          <p className="mb-4">Under applicable data protection laws, you have the right to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, please contact us at{' '}
            <a href="mailto:info@footballhub.es" className="text-primary hover:text-primary/80 transition-colors">
              info@footballhub.es
            </a>
          </p>
        </div>

        <div id="modifications">
          <h2 className="text-xl sm:text-2xl font-semibold">8. POLICY UPDATES</h2>
          <Separator className="my-4" />
          <p className="mb-4">
            We reserve the right to update this Privacy Policy. Any changes will be communicated via the Website or email. Continued use of the Website after such modifications constitutes acceptance of the updated Privacy Policy.
          </p>
        </div>
      </section>
      
      <footer className="mt-12 text-sm text-muted-foreground">
        <p>Last Updated: December 1, 2024</p>
        <p>Football Hub</p>
        <p className="mt-2">
          For any privacy-related queries, please contact us at{' '}
          <a href="mailto:info@footballhub.es" className="text-primary hover:text-primary/80 transition-colors">
            info@footballhub.es
          </a>
        </p>
      </footer>
    </div>
  )
}