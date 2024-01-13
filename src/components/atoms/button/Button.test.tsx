import { render, screen } from '@testing-library/react';
import { Button } from '@/components/atoms/button';

describe('Button component', () => {
  it('renders correctly with approriate role', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
  // Example of a skipped test
  it.skip('renders uppercased text when uppercase prop is true', () => {
    render(<Button uppercase>test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('TEST');
  });
  // Example of a todo test
  it.todo('renders a button with the correct color when color prop is set');

  it('renders a disabled button when disabled prop is true', () => {
    render(<Button disabled>test</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
