#!/bin/bash

DT=$(date +%Y-%m-%d-%H-%M)
DIR=.bak
FILE="$DIR/$DT.tgz"
FILE_EXCLUDE=exclude.tag
mkdir $DIR -p

touch .bak/${FILE_EXCLUDE}/node_modules/${FILE_EXCLUDE}
touch NewRollUpBase/my-app/node_modules/${FILE_EXCLUDE}
touch NewRollUpBase/my-react-form-package/node_modules/${FILE_EXCLUDE}
touch NewRollUpClkReactDynamicForm/clk-react-dynamic-form/node_modules/${FILE_EXCLUDE}
touch NewRollUpClkReactDynamicForm/clk-react-dynamic-form-consumer-app/node_modules/${FILE_EXCLUDE}
touch ReactClkMicroPalFormToolsPoc/01-project-without-package/node_modules/${FILE_EXCLUDE}
touch ReactClkMicroPalFormToolsPoc/02-project-with-package/node_modules/${FILE_EXCLUDE}
touch ReactPublishReactComponentAsPackageToNpmPoc/dummy-counter/node_modules/${FILE_EXCLUDE}
touch ReactPublishReactComponentAsPackageToNpmPoc/javascript/node_modules/${FILE_EXCLUDE}
touch ReactPublishReactComponentAsPackageToNpmPoc/typescript/node_modules/${FILE_EXCLUDE}

tar -zcvf $FILE \
	--exclude-tag-all=${FILE_EXCLUDE} \
	--exclude='FILE|DIR' \
	.
