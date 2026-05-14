---
title: "Das Projekt"
description: "Das staTThus-Projekt"
layout: "sections"
draft: false
# Defaults pushed to every descendant under /projekt/ so CMS-created
# entries get the right structure without editors having to set frontmatter.
cascade:
  - _target:
      kind: section
    layout: "sections"
  - _target:
      kind: page
    build:
      render: "never"
      list: "local"
---

Auf dieser Seite findest du Hintergrund und Aufbau unseres Wohnprojekts — Vision, Architektur, Gemeinschaftsleben. Die Inhalte werden über das CMS gepflegt; weitere Sektionen kommen laufend dazu.
