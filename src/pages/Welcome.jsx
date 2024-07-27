import React from 'react';
import DefaultButton from '../UI/Button/DefaultButton';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

function Welcome() {
    const { user } = useUser();

    return (
        <div className="h-screen flex flex-col items-center font-sans variantfill-four">
            <div className="w-11/12 md:w-2/3 rounded-2xl mt-5 flex items-center justify-center py-20 md:py-10 variantfill-two shadow-lg" >
                <h1 className='text-3xl md:text-5xl lg:text-6xl'>
                    {user && (
                        <div>Рады снова вас видеть!</div>
                    )}
                    {!user && (
                        <div>Добро пожаловать!</div>
                    )}
                </h1>
            </div>
            <div className='w-full h-full flex flex-col mt-14 items-center gap-10'>
                <Link to="/Idea" className="w-3/4 md:w-2/3 lg:w-3/5 h-1/4 md:h-2/5">
                    <DefaultButton className="w-full h-full">
                        <p className='text-6xl'>
                            Начать
                        </p>
                    </DefaultButton>
                </Link>
                <Link to="/Information" className='w-2/3 md:w-1/2 lg:w-2/5 h-1/5 md:h-1/3 flex justify-center items-center'>
                    <DefaultButton className="w-full h-full">
                        <p className='text-2xl md:text-4xl lg:text-5xl'>
                            Подробнее о игре
                        </p>
                    </DefaultButton>
                </Link>
                {!user && (
                    <Link to="/SignIn" className='w-2/3 md:w-1/2 lg:w-2/5 h-1/5 md:h-1/3 flex justify-center items-center mb-5'>
                        <DefaultButton className="w-full h-full">
                            <p className='text-2xl md:text-4xl lg:text-5xl'>
                                Войти
                            </p>
                        </DefaultButton>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Welcome;