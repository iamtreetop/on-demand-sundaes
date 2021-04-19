import { createContext, useContext, useState, useMemo, useEffect } from "react";

import { pricePerItem } from "../constants/index";

// @ts-ignore
const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider
export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }
  return context;
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  const calculateSubtotal = (optionType, optionCounts) => {
    let optionCount = 0;

    for (const count of optionCounts[optionType].values()) {
      optionCount += count;
    }
    return optionCount * pricePerItem[optionType];
  };

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingSubtotal;
    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingSubtotal,
      grandTotal,
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionCounts = { ...optionCounts };

      // update option count for this item with the new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    };
    // getter: object containing option counts for scoops and toppings, subtotal and totals
    // setter: updateOptiuonCount
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
};
