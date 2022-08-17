import React, { Fragment } from 'react'




export const Button = props => {
    const { classN, id, type, placeholder, value, onChange, disabled, onClick } = props;

    // console.log(props)
    return (
        <Fragment>
            <input id={id} type={type} className={classN} value={value} onChange={onChange} onClick={onClick} disabled={disabled} />
        </Fragment>
    )
}
