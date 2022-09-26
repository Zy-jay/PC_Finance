import '@reach/dialog/styles.css'
import 'inter-ui'
import './polyfills'
import './components/analytics'

import { BlockNumberProvider } from './lib/hooks/useBlockNumber'
import { MulticallUpdater } from './lib/state/multicall'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { FeatureFlagsProvider } from './components/featureFlags'
// import Blocklist from './components/Blocklist'
import Web3Provider from './components/Web3Provider'
import { LanguageProvider } from './i18n'
import App from './pages/App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import store from './state'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import LogsUpdater from './state/logs/updater'
import TransactionUpdater from './state/transactions/updater'
import UserUpdater from './state/user/updater'
import ThemeProvider, { ThemedGlobalStyle } from './theme'

import React from 'react'
// import RadialGradientByChainUpdater from './theme/RadialGradientByChainUpdater'
const queryClient = new QueryClient()

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}
 console.log(Web3Provider);
function Updaters() {
  return (
    <>
      {/* <RadialGradientByChainUpdater /> */}
      <ListsUpdater />
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
      <LogsUpdater />
    </>
  )
}

const container = document.getElementById('root') as HTMLElement

createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
    <FeatureFlagsProvider>
    <QueryClientProvider client={queryClient}>

      <HashRouter>
        <LanguageProvider>
          <Web3Provider>
            {/* <Blocklist> */}
              <BlockNumberProvider>
                <Updaters />
                <ThemeProvider>
                  <ThemedGlobalStyle />
                  <App />
                </ThemeProvider>
              </BlockNumberProvider>
            {/* </Blocklist> */}
          </Web3Provider>
        </LanguageProvider>
      </HashRouter>
      </QueryClientProvider>
      </FeatureFlagsProvider>

    </Provider>
  </StrictMode>
)

if (process.env.REACT_APP_SERVICE_WORKER !== 'false') {
  serviceWorkerRegistration.register()
}