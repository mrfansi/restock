import {Route, Routes} from 'react-router-dom';

// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import RouteGuard from "./components/RouteGuard";


function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={
          <RouteGuard>
            <Home/>
          </RouteGuard>
        }/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </main>
  );
}

export default App;
