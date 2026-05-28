# Freigeistkongress · Opt-In-Formulare

Zwei Formulare zum Einbinden in **freigeistkongress.com**. Beide
gestylt nach Tom's Theme (Cinzel-Headlines + Inter-Body, Pill-Inputs,
Türkis-Akzent), beide unabhängig voneinander einsetzbar an verschiedenen
Stellen der Seite.

## Live-Demo

> **https://freigeistkongress-form-demo.netlify.app/marko-simic/**

Zeigt das Zoho-Form mit Partner-Tracking. Probiere verschiedene
Pfadsegmente aus: `/marc-friedrich/`, `/joerg-schaefer/`, `/` (kein
Partner). Der erkannte Slug wird live unter dem Formular angezeigt.

## Was ist drin?

### 1. Zoho-Form mit Partner-Tracking → `zoho-form/`

**Hauptzweck:** Anmeldung der **Teilnehmer für die Freigeist Live Calls**.

Schreibt direkt nach Zoho Forms → Zoho CRM (Kontakt-Modul). Liest aus der
URL einen **Partner-Slug** aus (`/marko-simic/`) und trägt ihn ans CRM
mit, damit später ausgewertet werden kann, welcher Partner wie viele
Anmeldungen gebracht hat.

→ **Vollständige Anleitung: [`zoho-form/README.md`](zoho-form/README.md)**

### 2. KlickTipp Newsletter-Opt-In → `klicktipp-newsletter/`

**Hauptzweck:** Newsletter-Anmeldung (Subscribe). Setzt automatisch den
KlickTipp-Tag `NL - Opt-In_freigeistkongress`.

Zwei Integrations-Varianten dokumentiert:
- **A — Raw-Code Embed** (empfohlen): direktes HTML, kein Server-Code
- **B — Server-Side API**: für Custom-Logik, falls später benötigt

→ **Vollständige Anleitung: [`klicktipp-newsletter/README.md`](klicktipp-newsletter/README.md)**

## Welche Form gehört wohin?

| Was passiert | Welche Form |
|---|---|
| User meldet sich für die **Live Calls** an (Hauptangebot) | `zoho-form/` |
| User abonniert den **Newsletter** (Lead-Magnet, niedrige Schwelle) | `klicktipp-newsletter/` |

Beide können auf derselben Seite an verschiedenen Stellen koexistieren —
z.B. die Zoho-Form im Hero-Bereich („Jetzt für die Live Calls anmelden"),
die KlickTipp-Form im Footer („Newsletter abonnieren").

## Repo-Struktur

```
freigeistkongress-opt-in-form/
├── README.md                    ← diese Datei (Übersicht)
├── demo.html                    ← Live-Demo (zeigt die Zoho-Form)
├── _redirects                   ← Netlify-Konfig für die Demo
│
├── zoho-form/                   ← Form 1: Anmeldung Live Calls
│   ├── README.md                ← Anleitung
│   ├── form.html
│   ├── form.css
│   ├── partner-slug.js
│   └── zoho-validation.js
│
└── klicktipp-newsletter/        ← Form 2: Newsletter-Opt-In
    ├── README.md                ← Anleitung (Variante A + B)
    ├── form.html
    └── form.css
```

## Anpassen, ja oder nein?

| Was | Darfst du anpassen? |
|---|---|
| Styling (CSS, Farben, Schriften, Abstände) | ✓ frei |
| Wording (Placeholder, Button-Text, DSGVO-Text) | ✓ frei |
| Layout der umgebenden Section (Headline, Beschreibungstext) | ✓ frei, gehört dir |
| Form-Action-URLs | ✗ nicht ändern |
| Field-Namen (`name="…"` Attribute) | ✗ nicht ändern |
| `zoho-validation.js` Inhalt | ✗ nicht ändern |
| KlickTipp Captcha-Script-URL | ✗ nicht ändern |

Wenn du Felder hinzufügen oder entfernen willst → kurz mit Marko
abstimmen, weil dann auch das Form bei Zoho bzw. KlickTipp angepasst
werden muss.

## Wartung & Kontakt

| Rolle | Wer | Wofür |
|---|---|---|
| Tech-Lead | Marko Simic, SuMa SIMIC Consulting LTD ([m.simic@suma-consulting.com](mailto:m.simic@suma-consulting.com)) | Form-Logik, Slug-Vergabe, CRM- + KlickTipp-Setup |
| CRM-Owner | Bruno Hillebrand | Zoho-Forms-UI, Zoho-CRM-Pflege |
| Webdesign / Hosting | Tom | Einbau in freigeistkongress.com, Styling |

Issues bitte als GitHub-Issue im Repo öffnen.
