import {
  createContext,
  FC,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

// Define types for context value and provider props
interface CartValueI {
  cartProducts: string[];
  setCartProducts: Dispatch<SetStateAction<string[]>>;
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
}

interface CartProviderI {
  children: React.ReactNode;
}

// Create context with initial empty object as value
export const CartContext = createContext<CartValueI | undefined>(undefined);

export const CartContextProvider: FC<CartProviderI> = ({
  children,
}: CartProviderI) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const [cartProducts, setCartProducts] = useState<string[]>([]);

  // Set cart item to localStorage whenever cartProducts change
  useEffect(() => {
    if (cartProducts.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  // it will run afer we mount this component;
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      const lsCart = ls?.getItem("cart");
      const lsGetCart = lsCart && JSON.parse(lsCart);
      setCartProducts(lsGetCart);
    }
  }, []);

  // clear cart from ui and localStorage as well;
  useEffect(() => {
    if (cartProducts.length === 0) {
      ls?.removeItem("cart");
    }
  }, [cartProducts.length]);

  const addProduct = (productId: string) => {
    // if (cartProducts.includes(productId)) {
    //   return alert("Product already added to the cart");
    // }
    setCartProducts((prev) => [...prev, productId]);
  };

  const removeProduct = (productId: string) => {
    setCartProducts((prev) => {
      const position = prev.indexOf(productId);
      console.log(cartProducts.length);

      if (position !== -1) {
        return prev.filter((val, i) => i !== position);
      } else {
        return prev;
      }
    });
  };

  const clearCart = () => {
    setCartProducts([]);
  };

  const value: CartValueI = {
    cartProducts,
    setCartProducts,
    addProduct,
    removeProduct,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const cartProvider = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    return <div>Loading...</div>;
  } else {
    return cartContext;
  }
};
