const selectBox = document.getElementById('movie');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const container = document.querySelector('.container');
const count = document.getElementById('count');
const total = document.getElementById('total');

let optionValue = +selectBox.value;

// event listener of all seats.
container.addEventListener('click', function (e) {
  const seat = e.target.closest('.seat');
  if (!seat) return;
  if (seat.classList.contains('selected')) {
    seat.classList.remove('selected');
    +count.textContent--;
  } else {
    seat.classList.add('selected');
    +count.textContent++;
  }

  // select the seats which has selected class.
  const selectedseats = document.querySelectorAll('.row .seat.selected');

  // get the indexes of seats which has selected class.
  const seatsIndex = [...selectedseats].map((seat) => [...seats].indexOf(seat));

  // calcTotal the value when we click on seats.
  const selectedSeatsCount = selectedseats.length;
  count.textContent = selectedSeatsCount;
  total.textContent = +selectedSeatsCount * +optionValue;

  // save the selectedSeats to LocalStorage.
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  // save the count of seats and totalValue in LocalStorage.
  localStorage.setItem('count', JSON.stringify(+count.textContent));
  localStorage.setItem('value', JSON.stringify(calcTotal()));
});

function calcTotal() {
  return (total.textContent = +count.textContent * +optionValue);
}

// function handles changinig of movies on selectBox.
function movieChange() {
  // eventListener on change.
  selectBox.addEventListener('change', function (e) {
    optionValue = +e.target.value;
    localStorage.setItem('optionValue', JSON.stringify(+e.target.value));

    // get the index of the selectBox movies.
    const index = selectBox.selectedIndex;
    localStorage.setItem('selectedMovie', JSON.stringify(index));

    calcTotal();
  });
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
}

// get values from localStorage and set it.
function getValues() {
  const totalValue = JSON.parse(localStorage.getItem('value'));
  const countValue = JSON.parse(localStorage.getItem('count'));
  const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
  const Movievalue = JSON.parse(localStorage.getItem('optionValue'));

  if (!totalValue) return;
  count.textContent = +countValue;
  total.textContent = +Movievalue * +countValue;
  if (selectedMovie !== null) {
    selectBox.selectedIndex = selectedMovie;
  }
}

function init() {
  movieChange();
  populateUI();
  getValues();
}
// call the init function
init();
