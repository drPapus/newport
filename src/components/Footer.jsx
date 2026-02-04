const Footer = () => {
  return (
    <footer className="w-full py-6 px-6 text-sm text-secondary text-center border-t border-white/10">
      <p className="mb-2">
        © {new Date().getFullYear()} Anton — WebGL / Three.js Developer
      </p>

      <p className="opacity-70">
        3D models used on this site:
        <br />
        “Spider Robot attacking hand” by GR-video ·
        <a
          href="https://sketchfab.com/3d-models/spider-robot-attacking-hand-8135b7dc81414546aacae49491f8bbf1"
          target="_blank"
          rel="noopener noreferrer"
          className="underline ml-1"
        >
          Sketchfab
        </a>{" "}
        (CC BY)
        <br />
        “Crawling robotic spider” by OuterSpaceSoftware ·
        <a
          href="https://sketchfab.com/3d-models/crawling-robotic-spider-90dbaa3142a044698ef549f3545bbcd0"
          target="_blank"
          rel="noopener noreferrer"
          className="underline ml-1"
        >
          Sketchfab
        </a>{" "}
        (CC BY)
      </p>
    </footer>
  );
};

export default Footer;
