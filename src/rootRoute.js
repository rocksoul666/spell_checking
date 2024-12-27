const http = require('node:http')

function rootRoute(
    req,
    res
) {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    res.end(`
        <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
          <h1>Type your name</h1>
          <input type="text" id="nameInput" value="Anonymous">
          <h1>Type a word to spell-check</h1>
          <input type="text" id="userInput" placeholder="Enter a word to spell-check.">
          <button onclick="sendInput()">Submit</button>
          <br/>
          <div id="output"></div>
      
          <script>
              function sendInput() {
                  const word = document.getElementById('userInput').value;
                  const name = document.getElementById('nameInput').value;
                  const outputDiv = document.getElementById('output');
      
                  fetch('/data', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ word, name })
                  })
                  .then(response => response.text())
                  .then(data => {
                      outputDiv.innerText = data;
                  })
                  .catch(error => {
                      console.error('Error:', error);
                      outputDiv.innerText = 'Error contacting server';
                  });
              }
          </script>
      
      </body>
      </html>
      `)
}

module.exports = {
    rootRoute
};
