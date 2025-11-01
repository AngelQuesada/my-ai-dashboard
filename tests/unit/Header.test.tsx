import { render, screen, fireEvent, act } from '@testing-library/react';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the Supabase client
const signOutMock = jest.fn();
jest.mock('@supabase/ssr', () => ({
  createBrowserClient: jest.fn(() => ({
    auth: {
      signOut: signOutMock,
    },
  })),
}));

describe('Header', () => {
  it('renders the header and handles logout', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<Header />);

    // Check that the title is rendered
    expect(screen.getByText('My AI Dashboard')).toBeInTheDocument();

    // Click the menu button
    fireEvent.click(screen.getByLabelText('menu'));

    // Check that the logout menu item is visible
    const logoutMenuItem = screen.getByText('Cerrar Sesión');
    expect(logoutMenuItem).toBeInTheDocument();

    // Click the logout menu item
    await act(async () => {
      fireEvent.click(logoutMenuItem);
    });


    // Check that the signOut method was called and the user was redirected
    expect(signOutMock).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith('/login');
  });
});
