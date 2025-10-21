const startMonth = 8, startYear = 2025;
const endMonth = 5, endYear = 2026;
let currentMonth = startMonth, currentYear = startYear;

const eventi = {
  "2025-09-15": ["Inizio Anno Scolastico"],
  "2025-10-31": ["Festa di Halloween"],
  "2025-12-24": ["Vigilia di Natale"],
  "2026-06-01": ["Fine Anno Scolastico"]
};

function updateMonthYear() {
  const months = [
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
  ];
  document.getElementById('monthYear').innerText =
    `${months[currentMonth]} ${currentYear}`;
}

function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(month, year) {
  let jsDay = new Date(year, month, 1).getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

function isToday(day, month, year) {
  const now = new Date();
  return (
    now.getDate() === day &&
    now.getMonth() === month &&
    now.getFullYear() === year
  );
}

function renderCalendar() {
  updateMonthYear();
  const tbody = document.getElementById('calendarBody');
  tbody.innerHTML = '';
  const days = daysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfWeek(currentMonth, currentYear);
  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement('td');
      if ((i === 0 && j < firstDay) || date > days) {
        cell.classList.add('empty');
        cell.innerHTML = '';
      } else {
        cell.innerHTML = date;
        if (isToday(date, currentMonth, currentYear)) {
          cell.classList.add('today');
        }
        const d = date, m = currentMonth, y = currentYear;
        cell.addEventListener('click', function() {
          showEvent(d, m, y);
        });
        date++;
      }
      row.appendChild(cell);
    }
    tbody.appendChild(row);
    if (date > days) break;
  }
}

function showEvent(day, month, year) {
  const key = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
  const eventList = document.getElementById('eventList');
  if (eventi[key] && eventi[key].length > 0) {
    eventList.innerHTML = eventi[key].map(ev => `<div>• ${ev}</div>`).join('');
  } else {
    eventList.innerHTML = `<div class="event-empty">Nessuna attività prevista per questo giorno.</div>`;
  }
}

document.getElementById('prevMonth').onclick = function() {
  if (currentYear === startYear && currentMonth === startMonth) return;
  if (currentMonth === 0) { currentMonth = 11; currentYear--; }
  else { currentMonth--; }
  if (currentYear < startYear || (currentYear === startYear && currentMonth < startMonth)) {
    currentMonth = startMonth; currentYear = startYear;
  }
  renderCalendar();
  document.getElementById('eventList').innerHTML = '<div class="event-empty">Seleziona una data per vedere le attività...</div>';
};
document.getElementById('nextMonth').onclick = function() {
  if (currentYear === endYear && currentMonth === endMonth) return;
  if (currentMonth === 11) { currentMonth = 0; currentYear++; }
  else { currentMonth++; }
  if (currentYear > endYear || (currentYear === endYear && currentMonth > endMonth)) {
    currentMonth = endMonth; currentYear = endYear;
  }
  renderCalendar();
  document.getElementById('eventList').innerHTML = '<div class="event-empty">Seleziona una data per vedere le attività...</div>';
};

renderCalendar();