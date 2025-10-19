# Protos

Questa cartella contiene i file `.proto` che rappresentano il contratto tra client (Flutter), web (Angular) e backend.

`proto/` nella root del monorepo è il singolo punto di verità.

Contenuto:
- `api/` — proto per le API (versioned, es. `v1/`)
- `common/` — tipi condivisi
- `buf.yaml` / `buf.gen.yaml` — configurazione per `buf` (opzionale)

Workflow raccomandato:
1. Validare i proto: `buf lint` e `buf breaking` (se usi `buf`).
2. Generare i client con `buf generate` o `protoc` (es. Dart, grpc-web, TypeScript).
3. In CI: eseguire generation e copiarla nelle cartelle dei servizi prima del build.

Esempio rapido (local dev):
```
# installa buf (https://docs.buf.build/installation)
buf lint
buf generate
```

Vedi `scripts/generate-proto.sh` per uno script d'esempio.
