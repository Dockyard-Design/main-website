import {
  Search,
  LineSquiggle,
  ChartNoAxesColumn,
  Smartphone,
} from "lucide-react";

export const SITE_CONFIG = {
  general: {
    name: "Dockyard Design",
    email: "hello@dockyard.design",
    logoUrl: "/logo.svg",
  },
  navigation: {
    main: [
      { label: "Home", url: "/" },
      { label: "About", url: "/#about" },
      { label: "Services", url: "/#services" },
      { label: "Projects", url: "/projects" },
    ],
    other: [
      { label: "Legal", url: "#" },
      { label: "Policies", url: "#" },
      { label: "Contact us", url: "#" },
    ],
  },
  media: {
    aboutBackground: "/images/anchor.webp",
    footerBackground: "/images/anchor-footer.webp",
    heroBackground: "/hero.svg",
  },
  hero: {
    title: {
      text: "UNIQUE WEB PRODUCTS FOR YOUR BUSINESS",
      highlighted: [
        { text: "UNIQUE", color: "text-blue" },
        { text: "YOUR BUSINESS", color: "text-pink" },
      ],
    },
    subtitle:
      "We create custom web solutions and bespoke digital products for forward-thinking businesses.",
    cta: {
      primary: {
        text: "GET IN TOUCH",
        link: "/contact",
      },
      secondary: {
        text: "or read more below...",
        link: "#about",
      },
    },
  },
  about: {
    team: [
      {
        name: "Finlay Rohrbasser",
        role: "Designer",
        photo: "/images/finlay.webp",
        rotation: "-10",
        animationDelay: 0.15,
      },
      {
        name: "Frederico Garcia",
        role: "Developer",
        photo: "/images/frederico.webp",
        rotation: "10",
        animationDelay: 0.15,
      },
    ],
    content: {
      title: "WE ARE DOCKYARD",
      subtitle: "Two specialists - One seamless vision",
      description:
        "We are a collaborative duo of freelance experts in design and development. By pairing our individual strengths in UI/UX, Graphic Design, Animation, and Web Development, we've created a streamlined workflow that puts your project first. When you work with us, you aren't just another ticket in a system— you're partnering directly with the two specialists responsible for your brand's digital success.",
    },
    cta: {
      headline: "ARE YOU READY FOR YOUR NEW WEBSITE?",
      buttonText: "GET IN TOUCH",
      buttonLink: "/contact",
    },
  },
  services: [
    {
      title: "Search Engine Optimization (SEO)",
      description:
        "Improve your website's visibility and ranking on search engines to attract more organic traffic. Basic SEO Setup provided with every project.",
      cardColor: "#FF312E",
      iconGradientStart: "#FF1616",
      iconGradientEnd: "#FF5656",
      icon: <Search size={64} />,
    },
    {
      title: "Branding & Logo Design",
      description:
        "Creating unique brand identities and memorable logos that represent your business. We work closely with you to understand your vision and craft a visual identity that resonates with your target audience.",
      cardColor: "#88FF00",
      iconGradientStart: "#509600",
      iconGradientEnd: "#7DBF30",
      icon: <LineSquiggle size={64} />,
    },
    {
      title: "Google Analytics Setup",
      description:
        "Set up Google Analytics to track your website's performance and gain insights into user behavior. Basic Analytics Setup provided with every project.",
      cardColor: "#EA00FF",
      iconGradientStart: "#DE23EE",
      iconGradientEnd: "#E765F3",
      icon: <ChartNoAxesColumn size={64} />,
    },
    {
      title: "Mobile App Development",
      description:
        "Creating user-friendly mobile applications for iOS and Android platforms. We build responsive and intuitive apps that provide a seamless user experience across all devices.",
      cardColor: "#00CFFF",
      iconGradientStart: "#0099CC",
      iconGradientEnd: "#00BFFF",
      icon: <Smartphone size={64} />,
    },
  ],
  footer: {
    socialLinks: {
      facebook: "#",
      instagram: "#",
      youtube: "#",
    },
  },
};
