import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';

import { PortfolioStore, ScrollSpy } from '@core/services';
import { About, Contact, Education, Experience, Hero, Projects, Skills } from '@features/index';
import { Footer, Navbar } from '@layout/index';

/**
 * Application shell.
 *
 * A single-page composition. Every section is a standalone component with its
 * own OnPush boundary; the only cross-cutting concern the shell owns is telling
 * the scroll-spy which anchors exist, once they have actually been rendered.
 */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [About, Contact, Education, Experience, Footer, Hero, Navbar, Projects, Skills],
  templateUrl: './app.html',
})
export class App {
  private readonly store = inject(PortfolioStore);
  private readonly scrollSpy = inject(ScrollSpy);

  constructor() {
    afterNextRender(() => {
      this.scrollSpy.watch(this.store.navItems().map((item) => item.id));
    });
  }
}
