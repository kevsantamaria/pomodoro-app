import { Code, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="font-pixel text-xs fixed bottom-0 w-full text-gray-900">
      <section className="flex flex-col justify-center items-center py-4">
        <span className="flex gap-2">
          Making with <Heart size={16}/> and <Code size={18} /> by <a href="#">Kevin Santamaria</a>
        </span>
      </section>
    </footer>
  );
}

export default Footer;
