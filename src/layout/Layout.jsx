import { Outlet } from "react-router-dom"
import { HeaderComponent } from "../components/containers/HeaderComponent"
import Footer from "../components/Footer"

export const Layout = () => {
    return (
        <>
            <HeaderComponent/>
            <Outlet/>
            <Footer/>
        </>
    )
}