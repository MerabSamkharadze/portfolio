import { TestBed } from '@angular/core/testing';

import { PortfolioStore } from './portfolio-store';

describe('PortfolioStore', () => {
  let store: PortfolioStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(PortfolioStore);
  });

  it('exposes the profile tailored to the target role', () => {
    const profile = store.profile();

    expect(profile.name).toBe('Merab Samkharadze');
    expect(profile.targetRole).toBe('Angular Developer');
    expect(profile.email).toContain('@');
  });

  describe('requirement partitioning', () => {
    it('splits requirements into required and preferred without losing any', () => {
      const required = store.requiredRequirements();
      const preferred = store.preferredRequirements();

      expect(required.length).toBeGreaterThan(0);
      expect(preferred.length).toBeGreaterThan(0);
      expect(required.length + preferred.length).toBe(store.requirementCount());
    });

    it('marks every required item as required and nothing else', () => {
      expect(store.requiredRequirements().every((item) => item.weight === 'required')).toBe(true);
      expect(store.preferredRequirements().every((item) => item.weight === 'preferred')).toBe(true);
    });

    it('gives every requirement a unique id', () => {
      const ids = store.requirements().map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('backs every requirement with evidence that is not a restatement', () => {
      for (const item of store.requirements()) {
        expect(item.evidence.length).toBeGreaterThan(40);
        expect(item.evidence).not.toBe(item.requirement);
      }
    });
  });

  describe('matchScore', () => {
    it('produces a percentage between 0 and 100', () => {
      const score = store.matchScore();

      expect(score).toBeGreaterThan(0);
      expect(score).toBeLessThanOrEqual(100);
      expect(Number.isInteger(score)).toBe(true);
    });

    it('stays below 100 while any requirement is still in progress', () => {
      const hasGap = store
        .requirements()
        .some((item) => item.status === 'growing' || item.status === 'transferable');

      expect(hasGap).toBe(true);
      expect(store.matchScore()).toBeLessThan(100);
    });

    it('counts only direct and strong statuses as fully met', () => {
      const expected = store
        .requirements()
        .filter((item) => item.status === 'direct' || item.status === 'strong').length;

      expect(store.fullyMetCount()).toBe(expected);
      expect(store.fullyMetCount()).toBeLessThanOrEqual(store.requirementCount());
    });
  });

  describe('derived collections', () => {
    it('separates primary from secondary skill groups', () => {
      expect(store.primarySkillGroups().every((group) => group.emphasis === 'primary')).toBe(true);
      expect(store.secondarySkillGroups().every((group) => group.emphasis === 'secondary')).toBe(
        true,
      );
      expect(store.primarySkillGroups().length + store.secondarySkillGroups().length).toBe(
        store.skillGroups().length,
      );
    });

    it('separates featured from additional projects', () => {
      expect(store.featuredProjects().every((project) => project.featured)).toBe(true);
      expect(store.additionalProjects().every((project) => !project.featured)).toBe(true);
    });

    it('de-duplicates the technology marquee and omits anything still being learned', () => {
      const marquee = store.technologyMarquee();

      expect(new Set(marquee).size).toBe(marquee.length);
      expect(marquee).toContain('Angular v14 – v21');
      expect(marquee).not.toContain('Oracle');
    });
  });

  it('lists the current role first in the experience timeline', () => {
    const [first] = store.experience();

    expect(first.current).toBe(true);
    expect(first.company).toBe('Crocobet');
  });
});
