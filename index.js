const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const { dsaQuestions } = require('./data'); // Import the data module

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to DSA Questions API.');
});

app.get('/questions/:company', (req, res) => {
  const { company } = req.params;
  if (company in dsaQuestions) {
    const questionsWithLinks = dsaQuestions[company].map(questionData => {
      return `<a href="${questionData.link}">${questionData.question}</a>`;
    });
    res.send(questionsWithLinks.join('<br>'));
  } else {
    res.status(404).json({ error: 'Company not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
