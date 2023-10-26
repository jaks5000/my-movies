import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from "../services/trending";

export const Details = () => {
  const [cardDetails, setCardDetails] = useState({});
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const { mediaType, itemId } = useParams();

  useEffect(() => {
    getDetail(mediaType, itemId).then((res) => {
      console.log(res.data);
      setCardDetails(res.data);
    });
  }, [mediaType, itemId]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <img
            src={baseUrl + cardDetails.poster_path}
            alt={cardDetails.name}
            className="img-fluid"
          />
        </div>
        <div className="col-md-8">
          <h2>{cardDetails.name}</h2>
          <p>{cardDetails.overview}</p>
          {}
          {cardDetails.genres && cardDetails.genres.length > 0 && (
            <div>
              <h4>Genres:</h4>
              <ul>
                {cardDetails.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          )}
          {cardDetails.release_date && (
            <p>Release Date: {cardDetails.release_date}</p>
          )}
          {cardDetails.vote_average && (
            <p>Vote Average: {cardDetails.vote_average}</p>
          )}
          {}
        </div>
      </div>
    </div>
  );
};
