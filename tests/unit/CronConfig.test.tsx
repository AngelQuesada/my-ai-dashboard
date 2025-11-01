import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CronConfig from '@/components/boxes/CronConfig';

describe('CronConfig', () => {
  it('renders the component and handles changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const initialValue = {
      frequency: 'never',
      dayOfWeek: 1,
      dayOfMonth: 1,
      time: '08:00',
    };

    render(<CronConfig value={initialValue} onChange={handleChange} />);

    // Change the frequency
    await user.click(screen.getByRole('combobox', { name: /Frecuencia/i }));
    await user.click(screen.getByRole('option', { name: 'Diariamente' }));


    // Check that the onChange callback was called with the correct value
    expect(handleChange).toHaveBeenCalledWith({
      ...initialValue,
      frequency: 'daily',
    });
  });
});
