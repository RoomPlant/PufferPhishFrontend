import React from "react"
import FormControl  from 'react-bootstrap/FormControl';

type inputProps = {
    label?: string;
    inputStyle?: string,
    labelStyle?: string,
    type?: string,
    handleChange: Function,
    value: string,
}

export let Input = (props: inputProps) => {
    return (
        <div>
            <div className={props.labelStyle}>{props.label}</div>
            <FormControl value={props.value} onChange={(e) => props.handleChange(e.target.value)} type={props.type} className={props.inputStyle}/>
        </div>
    )
}