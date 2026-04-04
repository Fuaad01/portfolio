export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  tools: string;
  link?: string;
  projectGoal: string;
  problemStatement: string;
  craftedSolution: {
    content: string;
    images: string[];
  };
  summary: string;
  duration: string;
  role: string;
  wireframes: { url: string; title: string }[];
  finalScreens: { url: string; title: string }[];
  beforeAfter: string[];
  outcome: string;
  thankYou: string;
}

const projects: Project[] = [
  {
    id: "lingscar-redesign",
    title: "LingsCars Website Redesign Casestudy",
    description: "LINGsCARS is a UK-based car leasing broker offering thousands of personal and business vehicle lease deals. Despite its strong market presence, the website experience creates usability friction due to visual clutter and lack of structured navigation. This project focuses on redesigning the Homepage and Browse Deals experience to improve clarity, discovery, and conversion.",
    longDescription:
      "A comprehensive UX and UI redesign of the LingsCars website — one of the UK's most distinctive car leasing platforms. The goal was to modernise the visual language while improving usability, information hierarchy, and conversion on the Homepage and Browse Deals page.",
    tags: ["UX Design", "UI Design", "Landing Page"],
    image: "/images/lingscars-main.png",
    tools: "Figma",
    link: "#",
    projectGoal: "The goal of the redesign was to create a clearer and more structured browsing experience that helps users quickly find and evaluate car leasing deals.",
    problemStatement: "The current LINGsCARS homepage and browse deals pages make it difficult for users to quickly discover and compare car leasing offers. The interface contains visual clutter, unclear hierarchy, and limited filtering options, which increases cognitive load and slows down the browsing experience.",
    craftedSolution: {
      content: "To improve usability and help users quickly discover relevant leasing deals, the platform was redesigned with a clearer information structure, simplified browsing, and more informative vehicle listings.\n\n• Created a clear entry point on the homepage to guide users toward browsing lease deals without confusion.\n• Improved vehicle cards to include key information such as price, fuel type, transmission, and lease terms for faster comparison.\n• Introduced search and advanced filtering to help users quickly narrow down deals based on budget, brand, fuel type, and other preferences.\n• Reduced visual clutter and cognitive load by improving layout hierarchy, spacing, and content prioritization.\n• Enhanced trust and credibility by adding real customer testimonials",
      images: [
        "/images/crafted-solution-collage.png"
      ]
    },
    summary: "The redesign successfully balanced brand identity with modern UX principles, resulting in a cleaner, more conversion-focused browsing experience.",
    duration: "1 Week",
    role: "UI/UX Designer",
    wireframes: [
      { url: "/images/desktop-wireframe-1.png", title: "Desktop Homepage Wireframe" },
      { url: "/images/filters-page-wireframe.png", title: "Desktop Filters Page Wireframe" },
      { url: "/images/homepage-mobile-wireframe.png", title: "Mobile Homepage Wireframe" }
    ],
    finalScreens: [
      { url: "/images/desktop-final-screens.png", title: "Desktop Homepage Final UI" },
      { url: "/images/filters-page-final-screens.png", title: "Desktop Filters Page Final UI" },
      { url: "/images/homepage-mobile-final-screens.png", title: "Mobile Homepage Final UI" }
    ],
    beforeAfter: [
      "/images/before-after.png"
    ],
    outcome: "The redesign created a clearer and more intuitive browsing experience for users searching car leasing deals. Improved navigation, advanced filters, and redesigned vehicle cards help users discover and evaluate deals more quickly. The cleaner layout and stronger visual hierarchy reduce cognitive load and make the platform easier to use and more trustworthy.",
    thankYou: "I focus on creating user-centered designs that align with both user needs and business goals."
  },
];

export default projects;
