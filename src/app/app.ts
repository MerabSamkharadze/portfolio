import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PortfolioStore, ScrollSpy } from '@core/services';
import { Footer, Navbar } from '@layout/index';

/**
 * Application shell: the chrome that surrounds whatever the router renders.
 *
 * The only cross-cutting concern it owns is telling the scroll-spy which
 * anchors exist, once they have actually been rendered.
 */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Footer, Navbar, RouterOutlet],
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
