import React from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userSignUp } from "../database/database";

function SignUp() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onClick = () => {
        console.log(email, password);
        console.log(userSignUp({ email, password }));
    }

    return (
        <div className="h-fit flex flex-col items-center font-sans variantfill-four">
            <h1 className='text-3xl md:text-4xl lg:text-6xl w-11/12 md:w-2/3 py-10 variantfill-two p-5 my-5 rounded-2xl flex justify-center shadow-lg'>
                Регистрация
            </h1>

            <div className="my-5 w-5/6 md:w-3/5 lg:w-1/4">
                <InputLabel htmlFor="input-with-icon-adornment">
                Email
                </InputLabel>
                <Input
                    id="input-with-icon-adornment"
                    onChange={(e) => setEmail(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                        <AccountCircle />
                        </InputAdornment>
                    }
                    sx={{ width: '100%' }}
                />
            </div>
            <div className="mb-5 w-5/6 md:w-3/5 lg:w-1/4">
                <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
                <Input
                    id="standard-adornment-password"
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    sx={{ width: '100%' }}
                />
            </div>
            <div className="my-5">
                <Button color="success" variant='contained' size='large' onClick={onClick}>
                    зарегистрироваться
                </Button>
            </div>
        </div>
    )
};

export default SignUp;
