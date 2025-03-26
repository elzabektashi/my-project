import Link from "next/link";
import { Truck, Facebook, Twitter, Github, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 py-12 md:py-16 text-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo + Description + Social */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Truck className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold">LogiFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Streamlining logistics operations for businesses of all sizes.
            </p>
            <div className="flex gap-4 text-muted-foreground">
              <Link href="#" className="hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <Globe className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Footer Sections */}
          <FooterColumn
            title="Product"
            links={[
              "Features",
              "Pricing",
              "Integrations",
              "Changelog",
              "Roadmap",
            ]}
            baseUrl="/"
          />
          <FooterColumn
            title="Resources"
            links={[
              "Blog",
              "Documentation",
              "Guides",
              "Help Center",
              "API Reference",
            ]}
            baseUrl="/"
          />
          <FooterColumn
            title="Company"
            links={[
              "About",
              "Customers",
              "Careers",
              "Contact",
              "Privacy Policy",
            ]}
            baseUrl="/"
          />
        </div>

        {/* Bottom row */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LogiFlow. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:text-white transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  baseUrl,
}: {
  title: string;
  links: string[];
  baseUrl: string;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-white">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link}>
            <Link
              href={`${baseUrl}${link.toLowerCase().replace(/\s/g, "-")}`}
              className="text-muted-foreground hover:text-white transition-colors"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
