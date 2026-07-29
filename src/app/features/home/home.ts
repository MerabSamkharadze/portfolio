import { ChangeDetectionStrategy, Component } from '@angular/core';

import { About } from '../about/about';
import { Contact } from '../contact/contact';
import { Education } from '../education/education';
import { Experience } from '../experience/experience';
import { Hero } from '../hero/hero';
import { Projects } from '../projects/projects';
import { Skills } from '../skills/skills';

/** The page itself. Composition only — every section owns its own data. */
@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [About, Contact, Education, Experience, Hero, Projects, Skills],
  templateUrl: './home.html',
  host: { class: 'block' },
})
export class Home {}
