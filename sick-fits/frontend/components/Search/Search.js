/* eslint-disable react/jsx-props-no-spreading */
import { resetIdCounter, useCombobox } from 'downshift';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown';
import SEARCH_PRODUCTS_QUERY from './queries/searchQuery';

export default function Search() {
  const router = useRouter();

  const [findItems, { data, loading: isLoading }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    },
  );

  const results = data?.searchResults || [];
  const findItemsButtChill = debounce(findItems, 222);

  // handle server side render mismatch with downshift:
  resetIdCounter();

  const {
    isOpen,
    inputValue,
    getItemProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
  } = useCombobox({
    items: results,
    onInputValueChange() {
      findItemsButtChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem?.id}`,
      });
    },
    itemToString: (item) => item?.name || '',
  });

  const searchResults = results.map((result, idx) => (
    <DropDownItem
      key={result.id}
      highlighted={idx === highlightedIndex}
      {...getItemProps({ item: result })}
    >
      <img
        alt={result.description}
        src={result.photo.image.publicUrlTransformed}
        width="50"
      />
      {result.name}
    </DropDownItem>
  ));

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            id: 'search',
            type: 'search',
            className: isLoading ? 'loading' : '',
            placeholder: 'search for an item',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen && searchResults}
        {isOpen && !results.length && !isLoading && (
          <DropDownItem>Nothing has been successfully found 🎉</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
/* eslint-enable react/jsx-props-no-spreading */
