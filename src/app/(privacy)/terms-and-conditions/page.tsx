import { Separator } from "@/components/ui/separator"

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-6 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Terms and Conditions of Football Hub</h1>
      
      <nav className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Table of Contents</h2>
        <ul className="space-y-2">
          <li><a href="#introductory-provisions" className="text-primary hover:text-muted-foreground transition-colors">1. Introductory Provisions</a></li>
          <li><a href="#website-content" className="text-primary hover:text-muted-foreground transition-colors">2. Website Content</a></li>
          <li><a href="#service-contract" className="text-primary hover:text-muted-foreground transition-colors">3. Formalization of a Service Contract</a></li>
          <li><a href="#user-account" className="text-primary hover:text-muted-foreground transition-colors">4. User Account</a></li>
          <li><a href="#limitations-disclaimers" className="text-primary hover:text-muted-foreground transition-colors">5. Limitations and Disclaimers</a></li>
          <li><a href="#final-provisions" className="text-primary hover:text-muted-foreground transition-colors">6. Final Provisions</a></li>
        </ul>
      </nav>
      
      <section className="space-y-8">
        <div id="introductory-provisions">
          <h2 className="text-xl sm:text-2xl font-semibold">1. INTRODUCTORY PROVISIONS</h2>
          <Separator className="my-4" />
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Identification of the Parties</h3>
          <p className="mb-4">
            These Terms and Conditions (&quot;Terms&quot;) govern the mutual rights and obligations between Football Hub, a registered company based at Pasaje de las Gitanillas, N 2, Escalera D 2-1, 29620, Torremolinos (Málaga), Spain., and any third parties (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) who access and use our website (the &quot;Site&quot;).
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Applicability of the Terms</h3>
          <p>
            If you are an unregistered user, only the provisions related to the general use of the Site (particularly clauses 1, 2, and 10) will apply. For registered users, the entirety of these Terms will apply. We recommend reviewing clauses 3 through 12, as they form the service contract between registered users and us.
          </p>
        </div>
        
        <div id="website-content">
          <h2 className="text-xl sm:text-2xl font-semibold">2. WEBSITE CONTENT</h2>
          <Separator className="my-4" />
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Nature of the Service</h3>
          <p className="mb-4">
            The Site provides updated sports information, including real-time scores, match results, schedules, team line-ups, statistics, and related sports content. This data is sourced from independent third parties, internal efforts, or official applications. While we strive to ensure accurate and timely updates, we do not guarantee the completeness or accuracy of the information. Users are encouraged to verify details from original or additional sources.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Use at Your Own Risk</h3>
          <p className="mb-4">
            Accessing and using the Site, downloading software, or utilizing information provided on the Site is entirely at your discretion and risk. The Site is intended for personal use only and cannot be used for commercial purposes.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Registration and Paid Content</h3>
          <p className="mb-4">
            Certain features or areas of the Site require registration. Access to some functionalities may also depend on your age or involve a fee. Without registration, parts of the Site and its features may remain restricted.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Third-Party Content</h3>
          <p className="mb-4">
            We do not host, own, or control third-party content available on the Site. Such content, typically marked with appropriate third-party identifiers, remains the responsibility of its creators. We expressly disclaim liability for the accuracy, availability, or reliability of third-party content.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Advertisements</h3>
          <p className="mb-4">
            You acknowledge and agree that advertisements, including those from third parties, may be displayed on the Site.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Betting Information</h3>
          <p className="mb-4">
            The Site does not provide betting services or games. Betting odds shown are for informational purposes only and do not constitute advice or recommendations to participate in betting or gaming activities.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Local Laws</h3>
          <p className="mb-4">
            Users are advised to comply with all applicable laws and regulations of their country of residence or presence.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Content Rights</h3>
          <p className="mb-4">
            All texts, images, graphics, and other materials on the Site are protected under copyright laws. Reproducing, distributing, or making this content publicly available without explicit permission is prohibited.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Database Protection</h3>
          <p className="mb-4">
            The Site&apos;s database content is protected under applicable laws. Unauthorized extraction or use of substantial parts of the database is not allowed.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Prohibited Interference</h3>
          <p>
            Users must not engage in unauthorized activities that could disrupt the Site&apos;s functionality, including using automated tools or reverse engineering the Site without prior consent.
          </p>
        </div>
        
        <div id="service-contract">
          <h2 className="text-xl sm:text-2xl font-semibold">3. FORMALIZATION OF A SERVICE CONTRACT</h2>
          <Separator className="my-4" />
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Service Proposal</h3>
          <p className="mb-4">
            By completing and submitting the registration form, you propose to formalize a service contract. Football Hub reserves the right to verify the accuracy of the provided information.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Acceptance of the Proposal</h3>
          <p className="mb-4">
            Upon reviewing your registration, we will send confirmation to your email at <a href="mailto:info@footballhub.es" className="text-blue-600 hover:text-blue-800 transition-colors">info@footballhub.es</a>. Once accepted, the service contract is formalized.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Third-Party Login</h3>
          <p className="mb-4">
            If using third-party login services (e.g., Google or GitHub), the contract is formalized upon granting access to the Site.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Service Activation</h3>
          <p>
            The service begins immediately after the contract is formalized, even before the legal withdrawal period expires.
          </p>
        </div>
        
        <div id="user-account">
          <h2 className="text-xl sm:text-2xl font-semibold">4. USER ACCOUNT</h2>
          <Separator className="my-4" />
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Account Security</h3>
          <p className="mb-4">
            Your account is protected with a username and password. You are responsible for maintaining the confidentiality of your login details.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Account Restrictions</h3>
          <p>
            Football Hub may restrict or suspend your account if you breach these Terms or associated obligations.
          </p>
        </div>
        
        <div id="limitations-disclaimers">
          <h2 className="text-xl sm:text-2xl font-semibold">5. LIMITATIONS AND DISCLAIMERS</h2>
          <Separator className="my-4" />
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Service Interruptions</h3>
          <p className="mb-4">
            Access to the Site may be temporarily interrupted due to technical issues or maintenance. Football Hub is not liable for data loss or service degradation resulting from such interruptions.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Errors and Issues</h3>
          <p className="mb-4">
            You must notify us immediately if you encounter errors related to your account or the information presented on the Site.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Liability Limitation</h3>
          <p>
            Football Hub, its employees, and affiliates are not liable for any indirect, incidental, or consequential damages arising from the use of the Site.
          </p>
        </div>
        
        <div id="final-provisions">
          <h2 className="text-xl sm:text-2xl font-semibold">6. FINAL PROVISIONS</h2>
          <Separator className="my-4" />
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Jurisdiction</h3>
          <p className="mb-4">
            These Terms are governed by Spanish law, and any disputes will be resolved under the jurisdiction of Spanish courts.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Amendments</h3>
          <p className="mb-4">
            Football Hub may unilaterally amend these Terms. Users will be notified at least 30 days in advance before changes take effect.
          </p>
          
          <h3 className="text-lg sm:text-xl font-medium mb-2">Contact Information</h3>
          <p>
            For any queries, reach us at <a href="mailto:info@footballhub.es" className="text-blue-600 hover:text-blue-800 transition-colors">info@footballhub.es</a> or our registered address: Pasaje de las Gitanillas, N 2, Escalera D 2-1, 29620, Torremolinos (Málaga), Spain.
          </p>
        </div>
      </section>
      
      <footer className="mt-12 text-sm text-muted-foreground">
        <p>Last Updated: December 1, 2024</p>
        <p>Football Hub</p>
      </footer>
    </div>
  )
}