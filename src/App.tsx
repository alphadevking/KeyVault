import { Route, Routes } from 'react-router';
import { CoreGenerator, Welcome } from './pages';

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
