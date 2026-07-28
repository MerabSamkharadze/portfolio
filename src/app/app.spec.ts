import { provideHttpClient } from '@angular/common/http';
import { TestBed, type ComponentFixture } from '@angular/core/testing';

import { NAV_ITEMS } from './core/data/portfolio.content';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let element: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient()],
    });

    fixture = TestBed.createComponent(App);
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

  it('names the target role so the page reads as tailored, not generic', () => {
    expect(element.textContent).toContain('Angular Developer');
    expect(element.textContent).toContain('Bank of Georgia');
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
});
