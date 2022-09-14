import React from 'react'
import genpass from './lib/genpass';
import { Box, Button, OutlinedInput, Stack } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import Switch from '@mui/material/Switch';
import { TYPE } from './lib/constants';

const PasswordGenerator = (props) => {
  const [type, setType] = React.useState(TYPE.PASSPHRASE);
  const [length, setLength] = React.useState(4);
  const [hasSymbols, setHasSymbols] = React.useState(false);
  const [hasNumbers, setHasNumbers] = React.useState(false);
  const [generatedPassword, setGeneratedPassword] = React.useState('');

  const handleRegeneration = () => {
    window.alert('TODO: Implement password regeneration');
  };

  const handleCopy = () => {
    window.alert('TODO: Implement password copy');
  };

  React.useEffect(() => {
    // TODO: FIXME receiving error when calling genpass
    // const password = genpass({ type, length, symbols: hasSymbols, numbers: hasNumbers });
    // setGeneratedPassword(password);
  }, [type, length, hasSymbols, hasNumbers]);

  return (
    <form style={{ maxWidth: '320px', margin: '20px' }}>
      <Stack direction="column" spacing={2}>
        <OutlinedInput
          type="text"
          value={generatedPassword}
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
          readOnly
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
        <Box sx={{ backgroundColor: '#f5f5f6', padding: '20px', borderRadius: '4px' }}>
          <Stack direction="column" spacing={2}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                <FormLabel id="genType">Type:</FormLabel>
                <Select
                  labelId="genType"
                  id="type"
                  value={type}
                  onChange={(e) => { setType(e.target.value) }}
                >
                  <MenuItem value={TYPE.PASSPHRASE}>Passphrase</MenuItem>
                  <MenuItem value={TYPE.RANDOM}>Random</MenuItem>
                  <MenuItem value={TYPE.PIN}>Pin</MenuItem>
                </Select>
              </Stack>
            </FormControl>

            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
              <FormLabel id="lengthLabel">Words:</FormLabel>
              <OutlinedInput
                value={length}
                type="number"
                inputMode="numeric"
                id="length"
                onChange={(e) => { setLength(e.target.value) }}
                size="small"
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
              <FormLabel id="numbersLabel">Numbers:</FormLabel>
              <Switch
                checked={hasNumbers}
                onChange={(e) => { setHasNumbers(e.target.checked); }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
              <FormLabel id="symbolsLabel">Symbols:</FormLabel>
              <Switch
                checked={hasSymbols}
                onChange={(e) => { setHasSymbols(e.target.checked); }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </form>
  );
};

export default PasswordGenerator;
