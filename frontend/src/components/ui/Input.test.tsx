import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, Textarea } from './Input';

describe('Input Component', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('bg-white', 'border', 'border-slate-300');
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Input variant="default" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('bg-white', 'border', 'border-slate-300');

    rerender(<Input variant="filled" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('bg-slate-50', 'border', 'border-transparent');

    rerender(<Input variant="outlined" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('bg-transparent', 'border-2', 'border-slate-300');
  });

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Input size="sm" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('px-3', 'py-1.5', 'text-sm');

    rerender(<Input size="md" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('px-3', 'py-2', 'text-sm');

    rerender(<Input size="lg" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('px-4', 'py-3', 'text-base');
  });

  it('renders different states correctly', () => {
    const { rerender } = render(<Input state="success" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('border-emerald-300');

    rerender(<Input state="warning" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('border-amber-300');

    rerender(<Input state="error" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('border-red-300');
  });

  it('renders with label', () => {
    render(<Input label="Email Address" />);
    const label = screen.getByText('Email Address');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  it('renders with required indicator', () => {
    render(<Input label="Email Address" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-red-500');
  });

  it('renders with helper text', () => {
    render(<Input helperText="Enter your email address" />);
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<Input error="Email is required" />);
    const errorMessage = screen.getByText('Email is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-red-600');
  });

  it('prioritizes error over helper text', () => {
    render(<Input helperText="Helper text" error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });

  it('renders with left icon', () => {
    const LeftIcon = () => <span data-testid="left-icon">@</span>;
    render(<Input leftIcon={<LeftIcon />} data-testid="input" />);

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toHaveClass('pl-10');
  });

  it('renders with right icon', () => {
    const RightIcon = () => <span data-testid="right-icon">✓</span>;
    render(<Input rightIcon={<RightIcon />} data-testid="input" />);

    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toHaveClass('pr-10');
  });

  it('renders with both left and right icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">@</span>;
    const RightIcon = () => <span data-testid="right-icon">✓</span>;
    render(<Input leftIcon={<LeftIcon />} rightIcon={<RightIcon />} data-testid="input" />);

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toHaveClass('pl-10', 'pr-10');
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');

    await user.type(input, 'Hello World');
    expect(input).toHaveValue('Hello World');
  });

  it('handles change events', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');

    await user.type(input, 'test');
    expect(handleChange).toHaveBeenCalled();
  });

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText('Disabled input');

    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('custom-class');
  });

  it('applies container className', () => {
    render(<Input containerClassName="custom-container" label="Test" />);
    const container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('custom-container');
  });

  it('applies label className', () => {
    render(<Input label="Test Label" labelClassName="custom-label" />);
    expect(screen.getByText('Test Label')).toHaveClass('custom-label');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('has proper accessibility attributes', () => {
    render(<Input label="Email" error="Invalid email" />);
    const input = screen.getByLabelText('Email');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('generates unique IDs when not provided', () => {
    render(
      <div>
        <Input label="First Input" />
        <Input label="Second Input" />
      </div>
    );

    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0].id).not.toBe(inputs[1].id);
  });

  it('uses provided ID', () => {
    render(<Input id="custom-id" label="Custom ID Input" />);
    const input = screen.getByLabelText('Custom ID Input');
    expect(input).toHaveAttribute('id', 'custom-id');
  });
});

describe('Textarea Component', () => {
  it('renders with default props', () => {
    render(<Textarea placeholder="Enter message" />);
    const textarea = screen.getByPlaceholderText('Enter message');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Textarea variant="default" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('bg-white', 'border', 'border-slate-300');

    rerender(<Textarea variant="filled" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('bg-slate-50', 'border', 'border-transparent');

    rerender(<Textarea variant="outlined" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('bg-transparent', 'border-2', 'border-slate-300');
  });

  it('renders with label', () => {
    render(<Textarea label="Message" />);
    const label = screen.getByText('Message');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  it('renders with required indicator', () => {
    render(<Textarea label="Message" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<Textarea error="Message is required" />);
    const errorMessage = screen.getByText('Message is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-red-600');
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Enter message" />);
    const textarea = screen.getByPlaceholderText('Enter message');

    await user.type(textarea, 'Hello World');
    expect(textarea).toHaveValue('Hello World');
  });

  it('handles disabled state', () => {
    render(<Textarea disabled placeholder="Disabled textarea" />);
    const textarea = screen.getByPlaceholderText('Disabled textarea');

    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
  });

  it('sets default rows', () => {
    render(<Textarea data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveAttribute('rows', '3');
  });

  it('accepts custom rows', () => {
    render(<Textarea rows={5} data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveAttribute('rows', '5');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Textarea ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('has proper accessibility attributes', () => {
    render(<Textarea label="Message" error="Invalid message" />);
    const textarea = screen.getByLabelText('Message');

    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby');
  });
});