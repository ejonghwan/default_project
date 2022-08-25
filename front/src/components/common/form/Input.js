import React, { Fragment, forwardRef } from 'react'

const Input = forwardRef((props, ref) => {

    const { classN, id, type, required, placeholder, name, value, onChange, disabled, checked } = props;

    // console.log(props)
    return (
        <Fragment>
            <input id={id} type={type} required={required} placeholder={placeholder} className={classN} value={value} name={name} onChange={onChange} disabled={disabled} checked={checked} ref={ref}/>
        </Fragment>
    )
})

export default Input;