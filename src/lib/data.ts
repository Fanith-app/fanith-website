import routes from "./routes";

export const navLinks = [
  { label: "Home", href: "/"  },
  { label: "Features", href: "/features" },
  { label: "About Us", href: "/about" },
  // { label: "Brand Partnership", href: "/partnership" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];


export const communityContent = {
  All: [
    {
      category: "Match Highlights",
      title: "Epic Comeback: The Nexus Knights Secure",
      description:
        "Relive the thrilling moments as the Nexus Knights defy all odds in a nail-biting finish, turning the tide with their unparalleled determination.",
      date: "24 April 2025",
      author: "Author",
      image: "/assets/images/gameroom.png",
    },
  ],

  "Match Highlights": [
    {
      category: "Match Highlights",
      title: "Epic Comeback: The Nexus Knights Secure",
      description:
        "Relive the thrilling moments as the Nexus Remember to keep the image realistic and accurate. Use existing data. Knights defy all odds in a nail-biting finish.",
      date: "24 April 2025",
      author: "Author",
      image: "/assets/images/fandom.png",
    },
  ],

  "Fan Stories": [
    {
      category: "Fan Stories",
      title: "A Night I'll Never Forget",
      description:
        "From chants to celebrations, this fan shares their unforgettable match-day experience.",
      date: "22 April 2025",
      author: "Fan Contributor",
      image: "/assets/images/fantribe.png",
    },
  ],

  Commentary: [
    {
      category: "Commentary",
      title: "Tactical Masterclass That Changed the Game",
      description:
        "Breaking down the strategies that flipped the match in the final overs.",
      date: "20 April 2025",
      author: "Expert Analyst",
      image: "/assets/images/fanpedia.png",
    },
  ],

  Announcements: [
    {
      category: "Announcements",
      title: "Fanith Beta Launch Announced",
      description:
        "We’re excited to announce the upcoming beta launch of Fanith.",
      date: "18 April 2025",
      author: "Fanith Team",
      image: "/assets/images/fandom.png",
    },
  ],
};

// components/faq/faqData.ts
export const faqData = {
  "Installation Guide": {
    faqs: [
      {
        q: "How do I install the Fanith app?",
        a: "Fanith is currently web-based. Simply visit our website and sign up. Mobile apps are coming soon.",
      },
      {
        q: "What is FanDom and how do points work?",
        a: "FanDom rewards your engagement like chats, polls, and reactions.",
      },
    ],
    popular: [
      { q: "How to download the app?", a: "You can download the Fanith app from our website." },
      { q: "How to join Game Rooms?", a: "You can join Game Rooms by navigating to the 'Game Rooms' section on our website." },
      { q: "How to earn FanDom badges?", a: "You can earn FanDom badges by participating in matches, chatting, and engaging with the community." },
      { q: "How to contact support?", a: "You can contact support through our help center or by emailing us at support@fanith.com." },
      { q: "What are the privacy settings?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { q: "Can I customize my profile?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    ],
  },

  "Brand & Sponsorships": {
    faqs: [
      {
        q: "How can brands collaborate with Fanith?",
        a: "Brands can collaborate with Fanith through sponsored game rooms, branded fan challenges, exclusive content integrations, and in-app promotions tailored to sports audiences."
      },
      {
        q: "What types of sponsorship opportunities are available?",
        a: "Fanith offers sponsorships such as match-day brand placements, FanDom reward sponsorships, FanPedia brand integrations, and custom campaign activations."
      },
      {
        q: "Can brands target specific sports or teams?",
        a: "Yes, brands can target specific sports, leagues, teams, or fan segments to maximize relevance and engagement."
      },
      {
        q: "How can a brand get started?",
        a: "Brands can reach out through our official partnership form or email us at partnerships@fanith.com to discuss collaboration opportunities."
      },
    ],
    popular: [
      { q: "How to become a Fanith partner?", a: "You can become a Fanith partner by reaching out through our official partnership form or emailing us at partnerships@fanith.com." },
      { q: "What sponsorship formats are available?", a: "Fanith offers various sponsorship formats including match-day brand placements, FanDom reward sponsorships, FanPedia brand integrations, and custom campaign activations." },
      { q: "Can brands run fan contests?", a: "Yes, brands can run fan contests through our platform." },
      { q: "How to contact the partnership team?", a: "You can contact the partnership team via email at partnerships@fanith.com or through our official partnership form." },
    ],
  },


  FanDom: {
    faqs: [
      {
        q: "What is FanDom?",
        a: "FanDom is Fanith’s engagement scoring system that rewards fan activity.",
      },
      {
        q: "How do I earn FanDom points?",
        a: "You earn points by chatting, voting, reacting, and participating in matches.",
      },
    ],
    popular: [
      { q: "How to earn FanDom badges?", a: "You can earn FanDom badges by participating in matches, chatting, and engaging with the community." },
      { q: "Can FanDom points expire?", a: "No, FanDom points are permanent and do not expire." },
      { q: "How to increase FanDom rank?", a: "You can increase your FanDom rank by consistently engaging with the platform and earning more points." },
    ],
  },

  "Beta Testing": {
    faqs: [
      {
        q: "What is Fanith Beta testing?",
        a: "Beta testing allows early users to access upcoming features, provide feedback, and help shape the future of the Fanith platform."
      },
      {
        q: "How can I join the Beta program?",
        a: "You can join the Fanith Beta by signing up on our website and opting into beta access when available."
      },
      {
        q: "Is Beta access free?",
        a: "Yes, beta access is completely free and designed to gather valuable user feedback."
      },
      {
        q: "Can I report bugs or suggest features?",
        a: "Absolutely! Beta testers can report bugs and suggest features directly through the app or via our feedback channels."
      },
    ],
    popular: [
      { q: "How to join Fanith Beta?", a: "You can join the Fanith Beta by signing up on our website and opting into beta access when available." },
      { q: "What features are in Beta?", a: "Beta features include early access to new game rooms, exclusive FanDom rewards, and advanced FanPedia insights." },
      { q: "How to report bugs?", a: "You can report bugs directly within the app or through our feedback channels." },
      { q: "Is Beta available on mobile?", a: "Yes, the Fanith Beta is available on both web and mobile platforms." },
    ],
  },


  FanPedia: {
    faqs: [
      {
        q: "What is FanPedia?",
        a: "FanPedia is a sports knowledge hub with player stats and insights.",
      },
    ],
    popular: [
      { q: "What data is available on FanPedia?", a: "FanPedia provides player stats, team information, and detailed sports insights." },
      { q: "Is FanPedia updated live?", a: "FanPedia is regularly updated with the latest sports data and insights." },
    ],
  },

  Policies: {
    faqs: [
      {
        q: "What are Fanith’s community guidelines?",
        a: "Fanith promotes respectful fan engagement. Hate speech, harassment, spam, or abusive behavior is strictly prohibited."
      },
      {
        q: "How does content moderation work?",
        a: "Content is moderated using a combination of automated tools and human review to ensure a safe and positive fan environment."
      },
      {
        q: "How is my data protected?",
        a: "We follow industry-standard security practices to protect user data and ensure privacy."
      },
      {
        q: "Can I report inappropriate content?",
        a: "Yes, users can report content directly within the platform, and our moderation team reviews all reports promptly."
      },
    ],
    popular: [
      {
        q: "What content is not allowed?",
        a: "Prohibited content includes hate speech, harassment, spam, and abusive behavior."
      },
      { q: "How to report users?", a: "You can report users directly within the platform or through our feedback channels." },
      { q: "How does moderation work?", a: "Content is moderated using a combination of automated tools and human review to ensure a safe and positive fan environment." },
      { q: "Is my data secure?", a: "We follow industry-standard security practices to protect user data and ensure privacy." },
    ],
  },

};


export const privacyPolicy = {
  policyId: "fanith-privacy-policy",
  lastUpdated: "2025-01-01",

  website: {
    name: "Fanith",
    type: "Sports & IPL Cricket Platform",
    url: "https://www.fanith.com"
  },

  introduction: {
    title: "Privacy Policy",
    description:
      "Fanith respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data while you enjoy IPL cricket content, live updates, and fan engagement features."
  },

  informationCollected: {
    title: "Information We Collect",
    items: [
      {
        type: "Personal Information",
        description:
          "Name, email address, mobile number, and account login details when you register on Fanith."
      },
      {
        type: "Usage Data",
        description:
          "Pages visited, match interactions, favorite teams, polls, and engagement activity related to IPL content."
      },
      {
        type: "Device Information",
        description:
          "IP address, browser type, operating system, and device identifiers."
      },
      {
        type: "Cookies & Tracking",
        description:
          "Cookies and similar technologies to enhance user experience and analyze traffic."
      }
    ]
  },

  howWeUseData: {
    title: "How We Use Your Information",
    uses: [
      "To provide IPL match updates, live scores, and personalized content",
      "To improve website performance and user experience",
      "To send notifications, newsletters, and match alerts",
      "To analyze fan engagement and platform usage",
      "To maintain security and prevent fraud"
    ]
  },

  dataSharing: {
    title: "Data Sharing & Disclosure",
    description:
      "Fanith does not sell your personal data. We may share information only with trusted partners for analytics, hosting, or legal compliance.",
    sharedWith: [
      "Analytics and performance monitoring services",
      "Cloud hosting and infrastructure providers",
      "Legal authorities when required by law"
    ]
  },

  cookiesPolicy: {
    title: "Cookies Policy",
    description:
      "We use cookies to remember user preferences, analyze IPL content popularity, and enhance your browsing experience.",
    cookieTypes: [
      "Essential Cookies",
      "Performance Cookies",
      "Analytics Cookies"
    ]
  },

  userRights: {
    title: "Your Rights",
    rights: [
      "Access your personal data",
      "Request correction or deletion of your data",
      "Opt-out of marketing communications",
      "Disable cookies through browser settings"
    ]
  },

  dataSecurity: {
    title: "Data Security",
    description:
      "We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, or disclosure."
  },

  thirdPartyLinks: {
    title: "Third-Party Links",
    description:
      "Fanith may contain links to third-party sports content or partner websites. We are not responsible for their privacy practices."
  },

  policyUpdates: {
    title: "Policy Updates",
    description:
      "This Privacy Policy may be updated periodically. Any changes will be reflected on this page with a revised date."
  },

  contactInformation: {
    title: "Contact Us",
    email: "support@fanith.com",
    address: "Fanith Sports Pvt Ltd, India"
  }
};

export const termsAndConditions = {
  policyId: "fanith-terms-and-conditions",
  lastUpdated: "2025-01-01",

  website: {
    name: "Fanith",
    type: "Sports & IPL Cricket Platform",
    url: "https://www.fanith.com"
  },

  introduction: {
    title: "Terms & Conditions",
    description:
      "Welcome to Fanith. By accessing or using our website and services related to IPL cricket content, live updates, and fan engagement features, you agree to comply with and be bound by the following Terms & Conditions."
  },

  eligibility: {
    title: "Eligibility",
    description:
      "You must be at least 13 years of age to use Fanith. By using this platform, you represent that you meet the eligibility requirements."
  },

  userAccount: {
    title: "User Accounts",
    points: [
      "You are responsible for maintaining the confidentiality of your account credentials",
      "You must provide accurate and complete registration information",
      "Fanith reserves the right to suspend or terminate accounts that violate these terms"
    ]
  },

  acceptableUse: {
    title: "Acceptable Use Policy",
    points: [
      "Do not post abusive, offensive, or harmful content",
      "Do not attempt to hack, disrupt, or misuse the platform",
      "Do not use Fanith for unlawful activities",
      "Respect other users and community guidelines"
    ]
  },

  contentOwnership: {
    title: "Content Ownership & Usage",
    description:
      "All content on Fanith, including IPL match data, text, graphics, logos, and design elements, is owned by Fanith or its content partners and is protected by intellectual property laws.",
    restrictions: [
      "No reproduction without written permission",
      "No commercial use of content without authorization",
      "No redistribution of Fanith content on other platforms"
    ]
  },

  thirdPartyServices: {
    title: "Third-Party Services",
    description:
      "Fanith may include links or integrations with third-party services. We are not responsible for the content, accuracy, or practices of third-party platforms."
  },

  disclaimers: {
    title: "Disclaimers",
    points: [
      "IPL match schedules, scores, and statistics are provided for informational purposes only",
      "Fanith does not guarantee uninterrupted or error-free service",
      "Content accuracy may vary due to third-party data sources"
    ]
  },

  limitationOfLiability: {
    title: "Limitation of Liability",
    description:
      "Fanith shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of or inability to use the platform."
  },

  termination: {
    title: "Termination",
    description:
      "We reserve the right to suspend or terminate access to Fanith at any time for violations of these Terms & Conditions."
  },

  governingLaw: {
    title: "Governing Law",
    description:
      "These Terms & Conditions shall be governed by and construed in accordance with the laws of India."
  },

  changesToTerms: {
    title: "Changes to Terms",
    description:
      "Fanith reserves the right to modify these Terms & Conditions at any time. Continued use of the platform after changes indicates acceptance of the updated terms."
  },

  contactInformation: {
    title: "Contact Us",
    email: "support@fanith.com",
    address: "Fanith Sports Pvt Ltd, India"
  }
};



