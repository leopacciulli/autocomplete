import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Autocomplete, Option } from 'components/Autocomplete';
import { Text } from 'components/Text';
import { searchApiV2 } from 'services/api';
import { Country } from 'services/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px;
  width: 500px;
`;

const SelectedContainer = styled.div`
  display: flex;
  margin: 50px;
`;

const App = function App(): ReactElement {
  const [selectedOption, setSelectedOption] = useState<Option>();

  const loadOptions = async (query: string): Promise<Country[]> => {
    return await searchApiV2(query);
  };

  const onSelect = (item?: Option): void => {
    setSelectedOption(item);
  };

  return (
    <Container>
      <Autocomplete
        label="Country"
        placeholder="Search country by name..."
        onSelect={onSelect}
        loadOptions={loadOptions}
      />
      <SelectedContainer>
        <Text>Selected option: {JSON.stringify(selectedOption)}</Text>
      </SelectedContainer>
    </Container>
  );
};

export default App;
