import Container from "react";
import OrderEntry from "./pages/entry/OrderEntry";
// import SummaryForm from "./pages/summary/SummaryForm.component";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary and entry page nee dprovider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* confirmation page does not need provider */}
    </Container>
  );
}

export default App;
