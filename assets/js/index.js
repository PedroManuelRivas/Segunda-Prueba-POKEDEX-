//Iniciar Script
$(document).ready(function () {
    consultarAPI("bulbasaur")
});

// Conectando boton con input
$("button").click(function () {
    let pokemon = $("#input").val()
    console.log(pokemon)
    consultarAPI(pokemon)
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
            let hp = data.stats[0].base_stat
            let defensa = data.stats[2].base_stat
            let ataque = data.stats[1].base_stat
            let ataqueEspecial = data.stats[3].base_stat
            let defensaEspecial = data.stats[4].base_stat
            let speed = data.stats[5].base_stat
            let foto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
            let fotoProx = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id + 1}.svg`
            $("#pokeActual").html(`<img data-toggle="tooltip" data-placement="top" title="Click para ver estadisticas de pokemón anterior" style="cursor: pointer; max-height: 200px" onclick="consultarAPI(${id - 1})" src="${foto}" width="100%" alt="Imagen de Pokemon">`)
            $("#pokeActual").append(`<div id="datosPokemon" class="pt-5">${data.name}</div>`)
            $("#nextPoke").html(`<img data-toggle="tooltip" data-placement="top" title="Click para ver estadisticas de este pokemón" style="cursor: pointer; max-height: 200px" onclick="consultarAPI(${id + 1})" src="${fotoProx}" width="100%" alt="Imagen de Siguiente pokemon">`)

            canvas(hp, defensa, ataque, ataqueEspecial, defensaEspecial, speed)
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