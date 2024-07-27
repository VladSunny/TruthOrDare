import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from "@mui/material";
import { useLocation, Link } from 'react-router-dom';
import { useUser } from "../../UserContext";


function Header() {
    const { user } = useUser();
    const location = useLocation();

    return (
        <div className="w-full h-20 flex items-center justify-between variantfill-five">
            <div className="flex flex-row">
                {location.pathname !== '/' && (
                    <div class="mx-5 md:mx-10">
                        <Link to="/">
                            <IconButton sx={{padding: '0'}}>
                                <HomeIcon sx={{fontSize: '3rem'}} />
                            </IconButton>
                        </Link>
                    </div>
                )}
                <p className="text-2xl md:text-4xl lg:text-5xl font-extrabold ml-5">Генератор правд и действий</p>
            </div>
            <div className="mr-5 lg:mr-10 text-1xl md:text-2xl lg:text-3xl">
                {user && (
                    <div className="flex flex-row justify-center items-center gap-3">
                        <img src={user.user_metadata.picture} alt="Profile" width="64" height="64" />
                        {user.user_metadata.full_name}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
