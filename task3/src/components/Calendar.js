import React from 'react';
import EventCalendar from 'react-event-calendar';

const CalendarPage = () => {
        /*
    <EventCalendar
                month={11}
                year={2019}
                events={events}
                onEventClick={(target, eventData, day) => console.log(eventData)}
            />
            */
    const events = [
        {
            start: '2019-11-15',
            end: '2019-11-20',
            eventClasses: 'optionalEvent',
            title: 'Test event',
            description: 'This is a test desc',
        }
    ];

    return(
        <div>
            
        </div>
    );
};

export default CalendarPage;