$(document).ready(function () {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=12"; //API URL dari PokeAPI

  // mengambil data dari API
  fetch(apiUrl)
    .then((response) => response.json()) //mengubah ke format JSON
    .then((data) => {
      //data adalah objek JavaScript yang dihasilkan dari JSON yang diterima dari server.
      const pokemonList = data.results; //data.results adalah properti dari objek data yang berisi daftar pokemon.
      pokemonList.forEach((pokemon) => {
        //forEach()  digunakan untuk memproses semua elemen dalam array dan menkonversi setiap elemen kedalam fungsi callback.
        fetchPokemonDetails(pokemon.url); //
      });
    })
    .catch((error) => console.error("Error fetching data:", error)); //untuk menampilkan jika ada error

  // ambil data untuk detail pokemon
  function fetchPokemonDetails(url) {
    fetch(url)
      .then((response) => response.json()) //mengubah ke format JSON
      .then((data) => {
        displayPokemon(data); //menampilkan data dari detail pokemon
      })
      .catch((error) =>
        console.error("Error fetching Pokemon details:", error)
      );
  } //untuk menampilkan jika ada error

  // Menampikan data dari detail pokemon
  function displayPokemon(pokemon) {
    const pokemonContainer = $("#pokemon-container");
    const pokemonCard = `
            <div class="col-md-3 col-sm-6">
                <div class="card">
                    <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title text-capitalize">${pokemon.name}</h5>
                        <p class="card-text">Height: ${pokemon.height} | Weight: ${pokemon.weight}</p>
                    </div>
                </div>
            </div>
        `;
    pokemonContainer.append(pokemonCard);
  }
});
