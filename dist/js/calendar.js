document.addEventListener('DOMContentLoaded', function () {
  let calendarEl = document.getElementById('calendar');

  let calendar = new tui.Calendar(calendarEl, {
    defaultView: 'month',
    taskView: true,
    scheduleView: true,
    useDetailPopup: true,
  });

  calendar.on('beforeRender', function(event) {
    const date = event.date;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    event.calendar.setTitle(year + '년 ' + month + '월');

    // Add navigation buttons for going back and forward by one month
    const prevButton = document.createElement('button');
    prevButton.innerHTML = 'Prev';
    prevButton.addEventListener('click', function() {
      event.calendar.prev();
    });

    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Next';
    nextButton.addEventListener('click', function() {
      event.calendar.next();
    });

    const title = event.calendar.getTitleElement();
    title.appendChild(prevButton);
    title.appendChild(nextButton);
  });

  fetch('data/calendar_events.json')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched data:', data); // Log the fetched data
      const events = data.items.map(event => {
        return {
          id: event.id,
          calendarId: '1',
          title: event.summary,
          category: 'time',
          start: event.start.dateTime || event.start.date,
          end: event.end.dateTime || event.end.date,
          color: '#fff',
          backgroundColor: event.color
        };
      });

      calendar.createEvents(events);
    })
    .catch(error => {
      console.error('Error fetching calendar events:', error);
    });
});


