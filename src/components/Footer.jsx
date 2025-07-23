function Footer() {
  return (
    <footer className="font-pixel fixed bottom-2 left-2 w-full text-[var(--accent)]">
      <span className="text-[10px] sm:text-xs">
        Made by{" "}
        <a
          href="https://github.com/kevsantamaria"
          className="font-bold hover:underline active:underline cursor-pointer text-blue-500"
        >
          Kevin Santamaria
        </a>
      </span>
    </footer>
  );
}

export default Footer;
