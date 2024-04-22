import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    MenuItem,
    Select,
    useTheme,
    FormControl,
    useMediaQuery,
    Icon
} from "@mui/material";
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from '@mui/icons-material'
import { setMode, setLogout } from "state";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "component/FlexBetween";



const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    // const fullName=`${user.firstName} ${user.lastName}`;
    const fullName="Maan Lad";

    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap={"1.75rem"}>
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem ,2rem ,2.25rem)"
                    color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer"
                        }
                    }}
                >
                    Sociopedia
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase placeholder="Search..." />
                    </FlexBetween>
                )}
            </FlexBetween>
            {isNonMobileScreens ? (<FlexBetween >
                <IconButton onClick={() => { dispatch(setMode()) }}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px" }} />
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    )}
                </IconButton>
                <Message sx={{ fontSize: "25px", margin:"0rem 0.6rem" }} />
                <Notifications sx={{ fontSize: "25px" , margin:"0rem 0.6rem"}} />
                <Help sx={{ fontSize: "25px" , margin:"0rem 0.6rem"}} />
                <FormControl variant="standard" value="MaanLad" />
                <Select value="MaanLad" sx={{
                    margin:"0rem 0.6rem",
                    backgroundColor: primaryLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                        pr: "0.25rem",
                        width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                        backgroundColor: neutralLight,
                    },
                }} input={<InputBase />}>
                    <MenuItem value={fullName}><Typography>{fullName}</Typography></MenuItem>
                    <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                </Select>
            </FlexBetween>) : (<IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
                <Menu />
            </IconButton>)}

            {
                !isNonMobileScreens && isMobileMenuToggled &&
                (
                    <Box
                        position='fixed'
                        right='0'
                        bottom='0'
                        height='100%'
                        zIndex='10'
                        maxHeight='500px'
                        maxWidth='300px'
                        background={background}
                    >
                        <Box
                            display='flex'
                            justifyContent='flex-end'
                            p='1rem'

                        >
                            <IconButton
                                onClick={() => {setIsMobileMenuToggled(!isMobileMenuToggled); console.log("Jello")}}
                            >
                                <Close />
                            </IconButton>
                        </Box> 

                        <FlexBetween
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                        alignItem='center'
                        gap='2rem'
                        >
                            <IconButton
                            onClick={()=>dispatch(setMode())}
                            sx={{fontSize:'25px'}}
                            >
                                {theme.palette==='dark'?(
                                    <DarkMode sx={{fontSize:'25px'}}/>
                                ):(
                                    <LightMode sx={{fontSize:'25px'}}/>
                                )}
                            </IconButton>
                            <Message sx={{ fontSize: "25px" }} />
                            <Notifications sx={{ fontSize: "25px" }} />
                            <Help sx={{ fontSize: "25px" }} />
                            <FormControl variant="standard" value={fullName}>
                                <Select
                                value={fullName}
                                sx={{
                                    backgroundColor:neutralLight,
                                    width:'150px',
                                    borderRadius:'0.25rem',
                                    p:'0.25rem 1rem',
                                    "& .MuiSelect-select:focus":{
                                        backgroundColor:neutralLight
                                    },
                                }}
                                input={<InputBase />}
                                >
                                    <MenuItem value={fullName}>
                                        <Typography>{fullName}</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={()=>dispatch(setLogout())}>
                                        Log Out
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </FlexBetween>
                    </Box>
                )
            }
        </FlexBetween>
    )
}

export default Navbar;