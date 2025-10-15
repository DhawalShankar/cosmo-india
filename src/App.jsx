import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CosmoPublicationSite from './Cosmo'; // Your main homepage
import LegacyAuthors from './Legacy'; // Legacy authors page
import PublishingServices from './Publishing'; // Publish authors page
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CosmoPublicationSite />} />
        <Route path="/legacy" element={<LegacyAuthors />} />
        <Route path="/publish" element={<PublishingServices />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;