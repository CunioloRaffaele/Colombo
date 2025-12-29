#!/usr/bin/env bash
set -euo pipefail

# Script per generare i proto in output per i servizi.
# Usa `buf` se presente, altrimenti prova `protoc` (richiede i plugin installati).

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PROTO_DIR="$ROOT_DIR/proto"

echo "Generating protos from $PROTO_DIR"

if command -v buf >/dev/null 2>&1; then
  echo "Using buf to generate"
  (cd "$PROTO_DIR" && buf generate)
else
  echo "buf not found, attempting protoc fallback"
  # Example: protoc for Dart and grpc-web, adapt paths/plugins as needed
  protoc -I "$PROTO_DIR" \
    --dart_out=grpc:$ROOT_DIR/services/client/lib/src/generated \
    --js_out=import_style=commonjs:$ROOT_DIR/services/web_admin/src/app/proto \
    --grpc-web_out=import_style=typescript,mode=grpcwebtext:$ROOT_DIR/services/web_admin/src/app/proto \
    --js_out=import_style=commonjs:$ROOT_DIR/services/api/proto/compiled/api/v1 \
    $PROTO_DIR/api/v1/*.proto
fi

echo "Proto generation completed"
