import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailView = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    // Fetch item details based on the ID
    fetch(`api/endpoint/${id}`) // Update this URL based on your API endpoint
      .then((response) => response.json())
      .then((data) => setItemData(data));
  }, [id]);

  return (
    <div className="detail-view">
      {itemData ? (
        <>
          <h3>{itemData.name}</h3>
          <p>{itemData.description}</p>
          {/* Additional item details */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailView;
