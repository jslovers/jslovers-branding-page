document.addEventListener('DOMContentLoaded', function() {
    // Assuming 'teamMembers.json' is your JSON file path and it's structured similarly to the sponsors example
    fetch('data/team.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('teamContainer');
            // Apply a grid layout with more padding and gap, tailored for team members
            container.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto p-4";

            data.team.forEach(member => {
                // Create a container for each team member with a card-like design
                const memberElement = document.createElement('div');
                memberElement.className = 'bg-white rounded-lg overflow-hidden shadow-lg p-4 flex flex-col items-center justify-between';

                const image = document.createElement('img');
                image.src = member.image;
                image.alt = member.name;
                image.className = 'rounded-full w-32 h-32 object-cover mb-4';

                const name = document.createElement('h3');
                name.textContent = member.name;
                name.className = 'text-xl font-bold text-gray-800 mb-1';

                const role = document.createElement('p');
                role.textContent = member.role;
                role.className = 'text-base text-gray-600 mb-3';

                const bio = document.createElement('p');
                bio.textContent = member.bio;
                bio.className = 'text-sm text-center text-gray-500 mb-3';

                const socialLinks = document.createElement('div');
                socialLinks.className = 'flex justify-center gap-4';

                // Dynamically add social links if available
                Object.keys(member.socialLinks).forEach(key => {
                    const link = document.createElement('a');
                    link.href = member.socialLinks[key];
                    link.className = 'text-blue-500 hover:text-blue-700';
                    link.setAttribute('target', '_blank');
                    link.innerHTML = `<span class="sr-only">${key}</span><i class="fab fa-${key}"></i>`; // Using Font Awesome icons for demonstration
                    socialLinks.appendChild(link);
                });

                // Append elements to the memberElement
                memberElement.appendChild(image);
                memberElement.appendChild(name);
                memberElement.appendChild(role);
                memberElement.appendChild(bio);
                memberElement.appendChild(socialLinks);

                // Append memberElement to the container
                container.appendChild(memberElement);
            });
        })
        .catch(error => console.error('Error loading team data:', error));
});
