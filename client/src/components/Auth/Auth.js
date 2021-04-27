import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { AUTH } from '../../constants/actionTypes';
import Input from "./input";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import { signup, signin } from "../../actions/auth";

export const Auth = () => {
    const initialState={firstName: "", lastName: "", email:"", password:"", confirmPassword:""}
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = ()=>setShowPassword((prevShowPassword)=> !prevShowPassword)
    const handleSubmit = (e)=>{
        // e=Event
        // in browser, the default setting is to 
        // refresh when submit is pressed
        e.preventDefault();
        if(isSignup) {
            dispatch(signup(formData,history))
        } else {
            dispatch(signin(formData,history))
        }
    }
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const switchMode = ()=>{
        setIsSignUp((prevIsSignUp)=> !prevIsSignUp)
        setShowPassword(false);
    }
    const googleSuccess = async (res) =>{
        console.log("Google Sign In was Successful");
        const result = res?.profileObj; 
        // In JS, object.field throws error if object is 
        // not there(cannot use property of undefined) but when we use
        // object?.field it will assign undefined
        // to that value if object doesnt exist
        const token = res?.tokenId;
        try {
            // console.log(result)
            dispatch({type: AUTH, data: {result,token}});
            // redirect to home
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = () =>{
        console.log("Google Sign In was unsuccessfull, Try Again");
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}> 
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{ isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            // isSignup && means a ternary operator 
                            // which says if this true then show else null
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text": "password"} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up': 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="921275445362-rngcqffn2a41nclh5e798a1uqkgjqj2o.apps.googleusercontent.com"
                        render={(renderProps)=> (
                            <Button 
                            className={classes.googleButton} 
                            color="primary" 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon/>} 
                            variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already Have an Account? Sign In' : "Don't have an account? Sign Up "}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
