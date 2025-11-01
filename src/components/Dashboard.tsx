'use client';
import { Grid } from '@mui/material';
import FamososGranadaBox from './boxes/FamososGranadaBox';

// Este es el componente del dashboard.
// Muestra una cuadrícula con todas las "Cajas" configuradas por el usuario.
export default function Dashboard() {
  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {/* // Por ahora, solo mostramos la caja "Búsqueda de famosos en Granada". */}
      <Grid xs={12} sm={6} md={4}>
        <FamososGranadaBox />
      </Grid>
    </Grid>
  );
}
