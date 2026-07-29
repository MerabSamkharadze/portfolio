export type EducationKind = 'degree' | 'training';

export interface EducationItem {
  readonly id: string;
  readonly title: string;
  readonly institution: string;
  readonly period: string;
  readonly kind: EducationKind;
  readonly detail: string | null;
}
