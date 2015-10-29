#!/bin/bash -x

# This is the script we use to upload the files using rsync. Modify to submit
# your needs.

set -o errexit

THISDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${THISDIR}/..
rsync -avzP --delete _site/fly-enhancer-redirect/ medaka:/var/www/strawlab.org/html/fly-enhancer-redirect/
