import React from 'react'
import genpass from './lib/genpass';
import { Box, Button, OutlinedInput, Stack, InputAdornment, IconButton } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import Switch from '@mui/material/Switch';
import { TYPE } from './lib/constants';

const PasswordGenerator = (props) => {
  const { onPasswordGenerated, requirements } = props;
  const [type, setType] = React.useState(TYPE.PASSPHRASE);
  const [length, setLength] = React.useState(requirements?.minLength ?? 4);
  const [hasSymbols, setHasSymbols] = React.useState(
    Boolean(requirements?.minSymbol)
  )
  const [hasNumbers, setHasNumbers] = React.useState(
    Boolean(requirements?.minNumber)
  )
  const [generatedPassword, setGeneratedPassword] = React.useState('');

  const getNewPasswordAndSetIt = async () => {
    const password = await genpass({ type, length, symbols: hasSymbols, numbers: hasNumbers })
      .catch((error) => { console.log(error); return ''; });
    setGeneratedPassword(password);
    onPasswordGenerated?.(password);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPassword)
  };

  React.useEffect(() => {
    getNewPasswordAndSetIt();
  }, [type, length, hasSymbols, hasNumbers]);

  return (
    <form style={{ width: '340px', margin: '20px' }}>
      <Stack direction="column" spacing={1}>
        <OutlinedInput
          type="text"
          value={generatedPassword}
          sx={{
            borderRadius: '7px',
            width: '340px',
            '& input.MuiInputBase-readOnly': {
              '-webkit-text-fill-color': '#333',
              fontSize: '18px',
              padding: '10px 15px',
              textOverflow: 'ellipsis',
            },
            '&.MuiInputBase-root.MuiInputBase-readOnly .MuiOutlinedInput-notchedOutline': {
              backgroundColor: '#e6e6e6',
              borderColor: '#ccc',
              borderRadius: 'inherit',
              zIndex: '-1',
            },
          }}
          readOnly
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton size="small" onClick={getNewPasswordAndSetIt}>
                <ReplayIcon />
              </IconButton>
            </InputAdornment>
          }
        />
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
        <Box sx={{
          mt: '30px !important',
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          padding: '15px',
        }}>
          <Stack direction="column" spacing={2}>
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="baseline" gap={2}>
                <FormLabel
                  id="genType"
                  sx={{
                    color: '#777',
                    fontSize: '14px',
                  }}>
                  Type
                </FormLabel>
                <Select
                  labelId="genType"
                  id="type"
                  value={type}
                  onChange={(e) => { setType(e.target.value) }}
                  sx={{
                    fontSize: '14px',
                    '&.MuiInputBase-root': {
                      marginTop: 0,
                    },
                  }}
                >
                  <MenuItem value={TYPE.PASSPHRASE}>Passphrase</MenuItem>
                  <MenuItem value={TYPE.RANDOM}>Random password</MenuItem>
                  <MenuItem value={TYPE.PIN}>PIN</MenuItem>
                </Select>
              </Stack>
            </FormControl>

            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="baseline">
              <FormLabel id="lengthLabel" sx={{ color: '#333', fontSize: '14px' }}> Words</FormLabel>
              <OutlinedInput
                value={length}
                type="number"
                inputMode="numeric"
                id="length"
                onChange={(e) => { setLength(Number(e.target.value ?? 0)) }}
                size="small"
                sx={{
                  backgroundColor: '#fff',
                  fontSize: '14px',
                  width: '50px',
                  '& input': {
                    padding: '6px 0',
                    textAlign: 'center',
                  },
                  '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': {
                    '-webkit-appearance': 'none',
                  },
                }}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="baseline">
              <FormLabel id="numbersLabel" sx={{ color: '#333', fontSize: '14px' }}>Numbers</FormLabel>
              <Switch
                checked={hasNumbers}
                onChange={(e) => { setHasNumbers(e.target.checked); }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="baseline">
              <FormLabel id="symbolsLabel" sx={{ color: '#333', fontSize: '14px' }}>Symbols</FormLabel>
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
