import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import md5 from "crypto-js/md5";

const DetailView = () => {
  const { id } = useParams(); // Capture character ID from the URL
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      setLoading(true);
      setError(null);
      setItemData(null); // Clear previous data to prevent flashing old character details

      try {
        // Retrieve API keys and generate the hash
        const publicKey = import.meta.env.VITE_MARVEL_API_PUBLIC_KEY;
        const privateKey = import.meta.env.VITE_MARVEL_API_PRIVATE_KEY;
        const ts = new Date().getTime();
        const hash = md5(ts + privateKey + publicKey).toString();

        // Construct the API URL using the character ID and authentication parameters
        const apiUrl = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        console.log("Fetching URL:", apiUrl); // Log the URL for debugging

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch character details");
        }

        const data = await response.json();
        setItemData(data.data.results[0]); // Set character data
      } catch (err) {
        console.error("Error fetching character details:", err);
        setError("Failed to fetch character details");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]); // Re-run effect when the `id` changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="detail-view">
      {itemData ? (
        <>
          <h3>{itemData.name}</h3>
          <img
            src={`${itemData.thumbnail.path}.${itemData.thumbnail.extension}`}
            alt={itemData.name}
            className="character-thumbnail"
          />
          <p>{itemData.description || "No description available"}</p>
          <p>
            <strong>Comics:</strong> {itemData.comics.available}
          </p>
          <p>
            <strong>Stories:</strong> {itemData.stories.available}
          </p>
        </>
      ) : (
        <p>Character not found.</p>
      )}
    </div>
  );
};

export default DetailView;
