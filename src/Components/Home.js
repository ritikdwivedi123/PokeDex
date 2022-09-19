import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cards from "./Cards";
import Statics from "./Statics";
import "./style.css";

function Home() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pokeState, setPokeState] = useState(0);
  const [pokeDex, setPokeDex] = useState();
  const [modal, setModal] = useState(false);

  const renderAfterCalled = useRef(false);

  const setPokemons = async () => {
    setLoading(true);
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
    );
    getPokemons(res.data.results);
    setLoading(false);
  };

  const getPokemons = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  const handlePreUrl = async () => {
    setPokeData([]);
    setPokeState(pokeState - 20);
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=${pokeState}&limit=20`
    );
    getPokemons(res.data.results);
  };

  const handleNextUrl = async () => {
    setPokeData([]);
    setPokeState(pokeState + 20);
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=${pokeState}&limit=20`
    );
    getPokemons(res.data.results);
  };

  useEffect(() => {
    if (!renderAfterCalled.current) {
      setPokemons();
    }
    renderAfterCalled.current = true;
  });

  return (
    <div>
      {modal && <Statics data={pokeDex} modal={(value)=> setModal(value)} />}
      <div className="left-content">
        <Cards pokemon={pokeData} loading={loading} infoPokemon={(poke)=>setPokeDex(poke)} modal={(value)=> setModal(value)}/>
      </div> 
        <button
          className="btn btn-primary mx-2 my-4"
          onClick={handlePreUrl}
        >
          Previous
        </button>
        <button className="btn btn-primary" style={{marginLeft: "80rem"}} onClick={handleNextUrl}>
          Next
        </button>
    </div>
  );
}

export default Home;
