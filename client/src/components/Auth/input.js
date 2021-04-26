import React from 'react'
import { TextField,Grid,InputAdornment,IconButton } from "@material-ui/core";

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const input = ({name, handleChange,label,half,autoFocus,type,handleShowPassword}) => {
    return (
        <Grid item xs={6} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                // name==='password' && means a ternary operator 
                // which says if this then show else null
                InputProps={name==='password' &&{
                    endAdornment:(
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === "password" ? <Visibility/>: <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    )
                } }
            />
        </Grid>
    )
}

export default input
