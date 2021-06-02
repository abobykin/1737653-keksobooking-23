// Вспомогательные функции

// Функция, возвращающая случайное целое число из переданного диапазона включительно.

function getRandomInteger(from, to) {
  if (from < to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }  else {
    return Math.floor(Math.random() * (from - to + 1)) + to;
  }
}

getRandomInteger(1, 10);

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

function getRandomFloat(from, to, decimals) {
  if (from < to) {
    return Number((Math.random() * (to - from) + from).toFixed(decimals));
  } else {
    return Number((Math.random() * (from - to) + to).toFixed(decimals));
  }
}

getRandomFloat(1.432, 10.21, 3);
