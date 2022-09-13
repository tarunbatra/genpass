import React from 'react'
import genpass from './lib/genpass';
import { Button, OutlinedInput, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';

const PasswordGenerator = () => {

  const handleRegeneration = () => {
    window.alert('TODO: Implement password regeneration');
  };

  const handleCopy = () => {
    window.alert('TODO: Implement password copy');
  };

  return (
    <form style={{ maxWidth: '320px', margin: '20px' }}>
      <Stack direction="column" spacing={2}>
        <OutlinedInput
          type="text"
          // TODO: Add password gen function here
          value="ABC!@#123"
          sx={{ minWidth: '200px', maxWidth: '320px' }}
          disabled
          fullWidth
        />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
        >
          <Button
            variant="outlined"
            startIcon={<ReplayIcon />}
            onClick={handleRegeneration}
          >
            Regenerate
          </Button>
          <Button
            variant="contained"
            endIcon={<ContentCopyIcon />}
            onClick={handleCopy}
          >
            Copy
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default PasswordGenerator;
