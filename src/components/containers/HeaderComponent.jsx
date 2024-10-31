import NavBar from "../NavBar"
import './../styles.css'

export const HeaderComponent = () => {
    return (
        <header className="w-full h-16 fixed top-0 z-50 flex justify-center navbar-worker">
            <NavBar/>
        </header>
    )
}