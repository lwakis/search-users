import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('App renders', () => {
    render(<App />);

    expect(screen.queryByRole('App')).toBeNull();
  });

  it('App snapshot', () => {
    const app = render(<App />);

    expect(app).toMatchSnapshot();
  })
});

