import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FamososGranadaBox from '@/components/boxes/FamososGranadaBox';
import { useRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../test-utils/createMockRouter';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('FamososGranadaBox', () => {
  it('renders the box and handles button clicks', async () => {
    const user = userEvent.setup();
    const router = createMockRouter();
    (useRouter as jest.Mock).mockReturnValue(router);

    render(
      <RouterContext.Provider value={router}>
        <FamososGranadaBox />
      </RouterContext.Provider>
    );

    // Check that the box is rendered
    expect(screen.getByText('Búsqueda de famosos en Granada')).toBeInTheDocument();

    // Click the "Abrir Caja" button
    await user.click(screen.getByRole('button', { name: /Abrir Caja/i }));

    // Check that the router was called
    expect(router.push).toHaveBeenCalledWith('/cajas/famosos-granada');

    // Click the "Configuración" button
    await user.click(screen.getByLabelText('settings'));

    // Check that the modal is opened
    expect(screen.getByText('Configuración de "Búsqueda de famosos en Granada"')).toBeInTheDocument();
  });
});
