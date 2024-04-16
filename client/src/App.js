import React, { useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from 'scenes/homePage'
import LoginPage from 'scenes/loginPage'
import ProfilePage from 'scenes/profilePage'
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "./theme"
import Navbar from 'scenes/navbar'

const App = () => {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/profile/:userId' element={< ProfilePage />} />
          <Route path='/nav' element={< Navbar />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
