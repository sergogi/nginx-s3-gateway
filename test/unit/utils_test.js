#!env njs

/*
 *  Copyright 2023 F5, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import utils from "include/utils.js";

function testParseArray() {
    printHeader('testParseArray');

    function testParseNull() {
        console.log('  ## testParseNull');
        const actual = utils.parseArray(null);
        if (!Array.isArray(actual) || actual.length > 0) {
            throw 'Null not parsed into an empty array';
        }
    }
    function testParseEmptyString() {
        console.log('  ## testParseEmptyString');
        const actual = utils.parseArray('');
        if (!Array.isArray(actual) || actual.length > 0) {
            throw 'Empty string not parsed into an empty array';
        }
    }
    function testParseSingleValue() {
        console.log('  ## testParseSingleValue');
        const value = 'Single Value';
        const actual = utils.parseArray(value);
        if (!Array.isArray(actual) || actual.length !== 1) {
            throw 'Single value not parsed into an array with a single element';
        }
        if (actual[0] !== value) {
            throw `Unexpected array element: ${actual[0]}`
        }
    }
    function testParseMultipleValues() {
        console.log('  ## testParseMultipleValues');
        const values = ['string 1', 'something else', 'Yet another value'];
        const textValues = values.join(';');
        const actual = utils.parseArray(textValues);
        if (!Array.isArray(actual) || actual.length !== values.length) {
            throw 'Multiple values not parsed into an array with the expected length';
        }
        for (let i = 0; i < values.length; i++) {
            if (values[i] !== actual[i]) {
                throw `Unexpected array element [${i}]: ${actual[i]}`
            }
        }
    }

    function testParseMultipleValuesTrailingDelimiter() {
        console.log('  ## testParseMultipleValuesTrailingDelimiter');
        const values = ['string 1', 'something else', 'Yet another value'];
        const textValues = values.join(';');
        const actual = utils.parseArray(textValues + ';');
        if (!Array.isArray(actual) || actual.length !== values.length) {
            throw 'Multiple values not parsed into an array with the expected length';
        }
        for (let i = 0; i < values.length; i++) {
            if (values[i] !== actual[i]) {
                throw `Unexpected array element [${i}]: ${actual[i]}`
            }
        }
    }

    testParseNull();
    testParseEmptyString();
    testParseSingleValue();
    testParseMultipleValues();
    testParseMultipleValuesTrailingDelimiter();
}

async function test() {
    testParseArray();
}

function printHeader(testName) {
    console.log(`\n## ${testName}`);
}

test();
console.log('Finished unit tests for utils.js');
