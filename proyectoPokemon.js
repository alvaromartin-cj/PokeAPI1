document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("cartasPokemon");
  
    try {
      // obtener los datos de los 10 primeros pokmon
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10");
      const pokemons = response.data.results;
  
      for (const pokemon of pokemons) {
  
        // datos del pokemon
        const pokemonData = await axios.get(pokemon.url);
  
        // coge habilidades y lo añade al array de nombres
        const habilidades = pokemonData.data.abilities.map((ability) => ability.ability.name);
  
        // Crea un elemento div para representar la tarjeta del Pokémon
        const cartas = document.createElement("div");
  
        // agrega la clase cartasPokemon al div creado
        cartas.classList.add("cartasPokemon");
  
        //sprites.front_default saca la foto
          cartas.innerHTML = `
            <img src="${pokemonData.data.sprites.front_default}"> 
            <h3>${pokemonData.data.name}</h3>
            <div class="detalles" style="display: none;">
              <p>Nombre: ${pokemonData.data.name}</p>
              <p>Habilidades: ${habilidades.join(", ")}</p>
            </div>
        `;
  
        // evento de clic a la tarjeta para mostrar detalles del pokemon
        cartas.addEventListener("click", () => {
            const detalles = cartas.querySelector(".detalles");
            detalles.classList.toggle("mostrarDetalles"); //Esto permite hacer click para ocultarlp
          });
    
        // agregar la tarjeta al contenedor
        container.appendChild(cartas);
      }
    } catch (error) {
      console.error("Error al obtener datos de la API:", error.message);
    }
  });
  