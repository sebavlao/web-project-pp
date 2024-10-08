import AdminModal from "./AdminModal";
import endpoints from "../../../data/adminData/api";
import { ModalEdit } from "./ModalEdit";
import { ModalDelete } from "./ModalDelete";

export default function ActionsButtons({ type, id }) {

    function setModalDelete() {
        if (type === "user") {
            return <ModalDelete id={id} endpoint={endpoints.users} text={'¿Seguro deseas suspender a este usuario?'} />
        } else if (type === "admin") {
            return <ModalDelete id={id} endpoint={endpoints.admins} text={'¿Seguro deseas suspender a este administrador?'} />
        } else if (type === "jobs") {
            return <ModalDelete id={id} endpoint={endpoints.jobs} text={'¿Seguro deseas eliminar esta publicación?'} method="DELETE" />
        } else if (type === "jobscategories") {
            return <ModalDelete id={id} endpoint={endpoints.jobsCategories} text={'¿Seguro que deseas eliminar esta categoría? Sólo puedes hacerlo si ninguna publicación activa la ha seleccionado.'} method={"DELETE"} />
        }
    }

    function setModalEdit() {
        if (type === "user") {
            return <ModalEdit id={id} endpoint={endpoints.users} />
        } else if (type === "admin") {
            return <ModalEdit id={id} endpoint={endpoints.admins} />
        } else if (type === "jobs") {
            return <ModalEdit id={id} endpoint={endpoints.jobs} />
        }
    }

    return (
        <div>
                <AdminModal logo={<img src="./../../../admin/pencil.png" alt="" />}>{setModalEdit()}</AdminModal>
                <AdminModal logo={<img src="./../../../admin/desactiveuser.png" alt="" />}>{setModalDelete()}</AdminModal>
        </div>
    )
}






