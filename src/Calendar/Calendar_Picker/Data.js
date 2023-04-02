import {useCallback} from 'react';

const Week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const Month = [
  'January',
  'Feburary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const calculateDate = (
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
) => {
  let dateInMonth = [];
  const minDay = new Date(year, month, 1);
  const maxDatePre = new Date(year, month, 0);
  const maxDate = new Date(year, month + 1, 0);

  for (
    let i = maxDatePre.getDate() - minDay.getDay() + 1;
    i <= maxDatePre.getDate();
    i++
  ) {
    dateInMonth.push(new Date(year, month - 1, i));
  }
  for (let i = 1; i <= maxDate.getDate(); i++) {
    dateInMonth.push(new Date(year, month, i));
  }
  for (let i = 1; i <= 7 - maxDate.getDay() - 1; i++) {
    dateInMonth.push(new Date(year, month + 1, i));
  }

  return dateInMonth;
};
export {Week, Month, calculateDate};
