import { useState, useEffect } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";

import ScoopOption from "./ScoopsOption";
import ToppingOption from "./ToppingsOption";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  // optionTYpe is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, [optionType]);

  // TODO: replace null with ToppingOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
