import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from '@nextui-org/react'
import TransparentCard from './components/TransparentCard.jsx'
import {Image} from "@nextui-org/react"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
    {/* <Image
      isBlurred
      width={1000}
      src="/calm.avif"
      alt="NextUi bg"
      classname=" bg-cover"
      /> */}
    {/* <div className="bg-[url(/calm.avif)] bg-no-repeat bg-cover rounded-lg">
      <App />
    </div> */}
    <TransparentCard />
    </NextUIProvider>
  </React.StrictMode>
)
