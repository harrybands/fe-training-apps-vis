   const seatsContainer = document.getElementById('seats');
    const ticketList = document.getElementById('ticketList');
    const bookBtn = document.getElementById('bookBtn');

    let selectedSeats = [];
    const totalSeats = 40;

    function renderSeats() {
      seatsContainer.innerHTML = '';
      selectedSeats = [];
      for (let i = 1; i <= totalSeats; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.textContent = i;

        seat.addEventListener('click', () => {
          if (seat.classList.contains('booked')) return;

          const seatIndex = selectedSeats.indexOf(i);
          if (seatIndex === -1) {
            selectedSeats.push(i);
            seat.classList.add('selected');
          } else {
            selectedSeats.splice(seatIndex, 1);
            seat.classList.remove('selected');
          }
        });

        seatsContainer.appendChild(seat);
      }

      highlightBookedSeats();
    }

    function getBookings() {
      return JSON.parse(localStorage.getItem('movieTickets') || '[]');
    }

    function saveBooking(bookings) {
      const existing = getBookings();
      const updated = existing.concat(bookings);
      localStorage.setItem('movieTickets', JSON.stringify(updated));
    }

    function highlightBookedSeats() {
      const bookings = getBookings();
      const movie = document.getElementById('movie').value;
      const time = document.getElementById('time').value;

      bookings.forEach(b => {
        if (b.movie === movie && b.time === time) {
          const seatDiv = document.querySelector(`#seats .seat:nth-child(${b.seat})`);
          if (seatDiv) {
            seatDiv.classList.add('booked');
            seatDiv.classList.remove('selected');
          }
        }
      });
    }

    function renderBookings() {
      const bookings = getBookings();
      ticketList.innerHTML = '';
      bookings.forEach(b => {
        const li = document.createElement('li');
        li.textContent = `${b.name} - Phim: ${b.movie} - Ghế: ${b.seat} - Lúc: ${b.time}`;
        ticketList.appendChild(li);
      });
    }

    bookBtn.addEventListener('click', () => {
      const name = document.getElementById('username').value.trim();
      const email = document.getElementById('useremail').value.trim();
      const movie = document.getElementById('movie').value;
      const time = document.getElementById('time').value;

      if (!name || !email || selectedSeats.length === 0) {
        alert('Nhập đủ thông tin và chọn ít nhất 1 ghế nha bro!');
        return;
      }

      const newBookings = selectedSeats.map(seatNum => ({
        name,
        email,
        movie,
        time,
        seat: seatNum
      }));

      saveBooking(newBookings);
      alert(`Đặt thành công ${selectedSeats.length} vé cho ${name}`);

      renderSeats();
      renderBookings();
    });

    document.getElementById('movie').addEventListener('change', renderSeats);
    document.getElementById('time').addEventListener('change', renderSeats);

    renderSeats();
    renderBookings();