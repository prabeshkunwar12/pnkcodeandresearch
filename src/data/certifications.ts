export type Certification = {
  id: string;
  title: string;
  provider: string;
  issued: string;
  credentialId?: string;
  url: string;
  logoSrc: string;
  tags: string[];
  relations: Array<"landing" | "developer" | "researcher" | "quantum">;
  featured?: boolean;
};

export const certifications: Certification[] = [
  {
    id: "project-management-google",
    title: "Foundations of Project Management",
    provider: "Google",
    issued: "Jan 2026",
    credentialId: "A3JHFH1FVXWV",
    url: "https://www.coursera.org/account/accomplishments/verify/A3JHFH1FVXWV?utm_product=course",
    logoSrc: "/company_logo/google.svg",
    tags: ["Project Management"],
    relations: ["landing", "developer"],
    featured: true,
  },
  {
    id: "quantum-course-packt",
    title: "The Complete Quantum Computing Course for Beginners",
    provider: "Packt",
    issued: "Nov 2025",
    url: "https://www.coursera.org/account/accomplishments/specialization/M87NEH7GKWOU",
    logoSrc: "/company_logo/packt.svg",
    tags: ["Quantum", "Foundations"],
    relations: ["landing", "researcher", "quantum"],
    featured: true,
  },
  {
    id: "quantum-math-essentials",
    title: "Mathematical Foundations and Quantum Mechanics Essentials",
    provider: "Packt",
    issued: "Oct 2025",
    url: "https://www.coursera.org/account/accomplishments/verify/UUQLY52S2333",
    logoSrc: "/company_logo/packt.svg",
    tags: ["Quantum", "Math"],
    relations: ["landing", "researcher", "quantum"],
  },
  {
    id: "qiskit-advanced-algorithms",
    title: "Quantum Computing with Qiskit and Advanced Algorithms",
    provider: "Packt",
    issued: "Nov 2025",
    credentialId: "LZGAIKEZ97JI",
    url: "https://www.coursera.org/account/accomplishments/certificate/LZGAIKEZ97JI",
    logoSrc: "/company_logo/packt.svg",
    tags: ["Quantum", "Qiskit", "Algorithms"],
    relations: ["landing", "researcher", "quantum"],
    featured: true,
  },
  {
    id: "python-quantum",
    title: "Python Programming for Quantum Computing",
    provider: "Packt",
    issued: "Oct 2025",
    credentialId: "JRF854Y0WN9L",
    url: "https://www.coursera.org/account/accomplishments/records/JRF854Y0WN9L",
    logoSrc: "/company_logo/packt.svg",
    tags: ["Python", "Quantum"],
    relations: ["landing", "researcher", "quantum"],
  },
  {
    id: "frontend-react-hackerrank",
    title: "Front End Developer (React)",
    provider: "HackerRank",
    issued: "Apr 2024",
    url: "https://www.hackerrank.com/certificates/f8b56b795e5d",
    logoSrc: "/company_logo/hackerRank.svg",
    tags: ["React", "Frontend"],
    relations: ["landing", "developer"],
    featured: true,
  },
  {
    id: "java-basic-hackerrank",
    title: "Java (Basic)",
    provider: "HackerRank",
    issued: "Apr 2024",
    url: "https://www.hackerrank.com/certificates/405bd17789bc",
    logoSrc: "/company_logo/hackerRank.svg",
    tags: ["Java"],
    relations: ["landing", "developer"],
  },
  {
    id: "responsive-web-design",
    title: "Responsive Web Design",
    provider: "freeCodeCamp",
    issued: "Sep 2023",
    url: "https://freecodecamp.org/certification/prabeshkunwar12/responsive-web-design",
    logoSrc: "/company_logo/freeCodeCamp.svg",
    tags: ["HTML", "CSS", "Web"],
    relations: ["landing", "developer"],
  },
];
