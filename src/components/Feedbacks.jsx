import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// Tech stack data (simple and honest)
const techStack = [
  {
    title: "Three.js",
    description:
      "Scene setup, materials, lighting, animation, and performance-minded rendering in the browser.",
  },
  {
    title: "React Three Fiber",
    description:
      "Building 3D experiences as React components: clean structure, reusable scene logic, and UI integration.",
  },
  {
    title: "PlayCanvas",
    description:
      "Gameplay UI and interaction logic for browser-based experiences with a focus on smooth performance.",
  },
  {
    title: "WebGL / GLSL",
    description:
      "Custom shaders and low-level rendering basics when I need more control over visuals and performance.",
  },
];

// Card component (replaces FeedbackCard)
const TechCard = ({ index, title, description }) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.15, 0.75)}
    className="bg-black-200 p-8 rounded-3xl xs:w-[320px] w-full"
  >
    {/* Title */}
    <h3 className="text-white font-semibold text-[18px]">{title}</h3>

    {/* Description */}
    <p className="mt-3 text-secondary text-[14px] leading-[22px]">
      {description}
    </p>
  </motion.div>
);

const TechStack = () => {
  return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
      {/* Header */}
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[220px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What I work with</p>
          <h2 className={styles.sectionHeadText}>Tech stack.</h2>
        </motion.div>
      </div>

      {/* Cards */}
      <div className={`-mt-16 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {techStack.map((item, index) => (
          <TechCard key={item.title} index={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(TechStack, "");
