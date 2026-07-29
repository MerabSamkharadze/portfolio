export interface ExperienceItem {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly location: string;
  readonly period: string;
  /** Drives the live indicator on the timeline node. */
  readonly current: boolean;
  readonly summary: string;
  readonly achievements: readonly string[];
  readonly stack: readonly string[];
}
