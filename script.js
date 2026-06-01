let chuyenBayDangChon = null;

function hienThiChuyenBay() {
    const flightGrid = document.getElementById('flight-grid');
    if (!flightGrid) return;

    flightGrid.innerHTML = '';
    
    DANH_SACH_CHUYEN_BAY.forEach(flight => {
        const cardHtml = `
            <div class="ticket-card">
                <div class="card-image" style="background-image: url('${flight.image}');">
                    <span class="badge">${flight.badge}</span>
                </div>
                <div class="card-info">
                    <h3>${flight.title}</h3>
                    <p class="date">${flight.date}</p>
                    <p class="price">${flight.price}</p>
                    <button class="btn-buy" onclick="moPopupDatVe('${flight.title}', '${flight.price}')">Đặt Vé Ngay</button>
                </div>
            </div>
        `;
        flightGrid.innerHTML += cardHtml;
    });
}

function moPopupDatVe(tenChuyenBay, giaVe) {
    chuyenBayDangChon = { ten: tenChuyenBay, gia: giaVe };
    document.getElementById('modal-flight-info').innerText = `Chuyến bay: ${tenChuyenBay} - Giá: ${giaVe}`;
    document.getElementById('booking-modal').style.display = 'flex';
}

function dongPopup() {
    document.getElementById('booking-modal').style.display = 'none';
    document.getElementById('form-thong-tin').reset();
}

function xacNhanDatVe(event) {
    event.preventDefault();

    const tenKhach = document.getElementById('khach-ten').value;
    const sdtKhach = document.getElementById('khach-sdt').value;
    const cccdKhach = document.getElementById('khach-cccd').value;

    let bookings = JSON.parse(localStorage.getItem('thanhduy_bookings')) || [];
    
    let newBooking = {
        id: 'TD' + Math.floor(1000 + Math.random() * 9000),
        customerName: tenKhach,
        phone: sdtKhach,
        cccd: cccdKhach,
        event: chuyenBayDangChon.ten,
        price: chuyenBayDangChon.gia,
        time: new Date().toLocaleString('vi-VN')
    };
    
    bookings.push(newBooking);
    localStorage.setItem('thanhduy_bookings', JSON.stringify(bookings));

    dongPopup();

    document.getElementById('success-name').innerText = tenKhach;
    document.getElementById('success-flight').innerText = chuyenBayDangChon.ten;
    document.getElementById('success-modal').style.display = 'flex';
}

function dongPopupThanhCong() {
    document.getElementById('success-modal').style.display = 'none';
}

function taiDanhSachAdmin() {
    const bookingList = document.getElementById('booking-list');
    const totalTickets = document.getElementById('total-tickets');
    if (!bookingList) return;

    let bookings = JSON.parse(localStorage.getItem('thanhduy_bookings')) || [];
    totalTickets.innerText = bookings.length;
    bookingList.innerHTML = '';

    if (bookings.length === 0) {
        bookingList.innerHTML = `<tr><td colspan="7" style="text-align:center; color: #888; padding: 30px;">Chưa có dữ liệu hành khách đặt vé trên hệ thống.</td></tr>`;
        return;
    }

    bookings.forEach(b => {
        let rowHtml = `
            <tr>
                <td><strong style="color: #0284c7;">${b.id}</strong></td>
                <td><strong>${b.customerName}</strong></td>
                <td>${b.phone}</td>
                <td>${b.cccd}</td>
                <td style="max-width: 300px; font-size: 14px; line-height: 1.4;">${b.event}</td>
                <td><span style="color: #10b981; font-weight: bold;">${b.price}</span></td>
                <td style="font-size: 13px; color: #64748b;">${b.time}</td>
            </tr>
        `;
        bookingList.innerHTML += rowHtml;
    });
}

function moPopupXoa() {
    document.getElementById('confirm-modal').style.display = 'flex';
}

function dongPopupXoa() {
    document.getElementById('confirm-modal').style.display = 'none';
}

function xacNhanXoaHet() {
    localStorage.removeItem('thanhduy_bookings');
    taiDanhSachAdmin();
    dongPopupXoa();
}

window.onload = function() {
    hienThiChuyenBay();
    taiDanhSachAdmin();
};