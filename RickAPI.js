document.addEventListener('DOMContentLoaded', function() {
    const rickyandmortyInput = document.getElementById('rickyandmortyInput');
    const fetchRickyandMortyButton = document.getElementById('fetchRickyandMortyButton');
    const rickyandmortyDetails = document.getElementById('rickyandmortyDetails');

    fetchRickyandMortyButton.addEventListener('click', function() {
        const rickyandmortyNameOrId = rickyandmortyInput.value.trim().toLowerCase();

        if (rickyandmortyNameOrId === '') {
            alert('Por favor, digite o nome ou o ID do personagem.');
            return;
        }

        rickyandmortyDetails.innerHTML = '';
        fetch(`https://rickandmortyapi.com/api/character/${rickyandmortyNameOrId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Personagem não encontrado');
                }

                return response.json();
            })
            .then(data => {
                const { name, id, species, type, image } = data;
                const rickyandmortyName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                const rickyandmortyId = id;
                const rickyandmortySpecies = species;
                const rickyandmortyType = type || 'Unknown';
                const rickyandmortyImage = image;

                rickyandmortyDetails.innerHTML = `
                    <h2>${rickyandmortyName} (${rickyandmortyId})</h2>
                    <p><strong>Espécie:</strong> ${rickyandmortySpecies}</p>
                    <p><strong>Tipo:</strong> ${rickyandmortyType}</p>
                    <img src="${rickyandmortyImage}" alt="${rickyandmortyName} Image" class="rickyandmorty-img">
                `;
            })
            .catch(error => {
                console.error('Erro ao buscar informações do personagem:', error);
                rickyandmortyDetails.innerHTML = `<p>Personagem não encontrado. Verifique o nome ou o ID e tente novamente.</p>`;
            });
    });
});
