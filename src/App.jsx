import { Routes, Route } from 'react-router-dom';
import CosmoPublicationSite from './Cosmo'; // Your main homepage
import LegacyAuthors from './Legacy'; // Legacy authors page
import PublishingServices from './Publishing'; // Publish authors page
import DiscussYourBook from './Discuss'; 
import Marketplace from './Marketplace';
import PrivacyPolicy from "./policies/PrivacyPolicy";
import Terms from "./policies/Terms";
import Shipping from "./policies/Shipping";
import Refund from "./policies/Refund";
import Contact from "./policies/Contact";
import Cart from './Cart';
function App() {
 
  return (
   
      <Routes>
        <Route path="/" element={<CosmoPublicationSite />} />
        <Route path="/legacy" element={<LegacyAuthors />} />
        <Route path="/publish" element={<PublishingServices />} />
        <Route path="/discuss" element={<DiscussYourBook />} />
        <Route path="/marketplace" element={<Marketplace />} /> 
        <Route path="/cart" element={<Cart />} /> 
        {/* Policy Routes (REQUIRED for gateway) */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/shipping-policy" element={<Shipping />} />
        <Route path="/refund-policy" element={<Refund />} />
        <Route path="/contact" element={<Contact />} />      
      </Routes>
   
  );
}

export default App;