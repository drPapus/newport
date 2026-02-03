import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  df,
  methriaum,
  sidus,
  up,
  sidusheroes,
  hex,
  design,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Frontend Developer (Three.js / React)",
    company_name: "DesignFiles",
    icon: df,
    iconBg: "#2C2F4A",
    date: "Apr 2023 – Jan 2024",
    points: [
      "Built interactive and performant UI components using React and Three.js.",
      "Worked closely with designers to translate UI/UX concepts into production-ready interfaces.",
      "Improved frontend code structure, readability, and long-term maintainability.",
      "Participated in sprint planning, UX reviews, and iterative feature development.",
    ],
  },
  {
    title: "Three.js Developer",
    company_name: "Mithraeum",
    icon: methriaum,
    iconBg: "#383E56",
    date: "May 2022 – Apr 2023",
    points: [
      "Developed browser-based 3D scenes and interactive elements using Three.js and WebGL.",
      "Implemented game-related interactions based on design and product requirements.",
      "Focused on rendering performance and smooth real-time user experience.",
    ],
  },
  {
    title: "JavaScript Developer",
    company_name: "SIDUS NFT Heroes",
    icon: sidus,
    iconBg: "#1E1E2F",
    date: "Feb 2022 – May 2022",
    points: [
      "Worked on gameplay UI and interaction logic using PlayCanvas.",
      "Optimized rendering and user interactions for stable browser performance.",
      "Collaborated with designers and developers in a fast-paced production environment.",
    ],
  },
  {
    title: "Freelance Frontend Developer / Webmaster",
    company_name: "Self-employed",
    icon: up,
    iconBg: "#2D2E3A",
    date: "2013 – 2022",
    points: [
      "Delivered custom websites and small web applications for local businesses.",
      "Built responsive layouts and integrated CMS solutions such as WordPress and OpenCart.",
      "Worked directly with clients to gather requirements and deliver practical solutions.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "SIDUS",
    description:
      "Browser-based game UI and interactions. Developed using PlayCanvas and JavaScript, focusing on performance and user experience.",
    tags: [
      {
        name: "PlayCanvas",
        color: "blue-text-gradient",
      },
      {
        name: "JS",
        color: "green-text-gradient",
      },
      {
        name: "Blender",
        color: "pink-text-gradient",
      },
    ],
    image: sidusheroes,
    source_code_link: "https://sidusheroes.com/",
  },
  {
    name: "Hexagonal Map Generator",
    description:
      "Web application that generates and visualizes hexagonal maps for game development and geographic data visualization.",
    tags: [
      {
        name: "Three.js",
        color: "blue-text-gradient",
      },
      {
        name: "TS",
        color: "green-text-gradient",
      },
      {
        name: "Blender",
        color: "pink-text-gradient",
      },
    ],
    image: hex,
    source_code_link: "https://drpapus.github.io/Hexagonal-map/",
  },
  {
    name: "Designfiles",
    description:
      "Simple, intuitive tools that won’t take months to learn Detailed video tutorials to help you every step of the way Browse over 500K products or add your own",
    tags: [
      {
        name: "Three.js",
        color: "blue-text-gradient",
      },
      {
        name: "React.js",
        color: "green-text-gradient",
      },
      {
        name: "Blender",
        color: "pink-text-gradient",
      },
    ],
    image: design,
    source_code_link: "https://designfiles.co/",
  },
];

export { services, technologies, experiences, testimonials, projects };
