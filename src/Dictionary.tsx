import _ from 'lodash';
import { useState } from 'react';
import { useDictionaryContext } from './DictionaryContext';
import './dictionary.css';
import { DataType } from './data';

export default function Dictionary() {
  const { searchResult, searchText, data, onSearch, onAddNewWord } = useDictionaryContext();
  const [temp, setTemp] = useState('');
  const [synonym, setSynonym] = useState('')
  const [wordData, setWordData] = useState<DataType>({
    word: '',
    synonyms: [],
    meaning: ''
  });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.code === 'Enter' && onSearch(temp);
    event.code === 'Backspace'
      && onSearch('');
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setWordData(prevState => ({ ...prevState, [name]: value }))
    console.log(wordData)
  }

  const handleAddSynonyms = () => {
    if (wordData.synonyms.indexOf(synonym) === -1) {
      setWordData((prevState) => ({
        ...prevState,
        synonyms: [...prevState.synonyms, synonym],
      }));
      console.log(wordData.synonyms);
      setSynonym('');
    }

  }

  const handleSubmit = () => {
    onAddNewWord(wordData);
    setWordData({
      word: "",
      synonyms: [],
      meaning: "",
    });
  }


  return (
    <div className='container'>
      <h1>Dictionary</h1>
      <input
        id='search--bar'
        type="text"
        placeholder="Search"
        value={temp}
        onChange={(event) => setTemp(event.target.value)}
        onKeyDown={handleKeyPress}
      />
      {
        _.map(searchResult, (result) => {
          const isFound = !!_.find(data, item => item.word === result.word)
          console.log(isFound)
          return (
            <>
              <div className='result--container' key={result.word}>
                <h3> <u>{result.word}</u></h3>
                <h5> Synonyms </h5>
                <p> {_.join(result.synonyms, ', ')} </p>
                <h5> Meaning </h5>
                <p>{result.meaning}</p>
              </div>
            </>
          )

        })
      }
      <div className='grid--container new--word'>
        <h3> Add Word to Dictionary</h3>
        <div className='grid--item'>
          <input
            id="word"
            name="word"
            placeholder='Enter Word'
            value={wordData.word}
            onChange={handleInputChange} />
        </div>
        <div className='grid--item'>
          <input
            id="synonyms"
            name="synonyms"
            placeholder='Enter Synonyms'
            value={synonym || ''}
            onChange={(event) => setSynonym(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleAddSynonyms();
              }
            }} />
        </div>
        {_.size(wordData.synonyms) > 0 &&
          <div style={{fontSize: 12}}>
           { _.join(wordData.synonyms, ', ')}
          </div>
        }
        <div className='grid--item'>
          <textarea
            id='meaning'
            name="meaning"
            placeholder='Enter Meaning'
            value={wordData.meaning}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>
      <button className='btn' onClick={handleSubmit}>Add Word</button>
    </div>
  );
}