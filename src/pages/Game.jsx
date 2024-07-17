import React from 'react';
import TextField from '@mui/material/TextField';


function Game() {
    return (
        <div className='h-screen variantfill-four flex flex-col items-center'>
            <h1 className='text-3xl md:text-4xl lg:text-6xl w-11/12 md:w-2/3 py-10 variantfill-two p-5 mt-5 rounded-2xl flex justify-center shadow-lg'>
                Правда или действие?
            </h1>
            <div className='mt-10 w-full flex justify-center'>
                <TextField
                    id="standard-multiline-flexible"
                    label="Multiline"
                    multiline
                    variant="filled"
                    className='w-5/6 md:w-2/5'
                />
            </div>
        </div>
    );
}

export default Game;