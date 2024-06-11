name=$(node ./create-minima-app/getName.js)
version=$(node ./create-minima-app/getVersion.js)

cd dist && zip -r ${name}-${version}.mds.zip . && mv ${name}-${version}.mds.zip ../
