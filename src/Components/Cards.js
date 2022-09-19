import React from "react";
import "./style.css";

export default function Cards({ pokemon, loading, infoPokemon, modal }) {
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item) => {
          return (
            <>
              <div className="card">
                <img
                  src={item.sprites.front_default}
                  className="card-img-top"
                  alt="..."
                />
                <div className="info">
                <h5 className="card-id">I'd: {item.id} </h5>
                <h5 className="card-name">Name: {item.name}</h5>
                <div className="abilities">
                  {item.types.map((poke) => {
                    return <><h5>Types: {poke.type.name}</h5></>;
                  })}
                </div>
                <button
                  className="btn btn-primary"
                  key={item.id}
                  onClick={() => {
                    infoPokemon(item);
                    modal(true);
                  }}
                >
                  More
                </button>
              </div>
              </div>
            </>
          );
        })
      )}
    </>
  );
}
