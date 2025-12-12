
# Green Drive

<div align="center">
	<img src="Icon.png" alt="Green Drive Icon" width="128" height="128" />
</div>

L’applicazione proposta mira a promuovere una guida sostenibile attraverso la raccolta e l’analisi dei dati estratti in tempo reale dall’unità di controllo delle autovetture tramite interfaccia OBD-II (standard per la diagnostica dei veicoli,) con il microcontroller ELM327, collegato a smartphone con Bluetooth o WiFi.

## Team di Sviluppo

| Collaboratore | Attività di pertinenza | Mansioni dettagliate |
| :--- | :--- | :--- |
| **Alberto Barison** | Backend | - Responsabile dello sviluppo backend <br>- Attività documentale <br>- Definizione e implementazione algoritmo di eco score |
| **Riccardo Brollo** | Backend | - Sviluppo backend <br>- Attività documentale |
| **Gabriele Bute** | Frontend Admin | - Responsabile dello sviluppo dashboard amministrativa <br>- Attività documentale |
| **Raffaele Cuniolo** | Team Leader <br>DevOps <br>Frontend Android | - Team Leader <br>- Responsabile dello sviluppo client android <br>- Responsabile server di deployment e automazione CI/CD <br>- Code review per backend e web admin dashboard |
| **Alessandro Derevytskyy** | Database <br>Documentazione | - Responsabile della definizione della base di dati <br>- Responsabile della attività documentale|

# Colombo Monorepo

Repository monorepo per il progetto "Green Drive" codenamed Colombo: 

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
- `docs/` — documentazione progetto e politiche privacy e termini di servizio

## Flusso
- Deploy Web Admin e Api (GitHub Actions -> VPS via SSH)
	- Smoke test pre-deploy; ferma attività di deploy se fallisce.
	 - Job di deploy scarica artifact e si connette al VPS usando `SSH_PRIVATE_KEY`.
	 - Trasferisce l'artifact (rsync/scp) in `/srv/colombo/releases/<timestamp>`.
	 - Sul server: aggiorna symlink `current` -> nuova release esegue `docker-compose pull && docker-compose up -d`.
	 - Esegue migrations (da container o script) prima del cutover quando necessario.

- Deploy Client Mobile
	- Build su GitHub Actions quando viene creato un tag di rilascio.

## Segreti e configurazioni (GitHub Secrets)

- `SSH_PRIVATE_KEY` — chiave privata per l'utente di deploy sul VPS.
- `SSH_USER` — utente SSH (es. `deploy` o `ubuntu`).
- `SSH_HOST` — IP o hostname del VPS.
- `SSH_PORT` — (opzionale) porta SSH.
- `DEPLOY_PATH` — es. `/home/ubuntu/srv/colombo`.
- `POSTGRES_USER` — utente PostgreSQL.
- `POSTGRES_PASSWORD` — password PostgreSQL.
- `POSTGRES_DB_NAME` — nome del database PostgreSQL.
- `POSTGRES_PORT` — porta di connessione al DB per il backend.
- `PRISMA_DATABASE_URL` — stringa di connessione al DB per Prisma.
- `API_PORT` — porta di connessione per l'API.
- `API_JWT_SECRET` — segreto per firmare i JWT.
- `API_JWT_EXPIRATION` — durata validità token JWT.
- `DUCKDNS_TOKEN` — Usato per ssl con certbot. (Deprecato... migrato da challange DNS a webroot su nginx)

Non mettere `.env` nel repo. Usa variabili d'ambiente sul server o secret manager.
