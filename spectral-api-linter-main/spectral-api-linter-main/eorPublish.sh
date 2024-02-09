#!/usr/bin/bash

#COMMIT=$(git log --name-only --pretty=format:"%H" --full-index -n 1 )
COMMIT=$(git log --name-only --pretty=format:"%H") && git diff-tree --no-commit-id --name-only -r $COMMIT | sort | uniq

echo "Commit object :" $COMMIT

curl -X POST \
     -H "Content-Type: application/json" \
     -d $COMMIT \
     https://endpointtest20230412121510.azurewebsites.net/api/Github/Receive

  FILES=($COMMIT)
  
  echo "Files :" ${FILES[@]}
  
  len=${#FILES[@]}

  for (( i=0; i<${len}; i++)); do
    DIR=$(dirname "${FILES[$i]}")
    #echo "Processing the file ${FILES[$i]} from the directory ${DIR}"
    
    if [[ ${DIR} == 'api/'* ]]; then
      EXTENSION=$(echo ${FILES[$i]#*.})
      if [ ${EXTENSION} == "yaml" ]; then
        FILE=$(basename ${FILES[$i]} | cut -f 1 -d '.')
        echo "commited file:=> ${DIR}/${FILE}.yaml"
        
        # ${SCRIPT_PATH}/generateFile.sh ${DIR}/${FILE}.yaml ${OpenAPI_TEMPLATE} "generated/${DIR}/${FILE}.html"
      fi
    fi
  done
