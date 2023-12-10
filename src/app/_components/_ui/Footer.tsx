import { menuItems } from "../../../../public/menuItems";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={" bg-[#294B68FA] p-6  text-xs text-white"}>
      <nav className={"grid w-full grid-cols-2 gap-4"}>
        <ul className={"flex flex-col items-start justify-start gap-4"}>
          <li>
            <Link href={"/"} className={""}>
              {menuItems[5].titre}
            </Link>
          </li>
          {menuItems.slice(0, 3).map((item) => {
            return (
              <li key={item.id}>
                <Link href={"/"} className={""}>
                  {item.titre}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className={"flex flex-col items-start justify-start gap-4"}>
          {menuItems.slice(3, 5).map((item) => {
            return (
              <li key={item.id}>
                <Link href={"/"} className={""}>
                  {item.titre}
                </Link>
              </li>
            );
          })}
          <li>
            <Link href={"/"} className={""}>
              Mentions légales
            </Link>
          </li>
          <li>
            <Link href={"/"} className={""}>
              copyright CNAPE 2023
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
