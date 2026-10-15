import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

test('selects a lead, shows its details, and logs an activity', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.click(screen.getByText('John Doe - john@example.com'));

  expect(screen.getByText('Name:').parentElement).toHaveTextContent('John Doe');
  expect(screen.getByText('Phone:').parentElement).toHaveTextContent('1234567890');

  fireEvent.click(screen.getByText('Add Activity'));
  expect(screen.getByRole('alert')).toHaveTextContent('Please enter an activity.');

  fireEvent.change(screen.getByLabelText('Follow-up activity'), {
    target: { value: 'Called customer' },
  });
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  fireEvent.click(screen.getByText('Add Activity'));

  expect(screen.getByText(/Called customer/)).toBeInTheDocument();
});
