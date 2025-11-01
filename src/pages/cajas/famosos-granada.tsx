import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
} from '@mui/material';
import Header from '@/components/Header';
import { useState } from 'react';

// Esta es la página de resultados para la caja "Búsqueda de famosos en Granada".
// Muestra los resultados de la última ejecución en una tabla.
export default function FamososGranadaPage({ results }) {
  const [selectedResult, setSelectedResult] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Esta función se ejecuta cuando el usuario hace clic en el botón "Generar Email".
  // Abre un modal con el texto del email sugerido.
  const handleGenerateEmail = (result: any) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

  return (
    <main>
      <Header />
      <TableContainer component={Paper} sx={{ m: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Evento</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Localización</TableCell>
              <TableCell>Famoso Principal</TableCell>
              <TableCell>Contacto</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results?.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.nombre_evento}</TableCell>
                <TableCell>{result.descripcion}</TableCell>
                <TableCell>{result.localizacion}</TableCell>
                <TableCell>{result.famoso_principal}</TableCell>
                <TableCell>{result.metodo_contacto}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => handleGenerateEmail(result)}
                  >
                    Generar Email
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Email Sugerido
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Aquí iría el texto del email sugerido, generado a partir de las
            instrucciones y los datos del evento.
          </Typography>
        </Box>
      </Modal>
    </main>
  );
}

export async function getServerSideProps(context) {
  const supabase = createPagesServerClient(context);
  const { data: results, error } = await supabase
    .from('resultados_famosos_granada')
    .select('*');

  return {
    props: {
      results,
    },
  };
}
