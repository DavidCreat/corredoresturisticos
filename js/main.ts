// Define interfaces for TypeScript type safety
interface Region {
    id: string;
    code: string; // Código de región
    name: string;
    description: string;
    attractions: string[];
    images: string[];
    coordinates: [number, number];
}

// Colombia regions data for the main regions (Andina, Caribe, Pacífica)
// Declare as type to avoid redeclaration error with main.js
declare const regions: Region[];

// This is commented out to avoid redeclaration with main.js
/*
const regions: Region[] = [
    {
        id: 'andina',
        code: 'CONAR',
        name: 'Nariño',
        description: 'Ubicado al suroccidente de Colombia, Nariño ofrece una mezcla de cultura, historia y paisajes naturales impresionantes.',
        attractions: [
            'Santuario de Las Lajas',
            'Laguna de La Cocha',
            'Volcán Galeras',
            'Centro histórico de Pasto',
            'Carnaval de Negros y Blancos'
        ],
        images: [
            'img/regiones/Pacifica/pacifico 1.jpg',
            'img/regiones/Pacifica/pacifico 2.jpg',
            'img/regiones/Pacifica/pacifico 3.webp',
            'img/regiones/Pacifica/pacifico 4.jpg',
            'img/regiones/Pacifica/pacifico 5.jpg'
        ],
        coordinates: [1.2136, -77.2811]
    },
    {
        id: 'putumayo',
        code: 'COPUT',
        name: 'Putumayo',
        description: 'Región amazónica con una rica biodiversidad y tradiciones ancestrales de comunidades indígenas.',
        attractions: [
            'Cascadas del Fin del Mundo',
            'Valle de Sibundoy',
            'Orito Ingi Ande',
            'Parque Nacional Natural La Playa',
            'Ceremonias ancestrales con yagé'
        ],
        images: [
            'img/regiones/Andina/andina 1.jpg',
            'img/regiones/Andina/andina 2.jpg',
            'img/regiones/Andina/andina 3.jpg',
            'img/regiones/Andina/andina 4.jpg',
            'img/regiones/Andina/andina 5.jpg'
        ],
        coordinates: [0.4360, -76.6164]
    },
    {
        id: 'caqueta',
        code: 'COCAQ',
        name: 'Caquetá',
        description: 'Territorio de transición entre los Andes y la Amazonía, con paisajes selváticos y montañosos.',
        attractions: [
            'Parque Nacional Natural Cueva de los Guácharos',
            'Parque Nacional Natural Serranía de Chiribiquete',
            'Florencia',
            'Belén de los Andaquíes',
            'Paisajes selváticos y montañosos'
        ],
        images: [
            'img/regiones/Caribe/caribe 1.jpg',
            'img/regiones/Caribe/caribe 2.jpg',
            'img/regiones/Caribe/caribe 3.jpg',
            'img/regiones/Caribe/caribe4.jpg',
            'img/regiones/Caribe/caribe 5.jpg'
        ],
        coordinates: [1.6136, -75.6164]
    }
];
*/

// Declare external functions to avoid duplication errors with main.js
declare function initAnimations(): void;
declare function initMapEventListeners(): void;
declare function showMapError(): void;
declare function createImageCarousel(regionId: string): string;
declare function initImageCarousel(): void;
declare function updateRegionInfo(regionId: string): void;
declare function navigateToRegion(regionId: string): void;

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initAnimations();
    
    // Initialize event listeners for the SimpleMaps map
    initMapEventListeners();
    
    // Update region info with default region (Nariño)
    updateRegionInfo('narino');
});

/* 
// These functions are commented out to avoid duplication with main.js
// They are implemented in main.js instead

// Function to initialize scroll animations
function initAnimations(): void {
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

// Function to initialize event listeners for the SimpleMaps map
function initMapEventListeners(): void {
    // Get the map container
    const mapContainer = document.getElementById('co');
    if (!mapContainer) return;
    
    // Listen for the stateclick event from SimpleMaps
    mapContainer.addEventListener('stateclick', (event: any) => {
        const stateId = event.detail.id;
        
        // Find the region that corresponds to this state
        const region = regions.find(r => r.code === stateId);
        if (region) {
            updateRegionInfo(region.id);
        }
    });
}
*/

/*
// Todas estas funciones están comentadas para evitar duplicación con main.js
// Están implementadas en main.js en su lugar

// Función para mostrar un error si el mapa no puede cargarse
function showMapError(): void {
    const mapContainer = document.getElementById('co');
    if (!mapContainer) return;
    
    mapContainer.innerHTML = `
        <div class="map-error">
            <p>Lo sentimos, no se pudo cargar el mapa. Por favor, intente recargar la página.</p>
        </div>
    `;
}

// Función para crear un carrusel de imágenes para una región
function createImageCarousel(regionId: string): string {
    const region = regions.find(r => r.id === regionId);
    if (!region || !region.images || region.images.length === 0) {
        return '';
    }
    
    let carouselHTML = `<div class="region-image-carousel">`;
    
    // Imagen principal
    carouselHTML += `<div class="main-image"><img src="${region.images[0]}" alt="${region.name}"></div>`;
    
    // Miniaturas
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

// Función para inicializar el carrusel de imágenes
function initImageCarousel(): void {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img') as HTMLImageElement;
    
    if (!thumbnails.length || !mainImage) return;
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Actualizar imagen principal
            const imgSrc = (thumbnail.querySelector('img') as HTMLImageElement).src;
            mainImage.src = imgSrc;
            
            // Actualizar clase activa
            document.querySelector('.thumbnail.active')?.classList.remove('active');
            thumbnail.classList.add('active');
        });
    });
}

// Función para actualizar la información de la región
function updateRegionInfo(regionId: string): void {
    const regionInfoContainer = document.getElementById('region-info');
    if (!regionInfoContainer) return;
    
    const region = regions.find(r => r.id === regionId);
    if (!region) return;
    
    // Crear HTML para las atracciones
    let attractionsHTML = '';
    region.attractions.forEach(attraction => {
        attractionsHTML += `<li>${attraction}</li>`;
    });
    
    // Crear carrusel de imágenes
    const carouselHTML = createImageCarousel(regionId);
    
    // Actualizar el contenido del contenedor de información
    regionInfoContainer.innerHTML = `
        <h3>${region.name}</h3>
        ${carouselHTML}
        <p>${region.description}</p>
        <h4>Atractivos principales:</h4>
        <ul>${attractionsHTML}</ul>
        <a href="regiones/${regionId}.html" class="btn-secondary">Explorar ${region.name}</a>
    `;
    
    // Inicializar el carrusel de imágenes
    initImageCarousel();
}

// Función para navegar a la página de la región
function navigateToRegion(regionId: string): void {
    window.location.href = `regiones/${regionId}.html`;
}
*/
