import React, { Fragment } from 'react'

const Input = props => {

    const { classN, id, type, required, placeholder, name, value, evt, onChange } = props;

    // console.log(props)
    return (
        <Fragment>
            <input id={id} type={type} required={required} placeholder={placeholder} className={classN} value={value} name={name} onChange={onChange}/>
        </Fragment>
    )
}

export default Input;