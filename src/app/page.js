export default function Home() {
  return (
    <main className="w-screen mt-24">
      <header className="text-3xl m-4 font-semibold">
        <h1>
          Welcome to Next Crud.
          <br />
          Your Daily Todo's At hand.
        </h1>
      </header>
      <section className="">
        <div className="bg-black text-white rounded m-4 w-fit p-4 text-center">
          Get Started
        </div>
        <div className="bg-black text-white rounded m-4 w-fit p-4 text-center">
          Learn How it Works.
        </div>
        <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 text-black font-bold shadow rounded m-4 w-fit p-4 text-center">
          CTA.
        </div>
      </section>
    </main>
  );
}
