import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../Button';
describe('Button', () => {
  it('should render the Button component', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toBe('test');
  });
});
