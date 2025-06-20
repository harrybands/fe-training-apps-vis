    const seatsContainer = document.getElementById('seats');
    const ticketList = document.getElementById('ticketList');
    const bookBtn = document.getElementById('bookBtn');

    let selectedSeats = [];
    const totalSeats = 40;

    // Hiển thị danh sách ghế và xử lý chọn ghế
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

    // Lấy danh sách vé đã đặt từ sessionStorage
    function getBookings() {
      return JSON.parse(sessionStorage.getItem('movieTickets') || '[]');
    }

    // Lưu vé mới vào sessionStorage
    function saveBooking(bookings) {
      const existing = getBookings();
      const updated = existing.concat(bookings);
      sessionStorage.setItem('movieTickets', JSON.stringify(updated));
    }

    // Đánh dấu các ghế đã được đặt
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

    // Hiển thị danh sách vé đã đặt ra giao diện
    function renderBookings() {
      const bookings = getBookings();
      ticketList.innerHTML = '';
      bookings.forEach(b => {
        const li = document.createElement('li');
        
        const movieNames = {
          'bong-dung-muon-khoc': 'Bỗng dưng muốn khóc',
          'the-office': 'The Office',
          'modern-family': 'Modern Family',
        };
        const movieDisplay = movieNames[b.movie] || b.movie;
        li.textContent = `${b.name} - Phim: ${movieDisplay} - Ghế: ${b.seat} - Lúc: ${b.time}`;   ticketList.appendChild(li);
      });
    }

    // Xử lý sự kiện khi bấm nút đặt vé
    bookBtn.addEventListener('click', () => {
      const name = document.getElementById('username').value.trim();
      const email = document.getElementById('useremail').value.trim();
      const movie = document.getElementById('movie').value;
      const time = document.getElementById('time').value;

      if (!name || !email || selectedSeats.length === 0) {
        alert('Vui lòng nhập đủ thông tin và chọn ít nhất một ghế!');
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

    // Khi đổi phim hoặc giờ chiếu thì render lại ghế
    document.getElementById('movie').addEventListener('change', renderSeats);
    document.getElementById('time').addEventListener('change', renderSeats);

    renderSeats();
    renderBookings();