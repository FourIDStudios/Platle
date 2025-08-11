import React, { useRef, useState } from 'react'
import { AnimatedList } from '../magicui/animated-list';
import { AnimatedSearchList } from '../magicui/animated-search-list';
import { makeGuess } from '@/services/playtleService';

const SearchBox = ({ games, maxResults, OnSelect }: { games: string[], maxResults?: number, OnSelect: (value: string) => void }) => {
  const [filteredGames, setFilteredGames] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");


// Debounce logic to improve performance
const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    setQuery(userInput);

    if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
        const filteredGames = games.filter((game: string) =>
            game.toLowerCase().includes(userInput.toLowerCase())
        );
        setFilteredGames(
            filteredGames.slice(
                0,
                filteredGames.length > (maxResults || 20) ? maxResults : filteredGames.length
            )
        );
    }, 300); // 300ms debounce
};

  const onSelect = (value: string) => {
    setQuery('');
    setFilteredGames([]);
    OnSelect(value);
  };

  return (
    <div className='SearchBox'>
        <input 
        className = "SearchInput"
        type="text"
        value={query}
        onChange={onChange}
        placeholder='Enter your guess...'
        />

        <ul className="SearchList" style={{ display: query.length > 0 ? 'block' : 'none' }}>
            <AnimatedSearchList delay= {1}>
                {filteredGames.map((game, index) => (
                    <li key={index} className='SearchListItem' onClick={() => onSelect(game)}>
                        <span className='SearchListItemMatchingText'>{game.slice(0,query.length)}</span>
                        <span>{game.slice(query.length)}</span>
                    </li>
                ))}
            </AnimatedSearchList>
        </ul>

    </div>
  )
}

export default SearchBox