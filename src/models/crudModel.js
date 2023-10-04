import mongoose from "mongoose";

const crudSchema = new mongoose.Schema({
  title: String,
  crud: String,
  created_by: String
});

crudSchema.statics.createCrud = async function (title, crud) {
  if (!title || !crud) {
    throw Error("Empty fields detected.");
  }

  const newCrud = await this.create({ title, crud });
  return newCrud;
};

export default mongoose.models.Crud || mongoose.model("Crud", crudSchema);
