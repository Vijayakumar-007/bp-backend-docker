import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export function AppCheckBox({value, checked, onChange, name, label}) {
    return <FormControlLabel
        control={<Checkbox value={value}
                           color={'primary'}
                           checked={checked}
                           onChange={onChange}
                           name={name}/>}
        label={label}
    />
}
