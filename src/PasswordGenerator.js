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
import { LANG, TYPE } from './lib/constants';

const PasswordGenerator = (props) => {
  const { onPasswordGenerated, requirements, removeCopy, customType } = props;
  const [type, setType] = React.useState(customType || TYPE.PASSPHRASE);
  const [letterLength, setLetterLength] = React.useState(requirements?.minLength ?? 10);
  // Math here doesn't guarantee it will be minLength from requirements but should be good enough for demo.
  // We should consider making genpass accept a letter length even when type is passphrase
  const [wordLength, setWordLength] = React.useState(requirements?.minLength ? Math.ceil(requirements?.minLength / 4) :  4);
  const [hasSymbols, setHasSymbols] = React.useState(
    Boolean(requirements?.minSymbol)
  )
  const [hasNumbers, setHasNumbers] = React.useState(
    Boolean(requirements?.minNumber)
  )
  const [generatedPassword, setGeneratedPassword] = React.useState('');
  const [language, setLanguage] = React.useState(LANG.EN);

  const getNewPasswordAndSetIt = async () => {
    try {
      const password = await genpass({
        checkForPwnded: true,
        type,
        language,
        length: type === TYPE.PASSPHRASE ? wordLength: letterLength,
        symbols: hasSymbols,
        numbers: hasNumbers,
        checkForPwned: true
      })
      setGeneratedPassword(password);
      onPasswordGenerated?.(password);
    } catch (e) {
      console.log(e)
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPassword)
  };

  React.useEffect(() => {
    getNewPasswordAndSetIt();
  }, [type, letterLength, wordLength, hasSymbols, hasNumbers, language]);

  return (
    <form style={{ minWidth: '320px', padding: '20px' }}>
      <Stack direction="column" spacing={1}>
        <OutlinedInput
          type="text"
          value={generatedPassword}
          sx={{
            borderRadius: '7px',
            '& input.MuiInputBase-readOnly': {
              '-webkit-text-fill-color': '#333',
              fontSize: '18px',
              padding: '10px 0px 10px 15px',
              textOverflow: 'ellipsis',
              zIndex: removeCopy && '1',
            },
            '&.MuiInputBase-root.MuiInputBase-readOnly .MuiOutlinedInput-notchedOutline': {
              backgroundColor: '#e6e6e6',
              borderColor: '#ccc',
              borderRadius: 'inherit',
              zIndex: !removeCopy && '-1',
            },
            '&.MuiInputBase-root.MuiInputBase-readOnly .MuiInputAdornment-root': {
              zIndex: removeCopy && '1',
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
            display: removeCopy && 'none',
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
          mt: '24px !important',
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          padding: '15px',
        }}>
          <Stack direction="column" spacing={1}>
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
                {type === TYPE.PASSPHRASE && (
                  <Select
                    labelId="genType"
                    id="language"
                    value={language}
                    onChange={(e) => { setLanguage(e.target.value) }}
                    sx={{
                      fontSize: '14px',
                      '&.MuiInputBase-root': {
                        marginTop: 0,
                      },
                    }}
                  >
                    <MenuItem value={LANG.EN}>English</MenuItem>
                    <MenuItem value={LANG.ES}>Spanish</MenuItem>
                    <MenuItem value={LANG.FR}>French</MenuItem>
                  </Select>
                )}
              </Stack>
            </FormControl>

            {type === TYPE.PASSPHRASE && <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="baseline">
              <FormLabel id="lengthLabel" sx={{ color: '#333', fontSize: '14px' }}> Words</FormLabel>
              <OutlinedInput
                value={wordLength}
                type="number"
                inputMode="numeric"
                id="length"
                onChange={(e) => { setWordLength(Number(e.target.value ?? 0)) }}
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
            </Stack>}

            {type !== TYPE.PASSPHRASE && <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="baseline">
              <FormLabel id="lengthLabel" sx={{ color: '#333', fontSize: '14px' }}>Letters</FormLabel>
              <OutlinedInput
                value={letterLength}
                type="number"
                inputMode="numeric"
                id="length"
                onChange={(e) => { setLetterLength(Number(e.target.value ?? 0)) }}
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
            </Stack>}

            {type !== TYPE.PIN && <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="baseline">
              <FormLabel id="numbersLabel" sx={{ color: '#333', fontSize: '14px' }}>Numbers</FormLabel>
              <Switch
                checked={hasNumbers}
                onChange={(e) => { setHasNumbers(e.target.checked); }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>}

            {type !== TYPE.PIN && <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="baseline">
              <FormLabel id="symbolsLabel" sx={{ color: '#333', fontSize: '14px' }}>Symbols</FormLabel>
              <Switch
                checked={hasSymbols}
                onChange={(e) => { setHasSymbols(e.target.checked); }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Stack>}
          </Stack>
        </Box>
      </Stack>
    </form>
  );
};

export default PasswordGenerator;
