import React, { Fragment } from 'react'


const CalenderReview = props => {

    const { date } = props;


    return (
        <Fragment>
            <br /><br />
            dateNumber: {date}
            캘린더 리뷰어페이지
        </Fragment>
    )
}

export default CalenderReview;