const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/target/',
    params: {limit: '10'},
    headers: {
      'X-RapidAPI-Key': '63fc3233c4mshb742ac6dc9026d2p15e687jsn7eb5d0b0f9b8',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

const searchInput = document.getElementById('exercise-search');
const searchButton = document.getElementById('search-btn');
const exerciseContainer = document.getElementById('exercise-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let exercises = [];
let currentPage = 1;
const perPage = 15;

// function to fetch exercises and display them in cards
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
}


// function to display the exercises for the current page
const displayExercises = () => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const displayExercises = exercises.slice(start, end);

    // create a card for each exercise
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

    // add the cards to the exercise container
    exerciseContainer.innerHTML = exerciseCards.join('');

    // update the page buttons
    updatePageButtons();
}

// function to update the state of the page buttons
const updatePageButtons = () => {
    if (currentPage === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    if (currentPage === Math.ceil(exercises.length / perPage)) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

// add event listener to the search button
searchButton.addEventListener('click', event => {
    const query = searchInput.value.trim().toLowerCase();

    if (query.length >= 3) {
        fetchExercises(query);
    } else {
        exerciseContainer.innerHTML = '';
    }
});

// add event listener to the previous page button
prevBtn.addEventListener('click', event => {
    if (currentPage > 1) {
        currentPage--;
        displayExercises();
    }
});

// add event listener to the next page button
nextBtn.addEventListener('click', event => {
    if (currentPage < Math.ceil(exercises.length / perPage)) {
        currentPage++;
        displayExercises();
    }
});
