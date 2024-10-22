import NavBar from "../NavBar"

export const HeaderComponent = () => {
    return (
        <header className="w-full bg-gray-950 h-16 fixed top-0 z-50 flex justify-center">
            <NavBar/>
        </header>
    )
}