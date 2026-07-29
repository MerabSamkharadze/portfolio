import type { IconName } from '@shared/ui/icon/icon-set';

/**
 * `production` — used daily on shipped work.
 * `strong`     — solid and comfortable; reached for without looking things up.
 * `working`    — productive with it, still consulting the docs.
 * `familiar`   — have used it; would need a ramp-up before relying on it.
 */
export type SkillLevel = 'production' | 'strong' | 'working' | 'familiar';

/** Core groups render larger and first. */
export type SkillEmphasis = 'primary' | 'secondary';

export interface Skill {
  readonly name: string;
  readonly level: SkillLevel;
}

export interface SkillGroup {
  readonly id: string;
  readonly title: string;
  readonly icon: IconName;
  readonly emphasis: SkillEmphasis;
  readonly caption: string;
  readonly skills: readonly Skill[];
}
