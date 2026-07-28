import eventsJson from "./events.json";
import teamJson from "./team.json";
import roadmapJson from "./roadmap.json";
import ctfJourneyJson from "./ctf-journey.json";
import faqJson from "./faq.json";
import testimonialsJson from "./testimonials.json";
import galleryJson from "./gallery.json";

import type {
  CtfStage,
  FaqItem,
  GalleryItem,
  KxEvent,
  RoadmapTopic,
  TeamMember,
  Testimonial,
} from "@/types";

export const events = (eventsJson as KxEvent[])
  .slice()
  .sort((a, b) => a.date.localeCompare(b.date));

export const team = teamJson as TeamMember[];
export const roadmap = (roadmapJson as RoadmapTopic[]).slice().sort((a, b) => a.index - b.index);
export const ctfJourney = (ctfJourneyJson as CtfStage[]).slice().sort((a, b) => a.step - b.step);
export const faqs = faqJson as FaqItem[];
export const testimonials = testimonialsJson as Testimonial[];
export const gallery = galleryJson as GalleryItem[];

export const eventTypes = ["Workshop", "Guest Talk", "Competition", "Social", "Meetup"] as const;

export const teamNames = [
  "Leadership",
  "Technical",
  "Events",
  "Marketing",
  "Sponsorship",
  "Documentation",
] as const;

const countByType = (type: string) => events.filter((e) => e.type === type).length;

/** Everything the stats band shows is derived from the data files, so it never goes stale. */
export const stats = {
  members: team.length,
  teams: teamNames.length,
  events: events.length,
  workshops: countByType("Workshop"),
  speakers: countByType("Guest Talk"),
  competitions: countByType("Competition"),
  tracks: roadmap.length,
  seats: events.reduce((sum, e) => sum + e.expectedAttendees, 0),
};
