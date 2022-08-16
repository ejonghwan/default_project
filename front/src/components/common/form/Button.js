import React, { Fragment } from 'react'
import debounce from 'lodash.debounce'


export const DebounceButton = props => {

    console.log(debounce)

    const { classN, id, type, placeholder, value, onChange, disabled, onClick } = props;

    // console.log(props)
    return (
        <Fragment>
            <input id={id} type={type} className={classN} value={value} onChange={onChange} onClick={onClick} disabled={disabled} />
        </Fragment>
    )
}
