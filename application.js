
const { createPage, addComponent } = require('./createPageService')


const readline = require('readline');

console.log("Hello, user");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const r2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var optionChoosen;
rl.question('Please choose option: (CREATE/UPDATE): ', (option) => {
    optionChoosen = `${option}`;
    console.log(`Option choosen, ${option}!`);
    if (optionChoosen === 'CREATE') {
        console.log("Create option selected");
        createPage();
    } else {
        r2.question('Please input the component:', (input) => {
            const component = `${input}`;
            addComponent(component);
            r2.close();
        })
    }
    rl.close();
});

// if (optionChoosen === 'CREATE') {
//     con
//     createPage();
// }
