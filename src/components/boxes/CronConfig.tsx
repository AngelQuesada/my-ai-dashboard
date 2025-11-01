'use client';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
} from '@mui/material';

type CronConfigProps = {
  value: {
    frequency: string;
    dayOfWeek: number;
    dayOfMonth: number;
    time: string;
  };
  onChange: (value: any) => void;
};

// Este es un componente reutilizable para configurar la programación de cron.
// Permite al usuario seleccionar la frecuencia, el día de la semana, el día del mes y la hora.
export default function CronConfig({ value, onChange }: CronConfigProps) {
  const { frequency, dayOfWeek, dayOfMonth, time } = value;

  const handleChange = (field: string, newValue: any) => {
    onChange({ ...value, [field]: newValue });
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <FormControl fullWidth>
          <InputLabel id="frequency-label">Frecuencia</InputLabel>
          <Select
            labelId="frequency-label"
            id="frequency-select"
            value={frequency}
            label="Frecuencia"
            onChange={(e) => handleChange('frequency', e.target.value)}
            inputProps={{ 'data-testid': 'frequency-select' }}
          >
            <MenuItem value="never">Nunca</MenuItem>
            <MenuItem value="daily">Diariamente</MenuItem>
            <MenuItem value="weekly">Semanalmente</MenuItem>
            <MenuItem value="monthly">Mensualmente</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {/* // Si la frecuencia es diaria, mostramos el campo de la hora. */}
      {frequency === 'daily' && (
        <Grid xs={12}>
          <TextField
            label="Hora"
            type="time"
            value={time}
            onChange={(e) => handleChange('time', e.target.value)}
            fullWidth
          />
        </Grid>
      )}
      {/* // Si la frecuencia es semanal, mostramos el campo del día de la semana y la hora. */}
      {frequency === 'weekly' && (
        <>
          <Grid xs={6}>
            <FormControl fullWidth>
              <InputLabel>Día de la semana</InputLabel>
              <Select
                value={dayOfWeek}
                label="Día de la semana"
                onChange={(e) => handleChange('dayOfWeek', Number(e.target.value))}
              >
                <MenuItem value={1}>Lunes</MenuItem>
                <MenuItem value={2}>Martes</MenuItem>
                <MenuItem value={3}>Miércoles</MenuItem>
                <MenuItem value={4}>Jueves</MenuItem>
                <MenuItem value={5}>Viernes</MenuItem>
                <MenuItem value={6}>Sábado</MenuItem>
                <MenuItem value={7}>Domingo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={6}>
            <TextField
              label="Hora"
              type="time"
              value={time}
              onChange={(e) => handleChange('time', e.target.value)}
              fullWidth
            />
          </Grid>
        </>
      )}
      {/* // Si la frecuencia es mensual, mostramos el campo del día del mes y la hora. */}
      {frequency === 'monthly' && (
        <>
          <Grid xs={6}>
            <TextField
              label="Día del mes"
              type="number"
              value={dayOfMonth}
              onChange={(e) => handleChange('dayOfMonth', Number(e.target.value))}
              inputProps={{ min: 1, max: 31 }}
              fullWidth
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label="Hora"
              type="time"
              value={time}
              onChange={(e) => handleChange('time', e.target.value)}
              fullWidth
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}
