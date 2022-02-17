import {
  BrowserRouter, 
  Routes, 
  Route
} from "react-router-dom"
import Footer from "./components/Footer";
import Inicio from './pages/Inicio';
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { PageCrud } from "./pages/Crud";
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
/>

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/crud">
        <Route path=":type" element={<PageCrud/>}/>
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
