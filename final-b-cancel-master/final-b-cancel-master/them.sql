-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2018 at 07:52 PM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `them`
--

-- --------------------------------------------------------

--
-- Table structure for table `enemy`
--

CREATE TABLE `enemy` (
  `id` int(11) NOT NULL,
  `priority` int(11) NOT NULL DEFAULT '0',
  `username` varchar(64) NOT NULL,
  `justification` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `enemy`
--

INSERT INTO `enemy` (`id`, `priority`, `username`, `justification`) VALUES
(12, 1, 'jaziel hernandez', 'can\'t compete with that hair'),
(13, 2, 'kevin kowalski', 'knows too much, must be silenced'),
(14, 2, 'roel tijerina', 'sits too close, need personal space'),
(15, 3, 'maria lorenzana andres', 'seems to be up to something'),
(16, 3, 'jose chapa', 'couldn\'t remember name');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `enemy`
--
ALTER TABLE `enemy`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `enemy`
--
ALTER TABLE `enemy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
