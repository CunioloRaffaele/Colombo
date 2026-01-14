# Guida alla Configurazione dell'Infrastruttura di Colombo

Questo documento fornisce le istruzioni tecniche per configurare lo stack Colombo su un server Linux. Copre sia le strategie di distribuzione containerizzata (Podman/Docker) che manuale.

Se si desidera compilare e distribuire l'applicazione client Flutter, fare riferimento al file `services/client/README.md`.

**Sistema di Destinazione:** Linux (Debian/Ubuntu raccomandato)
**Prerequisiti:** `git`, `podman` (o `docker`), `podman-compose` (o `docker compose`), `node` (v22+), `npm`, `nginx` (per l'installazione non containerizzata), `protoc` (Protocol Buffers compiler).

---

## 1. Configurazione dell'Ambiente

Indipendentemente dal metodo di distribuzione, è necessario definire le variabili d'ambiente e generare i file Protocol Buffers.

### 1.1 Variabili d'Ambiente
Creare un file `.env` nella directory `infrastructure/` (per i container) o esportare queste variabili nella propria shell.

#### Variabili Richieste
```bash
# Configurazione Database
POSTGRES_USER=colombo_user
POSTGRES_PASSWORD=secure_password_here
POSTGRES_DB_NAME=colombo_db

# Configurazione API
# Nota: L'hostname 'db' funziona per i container. Per il manuale, usare 'localhost'.
PRISMA_DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB_NAME}?schema=public"
API_JWT_SECRET=super_secret_jwt_key
API_JWT_EXPIRATION=1d
API_PORT=3000
```

---

## 2. Distribuzione Containerizzata (Podman/Docker)

Questo è l'approccio raccomandato per la parità con la produzione. Lo stack consiste di:
- **PostgreSQL (+PostGIS):** Persistenza del database.
- **Node.js API:** Servizio di backend.
- **Nginx:** Reverse proxy e server per file statici.
- **Certbot:** Gestore dei certificati SSL (Solo Produzione).

### Passo 2.1: Build degli Artefatti Frontend
Il container Nginx si aspetta artefatti Angular pre-compilati. È necessario compilarli sull'host o in una pipeline CI per prima cosa.

1. Spostarsi nel servizio web admin:
    ```bash
    cd services/web_admin
    npm ci
    ```
2. Compilare l'applicazione:
    ```bash
    npm run build
    # Assicurarsi che la directory di output corrisponda al volume in compose.yaml
    # Mount previsto: ../web_admin/web_admin/browser (Verificare che questo percorso corrisponda all'output dist)
    ```

### Passo 2.2: Build degli Artefatti Frontend
Il backend (e l'applicazione client) richiede i file generati dai `.proto` per funzionare.

1. Installare il compilatore `protoc` e il plugin JS:
   ```bash
   sudo apt install -y protobuf-compiler
   npm install -g protoc-gen-js
   ```
2. Generare i file (dalla root del progetto):
   ```bash
   mkdir -p services/api/proto
   protoc -I=proto --js_out=import_style=commonjs,binary:services/api/proto proto/api/v1/*.proto proto/common/*.proto
   ```

### Passo 2.3: Generazione del Certificato SSL (Solo Produzione)
**SALTA QUESTO PASSAGGIO SE IN AMBIENTE DI TEST/DEV.**

1. Fermare qualsiasi server web in esecuzione sulla porta 80.
2. Eseguire il file compose di certbot per generare i certificati iniziali:
    ```bash
    cd infrastructure
    podman-compose -f compose.certbot.yaml up
    ```
    *Nota: Assicurarsi che `compose.certbot.yaml` definisca il dominio e l'email corretti.*

### Passo 2.4: Avviare lo Stack
1. Spostarsi in `infrastructure`.
2. Avviare i servizi:
    ```bash
    # Usiamo '-p colombo' per corrispondere al nome del progetto usato in ssh-deploy.sh
    podman-compose -p colombo -f compose.yaml up -d
    ```

### ⚠️ Ambiente di Testing/Sviluppo
**CRITICO:** In un ambiente di test dove l'SSL non è richiesto o Certbot non può validare il dominio (es. localhost), è necessario modificare la configurazione:

1. **Disabilitare Certbot:** Rimuovere il servizio `certbot` da `compose.yaml`.
2. **Modificare Nginx:** 
    - Modificare `infrastructure/nginx.conf`.
    - Rimuovere il blocco `server { listen 443 ssl ... }`.
    - Cambiare il blocco `server { listen 80 ... }` per servire l'applicazione direttamente invece di reindirizzare a HTTPS.
    - Rimuovere i mount dei volumi per i certificati SSL in `compose.yaml`.

---
