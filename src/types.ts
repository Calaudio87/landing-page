export interface Project {
  id: string;
  title: string;
  category: 'laravel' | 'mysql' | 'saas' | 'enterprise';
  tagline: string;
  description: string;
  fullOverview: string;
  impactMetrics: {
    label: string;
    value: string;
    description: string;
  }[];
  techStack: string[];
  databaseFeatures: string[];
  architectureHighlights: string[];
  sampleCode?: {
    filename: string;
    language: 'php' | 'sql';
    code: string;
    explanation: string;
  };
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  name: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0-100
    experienceYears: string;
    highlight: string;
  }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  deliverables: string[];
  idealFor: string;
}

export interface CareerMilestone {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  techUsed: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  serviceType: string;
  budgetRange: string;
  timeline: string;
  message: string;
}
