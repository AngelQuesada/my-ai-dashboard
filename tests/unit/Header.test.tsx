import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '@/components/Header';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';

// Mock the Supabase client
const signOutMock = jest.fn();
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createBrowserSupabaseClient: jest.fn(() => ({
    auth: {
      signOut: signOutMock,
    },
  })),
}));

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Header', () => {
  it('renders the header and handles logout', async () => {
    const user = userEvent.setup();
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<Header />);

    // Check that the title is rendered
    expect(screen.getByText('My AI Dashboard')).toBeInTheDocument();

    // Click the menu button
    await user.click(screen.getByLabelText('menu'));

    // Check that the logout menu item is visible
    const logoutMenuItem = screen.getByText('Cerrar Sesión');
    expect(logoutMenuItem).toBeInTheDocument();

    // Click the logout menu item
    await act(async () => {
      await user.click(logoutMenuItem);
    });


    // Check that the signOut method was called and the user was redirected
    expect(signOutMock).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith('/login');
  });
});
