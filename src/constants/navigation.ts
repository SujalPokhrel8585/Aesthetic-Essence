// Site-wide navigation routes and menu links.

export interface NavItem {
  title: string;
  href: string;
}

export interface FooterMenuItem {
  title: string;
  links: {
    text: string;
    url: string;
    external?: boolean;
  }[];
}

export const NAV_LINKS: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Gallery", href: "/gallery" },
  { title: "About Us", href: "/about" },
  { title: "Doctors", href: "/doctors" },
  { title: "Contact", href: "/contact" },
];

export const SERVICE_LINKS: NavItem[] = [
  { title: "Facial Treatments", href: "/services?group=facial" },
  { title: "Hair Solutions", href: "/services?group=hair" },
  { title: "Skin Corrections", href: "/services?group=skin" },
  { title: "Anti-Aging", href: "/services?group=anti-aging" },
];

export const DEFAULT_FOOTER_MENU_ITEMS: FooterMenuItem[] = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "/" },
      { text: "Services", url: "/services" },
      { text: "Gallery", url: "/gallery" },
      { text: "About Us", url: "/about" },
      { text: "Doctors", url: "/doctors" },
      { text: "Contact", url: "/contact" },
      { text: "Book Appointment", url: "/book" },
    ],
  },
  {
    title: "Connect",
    links: [
      {
        text: "Facebook",
        url: "https://www.facebook.com/ae.ktm/#",
        external: true,
      },
      {
        text: "Instagram",
        url: "https://www.instagram.com/aeskinandhair___/",
        external: true,
      },
      {
        text: "TikTok",
        url: "https://www.tiktok.com/@aeskinhairclinic",
        external: true,
      },
      {
        text: "Google Maps",
        url: "https://maps.app.goo.gl/2NXCkgZ65D6Z722y9",
        external: true,
      },
      {
        text: "WhatsApp",
        url: "https://wa.me/9779765974518",
        external: true,
      },
    ],
  },
];
