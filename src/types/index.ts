export type EventType =
  | "Workshop"
  | "Guest Talk"
  | "Competition"
  | "Hackathon"
  | "Social"
  | "Meetup"
  | "Visit";

export type EventStatus = "Confirmed" | "Planning" | "Idea";

export type DomainName =
  | "Cybersecurity"
  | "Artificial Intelligence"
  | "Development"
  | "Entrepreneurship"
  | "Design"
  | "Community";

export interface KxEvent {
  id: string;
  name: string;
  type: EventType;
  status: EventStatus;
  date: string; // ISO YYYY-MM-DD
  expectedAttendees: number;
  venue: string;
  domain: DomainName;
  flagship?: boolean;
  summary: string;
}

export type AnnouncementTone = "accent" | "violet" | "gold" | "emerald" | "neutral";

export interface Announcement {
  id: string;
  title: string;
  kicker: string;
  body: string;
  meta: string;
  tone: AnnouncementTone;
  priority: number;
  ticker: string;
  cta?: { label: string; href: string };
}

export interface Domain {
  id: string;
  name: string;
  icon: string;
  summary: string;
  topics: string[];
  hue: number;
}

export interface LearningStep {
  id: string;
  step: number;
  title: string;
  phase: string;
  summary: string;
}

export interface SemesterMonth {
  id: string;
  month: string;
  title: string;
  summary: string;
  highlights: string[];
  status: "current" | "planned" | "done";
}

export interface Project {
  id: string;
  name: string;
  domain: string;
  summary: string;
  stack: string[];
  status: string;
  featured?: boolean;
  repo?: string;
  demo?: string;
}

export interface HallOfFameCategory {
  id: string;
  title: string;
  icon: string;
  summary: string;
  criteria: string;
  hue: number;
}

export interface ResourceCategory {
  id: string;
  title: string;
  icon: string;
  summary: string;
  items: string[];
  count: number;
  hue: number;
}

export interface Partner {
  id: string;
  name: string;
  kind: string;
}

export interface CommunityStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export type TeamName =
  | "Leadership"
  | "Technical"
  | "Events"
  | "Marketing"
  | "Sponsorship"
  | "Documentation";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  team: TeamName;
  seniority: "faculty" | "lead" | "core";
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  span: "sm" | "md" | "lg" | "xl";
  hue: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  author: string;
  status: string;
}
