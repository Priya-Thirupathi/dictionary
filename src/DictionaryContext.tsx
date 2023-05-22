import { createContext, PropsWithChildren, useContext, useReducer } from "react";
import { dictionaryData, DataType } from "./data";
import _ from "lodash";
import { stat } from "fs";


type State = {
  data: DataType[],
  searchText: string,
  searchResult: DataType[]
}

type Action =
  | { type: 'search', payload: string }
  | { type: 'add_word', payload: DataType }

type DictionaryContextType = {
  data: DataType[],
  searchText: string,
  searchResult: DataType[],
  onSearch: (obj: string) => void,
  onAddNewWord: (obj: DataType) => void
}
const initialState = {
  data: dictionaryData,
  searchText: '',
  searchResult: [],
}

const defaultDictionaryContext = {
  data: [],
  searchText: '',
  searchResult: [],
  onSearch: _.noop,
  onAddNewWord: _.noop
}
const DictionaryContext = createContext<DictionaryContextType>(defaultDictionaryContext);

function dictionaryReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'search': {
      return {
        ...state,
        searchText: action.payload,
        searchResult:  action.payload !== '' ? _.filter(state.data, (item) =>
          _.join(item.word, '').toLowerCase()
            .startsWith(action.payload.toLowerCase())) : []
      }
    }
    case 'add_word': {
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    }
  }

}

export function DictionaryProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(dictionaryReducer, initialState);
  const handleSearch = (word: string) => {
    const filteredData = _.filter(state.data, (item) =>
      _.join(item.word, '').toLowerCase()
        .includes(word.toLowerCase())
    );
    dispatch({ type: 'search', payload: word })

  }

  const handleAddNewWord = (obj: DataType) => {
    dispatch({ type: 'add_word', payload: obj })
  }
  const value = {
    data: state.data,
    searchText: state.searchText,
    searchResult: state.searchResult,
    onSearch: handleSearch,
    onAddNewWord: handleAddNewWord,
  }
  return (
    <DictionaryContext.Provider value={value}>
      {children}
    </DictionaryContext.Provider>
  );
}


export const useDictionaryContext = () => {
  return useContext(DictionaryContext)
}