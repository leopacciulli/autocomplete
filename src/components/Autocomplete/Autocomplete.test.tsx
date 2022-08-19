import { render, fireEvent } from '@testing-library/react';
import { Autocomplete } from './Autocomplete';
import { searchApiV2 } from 'services/api';
import { Country } from 'services/types';

// I created some tests, but it would be necessary to create tests for all scenarios within the component, because of time, I chose to create just a few.

const loadOptions = async (query: string): Promise<Country[]> => {
  return await searchApiV2(query);
};

describe('Autocomplete', () => {
  it('Should render', () => {
    const { getByTestId } = render(<Autocomplete loadOptions={loadOptions} />);

    const autocomplete = getByTestId('autocomplete');
    expect(autocomplete).toBeTruthy();
  });

  it('Should show results', () => {
    const { getByTestId } = render(<Autocomplete loadOptions={loadOptions} />);

    const input = getByTestId('autocomplete-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'brazil' } });

    const results = getByTestId('autocomplete-results');

    expect(results).toBeTruthy();
  });

  it('Should change input value', () => {
    const { getByTestId } = render(<Autocomplete loadOptions={loadOptions} />);

    const input = getByTestId('autocomplete-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'brazil' } });

    expect(input.value).toBe('brazil');
  });

  it('Should show clear icon', async () => {
    const { getByTestId, findAllByTestId } = render(
      <Autocomplete loadOptions={loadOptions} />,
    );

    const input = getByTestId('autocomplete-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'brazil' } });

    const options = await findAllByTestId('autocomplete-option');

    setTimeout(() => {
      fireEvent.click(options[0]);

      const clearIcon = getByTestId('autocomplete-clear-icon');

      expect(clearIcon).toBeTruthy();
    }, 600);
  });
});
