import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FamososGranadaBox from '@/components/boxes/FamososGranadaBox';
import { useRouter } from 'next/navigation';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('FamososGranadaBox', () => {
  it('renders the box and handles button clicks', async () => {
    const user = userEvent.setup();
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<FamososGranadaBox />);

    // Check that the box is rendered
    expect(screen.getByText('Búsqueda de famosos en Granada')).toBeInTheDocument();

    // Click the "Abrir Caja" button
    await user.click(screen.getByRole('button', { name: /Abrir Caja/i }));

    // Check that the router was called
    expect(push).toHaveBeenCalledWith('/cajas/famosos-granada');

    // Click the "Configuración" button
    await user.click(screen.getByLabelText('settings'));

    // Check that the modal is opened
    expect(screen.getByText('Configuración de "Búsqueda de famosos en Granada"')).toBeInTheDocument();
  });
});
