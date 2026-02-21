import { cn } from "@/lib/utils";
import Link from "next/link";

import { Logo, LogoImage, LogoText } from "@/components/ui/logo";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "SkillBridge Logo",
    title: "SkillBridge",
    url: "/",
  },
  className,
  tagline = "Connect with Expert Tutors. Learn anything, anywhere.",
  menuItems = [
    {
      title: "Platform",
      links: [
        { text: "Browse Tutors", url: "/tutors" },
        { text: "Become a Tutor", url: "/register" },
        { text: "How it Works", url: "#" },
        { text: "Pricing", url: "#" },
      ],
    },
    {
      title: "Subjects",
      links: [
        { text: "Programming", url: "/tutors?search=Programming" },
        { text: "Design", url: "/tutors?search=Design" },
        { text: "Languages", url: "/tutors?search=Languages" },
        { text: "Business", url: "/tutors?search=Business" },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "Help Center", url: "#" },
        { text: "Safety", url: "#" },
        { text: "Contact Us", url: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Privacy Policy", url: "#" },
        { text: "Terms of Service", url: "#" },
        { text: "Cookie Policy", url: "#" },
      ],
    },
  ],
  copyright = "© 2026 SkillBridge. All rights reserved.",
  bottomLinks = [
    { text: "Security", url: "#" },
    { text: "Status", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className={cn("py-20 border-t bg-muted/30", className)}>
      <div className="max-w-7xl mx-auto px-4">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Logo url="https://shadcnblocks.com">
                  <LogoImage
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-10 dark:invert"
                  />
                  <LogoText className="text-xl">{logo.title}</LogoText>
                </Logo>
              </div>
              <p className="mt-4 font-semibold">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <Link href={link.url}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
                  <Link href={link.url}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
