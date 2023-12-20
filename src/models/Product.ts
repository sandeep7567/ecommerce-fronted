import { ProductSchemaI } from "@/types/types";
import mongoose, { Schema, model, models } from "mongoose";

const ProdcutSchema = new Schema<ProductSchemaI>(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    images: [{type: String}],
    category: {type: mongoose.Types.ObjectId, ref: "Category"},
    properties: {type: Object},
  },
  { timestamps: true }
);

export const Product = models?.Product || model('Product', ProdcutSchema);
