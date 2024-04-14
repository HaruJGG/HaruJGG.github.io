document.addEventListener('DOMContentLoaded', function() {
    const myGlobe = new ThreeGlobe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png');

    // Fetch country data
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const countries = data.map(country => ({
            lat: country.latlng[0],
            lng: country.latlng[1],
            name: country.name.common
        }));

        myGlobe.polygonsData(countries)
            .polygonCapColor(() => '#ffcc00') // Color of the countries
            .polygonSideColor(() => '#ffff00') // Color of the sides
            .onPolygonClick(({ properties }) => alert(`Clicked on ${properties.name}`)); // Handle clicks

        document.getElementById('gameContainer').appendChild(myGlobe);
    })
    .catch(error => console.error('Error fetching country data:', error));

    // Set up the Three.js rendering loop
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.add(myGlobe);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    function animate() {
        requestAnimationFrame(animate);
        myGlobe.rotation.y += 0.005; // Rotate the globe
        renderer.render(scene, camera);
    }
    animate();
});
