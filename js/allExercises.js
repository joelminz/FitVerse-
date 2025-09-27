const cardContainer = document.querySelector('.card-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/',
    params: {limit: '10'},
    headers: {
      'X-RapidAPI-Key': '63fc3233c4mshb742ac6dc9026d2p15e687jsn7eb5d0b0f9b8',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

let currentPage = 1;
let perPage = 15;
let totalPages = 1;
let exercises = [];

function getExercises() {
    fetch('https://exercisedb.p.rapidapi.com/exercises', options)
        .then(response => response.json())
        .then(data => {
            exercises = data;
            totalPages = Math.ceil(exercises.length / perPage);
            displayExercises();
        })
        .catch(error => console.error(error));
}

function displayExercises() {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const displayExercises = exercises.slice(start, end);

    cardContainer.innerHTML = '';
    displayExercises.forEach(exercise => {
        const card = createExerciseCard(exercise);
        cardContainer.insertAdjacentHTML('beforeend', card);
    });

    updatePageButtons();
}

function createExerciseCard(exercise) {
    return `
          <div class="card">
            <h2>${exercise.name}</h2>
            <p><i>Body Part:</i>&nbsp${exercise.bodyPart}</p>
            <p><i>Equipment:</i>&nbsp${exercise.equipment}</p>
            <p><i>Target:</i>&nbsp${exercise.target}</p>
            <img src="${exercise.gifUrl}" alt="${exercise.name}">
          </div>
        `;
}

function updatePageButtons() {
    if (currentPage === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    if (currentPage === totalPages) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

prevBtn.addEventListener('click', () => {
    currentPage--;
    displayExercises();
});

nextBtn.addEventListener('click', () => {
    currentPage++;
    displayExercises();
});

getExercises();
