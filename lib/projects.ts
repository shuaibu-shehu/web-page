export type Project = {
  slug: string
  title: string
  /** Long-form headline used on the detail page. */
  headline: string
  description: string
  tag: string
  tagTone: "sage" | "clay"
  date: string
  image: string
  heroImage: string
  byline: string
  publishedOn: string
  readTime: string
  body: string[]
  /** Programme facts. `projectDetails()` renders these as the detail-page card. */
  partners: string
  location: string
  timeline: string
  status: string
  /** clay = earlier stage, sage = validated in clinic. Matches the site's palette semantics. */
  statusTone: "sage" | "clay"
  technologies: string
  /**
   * Peer-reviewed publication, when there is one. Omit for unpublished work —
   * the detail page hides the link entirely rather than showing a dead label.
   */
  paper?: { journal: string; url: string }
}

/** Content mirrors the `v2-*` Figma frames. */
export const projects: Project[] = [
  {
    slug: "ai-in-laparoscopy",
    title: "AI-Powered Laparoscopy",
    headline: "AI-Powered Laparoscopy: Making Minimally Invasive Surgery Accessible",
    description:
      "An end-to-end laparoscope embedded with low-cost IoT sensors and real-time onboard computer vision, built in coordination with Senegalese biomedical engineers.",
    tag: "AI in Medicine",
    tagTone: "clay",
    date: "May 2025",
    image: "/v2/project-laparoscopy.png",
    heroImage: "/v2/detail-laparoscopy.png",
    byline: "CodeTherapy R&D",
    publishedOn: "May 15, 2025",
    readTime: "3 min read",
    body: [
      "The CodeTherapy R&D unit collaborated with biomedical engineers from Senegal and India to build an end-to-end laparoscope prototype equipped with IoT sensors and onboard AI. This joint milestone marks a pivotal shift toward engineering healthcare systems designed from the ground up for low-resource clinics rather than adapting complex, high-power Western hardware.",
      "The team designed and trained object-detection networks to recognize organs and common pathologies in real time, providing augmented video overlays for surgeons. The system was optimized for low power and manufacturability, utilizing readily available electronic components that can be sourced and repaired locally without relying on proprietary global supply chains.",
      "The goal is to make minimally invasive surgery more accessible in under-resourced hospital settings across West Africa, where access to advanced surgical tools remains critically limited. By lowering both cost and complexity, CodeTherapy aims to assist local clinical centers in significantly reducing post-operative complications and patient recovery times.",
    ],
    partners: "Andhra Pradesh MedTech Zone, Senegalese Biomedical Engineers",
    location: "Visakhapatnam, India",
    timeline: "2024–2025",
    status: "Prototype Testing",
    statusTone: "clay",
    technologies: "Object Detection, IoT, Edge AI",
    paper: {
      journal: "IEEE Biomedical Engineering and Sustainable Healthcare (ICBMESH 2025)",

      url: "https://ieeexplore.ieee.org/document/11182204",
    },
  },
  {
    slug: "malaria-detection",
    title: "Malaria Detection via Smartphone",
    headline: "Malaria Detection: AI-Powered Blood Analysis on a Smartphone",
    description:
      "On-device ML algorithms optimized for CBC and cell counting using standard smartphone cameras attached to low-cost clinical microscopes, tested with Ethiopian researchers.",
    tag: "AI Research",
    tagTone: "sage",
    date: "June 2025",
    image: "/v2/project-malaria.png",
    heroImage: "/v2/detail-malaria.png",
    byline: "CodeTherapy + Dr. Mulugeta's Lab",
    publishedOn: "June 2, 2025",
    readTime: "5 min read",
    body: [
      "CodeTherapy partnered with Dr. Mulugeta's research group in Ethiopia to develop an on-device machine learning model for complete blood count analysis using affordable, smartphone-mounted microscopes. The collaborative effort leverages the widespread ubiquity of mid-tier consumer smartphones to bypass the need for multi-thousand-dollar laboratory hardware.",
      "The co-development team built an image-processing pipeline capable of identifying and counting blood cells in live microscope feeds. By optimizing the neural network models for native execution on simple mobile microprocessors, the tool functions entirely offline, ensuring that isolated clinics with poor cellular connectivity retain robust diagnostic capabilities.",
      "This portable tool helps rural health workers conduct hematology tests without needing centralized laboratory infrastructure, potentially transforming malaria screening in remote communities across East Africa. Early clinical tests show dramatic decreases in diagnostic time, reducing wait-times from hours to under five minutes.",
    ],
    partners: "Addis Ababa University",
    location: "Ethiopia",
    timeline: "2023–2025",
    status: "Clinical Pilot",
    statusTone: "sage",
    technologies: "On-device ML, Computer Vision, Mobile",
  },
  {
    slug: "mammography-ai",
    title: "Mammography AI for Early Detection",
    headline: "AI in Mammography: Enhancing Early Breast Cancer Detection",
    description:
      "Deep-learning screening models for breast cancer optimized for compressed, low-contrast clinical mammograms in resource-constrained regional clinics.",
    tag: "AI Research",
    tagTone: "sage",
    date: "June 2025",
    image: "/mammogram.png",
    heroImage: "/v2/detail-mammography.png",
    byline: "CodeTherapy Clinical Team",
    publishedOn: "June 28, 2025",
    readTime: "4 min read",
    body: [
      "During a six-month research period at the Kalam Institute of Health Technology in India, a multidisciplinary team worked alongside radiologists and software engineers to build a deep-learning tool for early breast-cancer detection. The system focuses on solving the high rate of false negatives associated with analog film degradation in regional screening centers.",
      "The team used the RSNA mammogram dataset to create a convolutional neural network (CNN) classifier designed for use in clinics with limited resources. By employing custom compression and noise-reduction pre-processors, the algorithm achieves high sensitivity even on low-fidelity, desaturated, or low-contrast mammography scans typical of legacy equipment.",
      "The system is currently undergoing clinical pilot testing to boost diagnostic accuracy in underserved areas where access to experienced radiologists is scarce. Our ongoing study aims to empower general practitioners to reliably triage urgent cases, decreasing the clinical bottleneck for specialized oncology departments.",
    ],
    partners: "Johns Hopkins, Kalam Institute",
    location: "India + USA",
    timeline: "2024–2025",
    status: "Clinical Pilot",
    statusTone: "sage",
    technologies: "Deep Learning, CNN, Medical Imaging",
  },
]

/** Filter chips on the projects index. */
export const projectFilters = [
  "All",
  "AI in Medicine",
  "AI Research",
  "Computer Vision",
  "Deep Learning",
]

/** The detail-page "Project Details" card, in Figma order. */
export function projectDetails(p: Project) {
  return [
    { label: "Partners", value: p.partners },
    { label: "Location", value: p.location },
    { label: "Timeline", value: p.timeline },
    { label: "Status", value: p.status },
    { label: "Technologies Used", value: p.technologies },
  ]
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

/** The two other projects, in the order the Figma related-grid shows them. */
export function getRelatedProjects(slug: string) {
  return projects.filter((p) => p.slug !== slug)
}
