// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/doc-template')

// TODO: Create an array of questions for user input
const promptQuestions = questions => {
    console.log(`
    ================================
    Welcome to the README Generator!
    ================================
    `);
    console.log(`
    Items marked with an Asterisk are required!
    `)
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?*',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('Please enter your project title!')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'desc',
            message: 'Please provide a detailed description of your project.*',
            validate: descInput => {
                if (descInput) {
                    return true;
                } else {
                    console.log('You need a description!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'link',
            message: 'Please provide a link to your deployed website if applicable.'
        },
        {
            type: 'checkbox',
            name: 'lang',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'confirm',
            name: 'confirmInstall',
            message: 'Add installation instructions?',
            default: true
        },
        {
            type: 'input',
            name: 'install',
            message: 'Write out your Installation instructions here.',
            when: ({confirmInstall}) => {
                if (confirmInstall) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmUse',
            message: 'Add usage instructions?',
            default: true
        },
        {
            type: 'input',
            name: 'use',
            message: 'Write out your Usage instructions here.',
            when: ({ confirmUse }) => {
                if (confirmUse) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmCredits',
            message: 'Do you have collaborators to list or assets to attribute?',
            default: true
        },
        {
            type: 'input',
            name: 'credits',
            message: 'Provide the links to your collaborators github profile!',
            when: ({ confirmCredits }) => {
                if (confirmCredits) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'name',
            message: 'Please provide your full name.',
        },
        {
            type: 'confirm',
            name: 'confirmLicense',
            message: 'Add a license so others can use your work?',
            default: true
        }
    ]);
};

// TODO: Create a function to write README file
// function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
// function init() {}

// Function call to initialize app
promptQuestions()
    .then(answers => {
        const pageMarkdown = generatePage(answers);

        fs.writeFile('./dist/readme.md', pageMarkdown, err => {
            if (err) throw new Error(err);

            console.log('Readme created! Checkout the dist file for your file!')
        })
    })
    