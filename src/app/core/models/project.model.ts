import type { IconName } from '@shared/ui/icon/icon-set';
import type { Stat } from './stat.model';

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
  /** Featured projects get a full card; the rest fall into the compact list. */
  readonly featured: boolean;
}
