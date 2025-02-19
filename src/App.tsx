import { Route, Routes } from 'react-router';
import { CoreGenerator, Login, Signup, Welcome } from './pages';

// Import Swiper styles
import "swiper/swiper-bundle.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Welcome />} />
        <Route path="/gen" element={<CoreGenerator />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
