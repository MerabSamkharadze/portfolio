import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';

import type { SectionId } from './core/models/portfolio.model';
import { PortfolioStore } from './core/services/portfolio-store';
import { ScrollSpy } from './core/services/scroll-spy';
import { About } from './features/about/about';
import { Contact } from './features/contact/contact';
import { Education } from './features/education/education';
import { Experience } from './features/experience/experience';
import { Hero } from './features/hero/hero';
import { Projects } from './features/projects/projects';
import { RoleFit } from './features/role-fit/role-fit';
import { Skills } from './features/skills/skills';
import { Footer } from './layout/footer/footer';
import { Navbar } from './layout/navbar/navbar';

/**
 * Application shell.
 *
 * A single-page composition — every section is a standalone component with its
 * own OnPush boundary. The only cross-cutting concern the shell owns is telling
 * the scroll-spy which anchors exist, once they have actually been rendered.
 */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [About, Contact, Education, Experience, Footer, Hero, Navbar, Projects, RoleFit, Skills],
  templateUrl: './app.html',
})
export class App {
  private readonly store = inject(PortfolioStore);
  private readonly scrollSpy = inject(ScrollSpy);

  constructor() {
    afterNextRender(() => {
      const sectionIds: SectionId[] = this.store.navItems().map((item) => item.id);
      this.scrollSpy.watch(sectionIds);
    });
  }
}
