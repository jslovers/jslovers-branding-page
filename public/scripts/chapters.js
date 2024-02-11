document.addEventListener('DOMContentLoaded', function() {
    fetch('/data/chapters.json')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.flex.justify-center.items-center.mt-8.gap-8');
        container.innerHTML = ''; // Clear existing content if any
        data.chapters.forEach(chapter => {
            const chapterElement = document.createElement('a');
            chapterElement.href = chapter.url;
            chapterElement.target = "_blank";
            chapterElement.className = "inline-block text-center";
            
            const image = document.createElement('img');
            image.src = chapter.image;
            image.alt = `${chapter.name} jslovers`;
            image.className = "hover:opacity-50 w-[80px]";
            
            const name = document.createElement('p');
            name.textContent = chapter.name;
            name.className = "hover:no-underline underline mt-2";
            
            chapterElement.appendChild(image);
            chapterElement.appendChild(name);
            
            container.appendChild(chapterElement);
        });
    })
    .catch(error => console.error('Error loading chapters data:', error));
});
