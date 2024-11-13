import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

const NavLink = ({ href, children, className, active = false }: NavLinkProps) => {
  return (
    <Link 
      href={href} 
      className={cn(
        "relative group",
        active && "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white",
        className
      )}
    >
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
    </Link>
  );
};

export default NavLink; 