/**
 * Domain model for the portfolio.
 *
 * Everything rendered by the UI is described here first. Keeping the content
 * strongly typed means a change to the CV is a compile-time-checked data edit,
 * never a template rewrite.
 */

import type { IconName } from '../../shared/ui/icon/icon-set';

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export type SectionId =
  | 'top'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'education'
  | 'contact';

export interface NavItem {
  readonly id: SectionId;
  readonly label: string;
}

/* -------------------------------------------------------------------------- */
/* Identity                                                                    */
/* -------------------------------------------------------------------------- */

export interface Profile {
  readonly name: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly headline: string;
  readonly pitch: string;
  readonly location: string;
  readonly email: string;
  readonly phone: string;
  readonly phoneHref: string;
  readonly linkedIn: string;
  readonly gitHub: string | null;
  readonly cvUrl: string;
  readonly photoUrl: string;
  readonly availability: string;
}

export interface Stat {
  readonly value: string;
  readonly label: string;
}

/* -------------------------------------------------------------------------- */
/* Skills                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * `production` — used daily on shipped work.
 * `strong`     — solid, comfortable, reach for it without looking things up.
 * `working`    — can be productive, still consulting the docs.
 * `familiar`   — have used it; would need a ramp-up before relying on it.
 */
export type SkillLevel = 'production' | 'strong' | 'working' | 'familiar';

export interface Skill {
  readonly name: string;
  readonly level: SkillLevel;
}

export interface SkillGroup {
  readonly id: string;
  readonly title: string;
  readonly icon: IconName;
  /** Core groups render larger and first. */
  readonly emphasis: 'primary' | 'secondary';
  readonly caption: string;
  readonly skills: readonly Skill[];
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
  readonly icon: IconName;
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly context: string;
  readonly period: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
  readonly metrics: readonly Stat[];
  readonly links: readonly ProjectLink[];
  readonly featured: boolean;
}

/* -------------------------------------------------------------------------- */
/* Experience & education                                                      */
/* -------------------------------------------------------------------------- */

export interface ExperienceItem {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly location: string;
  readonly period: string;
  readonly current: boolean;
  readonly summary: string;
  readonly achievements: readonly string[];
  readonly stack: readonly string[];
}

export type EducationKind = 'degree' | 'training';

export interface EducationItem {
  readonly id: string;
  readonly title: string;
  readonly institution: string;
  readonly period: string;
  readonly kind: EducationKind;
  readonly detail: string | null;
}

export interface LanguageItem {
  readonly name: string;
  readonly level: string;
}

/* -------------------------------------------------------------------------- */
/* Contact                                                                     */
/* -------------------------------------------------------------------------- */

export interface ContactChannel {
  readonly label: string;
  readonly value: string;
  readonly href: string | null;
  readonly icon: IconName;
  readonly external: boolean;
}

export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

export interface ContactResult {
  /** True when the message reached a configured backend endpoint. */
  readonly delivered: boolean;
  /** Always present — lets the visitor finish the send from their mail client. */
  readonly mailtoUrl: string;
}
