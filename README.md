# Brachial Studio Waterkamp

Responsive, vollständig neu programmierte Website für das Tonstudio von Christian Waterkamp in Siegen. Reines HTML5, CSS3 und JavaScript – ohne Framework, Installation, Build-Schritt oder kostenpflichtige Dienste.

## Enthalten

- Home, Studio, Musikproduktion, Recording, Mixing & Mastering, Über mich, Referenzen und Kontakt.
- Sticky-Navigation mit aktiver Abschnittsmarkierung und zugänglichem Smartphone-Menü.
- Dezente Animationen mit Berücksichtigung der Systemeinstellung „Bewegung reduzieren“.
- Direkter Formularversand über FormSubmit mit Pflichtfeldprüfung, echtem Serverstatus und alternativem E-Mail-Entwurf.
- Einmaliges Studio-Soundintro mit Autostartversuch, Stopp-Schalter und manuellem Start bei Autoplay-Sperre.
- Echte Kontaktdaten, zwei verifizierte Melo-Glow-Veröffentlichungen und ergänzende Informationsseiten.
- Lokal gespeicherte WebP-Bilder und Schrift; keine externen Player, Analyse-Skripte oder Schriftabfragen.
- Relative Dateipfade, `.nojekyll`, Meta-Beschreibung, Open-Graph-Angaben, Favicon und strukturierte Geschäftsdaten.

## Dateien

```text
brachial-studio/
├── index.html
├── style.css
├── script.js
├── impressum.html
├── danke.html
├── datenschutz.html
├── bildnachweise.html
├── README.md
├── PRUEFBERICHT.md
├── .gitignore
├── .nojekyll
└── assets/
    ├── christian-studio.webp
    ├── christian-waterkamp.webp
    ├── studio-waterkamp.webp
    ├── mixing-console.webp
    ├── recording-microphone.webp
    ├── blau.webp
    ├── zaubertrank.webp
    ├── studio-intro.mp3
    ├── manrope-variable.ttf
    ├── OFL-Manrope.txt
    └── favicon.svg
```

## Lokal ansehen

Im Projektordner ein Terminal öffnen und starten:

```powershell
py -m http.server 4173 --bind 127.0.0.1
```

Falls `py` nicht vorhanden ist, `python` verwenden. Danach im Browser [http://127.0.0.1:4173/](http://127.0.0.1:4173/) öffnen. Mit `Strg+C` den Server beenden. Der Port kann geändert werden, wenn er schon belegt ist.

Ein Doppelklick auf `index.html` zeigt die Website ebenfalls an. Für die vollständige Prüfung einschließlich Clipboard-Funktion empfiehlt sich HTTP über localhost.

## Auf GitHub Pages veröffentlichen

1. Auf GitHub ein Repository anlegen, zum Beispiel `brachial-studio`.
2. Den **Inhalt dieses Projektordners** einschließlich `assets/` und `.nojekyll` in die oberste Ebene des Repositorys laden. `index.html` muss direkt dort liegen.
3. Im Repository **Settings → Pages** öffnen.
4. Unter **Build and deployment → Source** den Eintrag **Deploy from a branch** wählen.
5. Den Branch **main** und den Ordner **/(root)** auswählen und mit **Save** bestätigen.
6. Die fertige Adresse wird unter Pages angezeigt. Bei einem Projektrepository hat sie die Form `https://DEIN-GITHUB-NAME.github.io/brachial-studio/`.

Die Seite braucht kein `npm install` und keinen eigenen GitHub-Actions-Workflow. Weitere Änderungen werden nach dem Upload in den gewählten Branch veröffentlicht. Anleitung nach der [offiziellen GitHub-Dokumentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

### Optional: per Git hochladen

Die Repository-URL im letzten Befehl durch die echte URL ersetzen:

```powershell
git init
git add .
git commit -m "Website Brachial Studio Waterkamp"
git branch -M main
git remote add origin https://github.com/DEIN-GITHUB-NAME/brachial-studio.git
git push -u origin main
```

### Vor dem öffentlichen Start

- Anbieterangaben in `impressum.html` sowie die Angaben zum tatsächlich gewählten Hosting und E-Mail-Verfahren in `datenschutz.html` prüfen. Weitere vorhandene Pflichtangaben, etwa eine USt-IdNr., ergänzen, falls sie auf das Studio zutreffen. Keine Steuernummer aus Drittquellen wurde übernommen.
- Die Rechte zur Veröffentlichung der bereitgestellten Porträt-/Studioansicht und der eigenen Releasebilder bestätigen. Die ergänzenden Symbolbilder und die Schrift sind in `bildnachweise.html` dokumentiert.
- Sobald die endgültige Websiteadresse feststeht, `og:image` in `index.html` auf die vollständige öffentliche Bild-URL setzen. Optional auch `og:url` und eine kanonische URL ergänzen. Es ist bewusst keine Domain erfunden worden.

## Kontaktverfahren

Empfänger ist **wchristian576@gmail.com**. Der Button **Anfrage senden** übermittelt die Angaben über [FormSubmit](https://formsubmit.co/) direkt an die Studioadresse. Ein installiertes Mailprogramm ist dafür nicht nötig. Mit JavaScript bleibt der Besucher auf der Seite; ohne JavaScript wird das Formular per POST an den Dienst übergeben und anschließend zur Seite `danke.html` zurückgeleitet.

**Einmalige Aktivierung:** Bei der ersten Verwendung schickt FormSubmit eine Bestätigungsmail an die Empfängeradresse. Der Studioinhaber muss darin **Activate Form** auswählen. Erst nach dieser Freischaltung ist die Zustellung eingerichtet. Posteingang und Spamordner prüfen. Es werden keine Zugangsdaten oder API-Schlüssel in der Website gespeichert.

Die Website zeigt Erfolg erst nach einer positiven Serverantwort. Bei fehlender Freischaltung, Fehlern oder unbestätigter Übertragung bleiben die Eingaben erhalten. Doppeltes Absenden während einer laufenden Anfrage wird verhindert. Der alternative E-Mail-Entwurf mit Kopieren und Textdownload bleibt verfügbar.

Die Datenschutzhinweise beschreiben den externen Versanddienst. Laut dessen Dokumentation werden Nachrichten für 30 Tage in einem Archiv vorgehalten. Bei einem Wechsel des Formulardienstes sind Empfänger, Endpunkt und Datenschutzhinweise entsprechend anzupassen.

## Inhalte ändern

### Soundintro

Die bereitgestellte Datei `für homepage.mp3` liegt unverändert als `assets/studio-intro.mp3` im Projekt. Das Intro dauert rund **18,7 Sekunden**. Beim Laden der Startseite versucht JavaScript, es mit 65 Prozent Lautstärke einmal abzuspielen. Nach dem Dateiende endet die Wiedergabe; es gibt keine Schleife und keinen erneuten Start durch Abschnittsnavigation. Ein Neuladen der Startseite ermöglicht das Intro erneut. Das Intro kann jederzeit über **Intro stoppen** beendet werden.

Browser können hörbaren Autostart verhindern. Dann erscheint **Intro abspielen** als bewusster Start. Das ist eine Browserbeschränkung und lässt sich von einer regulären Website nicht zuverlässig erzwingen. Siehe [MDN: Autoplay](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay). Ohne JavaScript gibt es einen einfachen manuellen Audioplayer.

Um das Intro auszutauschen, `assets/studio-intro.mp3` ersetzen. Die Lautstärke ist über `intro.volume = 0.65` in `script.js` einstellbar.

### Texte und Gestaltung

- Texte, Adresse und E-Mail: in `index.html` und den Informationsseiten bearbeiten. Die Empfängeradresse steht zusätzlich in `script.js` und im Formular-Endpunkt sowie in den strukturierten Daten im HTML.
- Farben, Schriftgrößen und Layout: in `style.css`. Zentrale Farben und Abstände stehen oben in `:root`.
- Referenzen: in `index.html` die Links und Cover austauschen. Direkte YouTube-Links sind integriert, keine eingebetteten Player.
- Bilder: im Ordner `assets/` ersetzen und die zugehörigen Alternativtexte anpassen. Das Porträt stammt aus einem Ausschnitt der gelieferten Vorschau; ein separat geliefertes hochauflösendes Original kann jederzeit ohne Layoutänderung eingesetzt werden.

## Medienquellen

- `christian-studio.webp`, `christian-waterkamp.webp`, `studio-waterkamp.webp`: Ausschnitte aus der vom Auftraggeber bereitgestellten Vorschaugrafik; keine generierte Ersatzperson.
- `mixing-console.webp`: [Leo Wieling / Unsplash](https://unsplash.com/photos/selective-grayscale-photography-of-mixing-console-Sby_GQz1-5E), Symbolbild.
- `recording-microphone.webp`: [Gabriel Weyand / Unsplash](https://unsplash.com/photos/a-professional-microphone-in-a-recording-studio-lwR2vJy1zgs), Symbolbild.
- `blau.webp`: Release-Vorschaubild aus [Melo Glow – Blau (Deephouse)](https://www.youtube.com/watch?v=gW0HeTSGraI).
- `zaubertrank.webp`: Release-Vorschaubild aus [Melo Glow – Zaubertrank](https://www.youtube.com/watch?v=w4nxBiFVxBI).
- Manrope: [Google Fonts](https://github.com/google/fonts/tree/main/ofl/manrope), SIL Open Font License; Lizenzdatei liegt bei.
- `studio-intro.mp3`: vom Auftraggeber bereitgestellte Originaldatei `für homepage.mp3`.

Verwendete Dokumentationsquellen zuletzt geprüft am 15. November 2026. Die Website ist über [GitHub Pages](https://wchristian576-rgb.github.io/Brachial-Studio-Waterkamp/) veröffentlicht.
