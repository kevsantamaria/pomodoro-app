function Footer() {
  return (
    <footer className="font-pixel fixed bottom-2 left-2 w-full text-[var(--accent)]">
      <span className="text-[10px] sm:text-xs">
        Made by{" "}
        <a
          href="https://github.com/kevsantamaria"
          className="font-bold underline cursor-pointer text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecorationThickness: "2px" }}
        >
          Kevin Santamaria
        </a>
      </span>
    </footer>
  );
}

export default Footer;
