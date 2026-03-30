#!/usr/bin/env bash
set -e

ENV="dev"
ROOT_DIR=$(pwd)

echo ""
echo "=============================================="
echo "🔐 Sincronizando secrets com Infisical (env: $ENV)"
echo "=============================================="

# ======================================
# LISTA DE PROJETOS
# FORMATO: caminho|projectId
# ======================================

PROJECTS="
api|af91243f-019c-4392-a435-c696ab27a69f
"

# ======================================
# FUNÇÃO PARA DEFINIR O ARQUIVO ENV
# ======================================

get_env_file() {
  case "$1" in
    api*) echo '.dev.vars' ;;
    *) echo ".env" ;;
  esac
}

# ======================================
# LOOP PRINCIPAL
# ======================================

echo "$PROJECTS" | while IFS="|" read -r PROJECT_PATH PROJECT_ID; do
  # Ignora linhas vazias
  [ -z "$PROJECT_PATH" ] && continue

  ENV_FILE=$(get_env_file "$PROJECT_PATH")
  FULL_PATH="$ROOT_DIR/$PROJECT_PATH"

  if [ ! -d "$FULL_PATH" ]; then
    echo "⚠️  Pasta não encontrada: $PROJECT_PATH (pulando)"
    continue
  fi

  echo "➡️  $PROJECT_PATH → $ENV_FILE"

  infisical export \
    --domain "https://infisical-production-ac1b.up.railway.app" \
    --projectId "$PROJECT_ID" \
    --env "$ENV" \
    --output-file "$FULL_PATH/$ENV_FILE"

done

echo "=============================================="
echo "✅ Secrets sincronizados com sucesso"
echo "=============================================="