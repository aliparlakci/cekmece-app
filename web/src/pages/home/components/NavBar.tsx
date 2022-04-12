import * as React from "react"
import { Avatar, AppBar, Box, createTheme, Toolbar, IconButton, Typography, InputBase, Badge, ThemeProvider, Pagination} from "@mui/material"
import { Home, ShoppingCart} from "@mui/icons-material"
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { deepPurple} from '@mui/material/colors';

const theme = createTheme({
  palette: {
      primary: {
          main: '#1a1a1a',
      }
  },
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default function NavBar() {
  return (
    <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='fixed'>
            <Toolbar>
              <IconButton size='large' edge='start' color='inherit' aria-label='open drawer' sx={{ mr: 2 }}>
                <Home /> 
              </IconButton>
              <Typography variant='h6' noWrap component='div' sx={{ display: { xs:'none', sm:'block' } }}>
                Zort Storzt
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton size='large' edge='start' color='inherit' aria-label='open drawer' sx={{ mr: 2 }}>
              <Badge badgeContent={1} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <Avatar sx={{ bgcolor: deepPurple[500], mr: 2 }}>B</Avatar>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
  );
}