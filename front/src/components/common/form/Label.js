import React, { Fragment } from 'react'

const Label = props => {

    const { htmlFor, classN, content } = props;

    return (
        <Fragment>
            <label htmlFor={htmlFor} className={classN}>{content}</label>
        </Fragment>
    )
}

export default Label;