const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send('Hello Upgrade Hub!');
});

module.exports = router;