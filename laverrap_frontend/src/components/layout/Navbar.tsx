import { NAVBAR_LINKS } from "@/utils/consts";
import { Link, useLocation } from "react-router";

export const Navbar = () => {
  const { pathname} = useLocation();
  return (
    <nav>
      <ul className="flex items-center gap-x-4">
        {
          NAVBAR_LINKS.map((link) => (
            <li key={link.id}>
              <Link to={link.path} title={link.title} className={`flex items-center gap-x-1 border px-4 py-2 rounded text-sm ${pathname === link.path ? "bg-primary text-slate-100" : "hover:bg-gray-200"}`}>
                <link.icon size={20} />
                {link.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};