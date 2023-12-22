import { Schema, model, models } from "mongoose";

interface OrderSchemaI extends LineItemsI {
  name: string;
  email: string;
  city: string;
  postalCode: string;
  streetAdress: string;
  country: string;
  paid: boolean;
}

interface LineItemsI {
  line_items: {
    quantity: string;
    price_data: {
      currency: string;
      product_data: { name: string };
      unit_amount: number;
    };
  };
}

const OrderSchema = new Schema<OrderSchemaI>(
  {
    line_items: Object,
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAdress: String,
    country: String,
    paid: Boolean,
  },
  { timestamps: true }
);

export const Order = models?.Order || model("Order", OrderSchema);
