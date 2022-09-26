import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import Web3Status from '../Web3Status'
import useTheme from 'hooks/useTheme'
import { useNativeCurrencyBalances } from 'state/connection/hooks'
import { getChainInfoOrDefault } from 'constants/chainInfo'
import { Text } from 'rebass'
import { NavLink, useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';


import { darken } from 'polished'
import Row from '../Row'
import { SupportedChainId } from 'constants/chains'
import { ExternalLink } from '../../theme'
import  Logo  from '../../assets/svg/logo.svg'

import useScrollPosition from '@react-hook/window-scroll'
import { Button3dOrange } from 'components/Button'


const HeaderFrame = styled.div<{ showBackground: boolean }>`
width: 100%;
/* Background slide effect on scroll. */
background-image: ${({ theme }) => `linear-gradient(to bottom, transparent 50%, #1F0D35 50% )}}`};
background-position: ${({ showBackground }) => (showBackground ? '0 -100%' : '0 0')};
background-size: 100% 200%;
box-shadow: 0px 0px 0px 0px ${({ theme, showBackground }) => (showBackground ? theme.deprecated_bg2 : 'transparent;')};
transition: background-position 0.1s, box-shadow 0.1s;
background-blend-mode: hard-light;
position: fixed;
z-index: 100;

`
const HeaderWrap = styled.div`
display: grid;
margin: auto;
grid-template-columns: 120px 1fr 120px;
align-items: center;
justify-content: space-between;
align-items: center;
flex-direction: row;
width: 100%;
max-width: 1440px;
top: 0;
padding: 1rem;
z-index: 21;
${({ theme }) => theme.deprecated_mediaWidth.upToLarge`
  grid-template-columns: 48px 1fr 1fr;
`};

${({ theme }) => theme.deprecated_mediaWidth.upToMedium`
  padding:  1rem;
  grid-template-columns: 1fr 1fr;
`};

${({ theme }) => theme.deprecated_mediaWidth.upToSmall`
  padding:  1rem;
  grid-template-columns: 20px 1fr;
`};
a{
  text-decoration: none;
  display: block;
}
`



const activeClassName = 'active'



export const StyledNavLink = styled(Link).attrs({
  activeClassName,
})`
  align-items: left;
  border-radius: none;
  width: auto;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.ps_yellow};
  font-size: 1rem;
  font-weight: 400;
  font-family: "Segoe UI";
  padding: 8px 12px;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;

  &.${activeClassName} {
    border-radius: none;
    font-weight: 600;
    justify-content: center;
    color: ${({ theme }) => theme.ps_yellow};
    background-color: ${({ theme }) => theme.deprecated_transparent};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.ps_orange)};
  }
`

export const StyledNavLinkHome = styled(NavLink).attrs({
  activeClassName,
})`
  align-items: left;
  border-radius: none;
  width: auto;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.ps_yellow};
  font-size: 1rem;
  font-weight: 400;
  font-family: "Segoe UI";
  padding: 8px 12px;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;

  &.${activeClassName} {
    border-radius: none;
    font-weight: 600;
    justify-content: center;
    color: ${({ theme }) => theme.ps_yellow};
    background-color: ${({ theme }) => theme.deprecated_transparent};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.ps_orange)};
  }
`

const HeaderLinks = styled.div`
  justify-self: center;
  background-color: ${({ theme }) => theme.deprecated_transparent};
  width: fit-content;
  padding: auto;
  display: inline-grid;
  grid-auto-flow: column;
  grid-gap: auto;
  height: fit-content;
 text-align: center;
  overflow: auto;
  align-items: end;
  ${({ theme }) => theme.deprecated_mediaWidth.upToLarge`
    justify-self: start;
    `};
  ${({ theme }) => theme.deprecated_mediaWidth.upToMedium`
    justify-self: center;
  `};
  ${({ theme }) => theme.deprecated_mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    z-index: 99;
    position: fixed;
    bottom: -35px; 
    right: 50%;
    display: block;
       
    transform: translate(50%,-50%);
    margin: auto;
    background-color: #1F0D35;
    border: none;
    width: 100%;
    height: 70px;
    padding: inherit;

    grid-gap: 20px;
    box-shadow: 0px 6px 10px rgb(0 0 0 / 2%);
  `};
`
const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`

const AccountElement = styled.div<{ active: boolean }>`
display: flex;
flex-direction: row;
align-items: center;
background-color: ${({ theme, active }) => (!active ? theme.deprecated_bg0 : theme.deprecated_bg0)};
border-radius: 16px;
white-space: nowrap;
width: 100%;
height: 40px;

:focus {
  border: 1px solid blue;
}
`
 export const PsiIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }

  position: relative;
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-left: 0.5em;
  }

  /* addresses safaris lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.deprecated_mediaWidth.upToMedium`
    align-items: center;
  `};
`
const BalanceText = styled(Text)`
  ${({ theme }) => theme.deprecated_mediaWidth.upToSmall`
    display: none;
  `};
`


export default function Header() {
    const scrollY = useScrollPosition()
const { account, chainId } = useWeb3React()
const userEthBalance = useNativeCurrencyBalances(account ? [account] : [])?.[account ?? '']
const {nativeCurrency: { symbol: nativeCurrencySymbol },
  } = getChainInfoOrDefault(chainId)
  const { ps_purpl_darck, ps_purple } = useTheme()


  const { pathname } = useLocation()

  const isLending = pathname ==="/home" ? true : false; 
   console.log(pathname, isLending)

  return (
    <HeaderFrame showBackground={scrollY > 70}>
       <HeaderWrap>
      
        <PsiIcon style={{ display: "flex"}}>
          <img  src={Logo} width="120px" height="100%" title="logo" />
          </PsiIcon>
        <HeaderLinks>
          {isLending ? 
          <>
        <StyledNavLink id={`swap-nav-link`} to={{
    
    hash: "#about"}}>
          <Trans>About</Trans>
        </StyledNavLink>
        <StyledNavLink id={`vote-nav-pool`} to ={{ hash: "#benefits"}}>
          <Trans>Benefits</Trans>
        </StyledNavLink>
        
          <StyledNavLink id={`vote-nav-link`} to={"#roadmap"}>
            <Trans>Roadmap</Trans>
          </StyledNavLink>
      
        <StyledNavLink id={`charts-nav-link`} to="#lotteries">
          <Trans>Lotteries</Trans>
          {/* <sup>↗</sup> */}
        </StyledNavLink>
      <StyledNavLink id={`vote-nav-pool`} to={"#whitepaper"}>
          <Trans>Whitepaper</Trans>
        </StyledNavLink> 
        </>
      :
      <>
            <StyledNavLinkHome id={`swap-nav-link`} to={"/home"}>
          <Trans>About</Trans>
        </StyledNavLinkHome>
        <StyledNavLinkHome id={`vote-nav-pool`} to={"/home"}>
          <Trans>Benefits</Trans>
        </StyledNavLinkHome>
        
          <StyledNavLinkHome id={`vote-nav-link`} to={"home"}>
            <Trans>Roadmap</Trans>
          </StyledNavLinkHome>
      
        <StyledNavLinkHome id={`charts-nav-link`} to={"home"}>
          <Trans>Lotteries</Trans>
          {/* <sup>↗</sup> */}
        </StyledNavLinkHome>
      <StyledNavLinkHome id={`vote-nav-pool`} to={"home"}>
          <Trans>Whitepaper</Trans>
        </StyledNavLinkHome> 
      </>

      }
      </HeaderLinks>
      <HeaderControls>
      <HeaderElement style={{marginRight: "auto", marginBottom: "20px"}}>
 <NavLink to={"lotteries"}> <Button3dOrange width={"224px"}>
        <Trans>  BUY A TICKET </Trans>
        </Button3dOrange></NavLink>
        </HeaderElement>
       
        </HeaderControls>

</HeaderWrap>
 </HeaderFrame>
  )

}