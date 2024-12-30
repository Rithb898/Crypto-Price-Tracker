import useTheme from "../../context/theme";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { themeMode, lightTheme, darkTheme } = useTheme();
  const onChangeBtn = (e) => {
    if (themeMode === "dark") {
      lightTheme();
    } else {
      darkTheme();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 pb-5">
        <Link to="/" className="text-lg font-semibold md:text-3xl md:font-bold">
          CryptoTracker <span className="text-cyan-500">.</span>{" "}
        </Link>
        <div className="flex items-center justify-center gap-4 text-xl">
          <div className="cursor-pointer px-1 md:px-2" onClick={onChangeBtn}>
            {themeMode === "dark" ? <Sun size={25} /> : <Moon size={25} />}
          </div>
          <div className="hidden items-center justify-center gap-4 md:flex">
            <Link to="/">Home</Link>
            <Link to="/crypto">Crypto</Link>
            <Link to="/trending">Trending</Link>
            <Link to="/favorites">Favorite</Link>
          </div>
          <div className="flex md:hidden">
            {isOpen ? (
              <X size={30} onClick={() => setIsOpen(false)} />
            ) : (
              <Menu size={30} onClick={() => setIsOpen(true)} />
            )}
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <ul
          tabIndex={0}
          className="menu dropdown-content menu-md absolute right-0 top-10 z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/crypto">Crypto</Link>
          </li>
          <li>
            <Link to="/trending">Trending</Link>
          </li>
          <li>
            <Link to="/favorites">Favorite</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
