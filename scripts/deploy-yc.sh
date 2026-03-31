#!/usr/bin/env bash

set -euo pipefail

DIST_DIR="${DIST_DIR:-dist}"
BUCKET_NAME="${YC_BUCKET_NAME:-realcapoeira-ru}"
ENDPOINT_URL="${YC_STORAGE_ENDPOINT:-https://storage.yandexcloud.net}"
REGION="${YC_REGION:-ru-central1}"
ASSET_CACHE_CONTROL="${YC_ASSET_CACHE_CONTROL:-public, max-age=604800}"
HTML_CACHE_CONTROL="${YC_HTML_CACHE_CONTROL:-no-cache, no-store, must-revalidate}"

if ! command -v aws >/dev/null 2>&1; then
  echo "aws CLI is required for deployment." >&2
  exit 1
fi

if [[ ! -d "${DIST_DIR}" ]]; then
  echo "Build output directory '${DIST_DIR}' does not exist." >&2
  exit 1
fi

COMMON_ARGS=(
  --endpoint-url "${ENDPOINT_URL}"
  --region "${REGION}"
  --only-show-errors
)

# Upload non-HTML assets with a cache policy suitable for CDN/browser reuse.
aws s3 sync "${DIST_DIR}/" "s3://${BUCKET_NAME}/" \
  --delete \
  --exclude "*.html" \
  --exclude "robots.txt" \
  --exclude "*.xml" \
  --cache-control "${ASSET_CACHE_CONTROL}" \
  "${COMMON_ARGS[@]}"

# Upload HTML and sitemap-like files separately so new releases are picked up faster.
aws s3 sync "${DIST_DIR}/" "s3://${BUCKET_NAME}/" \
  --delete \
  --exclude "*" \
  --include "*.html" \
  --include "robots.txt" \
  --include "*.xml" \
  --cache-control "${HTML_CACHE_CONTROL}" \
  "${COMMON_ARGS[@]}"
