# Freigeistkongress · Opt-In-Form mit Partner-Tracking

Anmelde-Formular für **freigeistkongress.com**. Schreibt Newsletter-Anmeldungen
direkt nach Zoho Forms → Zoho CRM (Kontakt-Modul) und trägt automatisch
einen **Partner-Slug** mit, der aus der URL ausgelesen wird.

## Live-Demo

> **https://freigeistkongress-form-demo.netlify.app/marko-simic/**

Probiere verschiedene Slugs aus, indem du das Pfadsegment änderst:
`/marc-friedrich/`, `/joerg-schaefer/`, `/` (kein Partner), `/anna-mustermann/` …
Der erkannte Slug wird live unter dem Formular angezeigt.

> Die Demo dient nur der Veranschaulichung. Der Form-Code in diesem Repo ist
> **unabhängig von der Demo** und kann frei in jede beliebige Webseite eingebaut
> werden.

## Worum geht's

Jeder Vertriebspartner bekommt einen eigenen Anmelde-Link:

```
freigeistkongress.com/marko-simic/
freigeistkongress.com/anna-fitness/
freigeistkongress.com/joerg-schaefer/
```

Wenn jemand über so einen Link kommt und sich anmeldet, wird der **Partner**
automatisch ans CRM mitgegeben. Damit sehen wir später in Zoho:
*„Welcher Partner hat wie viele Anmeldungen gebracht?"*

**Vorher (alt):** 200+ identische Landingpages, eine pro Partner — Wartungs-Alptraum.

**Jetzt (neu):** **Eine** Landingpage. Der Partner steckt in der URL. Ein
kleines JS-Snippet liest die URL aus und füllt ein verstecktes Form-Feld.
Browser-URL bleibt dabei sauber bei `freigeistkongress.com/marko-simic/` — kein
`?Partner=…` in der Adresszeile.

## Wie das End-to-End funktioniert

```
1. User klickt auf Partner-Link
   freigeistkongress.com/marko-simic/
            │
2. Browser zeigt die Hauptseite        ◄── URL-Rewrite vom Server
   (Tom's normale Anmelde-Sektion)
            │
3. partner-slug.js liest letztes Pfadsegment
   "marko-simic" → schreibt es in das Hidden-Field "SingleLine5"
            │
4. User füllt Form aus, klickt "Anmelden"
            │
5. Form sendet POST an Zoho Forms
   inkl. Hidden-Field-Wert "marko-simic"
            │
6. Zoho Forms → Zoho CRM Kontakt-Modul
   ├─ Anrede, Vorname, Nachname, Email
   └─ Partner Slug = "marko-simic"
            │
7. CRM-Workflow auf Kontakt-Insert (asynchron):
   Suche im Custom-Modul "Formulare" nach Partner mit Slug = "marko-simic"
   Setze Lookup-Feld "Verknüpfter Partner" auf den gefundenen Record
            │
8. Im CRM: Kontakt zeigt klickbar zum Partner-Profil
   Auswertbar: "Wie viele Kontakte hat Partner XY gebracht?"
```

## Was im Repo ist

| Datei | Pflicht | Zweck |
|---|---|---|
| `form.html` | ✓ | Form-Markup zum Einbetten in deine Seite |
| `form.css` | ✓ | Styling (Anrede-Select, Pill-Inputs, Submit-Button, Datenschutz-Checkbox, Mobile-Stack) |
| `partner-slug.js` | ✓ | Liest URL-Slug, schreibt ihn ins Hidden-Field |
| `zoho-validation.js` | ✓ | Zoho-eigenes Validation-Script (Pflichtfeld-Check, von Zoho exportiert) |
| `demo.html` | optional | Standalone-Demo-Page (nur zum lokalen Anschauen) |
| `_redirects` | optional | Netlify-Konfig für URL-Routing der Demo |
| `README.md` | optional | Diese Datei |

## Quick-Start: Form in deine Seite einbauen (Tom)

### 1. Assets ausliefern

`form.css`, `partner-slug.js`, `zoho-validation.js` in deinen Asset-Ordner
legen (z.B. `assets/kongress/`) und im `<head>` bzw. vor `</body>` einbinden:

```html
<head>
  <!-- … deine bestehenden Stylesheets … -->
  <link rel="stylesheet" href="/assets/kongress/form.css">
</head>
<body>
  <!-- … deine Seite … -->

  <script src="/assets/kongress/zoho-validation.js"></script>
  <script src="/assets/kongress/partner-slug.js"></script>
</body>
```

### 2. Form-Markup einbauen

Inhalt von `form.html` an die Stelle der bestehenden Anmelde-Sektion
kopieren. Die Wrapper-Elemente (Headline, Eyebrow, Beschreibungstext)
gehören dir, das Formular dazwischen kommt aus `form.html`:

```html
<section id="anmeldung">
  <span class="section__eyebrow">Kostenlos anmelden</span>
  <h2 class="section__title">Werde Teil der Bewegung</h2>
  <p>Melde dich kostenlos an …</p>

  <!-- HIER: Inhalt von form.html einfügen -->

</section>
```

### 3. URL-Routing einrichten

Damit `freigeistkongress.com/marko-simic/` die Hauptseite ausliefert
(statt 404), brauchst du ein Server-Rewrite. Wähle nach deinem Hoster:

#### Netlify (`_redirects` im Web-Root)

```
/:slug/  /index.html  200
/:slug   /index.html  200
```

#### Apache (`.htaccess` im Web-Root)

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([a-z0-9]+(-[a-z0-9]+)*)/?$ /index.html [L]
```

#### Nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

#### Cloudflare Pages

In den Build-Settings „SPA-Fallback" aktivieren, oder per
`_redirects`-Datei wie bei Netlify.

### Fertig

Das war's. Teste mit `https://deine-domain/marko-simic/` und prüfe in den
Browser-DevTools, dass die Form ein Hidden-Field `name="SingleLine5"` mit
dem Wert `marko-simic` enthält.

## Anpassen: Styling

Die CSS-Klassen in `form.css` sind so gebaut, dass sie sich gut an dein
bestehendes Theme anpassen lassen. Sie nutzen **CSS-Custom-Properties mit
Fallbacks** — wenn du `--primary`, `--font-display`, `--black` etc. in deinem
Stylesheet vorher definierst, übernimmt die Form automatisch deine Werte.

Wichtige Klassen, die du überschreiben kannst:

| Klasse | Was es ist |
|---|---|
| `.newsletter-form` | Form-Wrapper |
| `.newsletter-input` | Text-Inputs (Vorname, Nachname, Email) |
| `.kongress-form__select` | Anrede-Dropdown |
| `.kongress-form__terms` | Datenschutz-Checkbox-Zeile |
| `.kongress-form__submit` | Submit-Button (Pill-Shape mit Gradient) |
| `.kongress-form__error` | Validierungs-Fehlertext |

## Anpassen: Wording / Felder

In `form.html` kannst du frei anpassen:

| Stelle | Was du ändern kannst |
|---|---|
| Placeholder `"Vorname *"`, `"Nachname *"`, etc. | Wording |
| Datenschutz-Text und -Link | DSGVO-Wording, URL |
| Submit-Button-Text `"Jetzt kostenlos anmelden"` | Call-to-Action |

**Nicht ändern** ohne mit dem CRM-Setup abzustimmen:

- `<form action="…">` — Zoho-Form-URL
- `name="Dropdown"`, `name="Name_First"`, `name="Name_Last"`, `name="Email"`,
  `name="TermsConditions"`, `name="SingleLine5"` — Zoho-interne Field-Namen
- Inhalt von `zoho-validation.js`
- `zf_MandArray` und `zf_FieldArray` in `form.html`

Wenn du Felder hinzufügen/entfernen willst → bitte mit Marko abstimmen, weil
auch das Form in Zoho Forms und das CRM-Mapping angepasst werden müssen.

## Wie Partner-Slugs vergeben werden

Marko pflegt die Slugs im Zoho-CRM-Custom-Modul „Formulare" (Feld
`Partner Slug`). Schema: `vorname-nachname` (lowercase, Umlaute zu ae/oe/ue,
Sonderzeichen weg, Bindestrich-Trennung).

Beispiele:

| Partner | Slug | Link |
|---|---|---|
| Marc Friedrich | `marc-friedrich` | `freigeistkongress.com/marc-friedrich/` |
| Jörg Schäfer | `joerg-schaefer` | `freigeistkongress.com/joerg-schaefer/` |
| Andreas Popp | `andreas-popp` | `freigeistkongress.com/andreas-popp/` |

Bei Slug-Konflikten (zwei Partner mit gleichem Namen) bekommt der zweite
einen Suffix `-2`, `-3`, etc. Die Slug-Eindeutigkeit wird in Zoho per
Unique-Constraint sichergestellt.

## Sicherheits-Hinweis

Die Form schickt Daten direkt an Zoho. Der Endpunkt ist öffentlich (das ist
bei Web-Forms normal). Zoho hat eingebauten Spam-Schutz und Rate-Limiting.
Wenn nötig, lässt sich später ein Honeypot oder reCAPTCHA ergänzen.

## Wartung & Kontakt

| Rolle | Wer | Wofür |
|---|---|---|
| Tech-Lead | Marko Simic, SuMa SIMIC Consulting LTD ([m.simic@suma-consulting.com](mailto:m.simic@suma-consulting.com)) | Form-Logik, Slug-Vergabe, CRM-Setup |
| CRM-Owner | Bruno Hillebrand | Zoho-Forms-UI, Zoho-CRM-Pflege |
| Webdesign / Hosting | Tom | Einbau in freigeistkongress.com, Styling |

Issues bitte als GitHub-Issue im Repo öffnen.
