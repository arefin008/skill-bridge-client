// "use client";

// import { Menu } from "lucide-react";

// import { cn } from "@/lib/utils";

// import { Accordion } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import Link from "next/link";
// import { ModeToggle } from "./ModeToggle";

// interface MenuItem {
//   title: string;
//   url: string;
//   description?: string;
//   icon?: React.ReactNode;
//   items?: MenuItem[];
// }

// interface Navbar1Props {
//   className?: string;
//   logo?: {
//     url: string;
//     src: string;
//     alt: string;
//     title: string;
//     className?: string;
//   };
//   menu?: MenuItem[];
//   auth?: {
//     login: {
//       title: string;
//       url: string;
//     };
//     signup: {
//       title: string;
//       url: string;
//     };
//   };
// }

// const Navbar = ({
//   logo = {
//     url: "/",
//     src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
//     alt: "logo",
//     title: "Next Blog",
//   },
//   menu = [
//     { title: "Home", url: "/" },
//     {
//       title: "Blogs",
//       url: "/blogs",
//     },
//     {
//       title: "About",
//       url: "/about",
//     },
//     {
//       title: "Dashboard",
//       url: "/dashboard",
//     },
//   ],
//   auth = {
//     login: { title: "Login", url: "/login" },
//     signup: { title: "Register", url: "/register" },
//   },
//   className,
// }: Navbar1Props) => {
//   return (
//     <section className={cn("py-4 ", className)}>
//       <div className="container mx-auto px-4">
//         {/* Desktop Menu */}
//         <nav className="hidden items-center justify-between lg:flex">
//           <div className="flex items-center gap-6">
//             {/* Logo */}
//             <a href={logo.url} className="flex items-center gap-2">
//               <img
//                 src={logo.src}
//                 className="max-h-8 dark:invert"
//                 alt={logo.alt}
//               />
//               <span className="text-lg font-semibold tracking-tighter">
//                 {logo.title}
//               </span>
//             </a>
//             <div className="flex items-center">
//               <NavigationMenu>
//                 <NavigationMenuList>
//                   {menu.map((item) => renderMenuItem(item))}
//                 </NavigationMenuList>
//               </NavigationMenu>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <ModeToggle />
//             <Button asChild variant="outline" size="sm">
//               <Link href={auth.login.url}>{auth.login.title}</Link>
//             </Button>
//             <Button asChild size="sm">
//               <Link href={auth.signup.url}>{auth.signup.title}</Link>
//             </Button>
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         <div className="block lg:hidden">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <a href={logo.url} className="flex items-center gap-2">
//               <img
//                 src={logo.src}
//                 className="max-h-8 dark:invert"
//                 alt={logo.alt}
//               />
//             </a>
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="outline" size="icon">
//                   <Menu className="size-4" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent className="overflow-y-auto">
//                 <SheetHeader>
//                   <SheetTitle>
//                     <a href={logo.url} className="flex items-center gap-2">
//                       <img
//                         src={logo.src}
//                         className="max-h-8 dark:invert"
//                         alt={logo.alt}
//                       />
//                     </a>
//                   </SheetTitle>
//                 </SheetHeader>
//                 <div className="flex flex-col gap-6 p-4">
//                   <Accordion
//                     type="single"
//                     collapsible
//                     className="flex w-full flex-col gap-4"
//                   >
//                     {menu.map((item) => renderMobileMenuItem(item))}
//                   </Accordion>

//                   <div className="flex flex-col gap-3">
//                     <Button asChild variant="outline">
//                       <Link href={auth.login.url}>{auth.login.title}</Link>
//                     </Button>
//                     <Button asChild>
//                       <Link href={auth.signup.url}>{auth.signup.title}</Link>
//                     </Button>
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const renderMenuItem = (item: MenuItem) => {
//   return (
//     <NavigationMenuItem key={item.title}>
//       <NavigationMenuLink
//         asChild
//         className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
//       >
//         <Link href={item.url}>{item.title}</Link>
//       </NavigationMenuLink>
//     </NavigationMenuItem>
//   );
// };

// const renderMobileMenuItem = (item: MenuItem) => {
//   return (
//     <Link key={item.title} href={item.url} className="text-md font-semibold">
//       {item.title}
//     </Link>
//   );
// };

// export { Navbar };

"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";

interface NavItem {
  title: string;
  href: string;
}

interface NavbarProps {
  className?: string;
}

const NAV_ITEMS: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Blogs", href: "/blogs" },
  { title: "About", href: "/about" },
  { title: "Dashboard", href: "/dashboard" },
];

const Navbar = ({ className }: NavbarProps) => {
  return (
    <header className={cn("border-b", className)}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
            alt="logo"
            className="h-8 w-8 dark:invert"
          />
          <span className="text-lg font-semibold">Next Blog</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-2 lg:flex">
          <ModeToggle />
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                <Link href="/" className="flex items-center gap-2">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                    alt="logo"
                    className="h-8 w-8 dark:invert"
                  />
                  <span>Next Blog</span>
                </Link>
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-sm font-medium"
                >
                  {item.title}
                </Link>
              ))}

              <div className="mt-6 flex flex-col gap-3">
                <Button asChild variant="outline">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export { Navbar };
