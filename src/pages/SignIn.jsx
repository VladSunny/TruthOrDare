import React from "react";
import { Button } from "@mui/material";
import { supabase } from "../database/Database";

function SignIn() {
    const redirectTo = process.env.REACT_APP_REDIRECT_URL;

    const onClick = async () => {

        let {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectTo
            }
        })

        if (data) {
            localStorage.setItem('supabase.auth.token', JSON.stringify(data.session));
        } else {
            console.error('Error during sign-in:', error);
        }

        console.log(data);
    }

    return (
        <div className="h-screen flex flex-col items-center font-sans variantfill-four">
            <h1 className='text-3xl md:text-4xl lg:text-6xl w-11/12 md:w-2/3 py-10 variantfill-two p-5 my-5 rounded-2xl flex justify-center shadow-lg'>
                Вход
            </h1>
            <div className="my-5">
                <Button color="success" variant='contained' size='large' onClick={onClick}>
                    Войти через Google
                </Button>
            </div>
        </div>
    )
};

export default SignIn;
