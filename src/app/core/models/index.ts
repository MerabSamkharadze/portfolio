/**
 * The portfolio domain, split by the section that owns it.
 *
 * Import from `@core/models` rather than reaching for a file directly, so the
 * internal layout stays free to change.
 */
export type { ContactChannel, ContactMessage, ContactResult } from './contact.model';
export type { EducationItem, EducationKind } from './education.model';
export type { ExperienceItem } from './experience.model';
export type { NavItem, SectionId } from './navigation.model';
export type { LanguageItem, Profile } from './profile.model';
export type { Project, ProjectLink } from './project.model';
export type { Skill, SkillEmphasis, SkillGroup, SkillLevel } from './skill.model';
export type { Stat } from './stat.model';
export type { PortfolioContent } from './portfolio-content.model';
