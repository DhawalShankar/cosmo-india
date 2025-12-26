import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CosmoPublicationSite from './Cosmo'; // Your main homepage
import LegacyAuthors from './Legacy'; // Legacy authors page
import PublishingServices from './Publishing'; // Publish authors page
import DiscussYourBook from './Discuss'; 
import Marketplace from './Marketplace';
import AnalyticsTracker from "./AnalyticsTracker";
function App() {
 
  return (
   
      <Routes>
        <Route path="/" element={<CosmoPublicationSite />} />
        <Route path="/legacy" element={<LegacyAuthors />} />
        <Route path="/publish" element={<PublishingServices />} />
        <Route path="/discuss" element={<DiscussYourBook />} />
        <Route path="/marketplace" element={<Marketplace />} />        
      </Routes>
   
  );
}

export default App;