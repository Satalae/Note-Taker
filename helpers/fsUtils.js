//
const fs = require('fs');
const util = require('util');

//
const readFromFile = util.promisify(fs.readFile);

/**
 * W
 * @param {string} destination
 * @param {object} content
 * @returns {void}
 * 
 */

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info('File Written Successfully!\n')  
    );

 /**
 * @param {object} content
 * @param {string} file
 * @returns {void}
 */

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        } else{
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

/**
 * @param {object} content 
 * @param {string} file
 * @returns {void} 
 */

const readAndDelete = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        } else{
            //Takes and parses the json list into a usable const
            const parsedData = JSON.parse(data);
            console.log(parsedData);

            //Filters out the note
            const filteredData = parsedData.filter((note) => 
            note.id != content);
            //Returns that new list
            writeToFile(file, filteredData);
        }
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };