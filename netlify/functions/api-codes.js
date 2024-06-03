const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const response = await fetch('https://thecompiler.netlify.app/api/codes');
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*', // Tüm domain'lere izin ver
      'Content-Type': 'application/json',
    },
  };
};
