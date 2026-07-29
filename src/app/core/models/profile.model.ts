export interface Profile {
  readonly name: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly headline: string;
  readonly pitch: string;
  readonly location: string;
  readonly email: string;
  readonly phone: string;
  readonly phoneHref: string;
  readonly linkedIn: string;
  readonly gitHub: string | null;
  /** The downloadable PDF. */
  readonly cvUrl: string;
  /** Same CV as a page, for reading without downloading anything. */
  readonly cvHtmlUrl: string;
  readonly photoUrl: string;
  readonly availability: string;
}

export interface LanguageItem {
  readonly name: string;
  readonly level: string;
}
