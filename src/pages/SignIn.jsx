import React from "react";
import { Button } from "@mui/material";
import { supabase } from "../database/database";

function SignIn() {
    const onClick = async () => {

        let {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })

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
