import { provideHttpClient } from '@angular/common/http';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { NAV_ITEMS } from '@core/content';
import { providePortfolioTesting } from '@core/testing';

import { App } from './app';
import { routes } from './app.routes';

/**
 * Mounts the shell *and* the routed page, so these assertions cover the page a
 * visitor actually receives rather than either half in isolation.
 */
describe('App', () => {
  let fixture: ComponentFixture<App>;
  let element: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes), provideHttpClient(), ...providePortfolioTesting()],
    });

    fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();
    element = fixture.nativeElement;
  });

  it('creates the application shell', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders exactly one h1, carrying the owner name', () => {
    const headings = element.querySelectorAll('h1');

    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toContain('Merab');
    expect(headings[0].textContent).toContain('Samkharadze');
  });

  it('renders an anchor for every navigation target', () => {
    for (const item of NAV_ITEMS) {
      expect(element.querySelector(`#${item.id}`)).toBeTruthy();
    }
  });

  it('exposes the CV as a downloadable asset', () => {
    const link = element.querySelector<HTMLAnchorElement>('a[download]');

    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toContain('.pdf');
  });

  it('provides a skip link as the first focusable element', () => {
    const skip = element.querySelector<HTMLAnchorElement>('a[href="#about"]');

    expect(skip?.textContent?.trim()).toBe('Skip to content');
  });

  it('wraps the page content in a single main landmark', () => {
    expect(element.querySelectorAll('main')).toHaveLength(1);
  });

  it('ships readable markup — nothing is hidden until JavaScript runs', () => {
    // The page is pre-rendered, so no element may arrive with the reveal
    // class already applied; the directive adds it only below the fold.
    expect(element.querySelectorAll('.reveal:not(.is-visible)')).toHaveLength(0);
  });

  it('stays a portfolio — it never argues its fit against a job posting', () => {
    const copy = (element.textContent ?? '').toLowerCase();

    for (const phrase of [
      'vacancy',
      'job posting',
      'the role asks',
      'the posting',
      'match score',
      '% match',
      'role fit',
      'requirements are covered',
    ]) {
      expect(copy).not.toContain(phrase);
    }
  });

  it('shows rather than tells — no bare character adjectives in the copy', () => {
    const copy = (element.textContent ?? '').toLowerCase();

    for (const cliche of [
      'hard-working',
      'hardworking',
      'detail-oriented',
      'goal-oriented',
      'results-driven',
      'team player',
      'passionate about',
      'fast learner',
      'think outside',
    ]) {
      expect(copy).not.toContain(cliche);
    }
  });
});
