import React, { useState, useEffect, Fragment } from 'react';
// import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
// import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
// import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';

import { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


import './Calender.css'

// components
import CalenderHeader from './CalenderHeader.js';
import CalenderDays from './CalenderDays.js';
import CalenderCells from './CalenderCells.js';
import CalenderReview from './CalenderReview.js';



export const Calender = () => {



    useEffect(() => {
        // console.log('format', format(hoho, 'M')) //지금시간에서 특정 추출해주는거 
        // console.log('addMonths', addMonths(hoho, 3))  //지금부터 다음달 다다음달 
        // console.log('subMonths', subMonths(hoho, 2))  //지금부터 이전달 이이전달 
        // console.log('startOfMonth', startOfMonth(hoho))  //시작일
        // console.log('endOfMonth', endOfMonth(startOfMonth(hoho)))  //끝일
        // console.log('startOfWeek', startOfWeek(startOfMonth(hoho)))  //new Date 넣으면 그 주의 시작, startmonth 넣으면 이전 월 구분없이 시작값
        // console.log('endOfWeek', endOfWeek(endOfMonth(hoho)))  //new Date 넣으면 그 주의 끝, endmonth 넣으면 이전 월 구분없이 끝값
        // console.log('isSameMonth', isSameMonth( startOfWeek(startOfMonth(hoho)), startOfMonth(hoho) ))  //리턴값은 날짜전부이고 첫번째 값이 두번째 값에 속해있는지 불린값으로 반환
        // addDays() //addDays(지금날짜, 1) 지금날짜로부터 두번쨰 인자만큼 지난 날짜 반환 
        // const hehe = parse('50', 'yy', new Date())
        // console.dir('fnspasse?????', hehe, parse('50', 'yy', new Date(2018, 0, 1)))
    }, []);


    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [date, setDate] = useState(null);

    // console.log('????????', date)

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        if(format(day, 'M') < format(currentMonth, 'M')) prevMonth();  
        if(format(day, 'M') > format(currentMonth, 'M')) nextMonth();
        setSelectedDate(day);
        setDate(format(day, 'yy/MM/dd'));
    };

    
    const slides = Array.from({ length: 1000 }).map(
        (el, index) => `${index + 1}`
      );


    return (
        <Fragment>
            <div className="calendar">
                <CalenderHeader
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                />
                <CalenderDays />
                <Swiper 
                    modules={[Virtual, Navigation]} 
                    spaceBetween={0} 
                    slidesPerView={1} 
                    virtual
                    initialSlide={500}
                    navigation={true}
                    className="mySwiper"
                    onSlideChange={(swiper) => {
                        // console.log(swiper.activeIndex)
                        // console.log(swiper.previousIndex)
                        setTimeout(() => {
                            if(swiper.activeIndex > swiper.previousIndex) nextMonth();
                            if(swiper.activeIndex < swiper.previousIndex) prevMonth();
                        }, 0);
                    }}
                    onSwiper={(swiper) => {
                        swiper.previousIndex = 500
                    }}
                >
                    {slides.map((item, index) => {
                        return (
                            <SwiperSlide key={item} virtualIndex={index}>
                                {/* {item} */}
                                <CalenderCells
                                    currentMonth={currentMonth}
                                    selectedDate={selectedDate}
                                    onDateClick={onDateClick}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
            {date && <CalenderReview date={date} />}
        </Fragment>
    );
};




// N채널 노노
// DR.MOS