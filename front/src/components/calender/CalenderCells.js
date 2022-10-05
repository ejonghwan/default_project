
import React, { useState, useEffect, Fragment } from 'react';
// import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';




const CalenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth); //이달의 시작 9/1
    const monthEnd = endOfMonth(monthStart); //이달의 끝 9/30
    const startDate = startOfWeek(monthStart); //달력의 시작 8/28
    const endDate = endOfWeek(monthEnd); //달력의 끝 10/1

    // console.log('this', monthStart)
    // console.log('addDays', addDays(new Date(), 3))

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    

    while (day <= endDate) {
   
        // console.log('day', day, '#######', 'endDate', endDate)
        // 하루 > 엔드데이를 각 주마다 7번쨰 돌게끔
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            // console.log('parse c????????', parse('50', 'yy',cloneDay))
            days.push(
                <div
                    className={`col cell ${
                        // 
                        !isSameMonth(day, monthStart) ? 'disabled' : isSameDay(day, selectedDate)
                            ? 'selected' : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'} ${isSameDay(day, new Date()) ? `today` : ``}`}
                    
                    key={day}
                    // onClick={() => onDateClick(parse(cloneDay))}
                    onClick={() => onDateClick(cloneDay)}
                >
                    <span
                        className={
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'text not-valid'
                                : ''
                        }
                    >
                        {formattedDate}
                    </span>
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = [];
    }

    return (<div className="body">{rows}</div>);
};



export default CalenderCells;

