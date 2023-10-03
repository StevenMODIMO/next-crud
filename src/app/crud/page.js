import { getServerSession } from "next-auth";
import CrudForm from "../components/CrudForm";
import Cruds from "../components/Cruds";

export default async function Crud() {
  const session = await getServerSession();
  return (
    <main>
      <header className="text-center m-3 font-thin text-xl">
        <div>Welcome, @{session.user.email}</div>
      </header>
      <section className="grid grid-cols-2 w-[900px] h-96 mx-auto gap-5">
        <Cruds />
        <CrudForm />
      </section>
    </main>
  );
}
