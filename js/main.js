// Вспомогательные функции

// Функция, возвращающая случайное целое число из переданного диапазона включительно.

function getRandomInteger(from, to) {
  if (from < to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
  return 'Error: Invalid range';
}

getRandomInteger(1, 10);

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

function getRandomFloat(from, to, decimals) {
  if (from < to) {
    return Number((Math.random() * (to - from) + from).toFixed(decimals));
  }
  return 'Error: Invalid params';
}

getRandomFloat(1.432, 10.21, 3);
