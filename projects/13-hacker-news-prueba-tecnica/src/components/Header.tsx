import { header, link, logo } from "./Header.css"
export const Header = () => {
    return(
        <nav className={header}>
            <img  className={logo} src= '../src/assets/logo.png' alt="Logo de hacker news" />
            <a className={link} href="">
                Hacker News
            </a>
        </nav>
    )
}