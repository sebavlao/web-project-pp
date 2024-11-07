import { RegisterSection } from "../components/containers/RegisterSection";

export const RegisterWorker = () => (
    <>
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-10">
            <RegisterSection title="Registro trabajador" userType="worker"/>
        </main>
    </>
)