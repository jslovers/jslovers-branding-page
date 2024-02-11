document.addEventListener('DOMContentLoaded', function() {
    fetch('data/sponsors.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('sponsorsContainer');
            // Ensure the container has some TailwindCSS utility classes for layout
            container.className = "grid grid-cols-1 md:grid-cols-4 gap-4 p-4";
            
            data.sponsors.forEach(sponsor => {
                // Create a container for each sponsor with TailwindCSS classes
                const sponsorElement = document.createElement('a');
                sponsorElement.className = 'flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-md bg-white';

                const image = document.createElement('img');

                image.src = sponsor.image;
                image.alt = `${sponsor.name} logo`;
                image.className = 'w-36 h-36 object-contain mb-4';

                // const name = document.createElement('p');
                // name.textContent = sponsor.name;
                // name.className = 'text-lg font-semibold text-gray-800 mb-2';

                sponsorElement.href = sponsor.website;
                // link.className = 'text-blue-500 hover:text-blue-700 underline';
                // link.setAttribute('target', '_blank');
                // link.textContent = 'Visit Website';

                sponsorElement.appendChild(image);

                // Append sponsorElement to the container
                container.appendChild(sponsorElement);
            });
        })
        .catch(error => console.error('Error loading sponsor data:', error));
});
