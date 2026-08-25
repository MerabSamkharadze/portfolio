/** The narrative in the About section, one string per paragraph. */
export const ABOUT_PARAGRAPHS: readonly string[] = [
  'My day job is the front end of a promotions and campaigns platform — leaderboards, prize ' +
    'wheels, quests, raffles. The launch date comes from marketing, not from engineering, and it ' +
    'does not move. Twenty-plus campaigns so far, delivered on the dates we committed to.',
  'Most of that work is detail. Fifty-plus components that have to hold up in every supported ' +
    'browser, sit close enough to the design hand-off that nobody sends them back, and stay quick ' +
    'on a mid-range phone. I go looking for the change-detection hot spots and the duplicate HTTP ' +
    'calls, because that is usually where the experience quietly leaks away.',
  'In parallel I work remotely on MedSocial, a cross-border HealthTech marketplace. I joined a ' +
    'codebase another developer had been building for three and a half months. Five weeks later ' +
    '45% of the source is mine: the entire real-time chat over WebSockets, a responsive migration ' +
    'of a site that had exactly one @media rule in it, and a listings page that went from a ' +
    'nine-second blank screen to none. Reading somebody else’s code carefully is most of that job.',
  'Before Angular I spent eight months in Next.js, leading the front end of a hotel and restaurant ' +
    'management platform from an empty repository to something three businesses now run their day ' +
    'on. That is where I learned how many bugs are really process problems: I made review ' +
    'mandatory before every merge to main, and post-release bugs fell 15%.',
  'I came to this from economics — a BSc and an MSc from Tbilisi State University — by way of two ' +
    'IT programmes and a lot of evenings. Those evenings still go somewhere: dasaqmdi.com is a ' +
    'bilingual job board I built and shipped on my own, 291 commits, from the PostgreSQL schema ' +
    'and its row-level security policies through to the SEO layer. The front end is where I work. ' +
    'Next on the list is going deeper into testing and architecture, because the codebases I want ' +
    'to be trusted with are bigger than the ones I have now.',
];
/** The "How I work" card — behaviour, not achievement. */
export const ABOUT_HIGHLIGHTS: readonly string[] = [
  '**I plan backwards from the launch date**, because it does not move',
  '**I write down what is wrong with a codebase** before I change it',
  '**I would rather review a pull request twice** than debug it in production',
  '**I prove where a bug lives** before handing it to anyone else',
  '**I learn what the work needs next** — Node.js, SQL and WebSockets all arrived that way',
];
