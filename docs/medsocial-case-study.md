# MedSocial — Case Study

> Everything in this document comes from measured facts: `git log`, `git blame`, a browser
> measurement script, and the bug backlog written during the work. Nothing is estimated.

---

## Overview

MedSocial is a cross-border HealthTech marketplace MVP that connects patients with doctors in
other countries. Doctors publish procedures with prices and discounts; patients search by country,
city, category and price, book appointments, message doctors and leave reviews. Country and city
filters, multi-currency support and per-user timezones position the product for medical tourism.

## My role

I am the frontend developer. The backend belongs to another developer and is built with Django
REST Framework and Channels.

I did not start this project. Another developer built it between March and May 2026. I joined on
24 June 2026, when the codebase was already about three and a half months old, and worked on it for
five weeks. My work lived on a `refactor` branch and reached `main` through pull requests #13, #14
and #15.

That matters for how you should read the numbers below. Every line I wrote had to fit code somebody
else designed. Before I could change anything I had to read it, work out what it was doing, and
work out what it was doing wrong.

**My contribution, measured with `git log` and `git blame`:**

| Metric | Value |
| --- | --- |
| Commits | 81, over 5 weeks (2026-06-24 → 2026-07-28) |
| Files touched in `src/` | 207 |
| Files created from scratch | 42 |
| Lines | +15,783 / −3,347 |
| Share of current source | 13,740 of 30,200 lines — about 45% |

**The application as a whole** (my work and the other developer's combined): 58 components,
18 core services, 78 spec files with 104 tests, and roughly 30,200 lines of `.ts`, `.html` and
`.scss`.

## Tech stack

Angular 21.2, fully standalone with no NgModules and a signal-first approach. TypeScript 5.9 in
strict mode, with `strictTemplates` and `noPropertyAccessFromIndexSignature` also enabled. RxJS 7.8.
PrimeNG 21.1 with a custom Aura preset built through `definePreset`, including dark mode. SCSS.
Vitest 4. Supporting libraries: swiper, angular-calendar, date-fns and google-libphonenumber.

---

## Feature highlights

### A. Realtime chat over WebSockets

A 1:1 chat between a doctor and a patient, built as a hybrid of REST and WebSockets. I built all of
it — transport, protocol types, application layer and UI. Full detail in the deep dive below.

### B. Auth and session

A chain of functional HTTP interceptors — `auth` → `refresh` → `error` — where the order matters.
On a 401, the refresh interceptor runs exactly one refresh and queues the other failed requests
behind a `BehaviorSubject` gate, then retries all of them with the new token. Refresh is also
proactive: the app decodes the JWT `exp` claim and uses an RxJS timer to refresh ahead of expiry.
`APP_INITIALIZER` validates the session before the app boots. Token storage follows the "remember
me" choice — `localStorage` or `sessionStorage`. On top of that sit role-based route guards for
patient, doctor and administrator, lazy-loaded dashboard routes, and breadcrumb resolvers.

### C. Desktop-only → fully responsive

The starting point: the entire codebase contained exactly **one** `@media` rule. The site was 100%
desktop-only.

I designed the strategy and agreed it with the team. It is a hybrid: the global foundation is
mobile-first, but individual components use desktop-down (`max-width`) overrides, so the working
desktop layout was never put at risk. A full mobile-first rewrite was reserved for components that
were being rebuilt anyway.

Four tiers: Mobile below 600, Tablet 600–1023, Desktop 1024–1439, Wide 1440 and above. One source
of truth serves both languages — `breakpoints.scss` (mixins `up`, `down`, `between`, `mobile`,
`tablet`, `tablet-down`, `desktop-up`) and a `ResponsiveService` exposing matchMedia-based signals
`isMobile`, `isTablet`, `isDesktop` and `isMobileOrTablet`. No dependency on Angular CDK.

Execution ran in six tiers: T0 foundation, T1 app shell, T2 public and auth pages, T3 forms, T4
data-heavy views, T5 long tail and touch targets. After each tier I ran a separate adversarial
review, which found and fixed 13, 6, 4 and 4 defects respectively.

Concrete outcomes:

- A hamburger menu with an off-canvas drawer for mobile navigation.
- A staged header collapse using two header-specific breakpoints rather than the global ones: below
  1230px the action group folds into the hamburger while the navigation stays inline; below 768px
  the navigation folds in as well.
- 44px tap targets through a `--tap-target` token defined in `px` deliberately, not in `rem`. The
  root font size scales down on mobile, and a rem-based target fell below 44px.
- A bug that existed on desktop too: a sidebar at 25% plus content at 80% plus the gap and two
  paddings exceeded 105% and overflowed. The fix was `flex: 1` with `min-width: 0`.
- A blob URL memory leak, fixed by revoking on upload and on revert, and in `ngOnDestroy`.

One constraint is worth stating on its own. `procedure.scss` measured 11.97kB against a 12kB
**error** budget, so a single extra `@media` rule would have failed the build. I solved the cramped
mobile list view with no CSS at all:

```ts
effectiveLayout = computed(() =>
  responsive.isMobileOrTablet() ? 'grid' : defaultLayout(),
);
```

Logic instead of styling. It added zero bytes.

### D. Performance — the `/procedures` page

Blank screen reduced from 7.9–9.4 seconds to 0ms, and requests before first paint from 6 to 3 to 1.
Full detail in the deep dive below.

### E. Refactoring, the bug backlog and tests

I audited the codebase and produced a prioritised backlog: a living 551-line document with 48 closed
items, organised into three tiers — functional bugs, leftover debug code, and cosmetic issues.

Real bugs that were breaking API calls:

- `HttpParams` is immutable. The result of `params.set('page', …)` was never assigned, so the page
  parameter was never sent at all, on favourite procedures.
- `getConsultations` called `http.get(url)` without `{ params }`, so every filter and the pagination
  were silently dropped.
- An always-true `if (params)` check that made the branch meaningless.
- The calendar checked `importance === 1` twice; the second branch was supposed to be `=== 3`.
- A "Registration successful" toast fired in `ngOnInit`, before the request had resolved.
- The date transformer rendered midnight as `00:xx AM` instead of `12:xx AM`.
- Two unbound no-op methods that no template ever called.

Alignment against the backend OpenAPI specification:

- I removed the Hospital dropdown. The `/doctors/procedures/` endpoint does not accept such a
  parameter, so the filter silently did nothing. Its data source and two dead handlers went with it,
  along with three fields in `ProceduresQueryParams` that had been copied over from a different
  query type where they are valid.
- One endpoint was missing its trailing slash — a latent bug, since the specification requires it
  everywhere.
- The drf-spectacular-generated specification types several computed fields as `string` when they
  are in fact objects (`rating: {point, reviews}`). I verified this against real API responses and
  kept the frontend models as they were. "Fixing" them to match the specification would have broken
  working UI.

Tests: from **33 failing spec files to a fully green suite**, now 78 files and 104 tests. The
`ng generate` stubs had no TestBed setup, so I worked out a repeatable recipe — one for directives,
another for components. Along the way I fixed two files that were breaking compilation for the whole
suite: a truncated import, and Jasmine's timer API converted to Vitest.

I also recorded **three false positives from my own audit** in a separate section of the backlog —
things I had flagged as bugs that turned out to be correct code once I checked them.

Accessibility: `:focus-visible`, `prefers-reduced-motion`, descriptive alt text, and a contrast fix
using `color-mix` for a 12px badge that was failing WCAG AA.

---

## Deep dive 1 — Realtime chat over WebSockets

### Problem

The product needs a 1:1 chat between a doctor and a patient. A chat is not only a message list. It
has to survive a dropped connection, a phone locking, a token expiring mid-session, and a message
sent while the user is offline. It also has to feel immediate, which means the UI cannot wait for a
server round trip before showing what the user just typed.

### Solution — transport layer

`chat-socket.service.ts`, about 290 lines, built on `rxjs/webSocket`:

- **Authentication through the WebSocket subprotocol:** `['Authorization', token]`. Browsers cannot
  set headers on a WebSocket handshake, so the subprotocol field carries the token.
- **URL derived from the environment config:** `http` → `ws`, `https` → `wss`, plus
  `/ws/chats/{id}/`.
- **`defer()` combined with `retry({ resetOnSuccess })`.** This is the important one. Without
  `defer`, the observable captures the token at the first handshake and every later reconnect reuses
  a token that may have expired. With `defer`, each reconnect reads a fresh token.
- **Exponential backoff with jitter**, so a server restart does not bring every client back at the
  same instant.
- **A separate `cannot-connect` state** for a handshake that never opened, as opposed to a
  connection that opened and then dropped. The UI needs to say different things: one is "we cannot
  reach the server", the other is "reconnecting".
- **Reconnect on `visibilitychange`**, so returning to the tab restores the connection instead of
  waiting for the next backoff tick.
- **A try/catch deserializer**, so one malformed frame does not kill the socket.
- **A `connectionStatus` signal** the UI reads directly.

### Solution — protocol types

`chat-socket.model.ts` defines discriminated unions for inbound and outbound frames, including an
error arm, so an unhandled frame type is a compile error rather than a runtime surprise.

A pure `toInboundEvent` adapter sits between the wire format and the app model: `message_id` → `id`,
a human-readable timestamp → ISO via date-fns, and the WebSocket `user{name, is_online}` shape
mapped onto the app model. Because it is pure, it is covered by unit tests without any socket.

### Solution — application layer

`chat.service.ts`, about 780 lines:

- **Frame routing** for `MESSAGE`, `SEEN`, `TYPING`, `UPDATE`, `DELETE`, `LOGOUT` and error.
- **Optimistic send with clientId reconciliation.** The message appears immediately with a local
  clientId and is merged when the backend echoes it back, so there is no duplicate and no flicker.
- **An offline outbox** for messages composed without a connection.
- **Presence and typing signals**, and sorting at write time rather than on every render.
- **Gap healing.** On every open and reopen, the service fetches the first page over REST and fills
  any gap that appeared while the socket was down. This is the part that makes the hybrid work: the
  socket gives you immediacy, REST gives you correctness.
- **`sharedRefresh()`** — a single-flight token refresh reused by three callers: the HTTP refresh
  interceptor, the scheduled refresh, and the WebSocket reconnect path. Three subsystems, one
  refresh.

### Solution — UI

Shared chat components: `message-bubble`, `composer`, `inbox-list` and `conversation`. The chat
widget and the dashboard messages view are thin shells over them, so a change to bubble rendering
lands in both.

The conversation component owns the scroll manager, which is where most of the fiddly work is:
delta auto-scroll, element-reference anchoring when older messages load so the viewport does not
jump, stick-to-bottom via `ResizeObserver`, a "new messages" pill, typing indicators and delivery
ticks.

### The debugging story

The socket opened and closed immediately with close code 1006 and no useful reason. From the
frontend side everything looked correct. I proved the cause outside the browser: with `curl` I
showed that the server returned 101 *without* echoing the subprotocol, and Node's `ws` client said
it plainly — "Server sent no subprotocol". The backend was calling `accept()` without returning the
negotiated subprotocol, and the WebSocket specification requires the client to close the connection
in that case. I handed the backend developer the evidence, they fixed it, and the handshake
completed. The point is that this was not a frontend bug, and browser DevTools alone could not have
told me that.

### Result

A working 1:1 chat that reconnects after a dropped connection, refreshes its own token, survives a
malformed frame, shows sent messages immediately, and repairs its own history after an outage.

### What I would do differently

Gap healing currently fetches the first page on every open and reopen. That is correct, but for a
long outage the gap may be larger than one page. I would make the heal loop paginate until it meets
known history, rather than assuming one page is enough.

I would also put the frame-routing switch behind an exhaustiveness check on the discriminated union,
so adding a new frame type to the model fails the build until it is handled.

---

## Deep dive 2 — Performance on `/procedures`

### Problem

The procedures listing page showed a blank screen for 7.9 to 9.4 seconds.

### Diagnosis

I did not guess. I wrote a measurement script to run in the browser console. It timed each request
in isolation, then in parallel, and broke down the payload.

What it showed:

1. Before first paint the page fired **six parallel requests**.
2. Two of them — `order=price` and `order=-price`, measured at **3397ms** and **3728ms** — each
   fetched a full page of results so that the frontend could read a single field from each: the
   minimum and the maximum for the price slider.
3. The backend list serializer returned a fully nested Doctor object per row, with educations,
   certifications, experiences and more. The card used six fields.

### Solution

- A **skeleton shell** now paints immediately, so first paint no longer waits on any request.
- The two expensive requests: I made them cheaper three times over — deferring them, caching them,
  scoping them to context — before I asked whether they were needed at all. The answer was no. They
  only set the scale of a slider, and the price filter sent nothing to the server until the user
  actually dragged a handle. I replaced them with a constant and deleted about 90 lines of code.
- The **discount sweep** was firing up to 25 heavy requests at once through `forkJoin`. I moved it
  to `mergeMap` with a concurrency limit of 4 and added a cache key, which made changing the
  discount threshold cost zero requests.
- **Static reference data** — categories and countries — is now cached for the session.
- I added an **`enabled(params)` gate** to `useInfiniteData`. The City dropdown is disabled until a
  country is selected, yet the whole city table was still being fetched on every mount.

I then wrote a backend task specification: eight items, prioritised, each with its expected effect —
a slim list serializer, killing the N+1 with `select_related`, turning `is_favorite` and `rating`
into annotations, and adding a `page_size` query parameter.

### Result

| Metric | Before | After |
| --- | --- | --- |
| Blank screen | 7.9–9.4s | 0ms |
| Requests before first paint | 6 | 3 → 1 |
| Backend work removed per page load | — | roughly 7 seconds |
| Cost of changing the discount threshold | up to 25 requests | 0 |
| Code deleted with the price-range requests | — | about 90 lines |

**Honest context:** these numbers were measured against a development dataset of 96 procedures, not
at production scale. I did not fix the backend myself; I produced the diagnosis and the
specification.

### What I would do differently

I optimised those two requests three times before questioning whether they should exist. The
cheapest request is the one you do not send, and I should have asked that first. I now start with
"what is this call for?" before "how do I make this call faster".

I would also re-run the measurement script against a production-scale dataset before quoting these
figures as final, because a 96-row dataset can hide an N+1 that dominates at 10,000 rows.

---

## LinkedIn version (~120 words)

> I spent five weeks as the frontend developer on **MedSocial**, a cross-border HealthTech
> marketplace built in Angular 21 with TypeScript 5.9 in strict mode.
>
> I did not start the project. I joined a codebase another developer had been building for three and
> a half months, and 81 commits later about 45% of the source is mine.
>
> Three things I am glad I did:
>
> • Built the whole 1:1 chat over WebSockets — reconnect with backoff and jitter, optimistic send,
> an offline outbox, and gap healing over REST.
> • Cut the procedures page from a 7.9–9.4 second blank screen to 0ms, and requests before first
> paint from 6 to 1. The biggest win was deleting two requests instead of optimising them again.
> • Took the site from one `@media` rule to a four-tier responsive system, and the test suite from
> 33 failing spec files to green.

---

## CV bullets

Five areas, one line each, numbers in every one.

- Joined an existing Angular 21 codebase and delivered 81 commits in 5 weeks — 207 files touched,
  42 created, +15,783/−3,347 lines — now owning 13,740 of its 30,200 source lines (~45%).
- Built a 1:1 WebSocket chat end to end (~290-line rxjs/webSocket transport, ~780-line service):
  subprotocol auth, exponential backoff with jitter, optimistic send with clientId reconciliation,
  offline outbox and REST gap healing.
- Diagnosed a WebSocket handshake failing with close code 1006 by reproducing it outside the browser
  with curl and a Node `ws` client, proving the server accepted without echoing the negotiated
  subprotocol.
- Cut the procedures page blank screen from 7.9–9.4s to 0ms and requests before first paint from 6
  to 1, removing ~7s of backend work per load and ~90 lines of code; wrote the 8-item prioritised
  backend specification that followed.
- Migrated a 100% desktop-only codebase (exactly one `@media` rule) to a four-tier responsive system
  with a shared `breakpoints.scss` and matchMedia `ResponsiveService`, no Angular CDK; adversarial
  review after each tier fixed 27 defects.
- Built the auth chain (functional interceptors, single refresh on 401 with a BehaviorSubject
  request queue, proactive JWT `exp` refresh) and took the suite from 33 failing spec files to
  green — 78 files, 104 tests — closing 48 items from a 551-line prioritised backlog.

---

## Interview questions to expect

### 1. "You joined an existing codebase. How much of this is really yours?"

Answer with the measurement, not an adjective. 13,740 of 30,200 lines by `git blame`, 81 commits,
42 files created from scratch, merged through PRs #13–#15. Then make the harder point: the parts I
am proudest of are not the new files. Finding that `HttpParams.set()` result was never assigned, or
that a Hospital filter had never been accepted by the endpoint, required reading code nobody had
questioned for three months.

### 2. "Why authenticate a WebSocket through the subprotocol rather than a query parameter?"

Because the browser WebSocket API does not let you set headers on the handshake, so the two real
options are a query parameter or the subprotocol field. A token in the query string ends up in
server access logs and in browser history. The subprotocol field is sent in the handshake and is not
logged the same way. The trade-off is that the server must echo the negotiated subprotocol back —
which is precisely the bug I hit, and it is worth telling that story here.

### 3. "Walk me through the 1006 debugging."

Keep the sequence tight: symptom, why the frontend looked innocent, how I moved the test outside the
browser, what the evidence was, who fixed it. The close code 1006 means abnormal closure with no
close frame, so the browser gives you nothing. `curl` showed a 101 response with no
`Sec-WebSocket-Protocol` header. Node's `ws` client stated the reason in words: "Server sent no
subprotocol". The specification requires the client to fail the connection if the server does not
select one of the offered subprotocols, so the browser was behaving correctly. Then the point that
matters: I handed the backend developer reproducible evidence rather than a bug report.

### 4. "Your performance numbers came from a 96-row dataset. Are they real?"

Say the limitation before they do — it is already in the case study. The 7.9–9.4s → 0ms figure for
the blank screen is architectural and holds at any scale, because the skeleton no longer waits on a
request. The 6 → 1 request count is also structural. What will not hold at scale is the specific
3397ms and 3728ms timings, and that is exactly why I wrote the backend specification: the N+1 and
the fat serializer get worse with row count, not better.

### 5. "Why did you keep the frontend models when they disagreed with the OpenAPI specification?"

Because I verified against real API responses, and the responses were right. drf-spectacular typed
several computed fields as `string` when they actually return objects — `rating` is
`{point, reviews}`. Changing the models to match the generated specification would have compiled
cleanly and broken working UI. The specification is a description of the API, not the API. I
recorded it rather than silently working around it.

### 6. "Why a hybrid responsive strategy rather than a clean mobile-first rewrite?"

Risk. The desktop layout worked and had users. A full mobile-first rewrite would have put every
existing desktop screen at risk at once, for a benefit nobody could see. So the global foundation is
mobile-first, individual components take desktop-down overrides, and components already being
rebuilt got the full rewrite. I also ran an adversarial review after each of the six tiers — 13, 6,
4 and 4 defects found — which is how you keep a staged migration honest.

**Bonus, if they ask about the CSS budget:** `procedure.scss` was at 11.97kB against a 12kB error
budget, so one more `@media` rule would have failed the build. I fixed the cramped mobile list by
computing the layout instead of styling it — `effectiveLayout = computed(() =>
responsive.isMobileOrTablet() ? 'grid' : defaultLayout())` — which cost zero bytes.
