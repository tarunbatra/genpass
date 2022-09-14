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
          sx={{
            borderRadius: '7px',
            width: '300px',
            '& input.Mui-disabled': {
              backgroundColor: '#e6e6e6',
              borderRadius: 'inherit',
              '-webkit-text-fill-color': '#333',
              fontSize: '22px',
              padding: '10px',
              textAlign: 'center',
            },
            '&.MuiInputBase-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ccc',
            },
          }}
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
            sx={{
              backgroundColor: '#eee',
              borderColor: '#ccc',
              color: '#333',
              padding: '8px 16px',
              textTransform: 'none',
            }}
          >
            Regenerate
          </Button>
          <Button
            variant="contained"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopy}
            sx={{
              backgroundColor: '#1362dd',
              boxShadow: '0',
              padding: '8px 16px',
              textTransform: 'none',
              '&:hover, &:active': {
                boxShadow: '0',
              },
            }}
          >
            Copy
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default PasswordGenerator;
