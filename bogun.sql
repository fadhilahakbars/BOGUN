-- DROP DATABASE
drop trigger trigger_ubah_kuota on pembelian;
drop trigger trigger_check_kuota on pembelian;
drop trigger trigger_transaksi on pembelian;
drop trigger trigger_refund on pembelian;
drop trigger trigger_check_uang on pembelian;
drop table pembelian;
drop table list;
drop table jadwal;
drop table gunung;
drop table keanggotaan;
drop function transaksi();
drop function ubah_kuota();
drop function check_kuota();
drop function check_uang();
drop function refund();

-- Create Database
create database bogun;

-- Create Type
create type hari as enum ('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu');

-- Create Table
create table jadwal (id_jadwal serial not null unique, tanggal varchar(100) primary key , hari hari);
create table gunung (id_gunung serial primary key, nama_gunung varchar(100), wilayah varchar(100));
create table list (no serial primary key , id_gunung int not null , jadwal varchar(100) not null, harga_tiket bigint, kuota int, constraint fk_jadwal foreign key(jadwal) references jadwal(tanggal) on update cascade, constraint fk_gunung foreign key(id_gunung) references gunung(id_gunung) on update cascade);
create table keanggotaan (id_user serial not null unique, username varchar(100) primary key, pass varchar(100), uang bigint, pengeluaran bigint, total_tiket int);
create table pembelian (no serial primary key, id_pembelian int not null, username varchar(100) not null, tiket int not null, constraint fk_user foreign key(username) references keanggotaan(username) on update cascade, constraint fk_pembelian foreign key(id_pembelian) references list(no) on update cascade);

-- Insert Data
insert into jadwal (tanggal, hari) values
('2021-07-27', 'Selasa'),
('2021-07-28', 'Rabu'),
('2021-07-29', 'Kamis'),
('2021-07-30', 'Jumat'),

insert into gunung (nama_gunung, wilayah) values
('Gunung Ciremai', 'Jawa Barat'),
('Gunung Merbabu', 'Jawa Tengah');

insert into list (id_gunung, jadwal, harga_tiket, kuota) values
(1, '2021-07-27', 10000, 200),
(1, '2021-07-28', 10000, 300),
(1, '2021-07-29', 5000, 400),
(2, '2021-07-27', 15000, 500),
(2, '2021-07-28', 15000, 200),
(2, '2021-07-29', 20000, 150);

insert into keanggotaan (username, pass, uang, pengeluaran, total_tiket) values
('admin', 'admin', 0, 0, 0),
('user1', 'user1', 50000, 0, 0),
('user2', 'user2', 40000, 0, 0);

-- Function dan trigger check kuota
CREATE OR REPLACE FUNCTION check_kuota() RETURNS TRIGGER AS
    $$
    BEGIN
        DECLARE
            tiket_kuota int;
        BEGIN
            EXECUTE FORMAT('SELECT kuota FROM list WHERE no = $1') into tiket_kuota USING new.id_pembelian;

            IF (tiket_kuota < new.tiket) THEN
                RAISE EXCEPTION 'Kuota sudah habis pada tanggal %', new.jadwal;
            end if;
            return new;
        end;
    end;
    $$
language plpgsql volatile;

create trigger trigger_check_kuota
    before insert on pembelian
    for each row execute procedure check_kuota();

-- Function dan trigger check uang
CREATE OR REPLACE FUNCTION check_uang() RETURNS TRIGGER AS
    $$
    BEGIN
        DECLARE
            uang_user int;
            harga_user int;
        BEGIN
            EXECUTE FORMAT('SELECT uang FROM keanggotaan WHERE username = $1') into uang_user USING new.username;
            EXECUTE FORMAT('SELECT harga_tiket FROM list WHERE no = $1') into harga_user USING new.id_pembelian;

            IF (uang_user < harga_user) THEN
                RAISE EXCEPTION 'Uang Anda Habis';
            end if;
            return new;
        end;
    end;
    $$
language plpgsql volatile;

create trigger trigger_check_uang
    before insert on pembelian
    for each row execute procedure check_uang();

-- Function dan trigger ubah kuota
CREATE OR REPLACE FUNCTION ubah_kuota()
    RETURNS TRIGGER AS
$$
BEGIN
    EXECUTE format ('UPDATE list SET kuota = kuota - $1 WHERE no = $2') USING new.tiket, new.id_pembelian;
    return new;
END
$$
    LANGUAGE plpgsql VOLATILE;

CREATE TRIGGER trigger_ubah_kuota
AFTER INSERT ON pembelian
FOR EACH ROW EXECUTE PROCEDURE ubah_kuota();

-- Function dan trigger transaksi
CREATE OR REPLACE FUNCTION transaksi()
    RETURNS TRIGGER AS
$$
BEGIN
    DECLARE
        harga bigint;
    BEGIN
        EXECUTE FORMAT('SELECT harga_tiket FROM list WHERE no = $1')
        INTO harga USING new.id_pembelian;

        EXECUTE FORMAT('UPDATE keanggotaan SET uang = (uang - $1), pengeluaran = (pengeluaran + $1), total_tiket = (total_tiket + $2) WHERE username = $3') using (new.tiket * harga), new.tiket, new.username;
        return new;
    END;
END
$$
    LANGUAGE plpgsql VOLATILE;

CREATE TRIGGER trigger_transaksi
AFTER INSERT ON pembelian
FOR EACH ROW EXECUTE PROCEDURE transaksi();

-- Function dan trigger refund
CREATE OR REPLACE FUNCTION refund()
    RETURNS TRIGGER AS
$$
BEGIN
    DECLARE
        harga bigint;
    BEGIN
        EXECUTE FORMAT('SELECT harga_tiket FROM list WHERE no = $1')
        INTO harga USING old.id_pembelian;

        EXECUTE format ('UPDATE list SET kuota = kuota + $1 WHERE no = $2') USING old.tiket, old.id_pembelian;

        EXECUTE FORMAT('UPDATE keanggotaan SET uang = (uang + $1), pengeluaran = (pengeluaran - $1), total_tiket = (total_tiket - $2) WHERE username = $3') using (old.tiket * harga), old.tiket, old.username;
        return new;
    END;
END
$$
    LANGUAGE plpgsql VOLATILE;

CREATE TRIGGER trigger_refund
AFTER DELETE ON pembelian
FOR EACH ROW EXECUTE PROCEDURE refund();

-- Beberapa data yang bisa dicoba
select no, g.id_gunung, nama_gunung, wilayah, tanggal, kuota, harga_tiket from (list inner join jadwal on list.jadwal = jadwal.tanggal) inner join gunung g on list.id_gunung = g.id_gunung order by id_gunung ASC;

insert into pembelian (username, id_pembelian, tiket) values ('user1', 1, 2);
insert into pembelian (username, id_pembelian, tiket) values ('halo', 4, 2);

delete from pembelian where id_pembelian = 1 AND username = 'user1';
delete from pembelian where jadwal = '2021-07-28' AND id_gunung = 2 AND username = 'user1';