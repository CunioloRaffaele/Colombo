#!/bin/bash
# ssh setupper for env variables script
# You can run it manually or inside a github action.

set -euo pipefail # Exit on error, undefined variable, or pipe failure

# Parameters
ENV_NAME="${1:-$ENV_NAME}"        # First argument or env variable
ENV_VALUE="${2:-$ENV_VALUE}"      # Second argument or env variable
SSH_HOST="${3:-$SSH_HOST}"        # Third argument or env variable
SSH_USER="${4:-$SSH_USER}"        # Fourth argument or env variable

echo "Setting environment variable $ENV_NAME on $SSH_HOST"
# Set environment variable on the remote server
ssh $SSH_USER@$SSH_HOST "
    echo 'Setting environment variable...' && \
    echo '$ENV_NAME=$ENV_VALUE' >> ~/.bashrc && \
    source ~/.bashrc && \
    echo 'Environment variable set successfully.'
"