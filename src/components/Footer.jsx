import { Code, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="font-pixel absolute bottom-2 w-full text-[var(--accent)]">
        <span className="text-[10px] sm:text-xs flex gap-2 items-center justify-center">
          Made by <a href="#" className="font-bold hover:underline active:underline cursor-pointer">Kevin Santamaria</a>
        </span>
    </footer>
  );
}

export default Footer;
