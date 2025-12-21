#!/usr/bin/env bash
set -euo pipefail

# Script per generare i proto in output per i servizi.
# Usa `buf` se presente, altrimenti prova `protoc` (richiede i plugin installati).


# Imposta sempre la root del progetto rispetto allo script
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PROTO_DIR="$ROOT_DIR/proto"

echo "Generating protos from $PROTO_DIR"

if command -v buf >/dev/null 2>&1; then
  echo "Using buf to generate"
  (cd "$PROTO_DIR" && buf generate)
else
  echo "buf not found, attempting protoc fallback"
  protoc -I "$PROTO_DIR" \
    --dart_out=grpc:$ROOT_DIR/services/client/lib/src/generated \
    --js_out=import_style=commonjs:$ROOT_DIR/services/web_admin/src/app/proto \
    --grpc-web_out=import_style=typescript,mode=grpcwebtext:$ROOT_DIR/services/web_admin/src/app/proto \
    "$PROTO_DIR/api/v1/*.proto"

  echo "Compiling protos for Node.js backend (pbjs/pbts)"
  npx pbjs -t static-module -w commonjs -o "$ROOT_DIR/services/api/proto/compiled/drive_data.js" "$PROTO_DIR/api/v1/drive_data.proto"
  npx pbts -o "$ROOT_DIR/services/api/proto/compiled/drive_data.d.ts" "$ROOT_DIR/services/api/proto/compiled/drive_data.js"
fi

echo "Proto generation completed"

echo "Proto generation completed"
