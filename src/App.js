// import { Container } from "react";
import OrderEntry from "./pages/entry/OrderEntry";
import SummaryForm from "./pages/summary/SummaryForm.component";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <OrderDetailsProvider>
      <OrderEntry />
      <SummaryForm />
    </OrderDetailsProvider>
  );
}

export default App;
