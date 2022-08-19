import {
  ReactElement,
  ChangeEvent,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { useDebounce } from 'hooks/useDebounce';
import { Text } from 'components/Text';
import { parse, match } from './utils';
import { SEARCHING, NOT_DATA_FOUND } from './constants';
import {
  Container,
  Input,
  ContentList,
  ContainerItem,
  ContainerList,
  ContainerInput,
  CloseIcon,
} from './styles';

export interface Option {
  id: number;
  name: string;
  internal?: boolean;
}

interface AutocompleteProps {
  label?: string;
  placeholder?: string;
  onSelect?: (option?: Option) => void;
  loadOptions: (query: string) => Promise<Option[]>;
}

export const Autocomplete = ({
  label,
  onSelect,
  loadOptions,
  placeholder,
}: AutocompleteProps): ReactElement => {
  const [options, setOptions] = useState<Option[]>([]);
  const [internalSelectedOption, setInternalSelectedOption] =
    useState<Option>();
  const [textInput, setTextInput] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceSearch = useDebounce(textInput, 600);

  useEffect(() => {
    const fetchOptions = async (): Promise<void> => {
      const options = await loadOptions(debounceSearch);
      setLoading(false);
      setOptions(options.length ? options : NOT_DATA_FOUND);
    };

    if (activeSearch && debounceSearch) {
      fetchOptions();
    }
  }, [activeSearch, debounceSearch, loadOptions]);

  useEffect(() => {
    setShowResults(options.length > 0);
  }, [options]);

  const onHandleClearSelection = useCallback((): void => {
    setInternalSelectedOption(undefined);
    setActiveSearch(false);
    setLoading(false);
    setOptions([]);
    setTextInput('');
    onSelect?.();
  }, [onSelect]);

  const onHandleClickOutside = useCallback((): void => {
    setShowResults(false);

    if (textInput && !internalSelectedOption?.name) {
      onHandleClearSelection();
    } else if (textInput !== internalSelectedOption?.name) {
      internalSelectedOption?.name && setTextInput(internalSelectedOption.name);
      setActiveSearch(false);
    }
  }, [internalSelectedOption, onHandleClearSelection, textInput]);

  const onHandleChangeText = (event: ChangeEvent<HTMLInputElement>): void => {
    setActiveSearch(true);
    setTextInput(event.target.value);
    setLoading(true);
    setOptions(SEARCHING);

    if (!event.target.value) {
      onHandleClearSelection();
    }
  };

  const onHandleSelect = useCallback(
    (item: Option): void => {
      if (item.internal) {
        return;
      }

      setActiveSearch(false);
      setTextInput(item?.name);
      setInternalSelectedOption(item);
      setOptions([]);
      onSelect?.(item);
    },
    [onSelect],
  );

  const renderOption = (item: Option): ReactElement => {
    const matches = match(item.name, textInput);
    const parts = parse(item.name, matches);
    const isSelected = item.name === internalSelectedOption?.name;

    return (
      <ContainerItem
        data-testid="autocomplete-option"
        key={item.id}
        onClick={() => onHandleSelect(item)}
        onMouseDown={event => event.preventDefault()}
        isSelected={isSelected}
      >
        {parts.map((part, index) => (
          <Text key={index} highlight={loading ? false : part.highlight}>
            {part.text}
          </Text>
        ))}
      </ContainerItem>
    );
  };

  return (
    <Container ref={containerRef} data-testid="autocomplete">
      {label && <Text>{label}</Text>}
      <ContainerInput>
        <Input
          data-testid="autocomplete-input"
          maxLength={80}
          onChange={onHandleChangeText}
          value={textInput}
          placeholder={placeholder}
          onBlur={onHandleClickOutside}
        />
        {internalSelectedOption?.name && (
          <CloseIcon
            onClick={onHandleClearSelection}
            data-testid="autocomplete-clear-icon"
          />
        )}
      </ContainerInput>
      {showResults && (
        <ContainerList ref={listRef} data-testid="autocomplete-results">
          <ContentList>{options.map(item => renderOption(item))}</ContentList>
        </ContainerList>
      )}
    </Container>
  );
};
