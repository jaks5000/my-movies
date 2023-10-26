import React, { useEffect, useState } from "react";
import { getTrendPicks, getTrend } from "../services/trending";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TrendingMovies.css";
const { Meta } = Card;

export const TrendingMovies = () => {
  const [cards, setCards] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (search === "") {
          response = await getTrend(filterType);
        } else {
          response = await getTrendPicks(search, filterType);
        }
        setCards(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search, filterType]);

  const navigate = useNavigate();
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  const handleNavigate = (mediaType, itemId) => {
    navigate(`/details/${mediaType}/${itemId}`);
  };

  const renderData = () => {
    let filteredCards = cards;
    if (filterType === "tv") {
      filteredCards = cards.filter((card) => card.media_type === "tv");
    } else if (filterType === "movie") {
      filteredCards = cards.filter((card) => card.media_type === "movie");
    }

    return (
      <div className="row">
        {filteredCards.map((card, i) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={i}>
            <div className="card">
              <img
                src={baseUrl + card.poster_path}
                className="card-img-top"
                alt={card.title ? card.title : card.original_title}
              />
              <div
                className="card-body"
                style={{ width: "100%", overflowY: "auto" }}
              >
                <h5 className="card-title">
                  {card.title ? card.title : card.original_title}
                </h5>
                <p
                  className="card-text"
                  style={{ maxHeight: "4rem", overflowY: "auto" }}
                >
                  {card.overview}
                </p>
                <p className="card-text">
                  Media Type: {card.media_type}
                  <br />
                  Adult: {card.adult ? "Yes" : "No"}
                </p>
                <button
                  onClick={() => handleNavigate(card.media_type, card.id)}
                  className="btn btn-primary btn-details"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-between">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="form-control"
            />
            <select
              name=""
              id=""
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="form-select"
            >
              <option value="">All</option>
              <option value="movie">Movies</option>
              <option value="tv">TV</option>
            </select>
          </div>
        </div>
      </div>
      {renderData()}
    </div>
  );
};
