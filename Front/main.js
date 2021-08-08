//insertdata
function insertgunung() {
    const thisForm = document.getElementById('insert');
    thisForm.addEventListener('submit', async function (e) {
        const formData = new FormData(thisForm).entries()
        const response = await fetch('http://localhost:3000/insertgunung', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        alert("Data Berhasil Di-insert");
        return;

        const result = await response.json();
        console.log(result)
    });
}

function insertjadwal() {
    const thisForm = document.getElementById('insert1');
    thisForm.addEventListener('submit', async function (e) {
        const formData = new FormData(thisForm).entries()
        const response = await fetch('http://localhost:3000/insertjadwal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        alert("Data Berhasil Di-insert");
        return;

        const result = await response.json();
        console.log(result)
    });
}

function insertlist() {
    const thisForm = document.getElementById('insert2');
    thisForm.addEventListener('submit', async function (e) {
        const formData = new FormData(thisForm).entries()
        const response = await fetch('http://localhost:3000/insertlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        alert("Data Berhasil Di-insert");
        return;

        const result = await response.json();
        console.log(result)
    });
}

function booking() {
    const thisForm = document.getElementById('insert3');
    thisForm.addEventListener('submit', async function (e) {
        const formData = new FormData(thisForm).entries()
        const response = await fetch('http://localhost:3000/transaksi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        alert("Data Berhasil Di-insert");
        return;

        const result = await response.json();
        console.log(result)
    });
}

function signup() {
    const thisForm = document.getElementById('insert4');
    thisForm.addEventListener('submit', async function (e) {
        const formData = new FormData(thisForm).entries()
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        alert("Data Berhasil Di-insert");
        return;

        const result = await response.json();
        console.log(result)
    });
}


function signin() {
    const thisForm = document.getElementById('login');
    thisForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(thisForm).entries()
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        const data = await response.json();
        if (data.admin == true) {
            console.log(data.admin);
            alert("Admin");
            location.replace("admin.html");
        }
        else if (data.success == true) {
            console.log(data);
            alert("Login berhasil");
            location.replace("index.html");
        } else {
            alert("Login Gagal");
        }
        const result = await response.json();
        console.log(result)
    });
}

//update data
function updategunung() {
    const thisForm1 = document.getElementById('update');
    thisForm1.addEventListener('submit', async function (e) {
        const formData = new FormData(thisForm1).entries()
        const response = await fetch('http://localhost:3000/updategunung', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        const alertCode = response.status;
        if (alertCode == 404) {
            alert("Id tidak ditemukan");
            return;
        } else {
            alert("Data Berhasil Di-update");
            return;
        }
        const result = await response.json();
        console.log(result)
    });
}

function updatejadwal() {
    const thisForm1 = document.getElementById('update1');
    thisForm1.addEventListener('submit', async function (e) {
        const formData = new FormData(thisForm1).entries()
        const response = await fetch('http://localhost:3000/updatejadwal', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        const alertCode = response.status;
        if (alertCode == 404) {
            alert("Id tidak ditemukan");
            return;
        } else {
            alert("Data Berhasil Di-update");
            return;
        }
        const result = await response.json();
        console.log(result)
    });
}

function updatelist() {
    const thisForm1 = document.getElementById('update2');
    thisForm1.addEventListener('submit', async function (e) {
        const formData = new FormData(thisForm1).entries()
        const response = await fetch('http://localhost:3000/updatelist', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        const alertCode = response.status;
        if (alertCode == 404) {
            alert("Id tidak ditemukan");
            return;
        } else {
            alert("Data Berhasil Di-update");
            return;
        }
        const result = await response.json();
        console.log(result)
    });
}

function topup() {
    const thisForm1 = document.getElementById('update3');
    thisForm1.addEventListener('submit', async function (e) {
        const formData = new FormData(thisForm1).entries()
        const response = await fetch('http://localhost:3000/topup', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        const alertCode = response.status;
        if (alertCode == 404) {
            alert("Id tidak ditemukan");
            return;
        } else {
            alert("Data Berhasil Di-update");
            return;
        }
        const result = await response.json();
        console.log(result)
    });
}

function sandi() {
    const thisForm1 = document.getElementById('update4');
    thisForm1.addEventListener('submit', async function (e) {
        const formData = new FormData(thisForm1).entries()
        const response = await fetch('http://localhost:3000/sandi', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        const alertCode = response.status;
        if (alertCode == 404) {
            alert("Id tidak ditemukan");
            return;
        } else {
            alert("Data Berhasil Di-update");
            return;
        }
        const result = await response.json();
        console.log(result)
    });
}


//delete data
function deletegunung() {
    const thisForm2 = document.getElementById('delete');
    thisForm2.addEventListener('submit', async function (e) {
        const formData = new FormData(thisForm2).entries()
        const response = await fetch('http://localhost:3000/deletegunung', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        const alertCode = response.status;
        if (alertCode == 404) {
            alert("Id tidak ditemukan");
            return;
        } else {
            alert("Data Berhasil Di-delete");
            return;
        }
        const result = await response.json();
        console.log(result)
    });
}

function deletelist() {
    const thisForm2 = document.getElementById('delete1');
    thisForm2.addEventListener('submit', async function (e) {
        const formData = new FormData(thisForm2).entries()
        const response = await fetch('http://localhost:3000/deletelist', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        const alertCode = response.status;
        if (alertCode == 404) {
            alert("Id tidak ditemukan");
            return;
        } else {
            alert("Data Berhasil Di-delete");
            return;
        }
        const result = await response.json();
        console.log(result)
    });
}

function refund() {
    const thisForm2 = document.getElementById('delete3');
    thisForm2.addEventListener('submit', async function (e) {
        const formData = new FormData(thisForm2).entries()
        const response = await fetch('http://localhost:3000/transaksi', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        const alertCode = response.status;
        if (alertCode == 404) {
            alert("Id tidak ditemukan");
            return;
        } else {
            alert("Data Berhasil Di-delete");
            return;
        }
        const result = await response.json();
        console.log(result)
    });
}

//menampilkan data
$('#select').on('click', function (event) {
    $.getJSON('http://localhost:3000/tampil', function (data) {
        console.log(data);
        $('#tampil').append(
            "<table>" +
            `  <tr>
            <th>id_pembelian</th>
            <th>id_gunung</th>
            <th>nama_gunung</th>
            <th>wilayah</th>
            <th>tanggal</th>
            <th>kuota</th>
            <th>harga_tiket</th>
          </tr>` +
            data.map(row => `<tr>
                <td>${row.no}</td>
                <td>${row.id_gunung}</td>
                <td>${row.nama_gunung}</td>
                <td>${row.wilayah}</td>
                <td>${row.tanggal}</td>
                <td>${row.kuota}</td>
                <td>${row.harga_tiket}</td>
            </tr>`) +
            "</table>"
        );
    });
});

$('#select1').on('click', function (event) {

    $.getJSON('http://localhost:3000/tampil1', function (data) {
        console.log(data);
        $('#tampil1').append(
            "<table>" +
            `  <tr>
            <th>id_gunung</th>
            <th>nama_gunung</th>
            <th>wilayah</th>
          </tr>` +
            data.map(row => `<tr>
                <td>${row.id_gunung}</td>
                <td>${row.nama_gunung}</td>
                <td>${row.wilayah}</td>
            </tr>`) +
            "</table>"
        );
    });
});

$('#select2').on('click', function (event) {
    $.getJSON('http://localhost:3000/tampil2', function (data) {
        console.log(data);
        $('#tampil2').append(
            "<table>" +
            `  <tr>
            <th>id_jadwal</th>
            <th>tanggal</th>
            <th>hari</th>
          </tr>` +
            data.map(row => `<tr>
                <td>${row.id_jadwal}</td>
                <td>${row.tanggal}</td>
                <td>${row.hari}</td>
            </tr>`) +
            "</table>"
        );
    });
});

$('#hasiltransaksi').on('click', function (event) {
    const nama = document.getElementById('username2').value;
    console.log(nama);
    $.getJSON(`http://localhost:3000/transaksi/${nama}`, function (data) {
        console.log(data);
        $('#tampil5').append(
            "<table>" +
            `  <tr>
            <th>no</th>
            <th>id_pembelian</th>
            <th>username</th>
            <th>tiket</th>
          </tr>` +
            data.map(row => `<tr>
                <td>${row.no}</td>
                <td>${row.id_pembelian}</td>
                <td>${row.username}</td>
                <td>${row.tiket}</td>
            </tr>`) +
            "</table>"
        );
    });
});

$('#hasiluang').on('click', function (event) {
    const nama = document.getElementById('username3').value;
    console.log(nama);
    $.getJSON(`http://localhost:3000/topup/${nama}`, function (data) {
        console.log(data);
        $('#tampil6').append(
            "<table>" +
            `  <tr>
            <th>uang</th>
          </tr>` +
            data.map(row => `<tr>
                <td>${row.uang}</td>
            </tr>`) +
            "</table>"
        );
    });
});

$('#ubahsandi').on('click', function (event) {
    const nama = document.getElementById('username4').value;
    console.log(nama);
    $.getJSON(`http://localhost:3000/listsandi/${nama}`, function (data) {
        console.log(data);
        $('#tampil7').append(
            "<table>" +
            `  <tr>
            <th>id_user</th>
            <th>username</th>
            <th>pass</th>
            <th>uang</th>
            <th>pengeluaran</th>
            <th>total tiket</th>
          </tr>` +
            data.map(row => `<tr>
                <td>${row.id_user}</td>
                <td>${row.username}</td>
                <td>${row.pass}</td>
                <td>${row.uang}</td>
                <td>${row.pengeluaran}</td>
                <td>${row.total_tiket}</td>
            </tr>`) +
            "</table>"
        );
    });
});


(function ($) {
    "use strict";

    // Initiate the wowjs
    new WOW().init();


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 90) {
            $('.nav-bar').addClass('nav-sticky');
            $('.carousel, .page-header').css("margin-top", "73px");
        } else {
            $('.nav-bar').removeClass('nav-sticky');
            $('.carousel, .page-header').css("margin-top", "0");
        }
    });


    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonial Slider
    $('.testimonial-slider').slick({
        infinite: true,
        autoplay: true,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.testimonial-slider-nav'
    });
    $('.testimonial-slider-nav').slick({
        arrows: false,
        dots: false,
        focusOnSelect: true,
        centerMode: true,
        centerPadding: '22px',
        slidesToShow: 3,
        asNavFor: '.testimonial-slider'
    });
    $('.testimonial .slider-nav').css({ "position": "relative", "height": "160px" });


    // Blogs carousel
    $(".related-slider").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });

})(jQuery);





