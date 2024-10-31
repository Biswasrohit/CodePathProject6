import React from "react";
import "../App.css";
import logo from "../img/marvel-logo.png";
import { Link } from "react-router-dom";

const CharacterCard = ({ character }) => {
  const placeholderImage = logo;

  return (
    <Link to={`/character/${character.id}`}>
      <div className="character-card">
        <img
          src={
            character.thumbnail.path.includes("image_not_available")
              ? placeholderImage
              : `${character.thumbnail.path}.${character.thumbnail.extension}`
          }
          alt={character.name}
          className="character-thumbnail"
        />

        <h2>{character.name}</h2>

        <p>{character.description || "No description available"}</p>
        <p>Comics: {character.comics.available}</p>
        <p>Stories: {character.stories.available}</p>
      </div>
    </Link>
  );
};

export default CharacterCard;
