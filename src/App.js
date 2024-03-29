import Home from "./routes/home/home";
import { Route, Routes } from "react-router-dom";
import Navigation from "./routes/navigation/navigation";
import Authentication from "./routes/authentication/authentication";

function Shop(){
  return(
    <h1>I'm Shop</h1>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
