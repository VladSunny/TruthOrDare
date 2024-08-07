import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { IconButton} from "@mui/material";
import { useLocation, Link } from 'react-router-dom';
import { useUser } from "../../UserContext";
import { supabase } from "../../database/Database";


function Header() {
    const { user } = useUser();
    
    const location = useLocation();

    const logoutOnClick = async () => {
        const { error } = await supabase.auth.signOut();
        console.log(error);
    }

    return (
        <div className="w-full h-20 flex items-center justify-between variantfill-five">
            <div className="flex flex-row">
                {location.pathname !== '/' && (
                    <div class="ml-5 md:ml-10">
                        <Link to="/">
                            <IconButton sx={{padding: '0'}}>
                                <HomeIcon sx={{fontSize: '3rem'}} />
                            </IconButton>
                        </Link>
                    </div>
                )}
                <p className="text-1xl md:text-4xl lg:text-5xl font-extrabold ml-3 md:ml-5">Генератор правд и действий</p>
            </div>
            <div className="mr-5 lg:mr-10 text-1xl md:text-2xl lg:text-3xl">
                {user && (
                    <div className="flex flex-row justify-center items-center gap-3">
                        <img src={user.user_metadata.picture} alt="Profile" width="48" height="48" />
                        
                        {user.user_metadata.full_name}

                        <div className="md:ml-1">
                            <IconButton sx={{padding: '0'}} onClick={logoutOnClick}>
                                <LogoutIcon sx={{fontSize: '2rem'}} />
                            </IconButton>
                        </div>
                    </div>
                )}
                {!user && location.pathname !== '/SignIn' && (
                    <Link to="/SignIn" className="flex flex-row justify-center items-center gap-3">
                        <IconButton sx={{padding: '0'}}>
                            <LoginIcon sx={{fontSize: '2rem'}} />
                        </IconButton>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
