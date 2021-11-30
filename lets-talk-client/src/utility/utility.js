export const switchTheme = (className, state) => {
  const elems = document.getElementsByClassName(className);
  for (let elem of elems) {
    if (state.themeDark) {
      elem.classList.remove("theme-bright");
      elem.classList.add("theme-dark");
    } else {
      elem.classList.remove("theme-dark");
      elem.classList.add("theme-bright");
    }
  }
};

export const getUTCTimeObj = () => {
  let date = new Date();
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    date: date.getUTCDate(),
    hours: date.getUTCHours(),
    minutes: date.getUTCMinutes(),
    seconds: date.getUTCSeconds(),
  };
};

export const getLocalTimeFromUTCTime = (utcTime) => {
  const curTime = new Date();
  curTime.setUTCFullYear(utcTime.year);
  curTime.setUTCMonth(utcTime.month);
  curTime.setUTCDate(utcTime.date);
  curTime.setUTCHours(utcTime.hours);
  curTime.setUTCMinutes(utcTime.minutes);
  curTime.setUTCSeconds(utcTime.seconds);
  return curTime;
};
