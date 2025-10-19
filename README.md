
# Green Drive

Repository monorepo per il progetto "Green Drive": 

- client mobile (Flutter)
- pannello gestionale web (Angular) 
- backend + script di deploy e infrastruttura per l'hosting su un singolo VPS.

Questo README spiega la struttura del repository, il flusso di CI/CD con GitHub Actions, la strategia di deploy via SSH su VPS (Docker-based), la gestione del database e i segreti necessari.

## Scopo

Lo scopo è fornire un repository organizzato per sviluppare, testare e distribuire:
- client Flutter che raccoglie dati sulle vetture per gli utenti;
- pannello gestionale Angular per l'ufficio comunale;
- API che espone i servizi e coordina il DB;
- deploy su un singolo VPS che ospita DB (PostgreSQL) e l'app gestionale (via nginx).

## Struttura

- `services/`
	- `client/` — app Flutter (client)
	- `web_admin/` — gestionale Angular
	- `api/` — backend (Node/Express)
- `db/` - script database e schema
- `infrastructure/`
	- `docker-compose.yml` — compose per prod sul VPS
	- `nginx/` — configurazioni nginx per servire static e proxy
- `deploy/`
	- `ssh-deploy.sh` — script di deploy via SSH
- `proto/` — file .proto per API gRPC
- `.github/workflows/` — CI/CD workflows (build, test, deploy)
- `docs/` — documentazione progetto

## Flusso

1. Build & test (GitHub Actions)
	 - Angular: `npm ci`, `ng build --configuration=production`, upload artifact `dist/`.
	 - Backend: build Docker image e push su registry.
	 - Flutter: build artefatti per beta.

2. Deploy (GitHub Actions -> VPS via SSH)
	 - Job di deploy scarica artifact e si connette al VPS usando `SSH_PRIVATE_KEY`.
	 - Trasferisce l'artifact (rsync/scp) in `/srv/colombo/releases/<timestamp>`.
	 - Sul server: aggiorna symlink `current` -> nuova release esegue `docker-compose pull && docker-compose up -d`.
	 - Esegue migrations (da container o script) prima del cutover quando necessario.
	 - Health-check post-deploy; rollback automatico o manuale se fallisce.

## Segreti e configurazioni (GitHub Secrets)

- `SSH_PRIVATE_KEY` — chiave privata per l'utente di deploy sul VPS.
- `SSH_USER` — utente SSH (es. `deploy` o `ubuntu`).
- `SSH_HOST` — IP o hostname del VPS.
- `SSH_PORT` — (opzionale) porta SSH.
- `DEPLOY_PATH` — es. `/srv/colombo`.

Non mettere `.env` nel repo. Usa variabili d'ambiente sul server o secret manager.
