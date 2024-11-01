# Edumetrics - Bewertung von Unterrichtsqualität

Edumetrics bietet eine umfassende Lösung zur schulinternen Auswertung und Verbesserung der Unterrichtsqualität in der Sekundarstufe I. Es ermöglicht Lehrern und Schuladministratoren, Daten zu sammeln und zu analysieren, um dann möglicherweise Maßnahmen zur Verbesserung des Unterrichts zu ergreifen.

**Achtung:** Dieses Projekt befindet sich derzeit noch in der Entwicklung.

## Anwendungsfälle

- **Longitudinale Nachverfolgung**: Die Beobachtung einer bestimmten Klasse, Lerngruppe oder eines ganzen Jahrgangs über mehrere Zeitpunkte hinweg. Ziel ist es, Entwicklungen oder Veränderungen im Zeitverlauf festzustellen, etwa in Bezug auf Unterrichtsqualität oder Lernergebnisse.

- **Querschnittsvergleich von Fächern und Jahrgangsanalysen**: Die parallele Betrachtung von Fächern innerhalb eines Jahrgangs oder im Gesamtschulvergleich (**Querschnittsanalyse**), um die Unterrichtsqualität eines Faches oder einer Fachgruppe zum selben Zeitpunkt in verschiedenen Klassen oder Jahrgängen zu untersuchen.

- **Pre-Post-Analyse**: Analyse und Überwachung der Unterrichtsqualität etwa nach einem Wechsel der Lehrperson, um systematische Veränderungen aufzudecken.

- **Vergleich von Lehrer-Kohorten (Kohortenanalyse)**: Identifizierung systematischer Unterschiede zwischen verschiedenen Lehrergruppen (Kohorten), ohne dabei personenbezogene Daten zu betrachten (um den Anforderungen des Personalrats gerecht zu werden). Kohorten können
  Lehrkräfte sein, die etwa dieselbe Lehrerausbildung absolviert haben oder seit einem ähnlichen Zeitraum unterrichten.

Die Kombination von Longitudinalstudien, Querschnittsanalysen und Pre-Post-Designs unterstützt eine differenzierte Überwachung und Bewertung der Unterrichtsqualität, indem sie Zeitverläufe, Fachunterschiede und Effekte von Lehrkräften berücksichtigt.

Aus Datenschutzgründen ist eine reine Client-Browser-Anwendung geplant, d.h. die Daten sollten nie den lokalen Rechner (Browser) verlassen. Stattdessen sollen Daten "geöffnet" (importiert) und "gespeichert" (exportiert) werden können, später möglicherweise als Progressive Web App.

## Roadmap

- [x] Basis-Datenmodell für Jahrgänge, Klassen, Lehrer, Schulfächer und Noten
- [x] Datenimport aus CSV-Datei
- [x] Datenbereinigung (Entfernung Duplikate, Tippfehler)
- [x] Datenaufbereitung (z.B. Schuljahresdurchschnitt vs. Einzelnoten)
- [x] Darstellung der Daten in Tabellenform
- [x] Filterung der Daten nach individueller Klasse (Lerngruppe), Schuljahr, Jahrgang, Fach und Lehrkörper
- [ ] Auswahl Lehrerkörper nach unterrichteten Fächern
- [ ] Visuelle Darstellung (Plotly.js)
- [ ] Definition und Anwendung Design System
- [ ] Speichern von Daten (Export JSON)
- [ ] Öffnen von Daten (Import JSON)
- [ ] Dateneingabe
- [ ] Definition von Lehrer-Kohorten
- [ ] Filterung nach Lehrer-Kohorten

## Verwendete Technologien

- [React](https://react.dev/) - React Library
- [Next.js](https://nextjs.org/) - Ein React-Framework für die Entwicklung von Webanwendungen.
- [TypeScript](https://www.typescriptlang.org/) - Ein typisiertes Superset von JavaScript.
- [Sass](https://sass-lang.com/) - CSS with super powers

## Installation und Ausführung (Entwicklungsmodus)

Um das Projekt lokal zu starten, folgen Sie diesen Schritten:

1. Klonen Sie das Repository:

   ```bash
   git clone https://github.com/marielngr/edumetrics.git
   cd edumetrics
   ```

2. Installieren Sie die Abhängigkeiten:

   ```bash
   npm install
   ```

3. Starten Sie den Entwicklungsserver:

   ```bash
   npm run dev
   # oder
   yarn dev
   # oder
   pnpm dev
   # oder
   bun dev
   ```

4. Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser, um das Ergebnis zu sehen.
