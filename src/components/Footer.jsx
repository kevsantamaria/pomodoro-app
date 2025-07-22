import { Code, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="font-pixel fixed bottom-0 w-full text-[var(--accent)]">
        <span className="text-[10px] sm:text-xs flex gap-2 m-auto">
          Making with <Heart size={16}/> and <Code size={18} /> by <a href="#">Kevin Santamaria</a>
        </span>
    </footer>
  );
}

export default Footer;
