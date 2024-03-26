import { ElementType, useState } from 'react';
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
import pages from '../../pages';

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
                    <Link to="/" className="nostyle">
                        <Box sx={{ display: { xs: 'none', md: 'inline-block' }, height: "24px" }}>
                            <SplotchifyIcon />
                        </Box>
                    </Link>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link as ElementType}
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'inherit',
                            fontWeight: 600,
                            color: 'inherit',
                            textDecoration: 'none',
                            paddingLeft: '15px'
                        }}
                    >
                        Splotchify
                    </Typography>

                    {/* Small menu */}
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
                        {pages.map((page) => (
                            <MenuItem key={page.name+"-sm"} onClick={handleCloseNavMenu}>
                                <Link to={page.url} className="metro-font link-style nav-link">
                                    {page.name}
                                </Link>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>

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
                        <Link to="/" className="link-style">
                            <Box sx={{ display: 'inline-block', height: "24px" }}>
                                <SplotchifyIcon />
                            </Box>
                        </Link>
                        <Typography
                            variant="h5"
                            noWrap
                            component={Link as ElementType}
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'inherit',
                                fontWeight: 600,
                                color: 'inherit',
                                textDecoration: 'none',
                                paddingLeft: '15px'
                            }}
                        >
                            Splotchify
                        </Typography>
                    </Box>

                    {/* Large menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link to={page.url} key={page.name+"-lg"} className="link-style">
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                        fontFamily: 'inherit',
                                        fontWeight: "600"
                                    }}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    {/* User menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        {
                            noLoginOrProfile.includes(useLocation().pathname) ? <></> :
                            code && code != "undefined" ?
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