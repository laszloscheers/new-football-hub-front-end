"use client";

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes";
import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { FaFacebook } from "react-icons/fa";

const SiteFooter = () => {
  const { resolvedTheme } = useTheme()

  return (
    <footer className="w-full border-t bg-background">
      <div className="container grid grid-cols-1 gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:px-8">
        {/* Logo Section */}
        <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1">
          <Link href="/" className="flex items-center space-x-2">
          <Image src={resolvedTheme === 'dark' ? "/assets/images/football-hub-logo-dark.svg" : "/assets/images/football-hub-logo.svg"} alt="Football Hub site Logo" width={192} height={42} />
          </Link>
        </div>

        {/* Leagues Section */}
        <div className="space-y-4 sm:col-span-2 md:col-span-1">
          <h3 className="text-lg font-semibold">Leagues</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/leagues/premier-league" className="text-muted-foreground hover:text-primary">
                Premier League
              </Link>
            </li>
            <li>
              <Link href="/leagues/la-liga" className="text-muted-foreground hover:text-primary">
                La Liga
              </Link>
            </li>
            <li>
              <Link href="/leagues/bundesliga" className="text-muted-foreground hover:text-primary">
                Bundesliga
              </Link>
            </li>
            <li>
              <Link href="/leagues/serie-a" className="text-muted-foreground hover:text-primary">
                Serie A
              </Link>
            </li>
            <li>
              <Link href="/leagues/ligue-1" className="text-muted-foreground hover:text-primary">
                Liege 1
              </Link>
            </li>
            <li>
              <Link href="/leagues/efl-championship" className="text-muted-foreground hover:text-primary">
                EFL Championship
              </Link>
            </li>
          </ul>
        </div>

        {/* About Us Section */}
        <div className="space-y-4 sm:col-span-2 md:col-span-1">
          <h3 className="text-lg font-semibold">About Us</h3>
          <ul className="space-y-2">
            <li>
              <Link href="our-manifesto" className="text-muted-foreground hover:text-primary">
                Our Manifesto
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="space-y-4 sm:col-span-2 md:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold">Contact</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </li>
            <li className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <InstagramLogoIcon className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <LinkedInLogoIcon className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <FaFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <TwitterLogoIcon className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t">
        <div className="container flex flex-col gap-4 px-4 py-6 text-center sm:px-6 md:flex-row md:justify-between md:text-left lg:px-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}  <a href="laszloscheers.com">Laszlo Scheers</a>. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 md:justify-end">
            <Link href="/terms-and-conditions" className="text-sm text-muted-foreground hover:text-primary">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/cookies-policy" className="text-sm text-muted-foreground hover:text-primary">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter;