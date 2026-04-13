import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateGrant from './pages/CreateGrant';
import GrantDetail from './pages/GrantDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateGrant />} />
        <Route path="/grants/:id" element={<GrantDetail />} />
      </Routes>
    </BrowserRouter>
  );
}