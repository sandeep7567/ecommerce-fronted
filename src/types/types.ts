import { RefType } from "mongoose";

export interface ChildrenI extends ButtonI {
  children?: React.ReactNode;
};

export interface ClassNameI {
  className?: string;
};

interface ButtonI {
  outline?: boolean | 1 | 0;
  white?: boolean | 1 | 0;
  primary?: boolean | 1 | 0;
  size?: string;
};

// Product Models Types
export interface ProductSchemaI {
  title: string;
  description: string;
  price: number;
  images: string[];
  category: RefType;
  properties: object;
};