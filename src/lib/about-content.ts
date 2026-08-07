export interface Credential {
  keyEn: string;
  keyBn?: string;
  valEn: string;
  valBn?: string;
}

export interface InfraCard {
  titleEn: string;
  titleBn?: string;
  descEn: string;
  descBn?: string;
  iconName: string;
}

export interface AboutContentFull {
  headerTitleEn: string;
  headerTitleBn?: string;
  headerDescEn: string;
  headerDescBn?: string;

  missionTitleEn: string;
  missionTitleBn?: string;
  missionP1En: string;
  missionP1Bn?: string;
  missionP2En: string;
  missionP2Bn?: string;

  credTitleEn: string;
  credTitleBn?: string;
  credentials: Credential[];

  infraTitleEn: string;
  infraTitleBn?: string;
  infraDescEn: string;
  infraDescBn?: string;
  infraCards: InfraCard[];

  integrityTitleEn: string;
  integrityTitleBn?: string;
  integrityDescEn: string;
  integrityDescBn?: string;
  btn1En: string;
  btn1Bn?: string;
  btn2En: string;
  btn2Bn?: string;
}

export const defaultAboutContentFull: AboutContentFull = {
  headerTitleEn: "About ",
  headerDescEn:
    "Discover our history, network infrastructure capabilities, and why we are South Keraniganj's most trusted broadband provider.",

  missionTitleEn: "Our Mission",
  missionP1En:
    "At M Amin Network, we believe high-speed, reliable internet is no longer a luxury—it is an essential utility for education, commerce, and communication. Since our inception, we have dedicated ourselves to bridging the digital divide in South Keraniganj by deploying pure, 100% optical fiber connections (FTTH) direct to homes and businesses.",
  missionP2En:
    "Operating our own Autonomous System Number (AS150164), we peer directly with major local and global content exchanges. This infrastructure gives our subscribers latency-free access to remote work resources, streaming caches (Google GGC, Facebook FNA, Netflix OCA), and multiplayer gaming servers.",

  credTitleEn: "Key Credentials",
  credentials: [
    { keyEn: "License Authority", valEn: "BTRC Bangladesh" },
    { keyEn: "ISP Association Membership", valEn: "ISPAB Active Member" },
    { keyEn: "Autonomous System (ASN)", valEn: "AS150164" },
    { keyEn: "Service Coverage", valEn: "South Keraniganj, Dhaka" },
    { keyEn: "Line Configuration", valEn: "100% Fiber (FTTH)" },
  ],

  infraTitleEn: "Infrastructure Powerhouse",
  infraDescEn:
    "We leverage modern networking standards to maintain steady throughput, routing, and uptime.",
  infraCards: [
    {
      titleEn: "BGP Multi-Homing Routing",
      descEn:
        "By operating our own BGP network (AS150164), we peer with multiple major upstream Tier-1 network gateways. In the event of a fiber outage from one upstream gateway, our router automatically re-routes packets instantly.",
      iconName: "Network",
    },
    {
      titleEn: "Local Exchange Peering",
      descEn:
        "We route directly to Bangladesh Internet Exchange (BDIX) and various local hosting centers. Subscribing to M Amin Network gives you access of up to 100 Mbps to local databases, FTP streaming archives, and live TV portals.",
      iconName: "Database",
    },
    {
      titleEn: "24/7 On-Field Dispatch",
      descEn:
        "Unlike major centralized ISPs, our support center is localized right inside South Keraniganj. Our field crews, splicing engineers, and technical support assistants are situated nearby to provide instant physical repair service.",
      iconName: "Wrench",
    },
  ],

  integrityTitleEn: "Our Integrity Guarantee",
  integrityDescEn:
    "We adhere strictly to the guidelines and standards set forth by the Bangladesh Telecommunication Regulatory Commission (BTRC). We guarantee that you will receive the minimum committed bandwidth speeds as defined in your contract, with no hidden fair usage policies (FUP) or caps.",
  btn1En: "Explore Packages",
  btn2En: "Support Center",
};
