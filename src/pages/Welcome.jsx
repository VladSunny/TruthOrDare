import React from 'react';
import DefaultButton from '../UI/Button/DefaultButton';
import useWindowSize from '../hooks/useWindowSize';


function Welcome() {
    return (
        <div className="w-sreen h-screen flex flex-col items-center font-sans variantfill-two">
            <div className="w-3/4 md:w-2/3 rounded-2xl mt-5 flex items-center justify-center py-20 md:py-10 variantfill-one shadow-sm" >
                <h1 className='text-3xl md:text-6xl'>Добро пожаловать!</h1>
            </div>
            <div className='w-full h-full flex flex-col mt-20 items-center gap-10'>
                <DefaultButton className="w-3/4 md:w-1/4 h-1/5" href='/Game'>
                    <p className='text-4xl'>
                        Начать
                    </p>
                </DefaultButton>
                <DefaultButton className="w-2/3 md:w-1/5 h-1/6">
                    <p className='text-2xl'>
                        Подробнее о игре
                    </p>
                </DefaultButton>
            </div>
        </div>
    );
}

export default Welcome;