#!/bin/bash
# ssh deploy script
# You can run it manually or inside a github action.

set -euo pipefail # Exit on error, undefined variable, or pipe failure

# Parameters
TIMESTAMP=$(date +%Y%m%d%H%M%S)
SSH_HOST="${1:-$SSH_HOST}"              # First argument or env variable
SSH_USER="${2:-$SSH_USER}"              # Second argument or env variable
DEPLOY_PATH="${3:-$DEPLOY_PATH}"        # Third argument or env
RELEASE_PATH="$DEPLOY_PATH/releases/$TIMESTAMP"
DEPLOYER="${4:-${DEPLOYER:-unknown}}"   # who triggered the deploy (GITHUB_ACTOR)
COMMIT="${5:-${COMMIT:-unknown}}"       # optional commit sha (GITHUB_SHA)
echo "Deploying to $SSH_HOST:$RELEASE_PATH"

# Detect source (github actions vs manual)
if [ -n "${GITHUB_ACTIONS:-}" ]; then
  SOURCE="github-actions"
else
  SOURCE="manual"
fi

echo "Deploying to $SSH_HOST:$RELEASE_PATH (by: $DEPLOYER, commit: $COMMIT, source: $SOURCE)"

# Create release directory
ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST "mkdir -p $RELEASE_PATH"

# Transfer files
echo "Transferring files..."
scp -r ./dist/* $SSH_USER@$SSH_HOST:$RELEASE_PATH/

# Write metadata on the remote release
ssh $SSH_USER@$SSH_HOST "cat > $RELEASE_PATH/deploy-metadata.json <<'JSON'
{
  \"deployer\": \"$DEPLOYER\",
  \"timestamp\": \"$TIMESTAMP\",
  \"commit\": \"$COMMIT\",
  \"source\": \"$SOURCE\",
  \"host\": \"$(hostname)\"
}
JSON
"

# Run setup commands on the server
ssh $SSH_USER@$SSH_HOST "
  cd $DEPLOY_PATH && \
  echo 'Updating symlink...' && \
  ln -sfn $RELEASE_PATH $DEPLOY_PATH/current && \
  echo 'Copying .env file...' && \
  cp .env current/infrastructure/.env && \
  echo 'Restarting services...' && \
  cd current/infrastructure && \
  podman-compose -p colombo down && \
  podman-compose -p colombo pull && \
  podman-compose -p colombo up -d
"


echo "Deploy completed successfully!"