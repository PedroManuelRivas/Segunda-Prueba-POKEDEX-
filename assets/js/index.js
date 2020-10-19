//Iniciar Script
$(document).ready(function () {
    consultarAPI("bulbasaur")
});

// Conectando boton con input
$("button").click(function () {
    let pokemon = $("#input").val()
    var pokeConsulta = pokemon.toLowerCase()
    // Validando que no ingresen número mayor a DB en API
    if (pokemon >= 893) {
        alert("Pokémon no existe en nuestra base de datos, por favor ingrese un número menor a 893")
    } else {
        consultarAPI(pokeConsulta)
    }
}
)

//Función para extraer API a aplicación
function consultarAPI(nombrePokemon) {
    $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`,
        success: function (data) {
            $("#datosPokemon").html(data.name)
            let id = data.id
            let altura = data.height / 10
            let peso = data.weight
            let especie = data.types[0].type.name
            let especieCapitalize = especie
            let hp = data.stats[0].base_stat
            let defensa = data.stats[2].base_stat
            let ataque = data.stats[1].base_stat
            let ataqueEspecial = data.stats[3].base_stat
            let defensaEspecial = data.stats[4].base_stat
            let speed = data.stats[5].base_stat
            let foto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
            let fotoProx = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id + 1}.svg`
            // Se ingresa información al DIV que muestra foto de pokémon consultado
            $("#pokeActual").html(`<img data-toggle="tooltip" data-placement="top" title="Click para ver estadisticas de pokemón anterior" style="cursor: pointer; max-height: 200px" onclick="consultarAPI(${id - 1})" src="${foto}" width="100%" alt="Imagen de Pokemon">`)
            // Se ingresa información al DIV central, el cual muestra la tabla con estadísticas de pokémon consultado
            $("#pokeActual").append(`<div id="datosPokemon" class="pt-5">${data.name}</div>`)
            // Se ingresa información a tercer DIV, el cual muestra otras estadísticas de pokémon consultado
            $("#pokeStats").html(`<li><b>ID:</b> ${id}</li><li><b>Altura:</b> ${altura} m</li><li><b>Peso:</b> ${peso} Kg</li><li><b>Velocidad:</b> ${speed} Km</li><li class="mayusculas"><b>Tipo:</b> ${especieCapitalize}</li>`)
            // Se ingresa información a cuarto DIV, el cual muestra imágen de siguiente pokemon
            $("#nextPoke").html(`<img data-toggle="tooltip" data-placement="top" title="Click para ver estadisticas de este pokemón" style="cursor: pointer; max-height: 200px" onclick="consultarAPI(${id + 1})" src="${fotoProx}" width="15%" alt="Imagen de Siguiente pokemon">`)
            canvas(hp, defensa, ataque, ataqueEspecial, defensaEspecial)
        },
        dataType: 'json',
    });
}

//Creando chart responsiva
function canvas(hp, defensa, ataque, ataqueEspecial, defensaEspecial, speed) {
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light2", "dark1", "dark2"
        animationEnabled: false, // change to true		
        title: {
            text: ""
        },
        data: [
            {
                // Change type to "bar", "area", "spline", "pie",etc.
                type: "column",
                dataPoints: [
                    { label: "HP", y: hp },
                    { label: "Defensa", y: defensa },
                    { label: "Ataque", y: ataque },
                    { label: "Ataque Especial", y: ataqueEspecial },
                    { label: "Defensa Especial", y: defensaEspecial },
                    { label: "Velocidad", y: speed },
                ]
            }
        ]
    });
    chart.render();
}

