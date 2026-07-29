/** Every anchor the page can scroll to. `top` is the hero, reached via the logo. */
export type SectionId =
  'top' | 'about' | 'skills' | 'projects' | 'experience' | 'education' | 'contact';

export interface NavItem {
  readonly id: SectionId;
  readonly label: string;
}
