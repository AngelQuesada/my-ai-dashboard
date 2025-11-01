import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FamososGranadaModal from '@/components/boxes/FamososGranadaModal';

describe('FamososGranadaModal', () => {
  it('renders the modal and handles close and save', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    const handleSave = jest.fn();

    render(<FamososGranadaModal open={true} onClose={handleClose} onSave={handleSave} />);

    // Check that the modal is rendered
    expect(screen.getByText('Configuración de "Búsqueda de famosos en Granada"')).toBeInTheDocument();

    // Click the "Cancelar" button
    await user.click(screen.getByRole('button', { name: /Cancelar/i }));

    // Check that the onClose callback was called
    expect(handleClose).toHaveBeenCalled();

    // Click the "Guardar Cambios" button
    await user.click(screen.getByRole('button', { name: /Guardar Cambios/i }));

    // Check that the onSave callback was called
    expect(handleSave).toHaveBeenCalled();
  });
});
