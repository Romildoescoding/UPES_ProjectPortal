export function getFormattedDate() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function getMonth(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[date.getMonth()];
}

export function getCurrentMonthDays() {
  let days = [];
  // getting new date, current year and month
  let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month

  // let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    days.push({ day: lastDateofLastMonth - i + 1, isCurrentMonth: false });

    // liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched

    // let isToday =
    //   i === date.getDate() &&
    //   currMonth === new Date().getMonth() &&
    //   currYear === new Date().getFullYear()
    //     ? "active"
    //     : "";
    days.push({ day: i, isCurrentMonth: true });
    // liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    days.push({ day: i - lastDayofMonth + 1, isCurrentMonth: false });
    // liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  //   currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  //   daysTag.innerHTML = liTag;
  return days;
}
