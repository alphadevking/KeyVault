import { Route, Routes } from 'react-router';
import { CoreGenerator, Welcome } from './pages';

// Import Swiper styles
import "swiper/swiper-bundle.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Welcome />} />
        <Route path="/core/generate" element={<CoreGenerator />} />
      </Routes>
    </>
  );
}

export default App;
