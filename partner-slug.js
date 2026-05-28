/* ─────────────────────────────────────────────────────────────────────────
 * Freigeistkongress · Partner-Slug-Reader
 *
 * Liest das letzte Pfadsegment der aktuellen URL und schreibt es in das
 * versteckte Form-Feld <input id="partner-slug">. Beispiele:
 *
 *   freigeistkongress.com/marko-simic/  → Partner_Slug = "marko-simic"
 *   freigeistkongress.com/jane-doe      → Partner_Slug = "jane-doe"
 *   freigeistkongress.com/              → Partner_Slug = ""  (kein Partner)
 *
 * Erlaubte Slugs: kleinbuchstaben, ziffern, bindestriche.
 * Mindestens 2 Zeichen, maximal 50 Zeichen.
 * Ungültige Slugs werden ignoriert (Feld bleibt leer).
 *
 * Browser-URL wird NICHT verändert. Server muss /:slug/ auf die Index-Seite
 * routen (siehe README.md für Netlify-/Nginx-/Apache-Beispiele).
 * ─────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  var MIN_LEN = 2;
  var MAX_LEN = 50;

  function readPartnerSlug() {
    var path = window.location.pathname || '';
    var segments = path.split('/').filter(function (s) { return s.length > 0; });
    if (segments.length === 0) return '';
    var last = segments[segments.length - 1].toLowerCase();
    if (last.length < MIN_LEN || last.length > MAX_LEN) return '';
    if (!SLUG_REGEX.test(last)) return '';
    return last;
  }

  function applySlug() {
    var slug = readPartnerSlug();
    if (!slug) return;
    var input = document.getElementById('partner-slug');
    if (!input) return;
    input.value = slug;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySlug);
  } else {
    applySlug();
  }
})();
