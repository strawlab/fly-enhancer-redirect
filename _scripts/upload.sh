#!/bin/bash -x
set -o errexit

THISDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${THISDIR}/../_site

BUCKET="redirect.strawlab.org"

# REMOVE ALL KEYS FROM THE BUCKET
aws s3 rm s3://${BUCKET} --recursive

# /
aws s3api put-object --bucket ${BUCKET} --key index.html --body index.html --content-type text/html --acl public-read
aws s3api put-object --bucket ${BUCKET} --key bundle.js --body bundle.js --content-type application/javascript --acl public-read

# /v1/flylight
aws s3api put-object --bucket ${BUCKET} --key v1/flylight --body v1/flylight/index.html --content-type text/html --acl public-read
# /v1/vdrc
aws s3api put-object --bucket ${BUCKET} --key v1/vdrc --body v1/vdrc/index.html --content-type text/html --acl public-read
# /v1/bbweb
aws s3api put-object --bucket ${BUCKET} --key v1/bbweb --body v1/bbweb/index.html --content-type text/html --acl public-read
