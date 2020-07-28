const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/lotto', (req, res) => {
    const numbers = req.query.numbers;

    if(!numbers) {
        return res.status(400).send('Please provide a six numbers');
      }
    
      const guesses = numbers
      .map(n => parseInt(n))
      .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));

    const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);

    const randomNumbers = [];
    for(let i = 0; i < 6; i++) {
        const ran = Math.floor(Math.random() * stockNumbers.length);
        randomNumbers.push(stockNumbers[ran]);
        stockNumbers.splice(ran, 1);
    }

    let diff = randomNumbers.filter(n => !guesses.includes(n));

    let responseText;

  switch(diff.length){
    case 0: 
      responseText = 'Wow! Unbelievable! You could have won the mega millions!';
      break;
    case 1:   
      responseText = 'Congratulations! You win $100!';
      break;
    case 2:
      responseText = 'Congratulations, you win a free ticket!';
      break;
    default:
      responseText = 'Sorry, you lose';  
  }

  res.send(responseText);
    })

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
  });