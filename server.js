const express = require('express');

const app = express();
const fs = require('fs');
const path = require('path');


app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });