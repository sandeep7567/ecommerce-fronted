"use client";
import Button from "@/components/Button";
import Center from "@/components/Center";
import Input from "@/components/Input";
import Table from "@/components/Table";
import { cartProvider } from "@/components/provider/CartProvider";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.tr`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  max-width: 75px;
  max-height: 75px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    max-width: 100px;
  max-height: 100px;
    img {
    max-width: 80px;
    max-height: 80px;
  }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 10px;
  display: inline-block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

interface CartI {}

const Cart: FC<CartI> = () => {
  // @ts-ignore
  const { cartProducts, addProduct, removeProduct, clearCart } = cartProvider();

  // state for product inside a cart;
  const [products, setProducts] = useState([]);
  // payment sucess state
  const [isSuccessPayment, setIsSuccessPayment] = useState(false);

  // state for order information;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    (async () => {
      if (cartProducts.length > 0) {
        const { data } = await axios.post("/api/cart", { ids: cartProducts });
        setProducts(data);
      } else {
        setProducts([]);
      }
    })();
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.location.href.includes("success")) {
      setIsSuccessPayment(true);
      clearCart();
    }
  }, []);

  function moreOfThisProduct(id: string) {
    addProduct(id);
  }

  function lessOfThisProduct(id: string) {
    removeProduct(id);
  }

  async function goToPayment() {
    const { data } = await axios.post(`/api/checkout`, {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });

    if (data?.url) {
      window.location = data?.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    // @ts-ignore
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccessPayment) {
    return (
      <Center>
        <ColumnWrapper>
          <Box>
            <h1>Payment is success</h1>
            <p>We will email you when your order will be sent</p>
          </Box>
        </ColumnWrapper>
      </Center>
    );
  }

  return (
    <>
      <Center>
        <ColumnWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: any) => (
                    <tr key={product?._id}>
                      <td>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={product?.images[0]} alt="" />
                          </ProductImageBox>
                          {product?.title}
                        </ProductInfoCell>
                      </td>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product?._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id: any) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product?._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id: any) => id === product._id)
                          .length * product?.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td>Total Amount:</td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tfoot>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
              {/* <form method="post" action="/api/checkout"> */}
              <Input
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
              />
              <Input
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
              <CityHolder>
                <Input
                  value={city}
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="City"
                />
                <Input
                  value={postalCode}
                  name="postalCode"
                  onChange={(e) => setPostalCode(e.target.value)}
                  type="text"
                  placeholder="Postal Code"
                />
              </CityHolder>
              <Input
                value={streetAddress}
                name="streetAddress"
                onChange={(e) => setStreetAddress(e.target.value)}
                type="text"
                placeholder="Street Address"
              />
              <Input
                value={country}
                name="country"
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                placeholder="Country"
              />
              <Input
                type="hidden"
                name="products"
                value={cartProducts.join(",")}
              />
              <Button onClick={goToPayment} black={1} block={1}>
                Continue to payment
              </Button>
              {/* </form> */}
            </Box>
          )}
        </ColumnWrapper>
      </Center>
    </>
  );
};

export default Cart;
