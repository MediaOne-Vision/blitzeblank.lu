# Deployment auf Mittwald

Bei jedem Push auf `main` baut GitHub Actions ein Docker-Image (`ghcr.io/<repo>:<commit>`), pusht es und aktualisiert den Container-Stack bei Mittwald (`deploy/stack.yaml`).

## Einmalige Einrichtung

1. In Mittwald einen Container-Stack und eine MySQL-Datenbank anlegen. Die Stack-ID notieren.
2. Das GHCR-Paket nach dem ersten Build auf "public" stellen, oder in Mittwald Registry-Zugangsdaten für `ghcr.io` hinterlegen.
3. In GitHub unter Settings, Secrets and variables, Actions eintragen:

| Typ | Name |
|---|---|
| Secret | `MITTWALD_API_TOKEN`, `BREVO_API_KEY`, `LEAD_PROOF_SECRET`, `ADMIN_PASSWORD`, `DB_PASSWORD` |
| Variable | `MITTWALD_PROJECT_ID`, `MITTWALD_STACK_ID`, `NEXT_PUBLIC_SITE_URL`, `BREVO_FROM_EMAIL`, `BREVO_FROM_NAME`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, optional `EMAIL_LOGO_URL` |

`BREVO_FROM_EMAIL` muss in Brevo als Absender verifiziert sein, sonst werden Mails abgelehnt.

Hinweis: `UpdateStack` überschreibt manuelle Änderungen im mStudio, die nicht in `deploy/stack.yaml` stehen.

## Datenbank

Die Anwendung legt `app_settings` beim ersten Zugriff selbst an (`CREATE TABLE IF NOT EXISTS`). Alternativ manuell: `pnpm db:init`.

## Migration von Vercel Blob

Im Neon-Projekt liegen nur leere Auth-Tabellen, es gibt dort nichts zu migrieren. Die echten Daten liegen in Vercel Blob (Fotos unter `anfragen-fotos/`, Preis-Konfiguration unter `pricing/config.json`).

Das Skript liest nur aus Blob und löscht nichts. Bestehende Dateien und ein bereits vorhandener Preis-Eintrag werden nicht überschrieben.

```bash
# Erst prüfen, was passieren würde
BLOB_READ_WRITE_TOKEN=... UPLOAD_DIR=/pfad/zum/volume DB_HOST=... DB_NAME=... DB_USER=... DB_PASSWORD=... \
  pnpm migrate:blob -- --dry-run

# Dann ausführen
pnpm migrate:blob
```

`UPLOAD_DIR` muss auf das Volume zeigen, das im Container als `/data/uploads` eingehängt ist. Ohne Zugriff auf das Volume die Fotos nach dem Kopieren per Mittwald-SSH dort ablegen.

Bereits versendete E-Mails enthalten Foto-Links der Form `/api/quote-photo?pathname=anfragen-fotos/<datei>`. Diese bleiben gültig, sobald die Dateien im Volume liegen.

## Lokal prüfen

```bash
pnpm build
node .next/standalone/server.js
```
