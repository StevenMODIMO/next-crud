import EditForm from "@/app/components/EditForm";

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
    <main>
      <EditForm title={crud.title} crud={crud.crud} id={crud._id} />
    </main>
  );
}
