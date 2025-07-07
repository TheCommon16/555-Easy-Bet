-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Lug 07, 2025 alle 12:18
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `utentislot`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `logspin`
--

CREATE TABLE `logspin` (
  `ID_logspin` int(11) NOT NULL,
  `gametype` int(11) NOT NULL,
  `logspin` varchar(255) NOT NULL,
  `userbetsize` int(11) NOT NULL,
  `userbalance` int(11) NOT NULL,
  `userwin` int(11) NOT NULL,
  `usernewbalance` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `dataspin` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `logspin`
--

INSERT INTO `logspin` (`ID_logspin`, `gametype`, `logspin`, `userbetsize`, `userbalance`, `userwin`, `usernewbalance`, `id_user`, `dataspin`) VALUES
(1, 3, '2', 1, 581, -1, 580, 1, '2025-06-26 23:50:21'),
(2, 3, '1', 1, 580, 2, 581, 1, '2025-06-26 23:50:23'),
(3, 3, '1', 100, 581, 200, 681, 1, '2025-06-26 23:50:39'),
(4, 1, '5:4:10', 1, 679, -1, 678, 1, '2025-06-26 23:52:11'),
(5, 1, '12:6:3', 1, 678, -1, 677, 1, '2025-06-26 23:52:24'),
(6, 2, '13:4:16', 1, 677, -1, 676, 1, '2025-06-26 23:52:26'),
(7, 1, '8:6:13', 1, 676, -1, 675, 1, '2025-06-26 23:55:04'),
(8, 1, '14:12:16', 1, 675, -1, 674, 1, '2025-06-27 00:36:55'),
(9, 3, '2', 1, 674, -1, 673, 1, '2025-06-27 14:57:13'),
(10, 3, '2', 1, 673, -1, 672, 1, '2025-06-27 14:57:17'),
(11, 3, '2', 600, 672, -600, 72, 1, '2025-06-27 14:57:22'),
(12, 3, '2', 72, 72, -72, 0, 1, '2025-06-27 14:57:25'),
(13, 2, '1:4:10', 50, 700, -50, 650, 1, '2025-06-27 14:57:44'),
(14, 1, '4:13:3', 1, 650, -1, 649, 1, '2025-06-27 14:57:52'),
(15, 3, '1', 49, 649, 98, 698, 1, '2025-06-27 14:58:22'),
(16, 3, '1', 2, 698, 4, 700, 1, '2025-06-27 14:58:26'),
(17, 1, '6:1:5', 1, 700, -1, 699, 1, '2025-06-27 14:58:44'),
(18, 1, '1:8:2', 100, 699, -100, 599, 1, '2025-06-27 14:58:50'),
(19, 1, '1:2:11', 100, 599, -100, 499, 1, '2025-06-27 14:58:55');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `ID` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `userpassword` varchar(255) NOT NULL,
  `money` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`ID`, `nome`, `cognome`, `username`, `userpassword`, `money`) VALUES
(1, 'Koala', 'real', 'TheCommon', '$2b$10$VRmq1XYMe6IdluW0RmF30eJX3D0J0YJniISfHFiT04zbBT5.m0Xrm', 499),
(5, 'Madonna', 'Cristo', 'Gesu', '$2b$10$VvB2XDGqGmi2WIP25/o/x.F0TnxCAjfZOIheBIXJeMjDJFtpmK9We', 555),
(6, 'Gennar', 'Reg', 'Reg!', '$2b$10$.su70UuBAtiMaAZFWs8UuOzgnpf5uDTfBaqzwWubgy/yUnz2hC8p6', 25555),
(7, 'Jiorno', 'Joestar', 'Jojolion', '$2b$10$pFdqBUTttkEI9.QUtqlEf.D1Q.2F7M5TEz73lLk9JOUc3WvzIGdv2', 100),
(8, 'lol', 'lol', 'Leage', '$2b$10$Lji21Erg1nQuSAkwK.tPY.a89.pWXIJpyH/cJVFRe.z01G3iPTtyK', 100),
(9, 'Gesu', 'Cristo', 'Nostro', '$2b$10$Qt8Rtr7GIjYrCsmPC.P3x.FbLhDValNUBkoMFqdAX.UOfo8F5x5B.', 100),
(10, 'kkk', 'kkk', 'kkk', '$2b$10$sUQahyw8/DxJ3chbBOj/aOxOUUbeg6K2E1Y2rH4mFyfJdmQJzehHS', 100),
(11, 'Lenin', 'Stalin', 'Trosky', '$2b$10$oWyx7SZsL9.dsArX/sDskuke3ckQmUd/QjGTeGmR2zUBRDjroB8te', 19170),
(12, 'Mano', 'Arrow', 'Kira', '$2b$10$PpyO8MnA209sXqre8u4PL.IWAXr24v8CED62DX22FP2Rii92AaJ4O', 9000);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `logspin`
--
ALTER TABLE `logspin`
  ADD PRIMARY KEY (`ID_logspin`),
  ADD KEY `id_user` (`id_user`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `logspin`
--
ALTER TABLE `logspin`
  MODIFY `ID_logspin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `logspin`
--
ALTER TABLE `logspin`
  ADD CONSTRAINT `logspin_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `utenti` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
