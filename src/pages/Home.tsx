import Hero from "../components/Hero";
import Clients from "../components/Clients";
import TechStack from "../components/TechStack";
import Services from "../components/Services";
import CouponGenerator from "../components/CouponGenerator";
import Pricing from "../components/Pricing";
import ContactCTA from "../components/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <TechStack />
      <Services />
      <CouponGenerator />
      <Pricing />
      <ContactCTA />
    </>
  );
}
