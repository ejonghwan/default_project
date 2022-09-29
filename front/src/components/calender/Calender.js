import React, { useState, useEffect } from 'react';
// import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';

import './Calender.css'


export const Calender = () => {

    useEffect(() => {
        const hoho = new Date()
        console.log('cur', hoho)
        // console.log('format', format(hoho, 'M')) //지금시간에서 특정 추출해주는거 
        // console.log('addMonths', addMonths(hoho, 3))  //지금부터 다음달 다다음달 
        // console.log('subMonths', subMonths(hoho, 2))  //지금부터 이전달 이이전달 
        // console.log('startOfMonth', startOfMonth(hoho))  //시작일
        // console.log('endOfMonth', endOfMonth(startOfMonth(hoho)))  //끝일
        // console.log('startOfWeek', startOfWeek(startOfMonth(hoho)))  //new Date 넣으면 그 주의 시작, startmonth 넣으면 이전 월 구분없이 시작값
        // console.log('endOfWeek', endOfWeek(endOfMonth(hoho)))  //new Date 넣으면 그 주의 끝, endmonth 넣으면 이전 월 구분없이 끝값
        // console.log('isSameMonth', isSameMonth( startOfWeek(startOfMonth(hoho)), startOfMonth(hoho) ))  //리턴값은 날짜전부이고 첫번째 값이 두번째 값에 속해있는지 불린값으로 반환
        
    }, [])



    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
    };




    return (
        <div className="calendar">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
            />
        </div>
    );
};





const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    <span className="text month">
                        {format(currentMonth, 'M')}월
                    </span>
                    {format(currentMonth, 'yyyy')}
                </span>
            </div>
            <div className="col col-end">
                {/* <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} /> */}
                <button onClick={prevMonth}>prev</button>
                <button onClick={nextMonth}>next</button>
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth); //이달의 시작 9/1
    const monthEnd = endOfMonth(monthStart); //이달의 끝 9/30
    const startDate = startOfWeek(monthStart); //달력의 시작 8/28
    const endDate = endOfWeek(monthEnd); //달력의 끝 10/1

    // console.log('this', monthStart)

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    

    while (day <= endDate) {
   
        console.log('day', day, 'endDate', endDate)

        for (let i = 0; i < 7; i++) {
            // console.log(day <= endDate)
            // console.log('isSameDay', isSameDay(day, selectedDate), '|',  day, '|', selectedDate)
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <div
                    className={`col cell ${
                        // 
                        !isSameMonth(day, monthStart) ? 'disabled' : isSameDay(day, selectedDate)
                            ? 'selected' : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'
                    }`}
                    
                    key={day}
                    onClick={() => onDateClick(parse(cloneDay))}
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

    console.log(rows)
    return <div className="body">{rows}</div>;
};
