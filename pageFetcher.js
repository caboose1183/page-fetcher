const request = require('request');
const fs = require('fs');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



request('https://example.edu/', (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.

  let answer = ''

  if (error) {
    console.log('The URL is invalid')
    process.exit()
  }

  fs.access('./content/content.text', fs.F_OK, (err) => {
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



