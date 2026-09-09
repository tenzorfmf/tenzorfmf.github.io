---
# Copy into src/content/posts/<sl|en>/<YYYY-MM-DD>--<stable-key>.md
# The filename date is cosmetic; `publishedAt` below is authoritative.

translationKey: "moja-objava"      # SL and EN versions share this exact value
lang: "sl"
title: "Naslov objave"
slug: "naslov-objave"              # locale-specific URL segment
summary: "Ena poved povzetka (obvezno)."
kind: "news"                       # news | statement | event | document | archive
publishedAt: 2026-01-15           # ORIGINAL publication date (not the migration date)
updatedAt: null
category: "dogodki"               # free text; drives the 'back to section' target
tags: ["volitve"]
authors: []
featured: false                   # one featured post per locale shows as "Pomembno zdaj"
draft: false

hero: null                         # or: { src: "flyers/…png" | "/media/…png", alt: "obvezno", caption: "…" }

attachments: []                    # kind: document needs >=1 attachment OR >=1 source url
#  - label: "Dokument (PDF)"
#    path: /media/documents/dokument.pdf
#    mediaType: application/pdf
#    language: sl

sources: []
#  - label: "Vir"
#    url: "https://…"
#    archivedUrl: null
#    accessedAt: null

event: null                        # kind: event REQUIRES event.start + event.timezone
#  start: 2026-03-01T18:00:00
#  end: null
#  timezone: Europe/Ljubljana
#  venue: "FMF, Jadranska 21"
#  address: "Ljubljana"

search:
  include: true
  type: news                       # page | news | event | document | person | archive

aliases: []
---

Telo objave v Markdownu. Blockquote (`>`) se izriše po oblikovni predlogi.
