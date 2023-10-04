import Crud from "@/models/crudModel";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";

async function handler(req, { params }) {
  const { method } = req;
  const id = params.id
  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        const body = await req.json();
        const title = body.title;
        const crud = body.crud;
        const updated = await Crud.findOneAndUpdate(
          { _id: id },
          { title, crud },
          { new: true }
        );
        return NextResponse.json(updated);
      } catch (error) {
        return NextResponse.json(error);
      }
      break;

    case "DELETE":
      try {
        const deleteCrud = await Crud.findOneAndDelete({ _id: id });
        return NextResponse.json(deleteCrud);
      } catch (error) {
        return NextResponse.json(error);
      }
      break;

    default:
      return NextResponse.json({ error: "Could not process reequest." });
  }
}

export { handler as PUT, handler as DELETE };
