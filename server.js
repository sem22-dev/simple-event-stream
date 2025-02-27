
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())

app.get('/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream'); // Sending headers
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // Sending headers immediately

    // hard coded datas
    const data = ["hello", "this", "is", "my", "first", "event", "event", "in", "nodejs"]
    let index = 0;

  const interval = setInterval(() => {
        if(index < data.length){
            res.write(`data: ${data[index]}\n\n`);
            index++;
        } else {
            res.write(`data: [DONE]\n\n`);
            clearInterval(interval);

            // concludes the response process 
            res.end();
        }
  }, 1000);

// closes the interval loop once the client closes the connection ( eg: browser/tab)
  req.on('close', () => {
    clearInterval(interval);
  })

});

app.listen(8080, () => {
    console.log("port is running 8080")
})