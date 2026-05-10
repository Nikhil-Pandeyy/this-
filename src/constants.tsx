export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export const SERVICES: Service[] = [
  {
    id: "ios",
    title: "iOS Development",
    description: "High-performance, native iOS applications built with Swift and SwiftUI for the Apple ecosystem.",
    icon: "Apple",
    features: ["Native Swift/SwiftUI", "Apple Watch Support", "App Store Optimization", "iCloud Integration"],
  },
  {
    id: "android",
    title: "Android Development",
    description: "Scalable Android solutions using Kotlin and modern Jetpack Compose architectural patterns.",
    icon: "Smartphone",
    features: ["Kotlin First", "Cross-Device Compatibility", "Google Play Deployment", "Custom Material Design"],
  },
  {
    id: "web",
    title: "Web Development",
    description: "Responsive, lightning-fast web applications using React, Next.js, and modern CSS frameworks.",
    icon: "Globe",
    features: ["SEO Optimized", "Progressive Web Apps", "Responsive Layouts", "API Integration"],
  },
  {
    id: "consulting",
    title: "Business Consulting",
    description: "Strategic technology consulting to help you scale your business and optimize operations.",
    icon: "BarChart3",
    features: ["Market Analysis", "Tech Stack Selection", "Scalability Planning", "Product Strategy"],
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    description: "AWS, Azure, and GCP setup with serverless architecture and automated scaling.",
    icon: "Cloud",
    features: ["Auto-scaling", "Disaster Recovery", "Cloud Security", "Cost Optimization"],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    description: "Integrating Gemini and GPT-4 for smart automation and predictive analytics.",
    icon: "Brain",
    features: ["LLM Integration", "Predictive Models", "Chatbot Development", "Data Processing"],
  },
  {
    id: "security",
    title: "Cybersecurity",
    description: "End-to-end security audits, penetration testing, and robust encryption implementations.",
    icon: "Shield",
    features: ["Pentesting", "SSL/Encryption", "Threat Detection", "Compliance Auditing"],
  },
  {
    id: "design",
    title: "UI/UX Design",
    description: "Modern, human-centric design interfaces crafted to maximize user engagement.",
    icon: "Palette",
    features: ["Prototyping", "User Research", "Wireframing", "Modern Aesthetic"],
  },
  {
    id: "devops",
    title: "DevOps Services",
    description: "CI/CD pipelines, Dockerization, and Kubernetes management for seamless delivery.",
    icon: "Settings2",
    features: ["Docker/K8s", "CI/CD Pipelines", "Process Automation", "Site Reliability"],
  },
  {
    id: "ecommerce",
    title: "E-commerce Solutions",
    description: "Custom storefronts and payment gateway integrations for high-volume sales.",
    icon: "ShoppingBag",
    features: ["Secure Payments", "Inventory Management", "Custom Checkout", "Multi-currency"],
  },
  {
    id: "cms",
    title: "CMS Development",
    description: "Headless CMS setups or custom administration panels for your content needs.",
    icon: "Files",
    features: ["Headless Setup", "Custom Admin UI", "Editorial Workflow", "SEO Controls"],
  },
  {
    id: "qa",
    title: "Quality Assurance",
    description: "Automated and manual testing to ensure your software is bug-free and reliable.",
    icon: "Bug",
    features: ["Unit Testing", "Integration Tests", "Load Testing", "UX Testing"],
  },
  {
    id: "api",
    title: "API Integration",
    description: "Deep third-party integrations (Stripe, Twilio, Salesforce) to extend functionality.",
    icon: "Link2",
    features: ["REST/GraphQL", "Secure Auth", "Webhooks", "Legacy Integration"],
  },
  {
    id: "blockchain",
    title: "Blockchain Solutions",
    description: "Smart contracts and dApp development for the decentralized world.",
    icon: "Activity",
    features: ["Smart Contracts", "Tokenomics", "Wallet Integration", "dApp Layouts"],
  },
  {
    id: "analytics",
    title: "Data Analytics",
    description: "Transform raw data into actionable insights with custom visual dashboards.",
    icon: "PieChart",
    features: ["BI Dashboards", "Data Mining", "Real-time Tracking", "Custom Reports"],
  },
  {
    id: "support",
    title: "Maintenance & Support",
    description: "24/7 monitoring and regular updates to keep your ecosystem running smoothly.",
    icon: "LifeBuoy",
    features: ["24/7 Monitoring", "Server Patches", "Bug Fixes", "Tech Support"],
  },
  {
    id: "iot",
    title: "IoT Development",
    description: "Connecting smart devices to centralized platforms for real-time control.",
    icon: "Wifi",
    features: ["Firmware Coding", "Device Management", "Real-time Sync", "Edge Computing"],
  },
  {
    id: "saas",
    title: "SaaS Solutions",
    description: "Building scalable multi-tenant platforms with subscription-based architecture.",
    icon: "Repeat",
    features: ["Multi-tenancy", "Billing Systems", "User Management", "Scalable Core"],
  },
  {
    id: "transformation",
    title: "Digital Transformation",
    description: "Modernizing legacy systems to meet the demands of the digital era.",
    icon: "TrendingUp",
    features: ["Legacy Migration", "Modern Stack", "Process Re-design", "Training"],
  },
  {
    id: "crm",
    title: "Custom CRM/ERP",
    description: "Tailored management systems to optimize your internal business processes.",
    icon: "Briefcase",
    features: ["Workflow Sync", "Client Portals", "Inventory Tracking", "HR Modules"],
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "startup",
    name: "Startup Core",
    price: "599",
    period: "month",
    description: "Great for testing ideas and launching your first digital product with Conqify experts.",
    features: [
      "1 Native Application (iOS/Android)",
      "Essential Backend Setup",
      "Monthly Maintenance",
      "Basic Support",
    ],
  },
  {
    id: "growth",
    name: "Business Growth",
    price: "2,499",
    period: "month",
    description: "Advanced solutions for scaling businesses looking for multi-platform dominance.",
    isPopular: true,
    features: [
      "Full iOS & Android Stack",
      "Web Dashboard & API",
      "Stripe Payment Integration",
      "Custom UI/UX Kit",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Scaler",
    price: "100k",
    period: "project",
    description: "Full-scale digital transformation with dedicated teams and custom infrastructure.",
    features: [
      "Unlimited Platforms",
      "Dedicated Dev Team",
      "Architecture Design",
      "24/7 Priority Support",
    ],
  },
];
