import React from 'react'

import { PasswordGenerator } from 'genpass'
import 'genpass/dist/index.css'

import './App.css'
import logo from './logo.svg'

const App = () => {
  return (
    <div className="container">
      <main>
        <section className="copy">
          <img id="logo" src={logo} alt="Okta" />
          <h2>Password generator</h2>
          <h3>Generate a strong login password. &#x2728;&#x1F512;&#x2728;</h3>
          <p>
            This password is not saved or seen on our servers.
            Use it for any account login &ndash; Okta or anywhere else!
          </p>
          <footer>
            <p><a href="#">Powered by Okta</a></p>
            <p><a href="#">Privacy Policy</a></p>
          </footer>
        </section>
        <section className="password-generator">
          <PasswordGenerator />
        </section>
      </main>
    </div>
  )
}

export default App
