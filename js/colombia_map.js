// colombia_map.js - Implementación del mapa de Colombia usando Datamaps

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el mapa de Colombia
    var colombiaMap = new Datamap({
        element: document.getElementById('map'),
        scope: 'col',
        setProjection: function(element) {
            var projection = d3.geo.mercator()
                .center([-74.5, 4.5]) // [Longitud, Latitud] centrado en Colombia
                .scale(2000); // Aumentar escala para hacer el mapa más grande
            var path = d3.geo.path().projection(projection);
            return { path: path, projection: projection };
        },
        fills: {
            defaultFill: '#d3d0cf',
            regionAndina: '#1a936f',  // Verde para región Andina
            regionCaribe: '#f5a657',  // Verde para región Caribe
            regionPacifica: '#5768f5', // Verde para región Pacífica
            highlighted: '#0c4b33'    // Verde oscuro para destacado
        },
        data: {
            // Región Andina
            COANT: { fillKey: 'regionAndina', regionId: 'andina' },     // Antioquia
            COBOY: { fillKey: 'regionAndina', regionId: 'andina' },     // Boyacá
            COCAL: { fillKey: 'regionAndina', regionId: 'andina' },     // Caldas
            COCUN: { fillKey: 'regionAndina', regionId: 'andina' },     // Cundinamarca
            CODC: { fillKey: 'regionAndina', regionId: 'andina' },      // Bogotá D.C.
            COHUI: { fillKey: 'regionAndina', regionId: 'andina' },     // Huila
            CONSA: { fillKey: 'regionAndina', regionId: 'andina' },     // Norte de Santander
            COQUI: { fillKey: 'regionAndina', regionId: 'andina' },     // Quindío
            CORIS: { fillKey: 'regionAndina', regionId: 'andina' },     // Risaralda
            COSAN: { fillKey: 'regionAndina', regionId: 'andina' },     // Santander
            COTOL: { fillKey: 'regionAndina', regionId: 'andina' },     // Tolima
            
            // Región Caribe
            COATL: { fillKey: 'regionCaribe', regionId: 'caribe' },     // Atlántico
            COBOL: { fillKey: 'regionCaribe', regionId: 'caribe' },     // Bolívar
            COCES: { fillKey: 'regionCaribe', regionId: 'caribe' },     // Cesar
            COCOR: { fillKey: 'regionCaribe', regionId: 'caribe' },     // Córdoba
            COLAG: { fillKey: 'regionCaribe', regionId: 'caribe' },     // La Guajira
            COMAG: { fillKey: 'regionCaribe', regionId: 'caribe' },     // Magdalena
            COSUC: { fillKey: 'regionCaribe', regionId: 'caribe' },     // Sucre
            COSAP: { fillKey: 'regionCaribe', regionId: 'caribe' },     // San Andrés y Providencia
            
            // Región Pacífica
            COCAU: { fillKey: 'regionPacifica', regionId: 'pacifica' },  // Cauca
            COCHO: { fillKey: 'regionPacifica', regionId: 'pacifica' },  // Chocó
            CONAR: { fillKey: 'regionPacifica', regionId: 'pacifica' },  // Nariño
            COVAC: { fillKey: 'regionPacifica', regionId: 'pacifica' }   // Valle del Cauca
        },
        geographyConfig: {
            highlightFillColor: '#0c4b33',
            highlightBorderColor: '#FFFFFF',
            highlightBorderWidth: 1,
            popupTemplate: function(geography, data) {
                // Obtener el nombre de la región si está disponible
                let regionName = geography.properties.name;
                let regionId = data ? data.regionId : null;
                
                // Si no hay datos específicos, mostrar solo el nombre del departamento
                if (!regionId) {
                    return '<div class="hoverinfo">' + regionName + '</div>';
                }
                
                // Texto descriptivo para cada región
                let regionDescriptions = {
                    'andina': 'Región montañosa con gran diversidad cultural y natural, hogar de la cordillera de los Andes.',
                    'caribe': 'Región costera con hermosas playas, música alegre y rica gastronomía.',
                    'pacifica': 'Región con abundante biodiversidad, selvas húmedas y una importante herencia cultural afrocolombiana.'
                };
                
                let description = regionDescriptions[regionId] || '';
                
                return '<div class="hoverinfo">' +
                       '<strong>' + regionName + '</strong><br>' +
                       description +
                       '</div>';
            }
        }
    });

    // Agregar eventos de clic a los departamentos
    colombiaMap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
        var departmentId = geography.id;
        var data = colombiaMap.options.data[departmentId];
        
        if (data && data.regionId) {
            // Actualizar la información de la región
            updateRegionInfo(data.regionId);
            
            // Actualizar el estilo visual para mostrar la selección
            d3.selectAll('.datamaps-subunit').style('fill', function(d) {
                var currentId = d.id;
                var currentData = colombiaMap.options.data[currentId];
                
                if (currentId === departmentId) {
                    // Departamento seleccionado
                    return colombiaMap.options.fills.highlighted;
                } else if (currentData && currentData.fillKey) {
                    // Mantener los colores originales de las regiones
                    return colombiaMap.options.fills[currentData.fillKey];
                } else {
                    // Color por defecto para departamentos sin datos
                    return colombiaMap.options.fills.defaultFill;
                }
            });
        }
    });

    // Exponer el mapa globalmente para que pueda ser accedido por otras funciones
    window.colombiaMap = colombiaMap;
});
