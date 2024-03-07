// App.js
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Guidance from './pages/Guidance';
import CodeInput from './pages/CodeInput';
import XPathGuidance from './pages/XPathGuidance';
import XPathCodeInput from './pages/XPathCodeInput';
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guidance" element={<Guidance />} />
          <Route path="/code-input" element={<CodeInput />} />
          <Route path="/guidance-xpath" element={<XPathGuidance />} />
          <Route path="/code-input-xpath" element={<XPathCodeInput />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
