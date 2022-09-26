import logo from '../assets/svg/logo.svg';
import '../App.css';
import React from 'react';
import Header from "../components/Header"
import { Button3dDark, Button3dOrange, Button3dPurp } from 'components/Button';
import { CUSTOM_USER_PROPERTIES, EventName, PageName } from 'components/AmplitudeAnalytics/constants'
import { Trace } from 'components/AmplitudeAnalytics/Trace'
import {PsLoader} from '../components/Loader'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'
import Background from '../assets/svg/Background.svg'
import Lending from './lending'
import Lotteries from './lotteries'
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom"
import { lazy, Suspense, useEffect } from 'react'
import Loader from 'components/Loader'



function getCurrentPageFromLocation(locationPathname: string): PageName | undefined {
  switch (locationPathname) {
    case '/home':
      return PageName.HOME_PAGE
    case '/lotteries':
      return PageName.VOTE_PAGE
    case '/pool':
      return PageName.LOTTERIES_PAGE
    default:
      return undefined
  }
}



// const StyledSVG = styled.svg<{ size: string; stroke?: string }>`
//   animation: 2s ${rotate} linear infinite;
//   height: ${({ size }) => size};
//   width: ${({ size }) => size};
//   path {
//     stroke: ${({ stroke, theme }) => stroke ?? theme.deprecated_primary1};
//   }
// `

function App() {
  const { pathname } = useLocation()
 const currentPage = getCurrentPageFromLocation(pathname)
  return (
    <Trace page={currentPage}>
 <Suspense >
    <Header/>
    <Routes>
        {/* <Button3dOrange> WIN </Button3dOrange>
        <Button3dDark> WIN</Button3dDark>
        <Button3dPurp> WIN </Button3dPurp> */}
                    <Route path="home" element = { <Lending/>} /> 
                    <Route path="lotteries" element = { <Lotteries/>} /> 
        
      
    </Routes>

</Suspense>
  </Trace>   
  );
}

export default App;
