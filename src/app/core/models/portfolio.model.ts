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
  | 'role-fit'
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
  /** The exact title of the role this portfolio is tailored to. */
  readonly targetRole: string;
  readonly targetCompany: string;
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
/* Role fit — the vacancy requirements mapped to concrete evidence             */
/* -------------------------------------------------------------------------- */

/**
 * `direct`       — daily production experience, no caveat.
 * `strong`       — solid, demonstrable experience.
 * `transferable` — proven in an adjacent technology that maps 1:1.
 * `growing`      — deliberately building right now; honest about the gap.
 */
export type MatchStatus = 'direct' | 'strong' | 'transferable' | 'growing';

export type RequirementWeight = 'required' | 'preferred';

export interface RequirementMatch {
  readonly id: string;
  /** Requirement as written in the job posting. */
  readonly requirement: string;
  readonly weight: RequirementWeight;
  readonly status: MatchStatus;
  /** Specific, checkable proof — never a restatement of the requirement. */
  readonly evidence: string;
}

/* -------------------------------------------------------------------------- */
/* Skills                                                                      */
/* -------------------------------------------------------------------------- */

export type SkillLevel = 'production' | 'strong' | 'working' | 'learning';

export interface Skill {
  readonly name: string;
  readonly level: SkillLevel;
}

export interface SkillGroup {
  readonly id: string;
  readonly title: string;
  readonly icon: IconName;
  /** Groups the vacancy calls out explicitly are rendered first and larger. */
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
