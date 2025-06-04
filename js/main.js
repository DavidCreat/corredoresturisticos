// Colombia regions data for the main regions
const regions = [
    {
        id: 'andina',
        code: 'COAND',
        name: 'Región Andina',
        description: 'Región montañosa con gran diversidad cultural y natural, hogar de la cordillera de los Andes.',
        attractions: [
            'Bogotá - Capital cultural',
            'Medellín - Ciudad de la eterna primavera',
            'Eje Cafetero - Patrimonio de la humanidad',
            'Parque Nacional Natural Los Nevados',
            'Catedral de Sal de Zipaquirá'
        ],
        images: [
            'img/regiones/Andina/andina 1.jpg',
            'img/regiones/Andina/andina 2.jpg',
            'img/regiones/Andina/andina 3.jpg',
            'img/regiones/Andina/andina 4.jpg',
            'img/regiones/Andina/andina 5.jpg'
        ],
        coordinates: [5.7, -74.0]
    },
    {
        id: 'caribe',
        code: 'COCAR',
        name: 'Región Caribe',
        description: 'Región costera con hermosas playas, música alegre y rica gastronomía.',
        attractions: [
            'Cartagena - Ciudad amurallada',
            'Santa Marta - La perla del Caribe',
            'Parque Nacional Natural Tayrona',
            'Barranquilla - Carnaval patrimonio de la humanidad',
            'San Andrés y Providencia - Islas paradisíacas'
        ],
        images: [
            'img/regiones/Caribe/caribe 1.jpg',
            'img/regiones/Caribe/caribe 2.jpg',
            'img/regiones/Caribe/caribe 3.jpg',
            'img/regiones/Caribe/caribe4.jpg',
            'img/regiones/Caribe/caribe 5.jpg'
        ],
        coordinates: [10.4, -75.5]
    },
    {
        id: 'pacifica',
        code: 'COPAC',
        name: 'Región Pacífica',
        description: 'Región con abundante biodiversidad, selvas húmedas y una importante herencia cultural afrocolombiana.',
        attractions: [
            'Bahía Solano - Avistamiento de ballenas',
            'Parque Nacional Natural Uramba Bahía Málaga',
            'Nuquí - Playas vírgenes',
            'Santuario de Las Lajas en Nariño',
            'Cali - Capital de la salsa'
        ],
        images: [
            'img/regiones/Pacifica/pacifico 1.jpg',
            'img/regiones/Pacifica/pacifico 2.jpg',
            'img/regiones/Pacifica/pacifico 3.webp',
            'img/regiones/Pacifica/pacifico 4.jpg',
            'img/regiones/Pacifica/pacifico 5.jpg'
        ],
        coordinates: [3.5, -77.0]
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initAnimations();
    
    // Initialize event listeners for the SimpleMaps map
    initMapEventListeners();
    
    // Update region info with default region (Nariño)
    updateRegionInfo('narino');

    // Inicializar menú hamburguesa
    initMobileMenu();
});

// Función para inicializar el menú móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Manejar clics en enlaces del menú
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                // Si es el enlace del dropdown, no cerrar el menú
                if (link.parentElement.classList.contains('dropdown')) {
                    e.preventDefault(); // Prevenir navegación
                    return;
                }
                // Para otros enlaces, cerrar el menú
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Manejar clics en enlaces del dropdown específicamente
        navMenu.querySelectorAll('.dropdown-content a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Function to initialize scroll animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Function to initialize event listeners for the Datamaps map
function initMapEventListeners() {
    // Los eventos de clic ya están configurados en colombia_map.js
    // Esta función se mantiene por compatibilidad con el código existente
    console.log('Map event listeners initialized via colombia_map.js');
}

// Función para manejar el clic en un estado (ahora gestionado por colombia_map.js)
function handleStateClick(stateId) {
    // Mapeo de IDs de estados a IDs de regiones
    const stateToRegion = {
        'COL1406': 'narino',
        'COL1407': 'putumayo',
        'COL1403': 'caqueta'
    };
    
    if (stateToRegion[stateId]) {
        updateRegionInfo(stateToRegion[stateId]);
    }
}

// Función para manejar el clic en una ubicación
function handleLocationClick(locationId) {
    // Mapeo de IDs de ubicaciones a IDs de regiones
    const locationToRegion = {
        '0': 'narino',
        '1': 'putumayo',
        '2': 'caqueta'
    };
    
    if (locationToRegion[locationId]) {
        updateRegionInfo(locationToRegion[locationId]);
    }
}

// Función para destacar los estados del corredor sur (ahora gestionado por colombia_map.js)
function highlightSouthernCorridor() {
    // Esta función ya no es necesaria ya que los colores se configuran en colombia_map.js
    console.log('Southern corridor highlighting is managed by colombia_map.js');
}

// Function to show an error if the map cannot be loaded
function showMapError() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    mapContainer.innerHTML = `
        <div class="map-error">
            <p>Lo sentimos, no se pudo cargar el mapa. Por favor, intente recargar la página.</p>
        </div>
    `;
}

// Function to create an image carousel for a region
function createImageCarousel(regionId) {
    const region = regions.find(r => r.id === regionId);
    if (!region || !region.images || region.images.length === 0) {
        return '';
    }
    
    let carouselHTML = `<div class="region-image-carousel">`;
    
    // Main image
    carouselHTML += `<div class="main-image"><img src="${region.images[0]}" alt="${region.name}"></div>`;
    
    // Thumbnails
    if (region.images.length > 1) {
        carouselHTML += `<div class="image-thumbnails">`;
        region.images.forEach((image, index) => {
            carouselHTML += `<div class="thumbnail${index === 0 ? ' active' : ''}" data-index="${index}">
                <img src="${image}" alt="${region.name} - Imagen ${index + 1}">
            </div>`;
        });
        carouselHTML += `</div>`;
    }
    
    carouselHTML += `</div>`;
    return carouselHTML;
}

// Function to initialize the image carousel
function initImageCarousel() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');
    
    if (!thumbnails.length || !mainImage) return;
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Update main image
            const imgSrc = thumbnail.querySelector('img').src;
            mainImage.src = imgSrc;
            
            // Update active class
            document.querySelector('.thumbnail.active')?.classList.remove('active');
            thumbnail.classList.add('active');
        });
    });
}

// Function to update region info
function updateRegionInfo(regionId) {
    const regionInfoContainer = document.getElementById('region-info');
    if (!regionInfoContainer) return;
    
    const region = regions.find(r => r.id === regionId);
    if (!region) return;
    
    // Create HTML for attractions
    let attractionsHTML = '';
    region.attractions.forEach(attraction => {
        attractionsHTML += `<li>${attraction}</li>`;
    });
    
    // Create image carousel
    const carouselHTML = createImageCarousel(regionId);
    
    // Update the content of the info container
    regionInfoContainer.innerHTML = `
        <h3>${region.name}</h3>
        ${carouselHTML}
        <p>${region.description}</p>
        <h4>Atractivos principales:</h4>
        <ul>${attractionsHTML}</ul>
        <a href="regiones/${regionId}.html" class="btn-secondary">Explorar ${region.name}</a>
    `;
    
    // Initialize the image carousel
    initImageCarousel();
}

// Function to navigate to the region page
function navigateToRegion(regionId) {
    window.location.href = `regiones/${regionId}.html`;
}
