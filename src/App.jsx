import { useContext, useState } from 'react';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from './components/navbar';
import CosmoPublicationSite from './pages/Cosmo';
import LegacyAuthors from './pages/Legacy';
import PolicyModal from "./components/PolicyModal";
import PublishingServices from './pages/Publishing';
import DiscussYourBook from './pages/Discuss'; 
import Marketplace from './pages/Marketplace';
import Cart from './pages/Cart';
import PrivacyPolicy from "./policies/PrivacyPolicy";
import Terms from "./policies/Terms";
import Shipping from "./policies/Shipping";
import Refund from "./policies/Refund";
import Contact from "./policies/Contact";
import { DarkModeContext } from './context/DarkModeContext';
import Footer from './components/footer';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const policy = searchParams.get('policy');

  const closeModal = () => {
    setSearchParams({}); // Remove the policy query param
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <Navbar />
      
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
      
      <Footer />
      
      {/* Policy Modal */}
      <PolicyModal open={!!policy} onClose={closeModal}>
        {policy === "privacy" && <PrivacyPolicy />}
        {policy === "terms" && <Terms />}
        {policy === "shipping" && <Shipping />}
        {policy === "refund" && <Refund />}
        {policy === "contact" && <Contact />}
      </PolicyModal>
    </div>
  );
}

export default App;