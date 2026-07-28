export type EventType =
  | "Workshop"
  | "Guest Talk"
  | "Competition"
  | "Social"
  | "Meetup";

export type EventStatus = "Planning" | "Idea" | "Confirmed";

export interface KxEvent {
  id: string;
  name: string;
  type: EventType;
  status: EventStatus;
  date: string; // ISO YYYY-MM-DD
  expectedAttendees: number;
  flagship?: boolean;
  summary: string;
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

export interface RoadmapTopic {
  id: string;
  index: number;
  title: string;
  stage: "Foundations" | "Offense" | "Defense" | "Specialist";
  duration: string;
  summary: string;
  skills: string[];
  tools: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  tag: string;
  span: "sm" | "md" | "lg" | "xl";
  hue: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  attribution: string;
  context: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "Getting started" | "Learning" | "Events" | "Logistics";
}

export interface CtfStage {
  id: string;
  step: number;
  title: string;
  timeframe: string;
  summary: string;
  outcomes: string[];
  command: string;
}
