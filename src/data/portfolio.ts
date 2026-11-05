export type Project = {
  id: string;
  title: string;
  eyebrow: string;
  category: string;
  summary: string;
  role: string;
  period: string;
  image: string;
  tags: string[];
  contributions: string[];
  link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    id: "digilog",
    title: "Digilog (Digital Logistic)",
    eyebrow: "CKL · Order Management System",
    category: "Backend",
    summary: "Cargo operations core for CKL—an Order Management System covering the shipment lifecycle from master data and orders to bagging and manifests across airfreight, FTL, and LTL.",
    role: "Backend Developer",
    period: "Aug 2025 — Present",
    image: "/images/projects/digilog-showcase.jpg",
    tags: ["PHP", "Laravel", "APIs", "Redis"],
    contributions: [
      "Designed REST APIs for the shipment lifecycle: master data, order agreements and routes, orders, bagging, and manifests (airfreight, FTL, LTL), including printouts, audit history, and business rules that prevent invalid operational changes",
      "Implemented authentication and authorization for web and mobile: JWT, refresh tokens, OTP, SSO, password recovery, feature-based privileges, special access, and location/customer-scoped permissions",
      "Delivered high-volume workflows: bulk Excel upload/validation, invalid-row export, and asynchronous dashboard/bagging-process exports via Redis queues with live progress (Laravel Reverb)",
      "Exposed partner APIs (Laravel Sanctum) for external order and bagging intake, with mapping, background processing, status tracking, and API audit logs",
      "Integrated AWS S3, Firebase Cloud Messaging, HRIS employee data, and cross-schema reads from warehouse, fleet, and vendor systems for operational dashboards",
    ],
    link: { label: "Visit website", href: "https://digilog.cklcargo.com/login" },
  },
  {
    id: "vms",
    title: "Vendor Management System",
    eyebrow: "CKL · Logistics platform",
    category: "Backend",
    summary: "A centralized platform that streamlines vendor operations, from onboarding and management to purchase order creation for mid-mile logistics.",
    role: "Backend Developer",
    period: "Aug 2025 — Present",
    image: "/images/projects/vms-showcase.png",
    tags: ["PHP", "Laravel", "APIs", "PostgreSQL"],
    contributions: [
      "Built vendor onboarding and verification for public and private vendors, including document handling, revision, and status workflows",
      "Implemented commercial modules: quotations (FTL, LTL, container, rent car), rate catalogs, SPH export, vendor requests, and costing (airfreight, LTL, trip budget) with bulk upload/replace and history",
      "Developed purchasing and fulfillment: purchase orders, approval/verification/payment flow, FTL/LTL/rent-car/container fulfillment, standby handling, and OTP generation for container trips",
      "Added vendor evaluation dashboards (FTL, LTL, rent car) and fleet replacement-request workflows, plus FMS integration to sync fulfillment items, fleet, and driver changes",
    ],
    link: { label: "Visit website", href: "https://vendor.cklcargo.com/" },
  },
  {
    id: "connect",
    title: "CKL Connect",
    eyebrow: "CKL · Multi-agent shipping",
    category: "Backend",
    summary: "A shipping operations platform for invoicing, domestic and international pricing, parcel tracking, and role-based team management.",
    role: "Backend Developer",
    period: "Aug 2025 — Present",
    image: "/images/projects/ckl-connect-showcase.png",
    tags: ["Backend", "PHP", "APIs", "SQL"],
    contributions: ["APIs for invoicing, pricing, and parcel lifecycle tracking", "Live foreign-exchange rate integration", "Role-based access for owners, admins, and staff"],
    link: { label: "Visit website", href: "https://sandbox.ckl-connect.cklcargo.com/login" },
  },
  {
    id: "fleet",
    title: "Fleet Management System",
    eyebrow: "CKL · Fleet operations",
    category: "Backend",
    summary: "A logistics backend for registering trucks and drivers, planning delivery trips, running quality checks, and monitoring delivery execution.",
    role: "Backend Developer",
    period: "Aug 2025 — Present",
    image: "/images/projects/fms-showcase.png",
    tags: ["PHP", "Laravel", "APIs", "Redis"],
    contributions: [
      "Developed APIs for fleets, drivers, containers, checkpoints, movements, toolkits, quality control, and internal SLA",
      "Built trip management: assign delivery orders, vendor fulfillments, drivers, and fleets; record movements/checkpoints; handle manual transport, file changes, and fleet/driver changes with full history",
      "Delivered driver-facing DIDO APIs (start/end trip, check-in, help-wanted, issue resolve, file upload) and a separate trip-container auth flow for vendor container trips",
      "Implemented fleet monitoring, trip-issue monitoring with summary/export, replacement requests, and rent-car prorate, including health/metrics endpoints for deployment",
    ],
    link: { label: "Visit website", href: "https://fleet.cklcargo.com/login" },
  },
  {
    id: "re-actions",
    title: "Re-Actions",
    eyebrow: "Government · Public service",
    category: "Fullstack",
    summary: "A public complaint management system for Tangerang City, supporting report intake, lifecycle tracking, and operational data analysis.",
    role: "Fullstack Developer",
    period: "Jul 2024 — Dec 2024",
    image: "/images/projects/re-actions-showcase.png",
    tags: ["CodeIgniter 4", "MySQL", "JavaScript", "Government"],
    contributions: ["Complaint forms, validation, and status workflows", "Data visualization and reporting interfaces", "Database design and SQL queries for analysis"],
  },
  {
    id: "wearshare",
    title: "WearShare",
    eyebrow: "Bangkit · Mobile & machine learning",
    category: "Mobile",
    summary: "An Android application that analyzes donated clothing images to help charitable organizations determine whether each item is suitable for use.",
    role: "Mobile Developer",
    period: "Feb 2024 — Jun 2024",
    image: "/images/projects/wearshare-showcase.png",
    tags: ["Kotlin", "Android", "Machine Learning", "TFLite"],
    contributions: ["Android mobile application development", "On-device clothing image classification", "Capstone collaboration across learning paths"],
    link: { label: "View repository", href: "https://github.com/C241-PS306/mobile-development" },
  },
  {
    id: "catty-holic",
    title: "Catty Holic",
    eyebrow: "Figma · Mobile UI",
    category: "Design",
    summary: "A mobile product concept for cat health consultations and adoption, designed as an interactive end-to-end prototype in Figma.",
    role: "UI/UX Designer",
    period: "Selected academic work",
    image: "/images/projects/catty-holic-showcase.png",
    tags: ["Figma", "UI/UX", "Mobile", "Prototype"],
    contributions: ["User-focused mobile information architecture", "Veterinary consultation and adoption journeys", "Interactive high-fidelity prototype"],
    link: { label: "Open prototype", href: "https://www.figma.com/proto/SFfqJAUHqUNtUFhNENbapN/cattyhollic?type=design&node-id=1-6&t=DcG3bd8DzdbhiCSL-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=1%3A6&show-proto-sidebar=1&mode=design" },
  },
];

export const categories = ["All", "Backend", "Fullstack", "Mobile", "Design"];

// Cards alternate between tints of the site's two accents.
const pink = { bg: "var(--project-pink-bg)", accent: "var(--project-pink-accent)", text: "var(--project-pink-text)", on: "var(--project-pink-on)" };
const lilac = { bg: "var(--project-lilac-bg)", accent: "var(--project-lilac-accent)", text: "var(--project-lilac-text)", on: "var(--project-lilac-on)" };

export const projectThemes: Record<string, typeof pink> = {
  digilog: pink,
  vms: lilac,
  connect: pink,
  fleet: pink,
  "re-actions": lilac,
  wearshare: lilac,
  "catty-holic": pink,
};

export const marqueeItems = ["Backend Development", "API Development", "Requirement Analysis", "System Optimization", "Business Analysis", "Project Collaboration"];

export const capabilities = [
  { title: "Backend development", subtitle: "Reliable server-side logic and operational workflows", image: "/images/projects/vms-showcase.png" },
  { title: "API & integration", subtitle: "Clear interfaces across products, teams, and data", image: "/images/projects/ckl-connect-showcase.png" },
  { title: "Data layer design", subtitle: "SQL-first thinking for dependable business systems", image: "/images/projects/fms-showcase.png" },
  { title: "Business analysis", subtitle: "Turning requirements into buildable system decisions", image: "/images/projects/re-actions-showcase.png" },
  { title: "Product collaboration", subtitle: "Bridging stakeholders and development teams", image: "/images/projects/wearshare-showcase.png" },
];

export const skills = [
  { name: "Backend", tools: ["PHP", "Laravel", "CodeIgniter 4"] },
  { name: "APIs & auth", tools: ["JWT", "Laravel Sanctum", "SSO"] },
  { name: "Data & cache", tools: ["PostgreSQL", "MySQL", "Redis"] },
  { name: "Queues & realtime", tools: ["Laravel Queue", "Laravel Reverb", "Laravel Echo"] },
  { name: "Frontend", tools: ["Blade", "JavaScript", "jQuery", "Tailwind CSS", "Vite"] },
  { name: "Infrastructure", tools: ["Docker", "Jenkins", "AWS S3", "Firebase Cloud Messaging"] },
];

export const experiences = [
  {
    period: "August 2025 — Present",
    organization: "CKL Cargo",
    role: "Web Developer",
    context: "Industry · Logistics",
    description: "Responsible for server-side logic, APIs, and data layers that support day-to-day operations, turning complex supply-chain workflows into reliable backend systems.",
  },
  {
    period: "July 2024 — December 2024",
    organization: "Dinas Komunikasi dan Informatika",
    role: "Fullstack Developer",
    context: "Government · Public service",
    description: "Built web applications, data workflows, and user-facing features supporting government digital services in Tangerang City.",
  },
  {
    period: "February 2024 — June 2024",
    organization: "Bangkit Academy",
    role: "Mobile Developer Cohort",
    context: "Academy · Intensive program",
    description: "Completed an Android-focused program led by Google, Tokopedia, Gojek, and Traveloka, culminating in a collaborative capstone product.",
  },
];

export const certifications = [
  { group: "National certification", title: "Software Engineer — BNSP", href: "https://drive.google.com/file/d/1vV4yh5klz4aL3trnNSSX9GcE6bngQE63/view?usp=sharing" },
  { group: "Language", title: "English for Business Communication", href: "https://drive.google.com/file/d/1aF6H4E7CuFyrerfCgmzH6gwyYd1zBlm4/view?usp=sharing" },
  { group: "Bangkit Academy", title: "Programming Basics for Software Developers", href: "https://www.dicoding.com/certificates/KEXL8N9V4ZG2" },
  { group: "Bangkit Academy", title: "Programming Logic 101", href: "https://www.dicoding.com/certificates/NVP77396RPR0" },
  { group: "Bangkit Academy", title: "Git Basics with GitHub", href: "https://www.dicoding.com/certificates/JLX12RLE2Z72" },
  { group: "Bangkit Academy", title: "Web Front-End for Beginners", href: "https://www.dicoding.com/certificates/JMZVDVVQJZN9" },
  { group: "Bangkit Academy", title: "Getting Started with Kotlin", href: "https://www.dicoding.com/certificates/GRX5QEVYYZ0M" },
  { group: "Bangkit Academy", title: "Android Applications for Beginners", href: "https://www.dicoding.com/certificates/MRZM83MQRZYQ" },
  { group: "Bangkit Academy", title: "Android Application Fundamentals", href: "https://www.dicoding.com/certificates/ERZR19KV2ZYV" },
  { group: "Bangkit Academy", title: "SOLID Programming Principles", href: "https://www.dicoding.com/certificates/MEPJNRJDLX3V" },
  { group: "Bangkit Academy", title: "AI Basics", href: "https://www.dicoding.com/certificates/KEXL14YOMXG2" },
  { group: "Bangkit Academy", title: "Machine Learning for Android", href: "https://www.dicoding.com/certificates/MRZMED52NPYQ" },
];

export const certificateBundle = "https://drive.google.com/file/d/13p5Ms8IfDX9RGWi0NACzFz4uKnZKOYD7/view?usp=sharing";

export const contact = {
  email: "najlaputriafifah16@gmail.com",
  linkedin: "https://www.linkedin.com/in/najla-putri-afifah",
  github: "https://github.com/najlaput16",
};
