import { Code, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-red-800 text-white">
      <section className="flex flex-col justify-center items-center py-4">
        <span className="flex gap-2">
          Making with <Heart /> and <Code /> by <a href="#">Kevin Santamaria</a>
        </span>
      </section>
    </footer>
  );
}

export default Footer;
