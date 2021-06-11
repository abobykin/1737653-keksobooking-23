function getRandomInteger(from, to) {
  if (from < to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  } else {
    return Math.floor(Math.random() * (from - to + 1)) + to;
  }
}

function getRandomFloat(from, to, decimals) {
  if (from < to) {
    return Number((Math.random() * (to - from) + from).toFixed(decimals));
  } else {
    return Number((Math.random() * (from - to) + to).toFixed(decimals));
  }
}

export { getRandomInteger, getRandomFloat };
