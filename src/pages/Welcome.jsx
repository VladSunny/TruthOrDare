import React from 'react';
import DefaultButton from '../UI/Button/DefaultButton';


function Welcome() {
    return (
        <div className="w-sreen h-screen flex flex-col items-center font-sans variantfill-four font-extrabold">
            <div className="w-full flex items-center justify-center h-max py-5 variantfill-one" >
                <h1 className='text-6xl'>Добро пожаловать!</h1>
            </div>
            <div className='w-full h-full flex flex-col justify-center items-center gap-10'>
                <DefaultButton className="w-1/4 h-1/5">
                    <p className='text-4xl'>
                        Начать
                    </p>
                </DefaultButton>
                <DefaultButton className="w-1/5 h-1/6">
                    <p className='text-2xl'>
                        Подробнее о игре
                    </p>
                </DefaultButton>
            </div>
        </div>
    );
}

export default Welcome;