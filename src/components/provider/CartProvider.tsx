import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface CartProviderI {
  children: React.ReactNode;
}

interface CartValueI {
  // cartProducts: any;
  // setCartProducts: Dispatch<SetStateAction<never[]>>;
  // addProduct: (productId: string) => void;
}

export const CartProvider = createContext({});

export const CartContextProvider: FC<CartProviderI> = ({
  children,
}: CartProviderI) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const [cartProducts, setCartProducts] = useState<[] | any[]>(
    // @ts-ignore
    JSON.parse(ls.getItem("cart")) || []
  );

  // set cart item to localStorage with change of cartProducts;
  useEffect(() => {
    if (cartProducts.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  // find get cart item from the localStorage after 1st render (hydration error solve with this render);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      // @ts-ignore
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  const addProduct = (productId: string) => {
    // @ts-ignore
    if (cartProducts.includes(productId)) {
      return alert("Product already added to the cart");
    }
    setCartProducts((prev: any) => [...prev, productId]);
  };

  const value: CartValueI = {
    cartProducts,
    setCartProducts,
    addProduct,
  };
  return (
    <CartProvider.Provider value={value}>{children}</CartProvider.Provider>
  );
};
