# Wie ich einen neuen Seitentyp erstelle

1. Zuerst suche ich mir eine Layoutvorlage, die so ungefähr das bietet, was ich (modifizieren) möchte. Den entsprechenden Ordner aus `layouts` im `themes` directory kopiere ich in den `layouts` Ordner im Projekt und benenne ihn so, wie mein künftiges Objekt heißen soll, zum Beispiel `people`. Ich wähle `author` als Vorlage, hat auch mit Menschen zu tun.

2. Wenn ich nur eine Seite dieses Objekts habe könnte ich in `content/german` nun eine `people.md` Datei anlegen. Durch diesen Namen wird Hugo signalisiert, dass es sich um ein single Layout handelt. 

3. Da ich aber meist mit mehreren Unterseiten desselben Typs arbeite, lege ich ein Verzeichnis mit demselben Namen wie das Layout an, also `content/german/people`.

4. Damit die Unterseiten funktionieren, muss ich eine Datei `_index.md` im `people`-Ordner anlegen. Die enthält dann die Infos für die Startseite der neuen Unterobjekte, falls ich die haben möchte. Zum Beispiel eine Miniaturansicht aller Unterobjekte etc. Durch den Namen wird hugo signalisiert, dass es sich um ein list Layout handelt.

5. Die Unterseiten mit Content vom Typ `people` werden nun im `people`-Verzeichnis als `*.md`-Datei angelegt. Hier fange ich mit `andrea-und-martin.md` an. Dabei hilft es eine Content-Datei desjenigen Typs zu kopieren, von dem ich vorher auch das Layout kopiert habe. Ich kopiere also `author/john-doe.md` nach `people/andrea-und-martin.md`. Das sollte jetzt sofort auf der Website laufen unter `http://localhost:1313/people/andrea-und-martin/`

6. Jetzt kann ich im Frontmatter der md-Datei die Attribute aufbauen, die ich bei den einzelnen Objekten nutzen möchte. Die Attribute, die ich nicht brauche, lasse ich erstmal drin, da die Hugo-Layout-Seite sie vermutlich referenziert - immerhin haben wir eine lauffähige Seite kopiert. In diesem Beispiel ist es einfach, da wir bereits die Metadaten der people-Seiten kennen.
```yaml
---
title: "Andrea und Martin"
image: "images/people/andrea-und-martin.png"
einstieg: >
  Wir sind Andrea und Martin und haben das staTThus über die Projetplattform "bring together" kennengelernt. Nach dem Kennenlern-Stammtisch Pfingsten 2024 war uns klar - hier wollen wir mitmachen! Wir wollen hier gemeinsam in einer kleinen Wohnung unterm Dach wohnen.
motivation: >
  Wir wollen unser Leben in Vielfalt gestalten und dazu gehört für uns eine lebendige Nachbarschaft, die sich als Gemeinschaft versteht. Das bedeutet für uns, füreinander da zu sein, im Auf und Ab des Lebens. Die Neubau-Workshops sind für uns ein wichtiger Baustein zum Zusammenwachsen der Gemeinschaft. Hier treffen wir uns alle persönlich und es gibt immer ein buntes und leckeres Büffet.
menschliches: >
  Andrea: Ich bin gerne kreativ, egal in welchem Bereich. Meine Erfahrungen mit Workshops zu den Themen Wildkräuter und Nachhaltigkeit bringe ich gerne ein. 
  Martin: Ich ordne gerne das große Durcheinander dieser Welt, auch wenn das ein endloser Prozess ist. Als leidenschaftlicher Computerprofi kann ich eigentlich an allen Stellen digitale Unterstützung leisten.
funfact: >
  Andrea: Ich lese gerne und bin auch selbst Buchautorin. 
  Martin: Ich erstelle gerne Fotokalender und habe damit letztes Jahr einen Preis gewonnen - ganz ohne Kamera!
passion: >
  Andrea: Zartbitter-Schokomousse macht mich fast immer für einen Moment glücklich! 
  Martin: Gutes Kochen und Essen.
  
email: "johndoe@logbook.com"
social:
  - icon: "fab fa-facebook" # themify icon pack : https://themify.me/themify-icons
    link: "https://facebook.com"
  - icon: "fab fa-twitter" # themify icon pack : https://themify.me/themify-icons
    link: "https://twitter.com"
  - icon: "fab fa-github" # themify icon pack : https://themify.me/themify-icons
    link: "https://github.com"
---
```

7. Jetzt kann ich in der `single.html`-Seite aus dem `people`-Layout damit beginnen, die Variablen im HTML-Code anzulegen. Am Anfang kann man sie erstmal "irgendwo" platzieren, um sie zu testen. Wenn man schon weiß, wie die Seitenstruktur sein soll, kann man auch eine schon passende div-Struktur erstellen. Ich kopiere erstmal alle neuen Parameter direkt vor den content-Block:
```html
        <div class="col-lg-9 col-md-8 content text-md-start">
          <div >{{ .Params.einstieg }}</div>
          <div >{{ .Params.motivation }}</div>
          <div >{{ .Params.menschliches }}</div>
          <div >{{ .Params.funfact }}</div>
          <div >{{ .Params.passion }}</div>
          {{ .Content }}
        </div>
```
8. Jetzt noch ein paar Überschriften. Könnte man direkt reinschreiben, da die Seite aber mehrsprachig ausgelegt ist, nutze ich den Übersetzungsmechanismus von hugo. dazu erstelle ich in `i18n/de.yaml` ganz unten entsprechende Einträge.

```yaml
- id: wer_wir_sind
  translation: Hallo :)

- id: motivation
  translation: Gemeinschaft und motivation

- id: menschliches
  translation: Persönliches und menschliches

- id: funfact
  translation: Fun Fact

- id: passion
  translation: Leidenschaft
```

9. Im HTML Code lege ich für jede Überschrift dann den entsprechenden Verweis an (Dass die i18n Namen und die Parameternamen meist gleich lauten, muss nicht so sein).
```html
        <div class="col-lg-9 col-md-8 content text-md-start">
          <div>{{ i18n "wer_wir_sind" }}</div>
          <div >{{ .Params.einstieg }}</div>
          <div>{{ i18n "motivation" }}</div>
          <div >{{ .Params.motivation }}</div>
          <div>{{ i18n "menschliches" }}</div>
          <div >{{ .Params.menschliches }}</div>
          <div>{{ i18n "funfact" }}</div>
          <div >{{ .Params.funfact }}</div>
          <div>{{ i18n "passion" }}</div>
          <div >{{ .Params.passion }}</div>
          {{ .Content }}
        </div>
```
10. Jetzt packe ich die Combi aus Überschrift und Parameter jeweils nochmal in ein eigenes Container div, so dass ich später gute responsive Websites designen kann, ohne noch groß im Code ändern zu müssen (muss man doch immer wieder noch 😅 )

```html
        <div class="col-lg-9 col-md-8 content text-md-start">
          <div class="people-tag">
            <div class="people-text-header">{{ i18n "wer_wir_sind" }}</div>
            <div class="people-text-body">{{ .Params.einstieg }}</div>
          </div>
          <div class="people-tag">
            <div class="people-text-header">{{ i18n "motivation" }}</div>
            <div class="people-text-body">{{ .Params.motivation }}</div>
          </div>
          <div class="people-tag">
            <div class="people-text-header">{{ i18n "menschliches" }}</div>
            <div class="people-text-body">{{ .Params.menschliches }}</div>
          </div>
          <div class="people-tag">
            <div class="people-text-header">{{ i18n "funfact" }}</div>
            <div class="people-text-body">{{ .Params.funfact }}</div>
          </div>
          <div class="people-tag">
            <div class="people-text-header">{{ i18n "passion" }}</div>
            <div class="people-text-body">{{ .Params.passion }}</div>
          </div>
          {{ .Content }}
        </div>
```

11. Zum Schluss noch die passenden CSS Klassen für die drei Einträge an. Das mache ich im Projektverzeichnis in `assets/scss/custom.scss`. Ein Format bekommt erstmal nur die Überschrift-Klasse. 

```scss
.people-tag {
}

.people-text-header {
    margin-top: 0.5rem;
    font-weight: bold;    
}

.people-text-body {
}
```

12. Nun gestalte ich die list view ein wenig in 
Das Detaildesign kann man dann später machen. So wie die Site jetzt ist, kann man sie für eine Strukturdemo auf jeden Fall schon einmal nutzen. In einem nächsten Schritt könnte man noch die Sidebars definieren, damit klar ist, ob hier an der Seite auch etwas steht wie auf den Hauptseiten.
