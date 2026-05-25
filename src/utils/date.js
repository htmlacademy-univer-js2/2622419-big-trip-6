import dayjs from 'dayjs';

// Преобразуем дату для карточки (MAR 18)
const humanizePointDate = (date) => dayjs(date).format('MMM DD');

// Преобразуем время для карточки (10:30)
const humanizePointTime = (date) => dayjs(date).format('HH:mm');

// Преобразуем дату для формы редактирования (18/03/19 10:30)
const humanizeFormDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

// Высчитываем продолжительность (разницу между датами)
const getPointDuration = (dateFrom, dateTo) => {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  const days = Math.floor(timeDiff / 1440);
  const hours = Math.floor((timeDiff % 1440) / 60);
  const minutes = timeDiff % 60;

  // Форматируем вывод в зависимости от длительности
  if (days > 0) {
    return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  }
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  }
  return `${minutes.toString().padStart(2, '0')}M`;
};

export {humanizePointDate, humanizePointTime, humanizeFormDate, getPointDuration};
