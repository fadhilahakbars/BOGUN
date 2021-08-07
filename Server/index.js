const express = require('express');
const app = express();
var session = require('express-session');
var path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { Client } = require('pg');
const { response } = require('express');
const cors = require('cors');
app.use(cors());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
const port = process.env.PORT || 3000;
const client = new Client({
    // Lengkapi koneksi dengan database
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "fadil123",
    database: "bogun",
});

client.connect((err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database Connected');
});

//Admin utama
app.post('/insertgunung', function (req, res) {
    const query = `INSERT INTO gunung VALUES (DEFAULT, '${req.body.nama_gunung}', '${req.body.wilayah}')`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        res.send(`Data dengan nama ${req.body.nama_gunung} berhasil dimasukkan.`);
    });
})

app.post('/insertjadwal', function (req, res) {
    const query = `INSERT INTO jadwal VALUES (DEFAULT, '${req.body.tanggal}', '${req.body.hari}')`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        res.send(`Data dengan tanggal ${req.body.tanggal} berhasil dimasukkan.`);
    });
})

app.post('/insertlist', function (req, res) {
    const query = `INSERT INTO list VALUES (DEFAULT, ${req.body.id_gunung}, '${req.body.jadwal}', ${req.body.harga_tiket}, ${req.body.kuota})`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        res.send(`Data dengan tanggal ${req.body.jadwal} berhasil dimasukkan.`);
    });
})

app.put('/updategunung', function (req, res) {
    const queryhandling = `SELECT id_gunung from gunung where id_gunung= ${req.body.id_gunung}`;
    client.query(queryhandling, (err, result) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        if (result.rows.length === 0) {
            console.log("Data tidak ada");
            res.statusCode = 404;
            res.send(null);
            return
        }
        const query = `
                        UPDATE gunung SET nama_gunung = '${req.body.nama_gunung}', wilayah = '${req.body.wilayah}'
                        WHERE id_gunung = ${req.body.id_gunung}
                    `;
        client.query(query, (err, results) => {
            if (err) {
                console.error(err);
                res.send(null);
                return;
            }
            res.send(`Data [${req.body.nama_gunung}, ${req.body.wilayah}] berhasil di-update.`);
        });
    });
});

app.put('/updatelist', function (req, res) {
    const queryhandling = `SELECT id_gunung, jadwal from list where id_gunung= ${req.body.id_gunung} AND jadwal= '${req.body.jadwal}'`;
    client.query(queryhandling, (err, result) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        if (result.rows.length === 0) {
            console.log("Data tidak ada");
            res.statusCode = 404;
            res.send(null);
            return
        }
        const query = `
                        UPDATE list SET harga_tiket = ${req.body.harga_tiket}, kuota = ${req.body.kuota}
                        WHERE id_gunung = ${req.body.id_gunung} AND jadwal = '${req.body.jadwal}' 
                    `;
        client.query(query, (err, results) => {
            if (err) {
                console.error(err);
                res.send(null);
                return;
            }
            res.send(`Data berhasil di-update.`);
        });
    });
});

app.put('/updatejadwal', function (req, res) {
    const queryhandling = `SELECT tanggal, hari from jadwal where id_jadwal= '${req.body.id_jadwal}'`;
    client.query(queryhandling, (err, result) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        if (result.rows.length === 0) {
            console.log("Data tidak ada");
            res.statusCode = 404;
            res.send(null);
            return
        }
        const query = `
                        UPDATE jadwal SET tanggal = '${req.body.tanggal}', hari = '${req.body.hari}' WHERE id_jadwal = ${req.body.id_jadwal}
                    `;
        client.query(query, (err, results) => {
            if (err) {
                console.error(err);
                res.send(null);
                return;
            }
            res.send(`Data [${req.body.tanggal}, ${req.body.hari}] berhasil di-update.`);
        });
    });
});

app.delete('/deletelist', function (req, res) {
    const queryhandling = `SELECT id_gunung, jadwal from list where id_gunung= ${req.body.id_gunung} AND jadwal= '${req.body.jadwal}'`;
    client.query(queryhandling, (err, result) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        if (result.rows.length === 0) {
            console.log("Data tidak ada");
            res.statusCode = 404;
            res.send(null);
            return
        }
        const query = `DELETE FROM list WHERE id_gunung= ${req.body.id_gunung} AND jadwal= '${req.body.jadwal}'`;
        client.query(query, (err, results) => {
            if (err) {
                res.send(null);
                return;
            }
            res.send(`Data dengan berhasil dihapus.`);
        });
    });
});

app.delete('/deletegunung', function (req, res) {
    const queryhandling = `SELECT id_gunung from gunung where id_gunung= ${req.body.id_gunung}`;
    client.query(queryhandling, (err, result) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        if (result.rows.length === 0) {
            console.log("Data tidak ada");
            res.statusCode = 404;
            res.send(null);
            return
        }
        const query = `DELETE FROM gunung WHERE id_gunung = ${req.body.id_gunung}`;
        client.query(query, (err, results) => {
            if (err) {
                res.send(null);
                return;
            }
            res.send(`Data dengan ID ${req.body.id_gunung} berhasil dihapus.`);
        });
    });
});

app.get('/tampil', (req, res) => {
    const query = `select no, g.id_gunung, nama_gunung, wilayah, tanggal, kuota, harga_tiket from (list inner join jadwal on list.jadwal = jadwal.tanggal) inner join gunung g on list.id_gunung = g.id_gunung order by no ASC
`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        res.send(results.rows);
    });
});

app.get('/tampil1', (req, res) => {
    const query = `select * from gunung order by id_gunung ASC
`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        res.send(results.rows);
    });
});

app.get('/tampil2', (req, res) => {
    const query = `select * from jadwal order by id_jadwal ASC
`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        res.send(results.rows);
    });
});

//transaksi
app.post('/transaksi', function (req, res) {
    const query = `INSERT INTO pembelian VALUES (DEFAULT, ${req.body.id_pembelian}, '${req.body.username}', ${req.body.tiket})`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        res.send(`Data berhasil dimasukkan.`);
    });
})

app.delete('/transaksi', function (req, res) {
    const queryhandling = `SELECT id_pembelian, username from pembelian where id_pembelian= ${req.body.id_pembelian} AND username= '${req.body.username}'`;
    client.query(queryhandling, (err, result) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        if (result.rows.length === 0) {
            console.log("Data tidak ada");
            res.statusCode = 404;
            res.send(null);
            return
        }
        const query = `DELETE FROM pembelian WHERE id_pembelian= ${req.body.id_pembelian} AND username= '${req.body.username}'`;
        client.query(query, (err, results) => {
            if (err) {
                res.send(null);
                return;
            }
            res.send(`Data berhasil dihapus.`);
        });
    });
});

app.get('/transaksi', (req, res) => {
    const query = `select * from pembelian where username = '${req.body.username}';
`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        res.send(results.rows);
    });
});

//user
app.post('/login', function (request, response) {
    var username = request.body.username;
    var pass = request.body.pass;
    console.log(username);
    console.log(pass);
    if (username && pass) {
        client.query('SELECT COUNT(*), k.username FROM keanggotaan AS k WHERE k.username = $1 AND k.pass = $2 group by k.username;', [username, pass], function (error, results, fields) {
            if (results.rows[0].count == 0) {
                response.jsonp({ success: false });
                console.log("Login Gagal");
            }

            else if (results.rows[0].username == 'admin') {
                response.jsonp({ admin: true });
                console.log("ini admin");
            }
            else {
                // response.statusCode = 200;
                // response.send(null);
                response.jsonp({ success: true });
                console.log("Login berhasil");
            }
            response.end();
        });
    } else {
        console.log("Ga masuk");
        response.send('Please enter Username and Password!');
        response.end();
    }

});

app.post('/user', function (req, res) {
    const query = `INSERT INTO keanggotaan VALUES (DEFAULT, '${req.body.username}', '${req.body.pass}', 0, 0, 0)`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        res.send(`Data berhasil dimasukkan.`);
    });
})

app.put('/topup', function (req, res) {
    const queryhandling = `SELECT username, pass from keanggotaan where username = '${req.body.username}' AND pass= '${req.body.pass}'`;
    client.query(queryhandling, (err, result) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        if (result.rows.length === 0) {
            console.log("Data tidak ada");
            res.statusCode = 404;
            res.send(null);
            return
        }
        const query = `
                        UPDATE keanggotaan SET uang = uang + ${req.body.uang}
                        WHERE username = '${req.body.username}' AND pass = '${req.body.pass}' 
                    `;
        client.query(query, (err, results) => {
            if (err) {
                console.error(err);
                res.send(null);
                return;
            }
            res.send(`Data berhasil di-update.`);
        });
    });
});

app.put('/sandi', function (req, res) {
    const queryhandling = `SELECT id_user from keanggotaan where id_user= ${req.body.id_user}`;
    client.query(queryhandling, (err, result) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        if (result.rows.length === 0) {
            console.log("Data tidak ada");
            res.statusCode = 404;
            res.send(null);
            return
        }
        const query = `
                        UPDATE keanggotaan SET username = '${req.body.username}', pass = '${req.body.pass}'
                        WHERE id_user= ${req.body.id_user} 
                    `;
        client.query(query, (err, results) => {
            if (err) {
                console.error(err);
                res.send(null);
                return;
            }
            res.send(`Data berhasil di-update.`);
        });
    });
});

app.get('/listsandi', (req, res) => {
    const query = `select * from keanggotaan where username = '${req.body.username}';
`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.send(null);
            return;
        }
        res.send(results.rows);
    });
});

app.get("/transaksi/:id", async (req, res) => {


    try {
        const { id } = req.params;
        const query = await client.query(`select * from pembelian where username = $1`, [
            id
        ]);

        res.json(query.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/topup/:id", async (req, res) => {


    try {
        const { id } = req.params;
        const query = await client.query(`select uang from keanggotaan where username = $1`, [
            id
        ]);

        res.json(query.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/listsandi/:id", async (req, res) => {


    try {
        const { id } = req.params;
        const query = await client.query(`select * from keanggotaan where username = $1`, [
            id
        ]);

        res.json(query.rows);
    } catch (err) {
        console.error(err.message);
    }
});


// app.post('/login', async (request, response)=> {
//     var username = request.body.username;
//     var pass = request.body.pass;
//     console.log(username);
//     console.log(pass);
//     if (username && pass) {
//         client.query('SELECT COUNT(*), k.username FROM keanggotaan AS k WHERE k.username = $1 AND k.pass = $2 group by k.username;', [username, pass], function (error, results, fields) {
//             if (results.rows[0].count == 0) {
//                 // response.jsonp({ success: false });
//                 request.session.loggedin = false;
//                 console.log("Login Gagal");
//             }

//             else if (results.rows[0].username == 'admin') {
//                 // response.jsonp({ admin: true });
//                 console.log("ini admin");
//                 request.session.loggedin = true;
//                 request.session.admin = true;
//                 request.session.username = username;
//                 response.redirect('/dahlah');
//             }
//             else {
//                 // response.statusCode = 200;
//                 // response.send(null);
//                 // response.jsonp({ success: true });
//                 console.log("Login berhasil");
//                 request.session.loggedin = true;
//                 request.session.username = username;
//                 response.redirect('/dahlah');
//             }
//             // console.log(request.session.loggedin);
//             // console.log(request.session.username);
//             response.end();
//         });
//     } else {
//         console.log("Ga masuk");
//         response.send('Please enter Username and Password!');
//         response.end();
//     }

// });

// app.get('/', function(request, response) {
// 	response.sendFile(path.join(__dirname + '/login1.html'));
// });

// app.post('/auth', function(request, response) {
// 	var username = request.body.username;
// 	var password = request.body.password;
// 	if (username && password) {
// 		connection.query('SELECT * FROM keanggotaan WHERE username = $1 AND pass = $2', [username, pass], function(error, results, fields) {
// 			if (results.length > 0) {
// 				request.session.loggedin = true;
// 				request.session.username = username;
// 				response.redirect('/home');
// 			} else {
// 				response.send('Incorrect Username and/or Password!');
// 			}			
// 			response.end();
// 		});
// 	} else {
// 		response.send('Please enter Username and Password!');
// 		response.end();
// 	}
// });

// app.get('/wedidit', function(request, response) {
// 	if (request.session.loggedin) {
// 		response.send('Welcome back, ' + request.session.username + '!');
// 	} else {
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });

// app.get('/dahlah', async (request, response) => {
// 	if (request.session.admin) {
//         console.log(request.session.loggedin);
//         console.log(request.session.username);
//         response.send('Welcome back Admin!');
//     }
//     else if (request.session.loggedin) {
//         console.log(request.session.loggedin);
//         console.log(request.session.username);
// 		response.send('Welcome back, ' + request.session.username + '!');
// 	} else {
//         console.log(request.session.loggedin);
//         console.log(request.session.username);
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });

//server listening
app.listen(port, () => {
    console.log(`Program sudah berjalan pada port ${port}`);
});