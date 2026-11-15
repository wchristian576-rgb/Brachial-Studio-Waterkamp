# Prüfung der Website

Stand: 15. November 2026

## Umgebung und Umfang

Die Website wurde über einen lokalen HTTP-Server auf `127.0.0.1:4173` im Chromium-basierten Vorschau-Browser geöffnet und visuell geprüft. Die Prüfung der Smartphone-Ansicht erfolgte über Browser-Viewports, nicht auf einem physischen Smartphone.

| Angeforderter Viewport | Ergebnis |
| --- | --- |
| 320 × 740 | Keine horizontale Überbreite; Überschriften bleiben im sichtbaren Bereich; Menü per Escape schließbar. |
| 390 × 844 | Mobile Startseite, Porträt, Referenzen und vollständiger Anfrageablauf visuell geprüft; keine horizontale Überbreite. |
| 768 × 1024 | Tablet-Layout mit zweispaltigen Abschnitten und Smartphone-Menü; keine horizontale Überbreite. |
| 1024 × 900 | Alle acht Links der Desktop-Navigation sichtbar; keine horizontale Überbreite. |
| 1440 × 1000 | Desktop-Startseite, Leistungen, Originalporträt, Referenzen und Kontaktbereich geprüft; keine horizontale Überbreite. |

## Funktionsprüfung

- **Navigation:** Ziele vorhanden; Abschnittslinks und aktive Markierung bei Produktion, Recording, Mixing & Mastering, Über mich, Referenzen und Kontakt geprüft. Mobiles Menü öffnet und schließt; Auswahl schließt das Menü und setzt den Fokus in den Zielabschnitt. Escape schließt das Menü und gibt den Fokus an den Menübutton zurück.
- **Anfrage:** Leeres Formular verhindert Entwurfserstellung und markiert die vier Pflichtfelder. Gültige Testangaben erzeugen einen lesbaren Entwurf. Empfänger, Betreff, deutsche Sonderzeichen und Nachricht sind korrekt im `mailto:`-Link kodiert.
- **Zwischenablage:** Kopieren erfolgreich, sichtbare Bestätigung vorhanden.
- **Textdownload:** Eine TXT-Datei wurde tatsächlich heruntergeladen und ihr Textinhalt geprüft. Es wurde keine E-Mail versendet.
- **Änderungen nach Entwurfserstellung:** Ein alter Entwurf wird verborgen, sobald sich Eingaben ändern.
- **Angebotsauswahl:** „Mix & Master anfragen“ wählt „Mixing & Mastering“ im Formular vor.
- **Referenzen:** Die direkten YouTube-URLs wurden anhand der Suchergebnisse des offiziellen Melo-Glow-Künstler-/Topic-Kanals verifiziert. Die Original-Vorschaubilder sind lokal gespeichert.
- **Browserkonsole:** Keine protokollierten Warnungen oder Fehler während der geprüften Sitzungen.

## Ergänzung: Soundintro

- Originaldatei `für homepage.mp3` unverändert nach `assets/studio-intro.mp3` kopiert; identische SHA-256-Prüfsummen.
- Die Datei wurde im Browser als MP3 erkannt, geladen und tatsächlich abgespielt; gemessene Dauer **18,661792 Sekunden**.
- Im Vorschau-Browser wurde hörbarer Autostart blockiert. Der vorgesehene Button **Intro abspielen** erschien und startete die Wiedergabe erfolgreich.
- Das natürliche Dateiende wurde abgewartet: `ended = true`, `paused = true`, `loop = false`; der Player blendete sich anschließend aus.
- Wechsel zum Studioabschnitt löste keine erneute Wiedergabe aus.
- Der Button **Intro stoppen** pausierte die Wiedergabe sofort und verhinderte einen erneuten Start innerhalb desselben Seitenaufrufs.
- Ein Neuladen setzt den Intro-Zustand für den nächsten Seitenaufruf zurück.
- Bei einem weiteren internen Seitenaufruf erlaubte der Browser den Autostart; die Wiedergabe begann ohne Betätigung des Play-Buttons.
- Player bei 320 und 390 Pixeln ohne Überbreite geprüft; Schließen-Button stoppt das Intro und blendet das Bedienfeld aus.
- Reservierter Platz unter dem Seitenende verhindert die Überlagerung der Footer-Links. Impressum und Datenschutz wurden über die Links erfolgreich geöffnet und auf mobiler Breite geprüft.

## Dateiprüfung

- `node --check script.js` erfolgreich.
- Alle vier HTML-Seiten besitzen genau eine H1-Überschrift; keine doppelten IDs.
- Alle internen Fragmentziele und lokalen Datei-Verweise vorhanden.
- Alle sieben Inhaltsbilder besitzen Alternativtexte.
- HTML, CSS, JavaScript und alle elf Asset-Dateien einschließlich der MP3 über HTTP erfolgreich erreichbar.
- Relative Dateipfade erlauben die Bereitstellung unter einem GitHub-Pages-Projektpfad.
- Kein Analyse-Skript, eingebetteter Drittanbieter-Player oder extern nachzuladender Webfont.
- CSS berücksichtigt reduzierte Bewegung; diese Systemeinstellung wurde im Vorschau-Browser nicht gesondert emuliert.

## Grenzen der Prüfung

Nicht durchgeführt wurden ein Versand aus einer realen E-Mail-Anwendung, Prüfungen auf physischen iOS-/Android-Geräten und ein Test einer öffentlichen GitHub-Pages-Veröffentlichung. Die Website wurde lokal vorbereitet und nicht öffentlich veröffentlicht. Die Anbieter- und Datenschutzhinweise sind vor dem öffentlichen Start mit den tatsächlichen betrieblichen Angaben und dem gewählten Hosting abzugleichen.
