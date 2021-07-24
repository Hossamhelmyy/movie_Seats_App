const selectBox = document.getElementById('movie');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const container = document.querySelector('.container');
const count = document.getElementById('count');
const total = document.getElementById('total');

let optionValue = 10;

container.addEventListener('click', function (e) {
  const seat = e.target.closest('.seat');
  if (!seat) return;
  if (seat.classList.contains('selected')) {
    seat.classList.remove('selected');
    console.log('remove');
    +count.textContent--;
    calcTotal();
  } else {
    seat.classList.add('selected');
    +count.textContent++;
    calcTotal();
  }

  const selectedseats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedseats].map((seat) => [...seats].indexOf(seat));
  console.log(seatsIndex);
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  localStorage.setItem('count', JSON.stringify(+count.textContent));
  localStorage.setItem('value', JSON.stringify(calcTotal()));
});

function movieChange() {
  selectBox.addEventListener('change', function (e) {
    optionValue = +e.target.value;

    const index = selectBox.selectedIndex;
    console.log(index);
    localStorage.setItem('selectedMovie', JSON.stringify(index));
    localStorage.setItem('optionValue', JSON.stringify(optionValue));
    calcTotal();
  });
}
function calcTotal() {
  return (total.textContent = +count.textContent * optionValue);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  console.log(selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
}
movieChange();
populateUI();

function getValues() {
  const totalValue = JSON.parse(localStorage.getItem('value'));
  const countValue = JSON.parse(localStorage.getItem('count'));
  const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
  optionValue = JSON.parse(localStorage.getItem('optionValue'));
  if (!totalValue) return;
  console.log(optionValue);
  count.textContent = +countValue;
  total.textContent = +optionValue * +countValue;
  if (selectedMovie !== null) {
    selectBox.selectedIndex = selectedMovie;
    console.log(selectedMovie);
  }
  calcTotal();
}
getValues();
