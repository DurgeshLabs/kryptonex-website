import announcementsJson from "./announcements.json";
import blogJson from "./blog.json";
import communityStatsJson from "./community-stats.json";
import domainsJson from "./domains.json";
import eventsJson from "./events.json";
import galleryJson from "./gallery.json";
import hallOfFameJson from "./hall-of-fame.json";
import learningPathJson from "./learning-path.json";
import partnersJson from "./partners.json";
import projectsJson from "./projects.json";
import resourcesJson from "./resources.json";
import semesterRoadmapJson from "./semester-roadmap.json";
import teamJson from "./team.json";

import type {
  Announcement,
  BlogPost,
  CommunityStat,
  Domain,
  GalleryItem,
  HallOfFameCategory,
  KxEvent,
  LearningStep,
  Partner,
  Project,
  ResourceCategory,
  SemesterMonth,
  TeamMember,
} from "@/types";

export const events = (eventsJson as KxEvent[]).slice().sort((a, b) => a.date.localeCompare(b.date));

export const announcements = (announcementsJson as Announcement[])
  .slice()
  .sort((a, b) => a.priority - b.priority);

export const domains = domainsJson as Domain[];
export const learningPath = (learningPathJson as LearningStep[])
  .slice()
  .sort((a, b) => a.step - b.step);
export const semesterRoadmap = semesterRoadmapJson as SemesterMonth[];
export const projects = projectsJson as Project[];
export const hallOfFame = hallOfFameJson as HallOfFameCategory[];
export const resources = resourcesJson as ResourceCategory[];
export const partners = partnersJson as Partner[];
export const communityStats = communityStatsJson as CommunityStat[];
export const team = teamJson as TeamMember[];
export const gallery = galleryJson as GalleryItem[];
export const blogPosts = (blogJson as BlogPost[]).slice().sort((a, b) => b.date.localeCompare(a.date));

export const eventTypes = [
  "Workshop",
  "Guest Talk",
  "Competition",
  "Hackathon",
  "Social",
  "Meetup",
  "Visit",
] as const;

export const teamNames = [
  "Leadership",
  "Technical",
  "Events",
  "Marketing",
  "Sponsorship",
  "Documentation",
] as const;

export const galleryCategories = [
  "Workshops",
  "Hackathons",
  "Industry Visits",
  "Meetups",
  "Community",
  "Behind The Scenes",
] as const;

/** Leadership shown on the landing page — the full roster lives on /team. */
export const leadership = team.filter((m) => m.seniority !== "core");

/** Derived from the roster and calendar, so these never drift from the data. */
export const derived = {
  councilSize: team.length,
  teams: teamNames.length,
  plannedEvents: events.length,
  domains: domains.length,
  resourceCount: resources.reduce((sum, r) => sum + r.count, 0),
};

/** Events at or after `today` (ISO date), soonest first. */
export function upcomingEvents(today: string, limit?: number) {
  const list = events.filter((e) => e.date >= today);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Events before `today`, most recent first. */
export function pastEvents(today: string, limit?: number) {
  const list = events.filter((e) => e.date < today).reverse();
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Groups events by "Month YYYY" preserving chronological order. */
export function groupEventsByMonth(list: KxEvent[]) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const groups = new Map<string, KxEvent[]>();
  for (const event of list) {
    const [year, month] = event.date.split("-").map(Number);
    const key = `${months[month - 1]} ${year}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(event);
  }
  return [...groups.entries()];
}
