import React from 'react'

import { ExampleComponent, PasswordGenerator } from 'genpass'
import 'genpass/dist/index.css'

const App = () => {
  return (
    <div>
      <ExampleComponent text="Create React Library Example 😄" />
      <PasswordGenerator />
    </div>
  );
}

export default App
