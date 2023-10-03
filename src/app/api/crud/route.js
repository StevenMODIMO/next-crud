import Crud from "@/models/crudModel";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";

async function handler(req) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const cruds = await Crud.find({});
        return NextResponse.json(cruds);
      } catch (error) {
        return NextResponse.json({ success: false });
      }
      break;

    case "POST":
      try {
        const body = await req.json();
        const title = body.title;
        const crud = body.crud;
        const id = body.id;
        const newCrud = await Crud.createCrud(title, crud);
        return NextResponse.json(newCrud);
      } catch (error) {
        return NextResponse.json({ error: error.message });
      }
      break;

    case "PUT":
      try {
        const body = await req.json();
        const title = body.title;
        const crud = body.crud;
        const id = body.id;
        const updated = await Crud.findOneAndUpdate(
          { _id: id },
          { title: title, crud: crud },
          { new: true }
        );
        return NextResponse.json(updated);
      } catch (error) {
        return NextResponse.json(error);
      }
      break;

    case "DELETE":
      try {
        const body = await req.json();
        const title = body.title;
        const crud = body.crud;
        const id = body.id;
        const deleteCrud = await Crud.findOneAndDelete({ title });
        return NextResponse.json(deleteCrud);
      } catch (error) {
        return NextResponse.json(error);
      }
      break;

    default:
      return NextResponse.json({ error: "Could not process reequest." });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
