export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  video?: string;
  tools: string;
  link?: string;
  prototypeLink?: string;
  mobilePrototypeLink?: string;
  projectGoal: string;
  problemStatement: string;
  problemStatementPoints?: { heading: string; points: string[] }[];
  problemStatementScreens?: {
    images: string[];
    problems: { heading: string; points: string[] }[];
  }[];
  craftedSolution: {
    content: string;
    video?: string;
    features?: {
      title: string;
      solution: string[];
      image?: string;
      images?: string[];
      imagePosition?: 'left' | 'right';
    }[];
    images: string[];
    sideImage?: string;
  };
  userFlowDiagram?: string;
  researchInsights?: {
    title: string;
    description: string;
    insights: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  whatIChanged?: {
    title: string;
    description: string;
    headers: string[];
    rows: {
      feature: string;
      whatChanged: string;
      why: string;
    }[];
  };
  competitorAnalysis?: {
    title: string;
    headers: string[];
    rows: {
      criteria: string;
      values: ('yes' | 'no' | 'partial')[];
    }[];
  };
  userPersonas?: {
    name: string;
    age: number;
    occupation: string;
    location: string;
    techComfort: string;
    healthcareNeed: string;
    bio: string;
    goals: string[];
    painPoints: string[];
    needs: string[];
    quote: string;
    image?: string;
  }[];
  summary: string;
  duration: string;
  role: string;
  platform?: string;
  wireframes: { url: string; title: string }[];
  finalScreens: { url: string; mobileUrl?: string; title: string }[];
  beforeAfter: string[];
  outcome: string;
  scopeOfImprovements?: {
    heading: string;
    description: string;
  }[];
  thankYou: string;
}

const projects: Project[] = [
  {
    id: "mdoc-redesign",
    title: "Mdoc Mobile App Redesign Case Study",
    description: "mDoc is a healthcare platform that allows users to book doctor appointments from home with ease. It reduces time, travel, and cost, especially for patients in rural areas facing accessibility challenges. With a simple 4-step process, it makes healthcare access faster, convenient, and user-friendly.",
    longDescription:
      "mDoc is a healthcare platform that allows users to book doctor appointments from home with ease. It reduces time, travel, and cost, especially for patients in rural areas facing accessibility challenges. With a simple 4-step process, it makes healthcare access faster, convenient, and user-friendly.",
    tags: ["UX Design", "UI Design", "Mobile App"],
    image: "/images/mdoc-mockup-1.gif",
    video: "/images/mdoc-mockup.webm",
    tools: "Figma",
    link: "#",
    mobilePrototypeLink: "https://www.figma.com/proto/LZTpVciIofPQvGvRbvFUHP/mDoc-Redesign-Case-Study?node-id=66-4717&viewport=-1976%2C-1512%2C0.2&t=jQgvymOKhuRQBPvA-8&scaling=scale-down&content-scaling=fixed&starting-point-node-id=66%3A4025&page-id=57%3A3075&hide-ui=1",
    projectGoal: "The goal of this project was to redesign the app to improve usability, simplify navigation, and enhance the overall booking experience. It also introduces an AI-powered assistant to provide instant guidance and support to users. The aim was to create a faster, more accessible, and user-friendly healthcare journey.",
    problemStatement: "The existing mDoc application faced multiple usability challenges that made it difficult for users to efficiently book doctor appointments and navigate the app.",
    problemStatementScreens: [
      {
        images: ["/images/mdoc-previous-home-screen.png", "/images/mdoc-previous-home-screen-1.png"],
        problems: [
          {
            heading: "Complex Navigation",
            points: [
              "Over-dependence on hamburger menu",
              "Important features hidden under multiple layers"
            ]
          },
          {
            heading: "Inefficient User Flow",
            points: [
              "Increased steps to complete simple actions",
              "Slower appointment booking experience"
            ]
          }
        ]
      },
      {
        images: ["/images/mdoc-previous-doctor-listing-screen.png"],
        problems: [
          {
            heading: "Cluttered Interface",
            points: [
              "Text-heavy layouts with minimal spacing",
              "Difficult to quickly scan doctor information"
            ]
          },
          {
            heading: "Poor Visual Hierarchy",
            points: [
              "No clear distinction between primary and secondary actions",
              "Important CTAs like \"Book Now\" lacked visibility"
            ]
          },
          {
            heading: "Lack of Trust Indicators",
            points: [
              "Missing ratings, badges, and highlights",
              "Users couldn't easily evaluate doctors"
            ]
          }
        ]
      },
      {
        images: ["/images/mdoc-previous-profile-screen.png"],
        problems: [
          {
            heading: "Profile Layout",
            points: [
              "Options were unorganized and visually dense",
              "Important account settings were hard to locate"
            ]
          }
        ]
      }
    ],
    researchInsights: {
      title: "What the Research Told Me",
      description: "Three core insights shaped every design decision that followed.",
      insights: [
        {
          number: "01",
          title: "Trust First",
          description: "Users won't book a doctor they can't quickly evaluate. Without visible ratings, credentials, and verification badges, the decision to book feels like a risk, especially for first-time users."
        },
        {
          number: "02",
          title: "Faster Decisions",
          description: "In a healthcare context, users are often anxious or time-pressured. They don't read, they scan. Card-based layouts with clear information hierarchy reduce cognitive load and help users decide faster."
        },
        {
          number: "03",
          title: "Smart Guidance",
          description: "Users unfamiliar with telemedicine need to be told what to do next at every step. An AI assistant interface was identified as a way to provide instant support and reduce dependency on completing bookings alone."
        }
      ]
    },
    whatIChanged: {
      title: "What I Changed & Why",
      description: "Every design decision was traced back to a specific insight or pain point not aesthetic preference. Here's the reasoning behind the key changes.",
      headers: ["Screen / Feature", "What Changed", "Why"],
      rows: [
        {
          feature: "Home Screen",
          whatChanged: "Replaced the cluttered, banner-heavy layout with a clean hero section, quick-access service shortcuts, and a streamlined Find Doctor by Speciality grid",
          why: "The original homepage led with a lockdown notice banner and dense subscription cards before any real navigation users had to scroll past noise just to find a doctor"
        },
        {
          feature: "Doctor Listing",
          whatChanged: "Restructured to a clean card-based layout with specialisation, experience, fees, and ratings visible at a glance",
          why: "Users were unable to compare doctors efficiently too much scrolling, too little structure"
        },
        {
          feature: "Search & Filters",
          whatChanged: "Introduced advanced filtering options for more refined, relevant results",
          why: "Generic search results were forcing users to browse instead of find"
        },
        {
          feature: "Trust Signals",
          whatChanged: "Added ratings, verification badges, consultation fees, and recommendation tags to find better doctors",
          why: "Missing trust indicators were the primary reason users hesitated before booking"
        },
        {
          feature: "Book Now CTA",
          whatChanged: "Introduced a strong, consistently placed Book Now button with clear visual weight",
          why: "The original CTA was having weak visual hirarchy, and users hesitate to click it"
        },
        {
          feature: "AI Assistant",
          whatChanged: "Designed a dedicated chat-based interface where users describe symptoms and receive instant guidance and recommended next steps",
          why: "Many users especially in rural areas didn't know which specialisation to search for the assistant removes that barrier"
        },
        {
          feature: "Profile / Account Menu",
          whatChanged: "Reorganised the side-menu into clear groups appointments & bookings, account & subscription, support & legal with consistent spacing and icons",
          why: "The original menu listed 12+ items in one dense, unstructured list, making it hard to find frequently used settings like My Appointments or Log Out"
        },
        {
          feature: "Navigation & Settings",
          whatChanged: "Simplified navigation structure surfaced key account settings to accessible, predictable locations",
          why: "Users were getting lost trying to find profile and settings, causing frustration mid-journey"
        },
        {
          feature: "Spacing & Hierarchy",
          whatChanged: "Introduced consistent spacing, typography scale, and visual hierarchy across all screens",
          why: "The original app had no clear reading flow users didn't know where to look first"
        }
      ]
    },
    competitorAnalysis: {
      title: "Competetive Analysis",
      headers: ["Criteria", "mDoc (Redesign)", "Practo", "MediBuddy"],
      rows: [
        { criteria: "Clean Home Screen", values: ["yes", "no", "partial"] },
        { criteria: "Simple Information Hierarchy", values: ["yes", "no", "partial"] },
        { criteria: "Easy-to-Scan Doctor Cards", values: ["yes", "no", "yes"] },
        { criteria: "Advanced Search & Filters", values: ["yes", "partial", "yes"] },
        { criteria: "Streamlined Booking Flow", values: ["yes", "no", "yes"] },
        { criteria: "Clear Call-to-Action", values: ["yes", "partial", "yes"] },
        { criteria: "Appointment Management", values: ["yes", "yes", "yes"] },
        { criteria: "Visual Consistency", values: ["yes", "partial", "yes"] },
        { criteria: "Low Cognitive Load", values: ["yes", "no", "partial"] },
        { criteria: "Modern UI", values: ["yes", "partial", "yes"] },
        { criteria: "Doctor Ratings & Reviews", values: ["yes", "yes", "yes"] },
        { criteria: "Online Consultation", values: ["yes", "yes", "yes"] },
        { criteria: "AI Assistance", values: ["yes", "yes", "no"] }
      ]
    },
    userPersonas: [
      {
        name: "Rahul Sharma",
        age: 29,
        occupation: "Software Engineer",
        location: "Hyderabad",
        techComfort: "High",
        healthcareNeed: "Books appointments for himself when feeling unwell.",
        image: "/images/rahul-sharma-persona.png",
        bio: "Rahul works long hours and prefers booking doctor appointments online rather than visiting hospitals without prior scheduling. He values speed, convenience, and the ability to compare doctors based on ratings, availability, and specialization.",
        goals: [
          "Find the right specialist quickly.",
          "Book an appointment in under 2 minutes.",
          "View doctor ratings and availability.",
          "Easily reschedule appointments if needed."
        ],
        painPoints: [
          "Too many options make choosing a doctor difficult.",
          "Cluttered screens slow down booking.",
          "Limited filtering wastes time.",
          "Long booking flows feel frustrating."
        ],
        needs: [
          "Clean interface",
          "Advanced filters",
          "Simple booking flow",
          "Appointment reminders"
        ],
        quote: "I just want to find the right doctor and book an appointment quickly without going through unnecessary steps."
      },
      {
        name: "Priya Nair",
        age: 41,
        occupation: "Homemaker",
        location: "Bengaluru",
        techComfort: "Moderate",
        healthcareNeed: "Frequently books appointments for her children and elderly parents.",
        image: "/images/priya-nair-persona.png",
        bio: "Priya manages healthcare appointments for her family. She prefers an app that clearly displays doctor information, available time slots, and appointment details without requiring multiple steps.",
        goals: [
          "Book appointments for family members.",
          "Compare doctors easily.",
          "Access appointment history.",
          "Reschedule or cancel appointments effortlessly."
        ],
        painPoints: [
          "Confusing navigation.",
          "Too much medical information on one screen.",
          "Difficulty comparing doctors.",
          "Fear of booking the wrong time slot."
        ],
        needs: [
          "Clear doctor profiles",
          "Easy appointment management",
          "Simple navigation",
          "Large, readable interface"
        ],
        quote: "I need an app that's easy to understand so I can book appointments for my family without confusion."
      }
    ],
    craftedSolution: {
      content: "",
      video: "/images/mdoc-casestudy-mockup.webm",
      features: [
        {
          title: "Home Screen",
          solution: [
            "Introduced a contextual header with location and greeting to personalize the user experience",
            "Added a prominent search bar for quick access to doctors, hospitals, and tests",
            "Displayed upcoming appointments with a clean visual card to remind users about upcoming appointments",
            "Improved service shortcuts and doctor categories for faster navigation and discovery",
            "Structured health plans with pricing, benefits, and strong CTAs to improve conversions",
            "Replaced hamburger menu with bottom navigation including core sections to reduce steps and improve",
          ],
          images: ["/images/mdoc-home-screen.png", "/images/mdoc-home-screen-1.png"],
          imagePosition: "right"
        },
        {
          title: "Doctor Listing Screen",
          solution: [
            "Improved search experience with advanced filtering options for more refined results",
            "Transformed doctor listings into a clean card-based layout for better scanability",
            "Structured doctor details (specialization, experience, fees) for quick understanding",
            "Added ratings, verification badges, and recommendation tags to build trust",
            "Highlighted consultation fees and strong Book Now CTA to support faster decisions and conversions",
            "Maintained consistent spacing and improved clinic info with direction action for better readability and accessibility",
          ],
          image: "/images/mdoc-doctor-listing-screen.png",
          imagePosition: "left"
        },
        {
          title: "Ask AI Screen",
          solution: [
            "Introduced a dedicated AI assistant interface for instant user support",
            "Designed a chat-based UI for natural and conversational interaction",
            "Enabled users to describe symptoms and receive quick guidance",
            "Provided recommended next steps to help users take action",
            "Reduced dependency on immediate doctor booking through pre-consultation support",
            "Maintained clean chat layout with clear message hierarchy",
            "Positioned AI as a core feature to assist users throughout their journey"
          ],
          images: ["/images/mdoc-ask-ai-screen.png", "/images/mdoc-ask-ai-chat-screen.png"],
          imagePosition: "right"
        },
        {
          title: "Profile Screen",
          solution: [
            "Designed a personalized profile header with user image, name, and email",
            "Organized features into clear sections like Activity, Services and Help",
            "Replaced simple lists with card-based options for better structure",
            "Added icons and short descriptions for better feature understanding",
            "Improved navigation within profile through logical grouping",
            "Maintained consistent UI design with overall app theme",
            "Enhanced visibility of key actions like appointments, bookings, and subscriptions"
          ],
          image: "/images/mdoc-profile-screen.png",
          imagePosition: "left"
        },
      ],
      images: []
    },
    userFlowDiagram: "/images/mdoc-user-flow-diagram.png",
    summary: "The redesign simplified key healthcare journeys, boosting booking conversion and daily vitals logging engagement.",
    duration: "2 Weeks",
    role: "UX/UI Designer",
    platform: "Mobile App",
    wireframes: [],
    finalScreens: [
      { url: "/images/mdoc-splash-screen.png", title: "Splash Screen" },
      { url: "/images/mdoc-onboarding-screen.png", title: "Onboarding" },
      { url: "/images/mdoc-login-screen.png", title: "Login" },
      { url: "/images/mdoc-otp-screen.png", title: "OTP Verification" },
      { url: "/images/mdoc-home-screen.png", title: "Home Screen" },
      { url: "/images/mdoc-home-screen-1.png", title: "Home Screen Alt" },
      { url: "/images/mdoc-doctor-listing-screen.png", title: "Doctor Listing" },
      { url: "/images/mdoc-filters-screen.png", title: "Search & Filters" },
      { url: "/images/mdoc-booking-screen.png", title: "Doctor Booking" },
      { url: "/images/mdoc-appointment-screen.png", title: "My Appointments" },
      { url: "/images/mdoc-ask-ai-screen.png", title: "Ask AI" },
      { url: "/images/mdoc-ask-ai-chat-screen.png", title: "AI Assistant Chat" },
      { url: "/images/mdoc-profile-screen.png", title: "Profile & Settings" },
      { url: "/images/mdoc-booking-details-screen.png", title: "Booking Details" },
      { url: "/images/mdoc-confirmation-screen.png", title: "Appointment Confirmation" },
    ],
    beforeAfter: [],
    outcome: "The redesign improved usability by simplifying navigation and making key actions like booking appointments faster and easier. Enhanced layouts, filters, and AI assistance helped users find relevant information quickly and make better decisions. Overall, the app became more user-friendly, efficient, and accessible, especially for users in rural areas.",
    scopeOfImprovements: [
      {
        heading: "AI-Powered Doctor Recommendations",
        description: "AI-powered doctor recommendations could be introduced based on symptoms, location, consultation history, and user preferences to simplify doctor discovery."
      },
      {
        heading: "Appointment Timeline Tracking",
        description: "A real-time appointment timeline could be implemented to keep users informed throughout the booking journey, from confirmation to consultation completion."
      }
    ],
    thankYou: "Need help with your product? Let's build it better!"
  },
  {
    id: "lingscar-redesign",
    title: "LINGsCARS Website Redesign Casestudy",
    description: "LINGsCARS is a UK-based car leasing broker offering thousands of personal and business vehicle lease deals. Despite its strong market presence, the website experience creates usability friction due to visual clutter and lack of structured navigation. This project focuses on redesigning the Homepage and Browse Deals experience to improve clarity, discovery, and conversion.",
    longDescription:
      "A comprehensive UX and UI redesign of the LINGsCARS website â€” one of the UK's most distinctive car leasing platforms. The goal was to modernise the visual language while improving usability, information hierarchy, and conversion on the Homepage and Browse Deals page.",
    tags: ["UX Design", "UI Design", "Landing Page"],
    image: "/images/lingscars-main-1.png",
    tools: "Figma",
    link: "#",
    prototypeLink: "https://www.figma.com/proto/YD9W776boihYEh4X54Q0Zo/LINGsCARS-Redesign?node-id=386-24121&viewport=-96%2C64%2C0.06&t=JdeSYa3UDiM0ebuK-8&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=386%3A24121&page-id=8%3A247&hide-ui=1",
    mobilePrototypeLink: "https://www.figma.com/proto/YD9W776boihYEh4X54Q0Zo/LINGsCARS-Redesign?node-id=476-12464&viewport=-96%2C64%2C0.06&t=JdeSYa3UDiM0ebuK-8&scaling=scale-down&content-scaling=fixed&starting-point-node-id=476%3A20897&page-id=8%3A247&hide-ui=1",
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
    platform: "Web & Mobile",
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
    thankYou: "Need help with your product? Let's build it better!"
  }
];

export default projects;
