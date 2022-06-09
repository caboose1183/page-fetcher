const args = process.argv.slice (2)

//node requestExample.js https://example.edu ./content.txt


console.log (args)

const request = require('request');
const fs = require('fs');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//node requestExample.js https://example.edu ./content.txt

//https://example.edu/
//path is './content.txt'

request(args[0], (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.

  let answer = ''

  if (error) {
    console.log('The URL is invalid')
    process.exit()
  }

  fs.access(args[1], fs.F_OK, (err) => {
    if (err) {
      console.error(err)
      process.exit()
    }

    //file exists


    if (fs.existsSync('./content.txt')) {
      rl.question('File already exists! Would you like to overwrite? (y/n)', (answer) => {

        if (answer === 'y') {
          console.log('Overwriting...')
          fs.writeFile('./content.txt', body, err => {
            if (err) {
              console.error(err);
            }

            // file written successfulluy
          });

        } else if (answer === 'n') {
          console.log('Not overwriting content')
        }

        rl.close();
      })
    }
  })
});



