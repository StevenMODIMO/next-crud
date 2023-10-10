import EditForm from "@/app/components/EditForm";
import Modal from "@/app/components/Modal/Modal";

export default async function Edit({ params }) {
  async function getCrud(id) {
    const res = await fetch(`http://localhost:3000/api/crud/${id}`);
    if (!res.ok) {
      console.log(res);
    }

    return res.json();
  }

  const crud = await getCrud(params.id);
  return (
    <Modal>
      <main>
        <EditForm title={crud.title} crud={crud.crud} id={crud._id} />
      </main>
    </Modal>
  );
}
