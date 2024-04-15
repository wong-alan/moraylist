import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';

import { fetchProfile } from '../../spotify/user';
import { useAppContext } from '../../contexts/AppContext';
import { SPLOTCHIFY_SVG } from "../icons/SplotchifyIcon";

const UserMenu = () => {
    const { clientId, code, profile, setProfile } = useAppContext();
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
        fetchProfile(clientId, code!).then(data => setProfile(data));
    }, []);

    const profilePicUrl = profile?.images[0]?.url ?
        profile.images[0].url :
        SPLOTCHIFY_SVG;

    return (
        <>
            <IconButton
                onClick={handleOpenUserMenu}
                aria-label="Open User Menu"
                sx={{
                    p: 0,
                    "& :hover": {
                        transform: "scale(1.04)",
                        boxShadow: "0 0 3px 3px",
                        transition: "all 70ms cubic-bezier(0.5, 0, 0.5, 1)"
                    }
            }}>
                <Avatar
                    alt={profile?.display_name ?? "Profile picture"}
                    src={profilePicUrl}
                />
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
                    <Link to='/profile' className="metro-font link-style nav-link">
                        <ListItemIcon>
                            <AccountCircle fontSize="small" />
                        </ListItemIcon>
                        Profile
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Link to='/logout' className="metro-font link-style nav-link">
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