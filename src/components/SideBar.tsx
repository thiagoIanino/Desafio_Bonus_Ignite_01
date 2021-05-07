import React,{useState,useEffect} from 'react'
import {GenreResponseProps} from '../App'
import { Button } from '../components/Button';
import { api } from '../services/api';
import '../styles/sidebar.scss';

interface SideBarProps{
  selectedGenreId:number
  setSelectedGenreId:React.Dispatch<React.SetStateAction<number>>
}

export function SideBar(props:SideBarProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);


  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);


  function handleClickButton(id: number) {
    props.setSelectedGenreId(id);
  }

  return(
<nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={props.selectedGenreId === genre.id}
            />
          ))}
        </div>
      
      </nav>
  )
}