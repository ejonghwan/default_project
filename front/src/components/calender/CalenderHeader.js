
import React from 'react';
import { format } from 'date-fns';


const CalenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    {format(currentMonth, 'yyyy')} <span className="text month">{format(currentMonth, 'M')}월</span>
                </span>
            </div>
            <div className="col col-end">
                {/* <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} /> */}
                {/* <button onClick={prevMonth}>prev</button> */}
                {/* <button onClick={nextMonth}>next</button> */}
            </div>
        </div>
    );
};

export default CalenderHeader
