#!/bin/bash

#使い方
# bash このスクリプト.sh 言語 実行ファイルパス テストケースパス

language=$1
file=$2
testcase=$3
fail=0
timeout=3
limmem=128

# c
if [ $language = "c" ]; then
    filename=$(echo $file | sed -e 's/\.c//g')
    gcc ${filename}.c -o ${filename}.out -march=native
    if [ $? = 1 ]; then
    	fail=1
    else
        result=$(oj t -c ${filename} -d $testcase -t $timeout --mle $limmem -S)
        if [ $? = 1 ]; then
            fail=1
        fi
    fi
fi

# cpp
if [ $language = "cpp" ]; then
    filename=$(echo $file | sed -e 's/\.cpp//g')
    g++ ${filename}.cpp -o ${filename}.out -std=c++17 -march=native -O2 
    if [ $? = 1 ]; then
    	fail=1
    else
        result=$(oj t -c ${filename} -d $testcase -t $timeout --mle $limmem -S)
        if [ $? = 1 ]; then
            fail=1
        fi
    fi
fi

# Python
if [ $language = "python" ]; then
	result=$(oj t -c "python3 $file" -d $testcase -t $timeout --mle $limmem -S)
    if [ $? = 1 ]; then
    	fail=1
    fi
fi

# PHP
if [ $language = "php" ]; then
	result=$(oj t -c "php $file" -d $testcase -t $timeout --mle $limmem -S)
    if [ $? = 1 ]; then
    	fail=1
    fi
fi

# JavaScript
if [ $language = "js" ]; then
	result=$(oj t -c "node $file" -d $testcase -t $timeout --mle $limmem -S)
    if [ $? = 1 ]; then
    	fail=1
    fi
fi



# Ruby
if [ $language = "ruby" ]; then
	result=$(oj t -c "ruby $file" -d $testcase -t $timeout --mle $limmem -S)
    if [ $? = 1 ]; then
    	fail=1
    fi
fi

# bash
if [ $language = "sh" ]; then
	result=$(oj t -c "bash $file" -d $testcase -t $timeout --mle $limmem -S)
    if [ $? = 1 ]; then
    	fail=1
    fi
fi


if [ $fail = 0 ]; then
    return=$(echo -e "$result" | grep -e "\[INFO\] time:" -e "\[INFO\] max memory:" | sed -e 's/^\[.*: //g' | sed -e 's/ sec//g' | sed -e 's/ MB.*//g')
	echo -e "$return"
fi

if [ $fail = 1 ]; then
    echo -n 1
fi