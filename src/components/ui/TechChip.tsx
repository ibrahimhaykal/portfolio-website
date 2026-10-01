import type { IconType } from "react-icons";
import { FaLaravel, FaPhp, FaNodeJs, FaReact, FaJs, FaPython, FaFigma, FaGitAlt, FaDocker, FaDatabase } from "react-icons/fa";
import {
  SiPostgresql, SiOracle, SiMysql, SiNextdotjs, SiTypescript,
  SiTailwindcss, SiKotlin, SiDaisyui, SiBootstrap, SiPusher
} from "react-icons/si";

const ICONS: Record<string, IconType> = {
  Laravel: FaLaravel, PHP: FaPhp, "Node.js": FaNodeJs, React: FaReact, JavaScript: FaJs,
  Python: FaPython, Figma: FaFigma, Git: FaGitAlt, Docker: FaDocker, Database: FaDatabase,
  PostgreSQL: SiPostgresql, Oracle: SiOracle, MySQL: SiMysql, "Next.js": SiNextdotjs,
  TypeScript: SiTypescript, "Tailwind CSS": SiTailwindcss, Kotlin: SiKotlin,
  DaisyUI: SiDaisyui, Bootstrap: SiBootstrap, Pusher: SiPusher,
};

export default function TechChip({ name }: { name: string }) {
  const Icon = ICONS[name];
  return (
    <span className="chip">
      {Icon && <Icon aria-hidden="true" />}
      {name}
    </span>
  );
}
