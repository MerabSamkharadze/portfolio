import { TestBed } from '@angular/core/testing';

import { PortfolioStore } from './portfolio-store';

describe('PortfolioStore', () => {
  let store: PortfolioStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(PortfolioStore);
  });

  it('exposes the profile', () => {
    const profile = store.profile();

    expect(profile.name).toBe('Merab Samkharadze');
    expect(profile.headline).toBe('Angular Developer');
    expect(profile.email).toContain('@');
  });

  describe('navigation', () => {
    it('has a unique id per nav item', () => {
      const ids = store.navItems().map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('never links to the hero, which is reached by the logo instead', () => {
      expect(store.navItems().some((item) => item.id === 'top')).toBe(false);
    });
  });

  describe('skills', () => {
    it('separates primary from secondary groups without losing any', () => {
      const primary = store.primarySkillGroups();
      const secondary = store.secondarySkillGroups();

      expect(primary.every((group) => group.emphasis === 'primary')).toBe(true);
      expect(secondary.every((group) => group.emphasis === 'secondary')).toBe(true);
      expect(primary.length + secondary.length).toBe(store.skillGroups().length);
    });

    it('gives every group a unique id and at least one skill', () => {
      const ids = store.skillGroups().map((group) => group.id);

      expect(new Set(ids).size).toBe(ids.length);
      expect(store.skillGroups().every((group) => group.skills.length > 0)).toBe(true);
    });

    it('never repeats a skill name inside a group', () => {
      for (const group of store.skillGroups()) {
        const names = group.skills.map((skill) => skill.name);
        expect(new Set(names).size).toBe(names.length);
      }
    });
  });

  describe('projects', () => {
    it('separates featured from additional projects', () => {
      expect(store.featuredProjects().every((project) => project.featured)).toBe(true);
      expect(store.additionalProjects().every((project) => !project.featured)).toBe(true);
      expect(store.featuredProjects().length + store.additionalProjects().length).toBe(
        store.projects().length,
      );
    });

    it('describes every project with a summary, a stack and at least one highlight', () => {
      for (const project of store.projects()) {
        expect(project.summary.length).toBeGreaterThan(40);
        expect(project.stack.length).toBeGreaterThan(0);
        expect(project.highlights.length).toBeGreaterThan(0);
      }
    });
  });

  describe('technologyMarquee', () => {
    it('de-duplicates entries', () => {
      const marquee = store.technologyMarquee();
      expect(new Set(marquee).size).toBe(marquee.length);
    });

    it('shows only what is used in production or known well', () => {
      const marquee = store.technologyMarquee();

      expect(marquee).toContain('Angular v14 – v21');
      // 'familiar' and 'working' levels are held back from the strip.
      expect(marquee).not.toContain('Xcode');
      expect(marquee).not.toContain('MS SQL / T-SQL');
    });
  });

  it('opens the experience timeline with the most recent role', () => {
    const [first] = store.experience();

    expect(first.current).toBe(true);
    expect(first.company).toBe('MedSocial');
  });

  it('keeps every project link absolute and https, so none 404 on a static host', () => {
    for (const project of store.projects()) {
      for (const link of project.links) {
        expect(link.href.startsWith('https://')).toBe(true);
      }
    }
  });

  it('orders education newest first', () => {
    const ids = store.education().map((item) => item.id);
    expect(ids.indexOf('tbc-react')).toBeLessThan(ids.indexOf('bsc'));
  });
});
