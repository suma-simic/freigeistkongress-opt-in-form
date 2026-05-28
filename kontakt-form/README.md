# Kontaktformular (Zoho Forms)

Klassisches Kontakt-Formular für **freigeistkongress.com**. Submissions
laufen direkt an Zoho Forms — von dort aus weiter ins CRM oder als
E-Mail-Benachrichtigung an das Team (Marko's Zoho-Setup).

## Felder

| Feld | Pflicht | Typ |
|---|---|---|
| Anrede | ✓ | Select (Herr / Frau) |
| Vorname | ✓ | Text |
| Nachname | ✓ | Text |
| E-Mail-Adresse | ✓ | E-Mail (mit Format-Validierung) |
| Betreff / Anliegen | optional | Select (5 Optionen) |
| Nachricht | optional | Textarea |
| Datenschutz | ✓ | Checkbox |

**Betreff-Optionen** (in Zoho Forms vorkonfiguriert):
- Allgemeine Anfrage
- Presse & Kooperation
- Speaker-Anfrage
- Technisches Problem / Bug melden
- Sonstiges

## Files in diesem Ordner

| Datei | Pflicht | Zweck |
|---|---|---|
| `form.html` | ✓ | Form-Markup zum Einbetten |
| `form.css` | ✓ | Styling (3-Col-Grid oben, Textarea, Full-Width Submit) |
| `zoho-validation.js` | ✓ | Zoho-eigenes Validation-Script (Pflichtfeld-Check, Email-Format) |

> Identisch zur Zoho-Validation-Datei in `../zoho-form/`. Wenn du beide
> Forms auf derselben Seite einbindest, brauchst du das Script nur einmal
> auszuliefern — z.B. in einem gemeinsamen `assets/kongress/`-Ordner.

## Quick-Start

### 1. Assets ausliefern

```html
<head>
  <!-- … deine bestehenden Stylesheets … -->
  <link rel="stylesheet" href="/assets/kongress/kontakt-form.css">
</head>
<body>
  <!-- … deine Seite … -->

  <script src="/assets/kongress/zoho-validation.js"></script>
</body>
```

### 2. Form-Markup einbauen

Inhalt von `form.html` an die Stelle der Kontakt-Sektion kopieren —
typisch im Footer oder auf einer eigenen `/kontakt/`-Seite. Die
Wrapper-Elemente (Headline, Beschreibung) gehören dir:

```html
<section id="kontakt">
  <h2 class="section__title">Kontakt aufnehmen</h2>
  <p>Wir freuen uns auf deine Nachricht …</p>

  <!-- HIER: Inhalt von form.html einfügen -->

</section>
```

### Fertig

Form-Submissions landen in Zoho Forms unter „Freigeistkongress
Kontaktformular". Was danach passiert (Mail an info@…, CRM-Eintrag,
Helpdesk-Ticket) ist im Zoho-Forms-Setup konfiguriert.

## Anpassen: Styling

Die Form nutzt CSS-Custom-Properties mit Fallbacks. Tom's Theme-Tokens
(`--primary`, `--primary-dark`, `--primary-light`, `--font-body`,
`--black-card`, `--border`, `--white-20`, `--text-soft`) werden
automatisch übernommen, wenn dein Theme-Stylesheet vorher geladen wird.

Wichtige Klassen, die du überschreiben kannst:

| Klasse | Was es ist |
|---|---|
| `.kontakt-form` | Form-Wrapper |
| `.kontakt-form__input` | Text-Inputs, Select, Textarea |
| `.kontakt-form__select` | Dropdowns (Anrede + Betreff) |
| `.kontakt-form__textarea` | Nachricht-Textarea (kleinerer Border-Radius als Inputs) |
| `.kontakt-form__terms` | Datenschutz-Checkbox-Zeile |
| `.kontakt-form__submit` | Submit-Button (Full-Width Gradient) |
| `.kontakt-form__error` | Validierungs-Fehlertext |

## Anpassen: Wording / Felder

In `form.html` kannst du frei anpassen:

| Stelle | Was du ändern kannst |
|---|---|
| Placeholder (`"Vorname *"`, `"E-Mail-Adresse *"`, `"Wie können wir helfen?"`, etc.) | Wording |
| Datenschutz-Text und -Link | DSGVO-Wording, URL |
| Submit-Button-Text (`"Nachricht senden"`) | Call-to-Action |
| Send-Icon SVG | anderes Icon, oder weglassen |
| `rows="6"` an der Textarea | Höhe |

**Nicht ändern** ohne mit dem Zoho-Setup abzustimmen:

- `<form action="…">` — Zoho-Form-URL
- `name="Dropdown"`, `name="Name_First"`, `name="Name_Last"`, `name="Email"`,
  `name="Dropdown1"`, `name="MultiLine"`, `name="TermsConditions"`,
  `name="zf_*"` — Zoho-interne Field-Namen
- Inhalt von `zoho-validation.js`
- `zf_MandArray` und `zf_FieldArray` in `form.html`

Wenn du Betreff-Optionen ändern willst (Hinzufügen / Umbenennen) → in
Zoho Forms ändern, dann neuen Embed-Code holen und die `<option>`-Liste
in `form.html` ersetzen.

## Sicherheits-Hinweis

Submissions gehen direkt an Zoho. Der Endpunkt ist öffentlich (Standard
bei Web-Forms). Zoho hat eingebauten Spam-Schutz. Falls Spam-Volumen
zunimmt, kann in Zoho Forms ein Captcha (reCAPTCHA / hCaptcha) aktiviert
werden — dann muss der Embed-Code neu exportiert werden.
