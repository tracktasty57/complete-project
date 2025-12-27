import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardBody, 
  CardFooter 
} from './Card';

describe('Card Component', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('bg-white', 'border', 'border-slate-200', 'shadow-sm');
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Card variant="default">Default</Card>);
    expect(screen.getByText('Default')).toHaveClass('bg-white', 'border', 'border-slate-200');

    rerender(<Card variant="elevated">Elevated</Card>);
    expect(screen.getByText('Elevated')).toHaveClass('bg-white', 'shadow-lg', 'border-0');

    rerender(<Card variant="outlined">Outlined</Card>);
    expect(screen.getByText('Outlined')).toHaveClass('bg-white', 'border-2', 'border-slate-300');

    rerender(<Card variant="filled">Filled</Card>);
    expect(screen.getByText('Filled')).toHaveClass('bg-slate-50', 'border', 'border-slate-200');
  });

  it('renders different padding sizes correctly', () => {
    const { rerender } = render(<Card padding="none">No padding</Card>);
    expect(screen.getByText('No padding')).toHaveClass('p-0');

    rerender(<Card padding="sm">Small padding</Card>);
    expect(screen.getByText('Small padding')).toHaveClass('p-3');

    rerender(<Card padding="md">Medium padding</Card>);
    expect(screen.getByText('Medium padding')).toHaveClass('p-4');

    rerender(<Card padding="lg">Large padding</Card>);
    expect(screen.getByText('Large padding')).toHaveClass('p-6');

    rerender(<Card padding="xl">Extra large padding</Card>);
    expect(screen.getByText('Extra large padding')).toHaveClass('p-8');
  });

  it('applies hoverable styles when hoverable is true', () => {
    render(<Card hoverable>Hoverable card</Card>);
    expect(screen.getByText('Hoverable card')).toHaveClass('hover:shadow-md', 'hover:-translate-y-0.5');
  });

  it('applies clickable styles when clickable is true', () => {
    render(<Card clickable>Clickable card</Card>);
    const card = screen.getByText('Clickable card');
    
    expect(card).toHaveClass('cursor-pointer', 'focus:outline-none', 'focus:ring-2');
    expect(card).toHaveAttribute('tabIndex', '0');
    expect(card).toHaveAttribute('role', 'button');
  });

  it('handles click events when clickable', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Card clickable onClick={handleClick}>Clickable card</Card>);
    const card = screen.getByText('Clickable card');
    
    await user.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events when clickable', () => {
    const handleKeyDown = vi.fn();
    
    render(<Card clickable onKeyDown={handleKeyDown}>Clickable card</Card>);
    const card = screen.getByText('Clickable card');
    
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Custom card</Card>);
    expect(screen.getByText('Custom card')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Ref card</Card>);
    expect(ref).toHaveBeenCalled();
  });
});

describe('CardHeader Component', () => {
  it('renders correctly', () => {
    render(<CardHeader>Header content</CardHeader>);
    const header = screen.getByText('Header content');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'pb-4');
  });

  it('applies custom className', () => {
    render(<CardHeader className="custom-header">Header</CardHeader>);
    expect(screen.getByText('Header')).toHaveClass('custom-header');
  });
});

describe('CardTitle Component', () => {
  it('renders as h3 by default', () => {
    render(<CardTitle>Card Title</CardTitle>);
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-lg', 'font-semibold');
  });

  it('renders with different heading levels', () => {
    const { rerender } = render(<CardTitle as="h1">Title H1</CardTitle>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    rerender(<CardTitle as="h2">Title H2</CardTitle>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();

    rerender(<CardTitle as="h4">Title H4</CardTitle>);
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CardTitle className="custom-title">Title</CardTitle>);
    expect(screen.getByText('Title')).toHaveClass('custom-title');
  });
});

describe('CardDescription Component', () => {
  it('renders correctly', () => {
    render(<CardDescription>Card description</CardDescription>);
    const description = screen.getByText('Card description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm', 'text-slate-600');
  });

  it('applies custom className', () => {
    render(<CardDescription className="custom-desc">Description</CardDescription>);
    expect(screen.getByText('Description')).toHaveClass('custom-desc');
  });
});

describe('CardBody Component', () => {
  it('renders correctly', () => {
    render(<CardBody>Body content</CardBody>);
    const body = screen.getByText('Body content');
    expect(body).toBeInTheDocument();
    expect(body).toHaveClass('flex-1');
  });

  it('applies custom className', () => {
    render(<CardBody className="custom-body">Body</CardBody>);
    expect(screen.getByText('Body')).toHaveClass('custom-body');
  });
});

describe('CardFooter Component', () => {
  it('renders correctly', () => {
    render(<CardFooter>Footer content</CardFooter>);
    const footer = screen.getByText('Footer content');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('flex', 'items-center', 'pt-4');
  });

  it('applies custom className', () => {
    render(<CardFooter className="custom-footer">Footer</CardFooter>);
    expect(screen.getByText('Footer')).toHaveClass('custom-footer');
  });
});

describe('Card Composition', () => {
  it('renders complete card with all components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
          <CardDescription>This is a test card description</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Card body content</p>
        </CardBody>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByRole('heading', { name: 'Test Card' })).toBeInTheDocument();
    expect(screen.getByText('This is a test card description')).toBeInTheDocument();
    expect(screen.getByText('Card body content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });
});