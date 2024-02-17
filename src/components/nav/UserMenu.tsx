import { useContext, useEffect, useState } from "react";

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';

import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';

import { fetchProfile } from '../../spotify/user';
import AppContext from '../../AppContext';
import { SPLOTCHIFY_SVG } from "../icons/SplotchifyIcon";

const UserMenu = () => {
    const { clientId, code, profile, setProfile } = useContext(AppContext);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    useEffect(() => {
        if (profile) {
            return;
        }
        // User Menu is not shown if code is null (user is not logged in)
        fetchProfile(clientId, code!).then(data => setProfile(data))
    }, []);

    const profilePicUrl = profile?.images[0]?.url ?
        profile.images[0].url :
        SPLOTCHIFY_SVG;

    return (
        <>
            <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                    p: 0,
                    "& :hover": {
                        transform: "scale(1.04)",
                        boxShadow: "0 0 3px 3px",
                        transition: "all 70ms cubic-bezier(0.5, 0, 0.5, 1)"
                    }
            }}>
                <Avatar src={profilePicUrl}/>
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                    <Link href='/profile' color="inherit" underline="none">
                        <ListItemIcon>
                            <AccountCircle fontSize="small" />
                        </ListItemIcon>
                        Profile
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Link href='/logout' color="inherit" underline="none">
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </Link>
                </MenuItem>
            </Menu>
        </>
    );
}

export default UserMenu;