import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';
import HomePage from '.';

expect.extend(toHaveNoViolations);

describe('HomePage component', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
