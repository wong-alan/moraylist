import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SplotchifyIcon from "../icons/SplotchifyIcon";
import UserMenu from "./UserMenu";
import Login from './Login';
import { useAppContext } from '../../contexts/AppContext';
import { navPages } from '../../pages';
import "./Header.css";
import { ListItemIcon } from '@mui/material';

const noLoginOrProfile = ["/logout", "/callback"];

const Header = () => {
    const { code } = useAppContext();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);


    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: "#282828" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Large corner logo */}
                    <Link to="/"
                        className="link-style header-logo-container"
                        aria-label="Splotchify Home"
                    >
                        <Box className="header-logo-box"
                            sx={{display: { xs: 'none', md: 'inline-block' }}}
                        >
                            <SplotchifyIcon size={28} />
                        </Box>
                        <Typography
                            className="header-logo-font"
                            variant="h6"
                            noWrap
                            sx={{display: { xs: 'none', md: 'inline-block' }}}
                        >
                            Splotchify
                        </Typography>
                    </Link>

                    {/* Small menu */}
                    { code &&
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                            {navPages.map((page) => (
                                <Link to={page.url} className="link-style">
                                    <MenuItem
                                        className="metro-font nav-link"
                                        key={page.name+"-sm"}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <ListItemIcon>{page.icon}</ListItemIcon>
                                        {page.name}
                                    </MenuItem>
                                </Link>
                            ))}
                            </Menu>
                        </Box>
                    }

                    {/* Small center logo */}
                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <Link to="/" className="link-style header-logo-container" aria-label="Splotchify Home">
                            <Box className="header-logo-box"
                                sx={{ display: 'inline-block'}}
                            >
                                <SplotchifyIcon size={28} />
                            </Box>
                            <Typography
                                className="header-logo-font"
                                variant="h5"
                                noWrap
                                sx={{display: { xs: 'inline-block', md: 'none' }}}
                            >
                                Splotchify
                            </Typography>
                        </Link>
                    </Box>

                    {/* Large menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        { code &&
                            navPages.map((page) => (
                                <Link to={page.url} key={page.name+"-lg"} className="link-style">
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: 'white',
                                            display: 'block',
                                            fontFamily: 'inherit',
                                            fontWeight: "600",
                                            fontSize: "revert"
                                        }}
                                    >
                                        {page.name}
                                    </Button>
                                </Link>
                            ))
                        }
                    </Box>

                    {/* User menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        {
                            noLoginOrProfile.includes(useLocation().pathname) ? <></> :
                            code ?
                            <UserMenu /> :
                            <Login size="lg" />
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;