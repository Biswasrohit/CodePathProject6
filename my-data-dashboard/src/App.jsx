import React, { useEffect, useState } from "react";
import md5 from "crypto-js/md5";
import CharacterCard from "./components/CharacterCard";
import Sidebar from "./components/Sidebar";
import SearchFilter from "./components/SearchFilter";
import Dashboard from "./components/Dashboard";
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterHasDescription, setFilterHasDescription] = useState(false);
  const [filterHasImage, setFilterHasImage] = useState(false);
  const limit = 20;
  const totalCharacters = 1500;

  useEffect(() => {
    fetchRandomMarvelData();
  }, []);

  const fetchRandomMarvelData = async () => {
    const publicKey = import.meta.env.VITE_MARVEL_API_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_MARVEL_API_PRIVATE_KEY;
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey).toString();

    const randomOffset = Math.floor(Math.random() * (totalCharacters - limit));

    const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${randomOffset}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      const newCharacters = data.data.results;

      setCharacters((prevCharacters) => [...prevCharacters, ...newCharacters]);

      if (newCharacters.length < limit) setHasMore(false);
    } catch (error) {
      console.error("Error fetching Marvel data:", error);
    }
  };

  // Handle filtering logic
  const filteredCharacters = characters.filter((character) => {
    let matches = true;

    // Apply description filter if active
    if (filterHasDescription) {
      matches = matches && character.description;
    }

    // Apply image filter if active
    if (filterHasImage) {
      matches =
        matches &&
        character.thumbnail &&
        !character.thumbnail.path.includes("image_not_available");
    }

    // Apply search term filter
    return (
      matches && character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Dashboard totalCharacters={filteredCharacters.length} />
        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button
            onClick={() => setFilterHasDescription(!filterHasDescription)}
            className={`filter-button ${filterHasDescription ? "active" : ""}`}
          >
            Has Description
          </button>
          <button
            onClick={() => setFilterHasImage(!filterHasImage)}
            className={`filter-button ${filterHasImage ? "active" : ""}`}
          >
            Has Image
          </button>
        </div>

        <div className="character-grid">
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))
          ) : (
            <p>No characters found</p>
          )}
        </div>
        {hasMore && (
          <button onClick={fetchRandomMarvelData} className="load-more-btn">
            Load More Random Characters
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
