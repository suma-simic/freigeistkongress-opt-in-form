# KlickTipp Newsletter-Opt-In

Newsletter-Anmeldung für **freigeistkongress.com**. Schreibt Subscriber
direkt in KlickTipp und setzt automatisch den Tag
`NL - Opt-In_freigeistkongress`. KlickTipp ist tag-basiert (keine Listen),
darum genügt der Tag als Segmentierungs-Anker.

## Zwei Varianten — wähle eine

Es gibt zwei Wege, das Newsletter-Opt-In zu integrieren. **Empfehlung:
Variante A (Raw-Code Embed)** — einfacher, schneller, kein Server-Code.

| | A — Raw-Code Embed | B — Server-Side API |
|---|---|---|
| Wo läuft Code | nur Client (HTML/JS im Browser) | Server (PHP/Node), Browser sendet an deinen Server, der ruft KlickTipp-API |
| Captcha-Schutz | ✓ via KlickTipp's `protect.js` | musst du selbst bauen |
| Tag-Zuweisung | automatisch (am Form in KlickTipp konfiguriert) | manuell im API-Call setzen |
| Custom-Felder | begrenzt (Vorname, Nachname, Email + Tags) | volle Kontrolle (alle Custom-Fields) |
| API-Key-Hygiene | Form-API-Key (öffentlich, OK im HTML) | Account-API-Key (geheim, NIEMALS im HTML) |
| Setup-Aufwand | 5 Minuten | 30+ Minuten |
| Wann sinnvoll | Standard-Newsletter-Anmeldung | komplexe Logik (z.B. dynamische Tags, Server-Validierung, Mehrstufen-Flow) |

## Variante A — Raw-Code Embed (empfohlen)

### Setup

1. **Files in deinen Asset-Ordner kopieren:**
   - `form.html` — das Form-Markup
   - `form.css` — Styling (analog zu Zoho-Form, Tom's Theme-Tokens)

2. **Im `<head>` der Seite einbinden:**
   ```html
   <link rel="stylesheet" href="/assets/kongress/klicktipp-form.css">
   ```

3. **Inhalt von `form.html` an die Stelle der Newsletter-Sektion kopieren.**
   Das Captcha-Script lädt sich selbst nach (es ist am Ende von `form.html`
   schon eingebunden).

4. **Fertig.** Submissions landen automatisch bei KlickTipp und werden mit
   dem Tag `NL - Opt-In_freigeistkongress` versehen.

### Was du anpassen kannst

| Stelle | Was änderbar |
|---|---|
| Placeholder-Text (`"Vorname *"`, `"E-Mail-Adresse *"`, etc.) | Wording |
| Submit-Button-Text (`"Newsletter abonnieren"`) | Call-to-Action |
| DSGVO-Text + Link | Wording, Datenschutz-URL |
| `form.css` — alle Klassen `.klicktipp-form__*` | Styling |

### Was du NICHT anpassen darfst

- `<form action="https://app.klicktipp.com/api/subscriber/signin.html">` — KlickTipp-Endpoint
- `name="apikey"` value (der Form-API-Key — identifiziert die Form)
- `name="fields[fieldFirstName]"`, `name="fields[fieldLastName]"`, `name="email"`, `name="fields[DSGVOCheckbox]"`, `name="fields[fieldDigit]"` — KlickTipp-Field-Namen
- Das `<script src="…/protect.js">` — KlickTipp-Captcha (Submissions ohne werden als Spam abgewiesen)

Wenn du zusätzliche KlickTipp-Custom-Fields aufnehmen willst → mit Marko
abstimmen, weil das Form in KlickTipp entsprechend konfiguriert werden muss.

### Hinweis: Form-API-Key ist nicht geheim

Der Wert von `name="apikey"` im HTML (`87e9zn7n5z8z129a`) ist die
öffentliche Form-API-Key. Sie identifiziert die Form bei KlickTipp und ist
in JEDEM KlickTipp-Embed-Form sichtbar. **Sie ist NICHT der API-Key für
die KlickTipp-Account-API.** Wenn jemand diesen Key sieht, kann er
maximal eine zusätzliche Submission an diese eine Form schicken — nichts
weiter.

## Variante B — Server-Side API (falls du Custom-Logic brauchst)

KlickTipp bietet eine [Listbuilding-API](https://developers.klicktipp.com/guides),
die du server-side ansprechen kannst. Use-Case: du willst die Anmeldung
mit Server-Logik kombinieren (z.B. nur Tag zuweisen wenn bestimmte
Bedingung erfüllt, oder weitere Felder berechnen).

### Konzept

```
Browser (Tom's Form)
    │
    ▼  POST an deinen Server (z.B. api/newsletter.php)
    │
Dein PHP-Code
    │
    ▼  ruft KlickTipp Listbuilding-API
    │  mit geheimem Account-API-Key
    │
KlickTipp
    │
    └─ Subscriber angelegt + getagged
```

### Benötigt

- **Account-API-Key** (geheim — nicht im Repo, nicht ins HTML, in
  Server-Env-Variable). Bekommst du von Marko via separaten Channel.
- Server-Code (PHP, Node, etc.) der die KlickTipp-API aufruft
- Eigener Captcha-Schutz (z.B. hCaptcha, reCAPTCHA)

### Beispiel-Endpunkt (PHP)

```php
<?php
// api/newsletter.php
// HINWEIS: KlickTipp-API-Key kommt aus Server-ENV, nicht aus HTML!

$apiKey = $_ENV['KLICKTIPP_API_KEY']; // z.B. via .env-Datei

$listId = 352074; // Form-ID
$tagId  = '<ID-des-Tags-NL-Opt-In_freigeistkongress>';

$payload = [
    'apikey'    => $apiKey,
    'email'     => $_POST['email'],
    'fields[fieldFirstName]' => $_POST['firstname'],
    'fields[fieldLastName]'  => $_POST['lastname'],
];

$ch = curl_init('https://api.klicktipp.com/subscriber/signin');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
?>
```

> Achtung: der Code ist Pseudo-Beispiel. Reale API-Details siehe
> [developers.klicktipp.com/guides](https://developers.klicktipp.com/guides).

### Wichtig: API-Key-Hygiene

Der Account-API-Key darf **niemals** ins HTML, ins JavaScript oder in das
Git-Repo. Speicher ihn in einer `.env`-Datei (in `.gitignore`!) und
lade ihn server-side. Bei Leak: in KlickTipp rotieren.

## Welche Variante für freigeistkongress.com?

**Variante A (Raw-Code Embed).** Begründung:
- Newsletter-Anmeldung ist Standard, keine Custom-Logik nötig
- Tag-Zuweisung läuft automatisch über das Form
- Captcha-Schutz ist schon eingebaut
- Kein zusätzlicher Server-Code, kein API-Key-Management

Variante B kommt erst infrage, wenn die Webseite irgendwann komplexere
Logik braucht (z.B. „Subscriber soll Tag X bekommen, wenn er aus Land Y
kommt").
