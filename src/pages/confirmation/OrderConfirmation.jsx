import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3030")
      .then((res) => {
        setOrderNumber(res.data.orderNumber);
      })
      .catch((err) => {
        // TODO: HANDLE ERR
      });
  }, []);

  const handleClick = () => {
    // clear order details
    resetOrder();
    // send back to order page
    setOrderPhase("inProgress");
  };

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "20%" }}>
          as per our terms and conditions, nothing will happen
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default OrderConfirmation;
