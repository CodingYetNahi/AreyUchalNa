# Arey Uchal Na!

**Confused? Let chance pick.** Arey Uchal Na! is a mobile-first decision picker with a spinning wheel, six selection modes, editable presets, saved lists, and session history. It complements—rather than replaces—the original dependency-free `something` Python CLI.

The expected Pages address is **https://codingyetnahi.github.io/AreyUchalNa/**. It should not be considered live until the change is merged and the Pages deployment succeeds.

## Web application

- Add, edit, paste, remove, or clear choices (each line in the editor is one choice), with blank and case-insensitive duplicate validation.
- Pick one, pick several distinct choices, eliminate choices round by round, answer Yes or No, choose an inclusive whole number, or split people evenly into named teams.
- Choose from eight editable everyday presets, including regionally varied Indian food.
- Save, open, rename, replace, and delete lists in the current browser.
- Copy or share results and review a session-only result history.
- Enjoy a responsive, keyboard-friendly interface with strong focus styles, live result announcements, text results alongside the wheel, and reduced-motion support.

Secure browser randomness uses `crypto.getRandomValues` with rejection sampling. It is not seeded or repeatable. No choices, saved lists, or results are sent to a server.

### Develop and verify

Node.js 20 or newer is recommended.

```console
cd web
npm install
npm run dev
npm test
npm run typecheck
npm run lint
npm run build
npm run preview
```

Vite's production `base` is exactly `/AreyUchalNa/`; the output is `web/dist/`. The app is a single page without client-side routes, so direct refreshes at the repository URL do not require fallback routing.

## Original Python CLI

The existing package remains named `something`, requires Python 3.9+, and has no runtime dependencies. A seed makes CLI results repeatable.

```console
python -m something --seed example tea coffee cocoa
printf 'walk\nread\nnap\n' | python -m something --seed 42
python -m something --seed demo --count 2 red green blue
```

Run its tests with:

```console
python -m unittest discover -s tests -v
```

## Storage and privacy

Saved lists remain in `localStorage` on the current device and browser. The app has no accounts, backend, analytics, advertisements, or tracking. Result history is held only in React session memory and disappears on refresh. Clearing browser data also removes saved lists. Private/incognito settings, storage quotas, or browser policy can make saving unavailable; the current editor continues working and shows a warning.

## Accessibility

The app uses semantic headings and form labels, large touch targets, visible keyboard focus, high-contrast text, status announcements, a non-colour winner marker, and `prefers-reduced-motion`. The wheel is decorative rather than the sole presentation of a result. Native browser confirmation and prompt dialogs provide keyboard handling, Escape dismissal, and focus restoration.

## Deployment

`.github/workflows/pages.yml` runs only on a push to `main` or a manual dispatch. It installs web dependencies, tests and builds the Vite app, uploads only `web/dist`, then deploys with the official GitHub Pages actions and minimal Pages permissions. Pull requests are never deployed. A repository maintainer must merge an approved pull request and configure GitHub Pages to use **GitHub Actions** if it is not already configured.

## Limitations

- English is the only reviewed language currently shipped. All UI copy is routed through the small translation dictionary so Hindi, Marathi, and Kannada can be added after human review.
- Browser sharing, clipboard, vibration, and secure randomness require compatible browser APIs and, for some features, a secure context. Copy has a legacy fallback; core picking does not depend on vibration or sharing.
- Very long wheel labels are shortened visually but remain present in the editor and full text result.

## License

Released under the [MIT License](LICENSE). The original CLI history and licence are preserved.
