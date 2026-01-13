# Protos

Questa cartella contiene i file `.proto` che rappresentano il contratto tra client (Flutter) e backend.

`proto/` nella root del monorepo è il singolo punto di verità.

Contenuto:
- `api/` — proto per le API (versioned, es. `v1/`)
- `common/` — tipi condivisi

## Generazione del codice JavaScript:
- Precondizione: 
    - Installa `protoc`
    - Installa il plugin js per protoc (`npm install -g protoc-gen-js`)
```
protoc -I=proto --js_out=import_style=commonjs,binary:services/api/proto proto/api/v1/*.proto proto/common/*.proto
```

## Generazione del codice Dart:
- Precondizione:
    - Installa `protoc`
    - Installa il plugin Dart per protoc (`pub global activate protoc_plugin`)
```
protoc -I=proto --dart_out=grpc:services/client/lib/data/proto proto/api/v1/*.proto proto/common/*.proto
```
### Nota
Assicurati che il percorso del plugin Dart sia incluso nella variabile d'ambiente PATH. Puoi aggiungerlo con:
```
export PATH="$PATH":"$HOME/.pub-cache/bin"
```

