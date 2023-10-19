import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Password } from './pages/password';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Plan } from './pages/plan';
import { PlansList } from './pages/plansList';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false}
        icon={false}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/password" element={<Password />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/plans-list" element={<PlansList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
