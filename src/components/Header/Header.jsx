import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from "@mui/material";
import { useLocation } from 'react-router-dom';


function Header() {
    const location = useLocation();

    return (
        <div className="w-full h-20 flex items-center justify-start variantfill-five">
            {location.pathname !== '/' && (
                <div class="mx-5 md:mx-10">
                    <IconButton sx={{padding: '0'}} href='/'>
                        <HomeIcon sx={{fontSize: '3rem'}} />
                    </IconButton>
                </div>
            )}
            <p className="text-2xl md:text-4xl lg:text-5xl font-extrabold ml-5">Генератор правд и действий</p>
        </div>
    );
}

export default Header;
