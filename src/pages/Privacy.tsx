export default function Privacy() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="font-display text-4xl font-bold mb-10">Privacy Policy</h1>
      <div className="prose prose-invert space-y-8 text-white/70">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Data Collection</h2>
          <p>
            We collect information you provide directly to us when you request a consultation, generate a coupon, or purchase a service. 
            This includes your name, email address, and payment information processed securely via Stripe.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Use of Information</h2>
          <p>
            We use your data to provide our development services, process payments, and communicate project updates. 
            We do not sell your personal data to third parties.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. Security</h2>
          <p>
            We implement high-level encryption and follow industry best practices to protect your data. 
            All payment transactions are handled through Stripe's secure infrastructure.
          </p>
        </section>
      </div>
    </div>
  );
}
