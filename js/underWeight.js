// Options for fetching exercises from the API
const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/target/',
    params: { limit: '10' },
    headers: {
        'X-RapidAPI-Key': '63fc3233c4mshb742ac6dc9026d2p15e687jsn7eb5d0b0f9b8',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
};

// DOM elements
const searchInput = document.getElementById('exercise-search');
const searchButton = document.getElementById('search-btn');
const exerciseContainer = document.getElementById('exercise-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let exercises = [];
let currentPage = 1;
const perPage = 15;

// Function to fetch exercises based on query
const fetchExercises = (query) => {
    fetch(`https://exercisedb.p.rapidapi.com/exercises/target/${query}`, options)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                exercises = data;
                displayExercises();
            } else {
                exerciseContainer.innerHTML = '<p class="error-message">No exercises found.</p>';
                prevBtn.disabled = true;
                nextBtn.disabled = true;
            }
        })
        .catch(err => console.error(err));
};

// Function to display exercises on the current page
const displayExercises = () => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const displayExercises = exercises.slice(start, end);

    // Create a card for each exercise
    const exerciseCards = displayExercises.map(exercise => {
        return `
            <div class="card">
                <h2>${exercise.name}</h2>
                <p><i>Body Part:</i>&nbsp${exercise.bodyPart}</p>
                <p><i>Equipment:</i>&nbsp${exercise.equipment}</p>
                <p><i>Target:</i>&nbsp${exercise.target}</p>
                <img src="${exercise.gifUrl}" alt="${exercise.name}">
            </div>
        `;
    });

    // Add the cards to the exercise container
    exerciseContainer.innerHTML = exerciseCards.join('');

    // Update the state of the pagination buttons
    updatePageButtons();
};

// Function to update the state of pagination buttons
const updatePageButtons = () => {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(exercises.length / perPage);
};

// Event listener for search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query.length >= 3) {
        fetchExercises(query);
    } else {
        exerciseContainer.innerHTML = '';
    }
});

// Event listener for previous page button
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayExercises();
    }
});

// Event listener for next page button
nextBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(exercises.length / perPage)) {
        currentPage++;
        displayExercises();
    }
});
