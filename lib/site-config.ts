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
    subtitle: "We create custom web solutions and bespoke digital products for forward-thinking businesses.",
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
  footer: {
    socialLinks: {
      facebook: "#",
      instagram: "#",
      youtube: "#",
    },
  },
};
