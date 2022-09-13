import React from 'react'
import genpass from './lib/genpass';

const PasswordGenerator = () => {
  return (
    <form>
      <button>Regenerate</button>
      <button>Copy</button>
    </form>
  );
};

export default PasswordGenerator;