import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CronConfig from './CronConfig';
import { useState } from 'react';

type FamososGranadaModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (config: any) => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Este es el componente del modal de configuración para la caja "Búsqueda de famosos en Granada".
// Contiene el componente de configuración de cron y el campo de texto "Instrucciones para el email".
export default function FamososGranadaModal({
  open,
  onClose,
  onSave,
}: FamososGranadaModalProps) {
  const [cronConfig, setCronConfig] = useState({
    frequency: 'never',
    dayOfWeek: 1,
    dayOfMonth: 1,
    time: '08:00',
  });
  const [emailInstructions, setEmailInstructions] = useState('');

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Configuración de &quot;Búsqueda de famosos en Granada&quot;
        </Typography>
        <CronConfig
          value={cronConfig}
          onChange={setCronConfig}
        />
        <TextField
          label="Instrucciones para el email"
          multiline
          rows={4}
          fullWidth
          sx={{ mt: 2 }}
          value={emailInstructions}
          onChange={(e) => setEmailInstructions(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            variant="contained"
            sx={{ ml: 1 }}
            onClick={() => onSave({ cronConfig, emailInstructions })}
          >
            Guardar Cambios
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
