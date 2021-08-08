### BOGUN - BOOKING GUNUNG

## Panduan untuk menggunakan web ini

# Database
  1. Buka file bogun.sql
  2. Copy semua command dari create database hingga create function dan trigger ke dalam shell(psql)
  3. Catatan harus sudah menginstall postgresql
  4. Silahkan ujicoba database dengan meng-copy command yang ada di baris paling bawah
  
# Server  database
  1. Catatan jika ingin menggunakan semua instalisasi yang ada di folder ini maka tidak perlu menginstall package node.js
  2. Harus sudah terinstall node.js di komputer anda!
  3. Buka command prompt
  4. Masukkan ke halaman directory server anda di command prompt
  5. kemudian masukkan command npm init
  6. kemudian enter sampai command selesai
  7. kemudian masukkan command npm install express body-parser cors pg
  8. Instalisasi telah selesai silahkan gunakan index.js yang ada di folder server ini lalu coba jalankan di postman terlebih dahulu!
  9. Sebelum mencoba, untuk menyalakan server silahkan ketik command node index.js

# Web
  1. Silahkan gunakan folder front yang ada di dalam github ini
  2. Dalam proyek ini masih menggunakan localhost
  3. Cara menggunakan localhost bisa melalui visual studio code dengan menjalankan live server yang ada di visual studio code
  4. Kemudian anda sudah berhasil membuka tampilan web dengan localhost
  5. Catatan untuk menjalankan web ini diperlukan server database yang sudah terkoneksi dengan menggunakan node index.js
  6. Langkah pertama buka halaman http://localhost:5500/Front/login1.html yang akan mendirect ke halaman login
  7. jika ingin menggunakan halaman admin silahkan login username admin dan pass admin
  8. Jika ingin menggunakan halaman user silahkan signup terlebih dahulu lalu kembali kehalaman login dan masukan username dan pass nya
  9. Halaman admin difungsikan untuk membuat, menambah atau mengurangi table yang ada didalam database
  10. Halaman User berfungsi untuk melakukan transaksi pembelian booking tiket. 
  
  ## THANK YOU SELAMAT MENCOBA
