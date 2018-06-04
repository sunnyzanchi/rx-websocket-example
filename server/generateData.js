const generateData = arr => {
  // Get a random prop from the array
  const index = Math.floor(Math.random() / (1 / arr.length));
  const name = arr[index];

  return {
    data: Math.random(),
    name
  };
};

module.exports = generateData;
