import React, { Fragment, useEffect } from 'react'

import './styleGuide.css'

// components
import Input from '../../components/common/form/Input.js'
import Label from '../../components/common/form/Label.js'
import { useParams, useSearchParams } from 'react-router-dom'




const StyleGuide = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const { id } = useParams(); 
    useEffect(() => {
        console.log(id)
    }, [])


    return (
        <Fragment>
            <h1>style components</h1>
            <section className="conts">
                <h2>form</h2>
                <article>
                    <h3>label</h3>
                    <p>props: htmlFor, classN, content</p>
                    <Label />
                </article>
                <article>
                    <h3>input</h3>
                    <p>props: classN, id, type, required, placeholder, name, value, evt</p>
                    <Input />
                </article>

            </section>
        </Fragment>
    )
}

export default StyleGuide