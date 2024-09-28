import { Outlet } from "react-router-dom"
import Header from "./Header"
import SideBar from "./SideBar"

export default function LayoutAdmin() {

    return (
        <div>
            <button>Prueba de que comparte</button>
            <Header></Header>
            <SideBar></SideBar>
            <Outlet></Outlet>
        </div>
    )
}