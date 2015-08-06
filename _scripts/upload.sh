#!/bin/bash -x
set -o errexit

THISDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${THISDIR}/../_site

# upload main site
GRANTS="read=uri=http://acs.amazonaws.com/groups/global/AllUsers"

aws s3 sync . s3://redirect.strawlab.org/ --delete --region eu-central-1 --grants ${GRANTS}
