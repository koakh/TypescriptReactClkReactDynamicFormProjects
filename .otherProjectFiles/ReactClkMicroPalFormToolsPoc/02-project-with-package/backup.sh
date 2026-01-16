#!/bin/bash

DT=$(date +%Y-%m-%d-%H-%M)
DIR=.bak
FILE="$DIR/$DT.tgz"
FILE_EXCLUDE=exclude.tag
mkdir $DIR -p

touch .bak/${FILE_EXCLUDE}
touch clk-react-dynamic-forms/dist/${FILE_EXCLUDE}
touch clk-react-dynamic-forms/node_modules/${FILE_EXCLUDE}
touch clk-react-dynamic-forms-consumer-app/node_modules/${FILE_EXCLUDE}

tar -zcvf $FILE \
	--exclude-tag-all=${FILE_EXCLUDE} \
	--exclude='FILE|DIR' \
	.
