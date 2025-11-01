'use client';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  Avatar,
  CircularProgress,
} from '@mui/d-material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import FamososGranadaModal from './FamososGranadaModal';
import { useRouter } from 'next/navigation';

// Este es el componente de la caja "Búsqueda de famosos en Granada".
// Muestra la información de la última ejecución y los botones para configurar, abrir y ejecutar la caja.
export default function FamososGranadaBox() {
  const [lastExecution, setLastExecution] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Esta función se ejecuta cuando el usuario hace clic en el botón de configuración.
  // Abre el modal de configuración.
  const handleConfigure = () => {
    setIsModalOpen(true);
  };

  // Esta función se ejecuta cuando el usuario cierra el modal de configuración.
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Esta función se ejecuta cuando el usuario hace clic en el botón "Abrir Caja".
  // Navega a la página de resultados de la caja.
  const handleOpenBox = () => {
    router.push('/cajas/famosos-granada');
  };

  // Esta función se ejecuta cuando el usuario hace clic en el botón "Ejecutar".
  // Llama a la API de backend para iniciar una ejecución manual.
  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      const response = await fetch('/api/execute-box/famosos-granada', {
        method: 'POST',
      });
      if (response.ok) {
        setLastExecution(new Date().toLocaleString());
      } else {
        alert('Error al ejecutar la caja');
      }
    } catch (error) {
      console.error(error);
      alert('Error al ejecutar la caja');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar>FG</Avatar>} // Icono de marcador de posición
          title="Búsqueda de famosos en Granada"
          action={
            <IconButton aria-label="settings" onClick={handleConfigure}>
              <SettingsIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Última ejecución: {lastExecution || 'Nunca ejecutado'}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button size="small" onClick={handleOpenBox}>
            Abrir Caja
          </Button>
          <Button size="small" onClick={handleExecute} disabled={isExecuting}>
            {isExecuting ? <CircularProgress size={24} /> : 'Ejecutar'}
          </Button>
        </CardActions>
      </Card>
      <FamososGranadaModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
