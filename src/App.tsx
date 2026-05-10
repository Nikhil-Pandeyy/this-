/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import PricingPage from "./pages/PricingPage";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Success from "./pages/Success";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import AIChatbot from "./components/AIChatbot";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AIChatbot />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}



