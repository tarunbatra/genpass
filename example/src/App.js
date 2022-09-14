import React from 'react'

import { PasswordGenerator } from 'genpass'
import 'genpass/dist/index.css'

import './App.css'
import logo from './logo.svg'

const App = () => {
  return (
    <div class="container">
      <main>
        <section className="copy">
          <img id="logo" src={logo} alt="Okta" />
          <h2>Password generator</h2>
          <h3>Generate a strong login password. &#x2728;&#x1F512;&#x2728;</h3>
          <p>
            This password is not saved or seen on our servers.
            Use it for any account login &ndash; Okta or anywhere else!
          </p>
        </section>
        <section className="password-generator">
          <PasswordGenerator />
        </section>
      </main>
      <footer>
        <p>Powered by Okta</p>
        <p>Privacy Policy</p>
      </footer>
    </div>
  )
}

export default App
