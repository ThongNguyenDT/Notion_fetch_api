const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('build'));
app.get('/', (req, res) => {
  res.send("hello")
});

// Your API route
app.get('/api/:id', async (req, res) => {
  try {    
    const NodeFetch = (await import('node-fetch')).default;
    const id = req.params['id']
    console.log(id);
    const response =
      await NodeFetch(
        `https://notion-api.splitbee.io/v1/page/${id ? id : '97025400bdcd412eb087dd130af3302d'}`, 
      {
        method: 'GET',
        headers: {
          'Host': 'notion-api.splitbee.io'
        }
      });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from Notion API' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
