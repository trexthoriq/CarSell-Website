-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2025 at 08:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carsell_acc`
--

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `manufacturer` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `mileage` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `name`, `manufacturer`, `model`, `year`, `mileage`, `price`, `image`) VALUES
(1, 'Civic RS', 'Honda', 'Civic', 2023, 13500, 95000.00, 'Civic RS.jpg'),
(2, 'Corolla Altis', 'Toyota', 'Corolla', 2022, 29500, 88000.00, 'Corolla Altis.jpg'),
(3, 'Mazda 3', 'Mazda', '3', 2021, 48200, 97000.00, 'Mazda 3.jpg'),
(4, 'Nissan Almera', 'Nissan', 'Almera', 2015, 67000, 95975.08, 'Nissan Almera.jpg'),
(5, 'Volkswagen Golf', 'Volkswagen', 'Golf', 2018, 21800, 80192.63, 'VW Golf.jpg'),
(6, 'Perodua Bezza', 'Perodua', 'Bezza', 2022, 73500, 130009.08, 'Perodua Bezza.jpg'),
(7, 'Honda HR-V', 'Honda', 'HR-V', 2022, 90500, 62171.61, 'Honda HRV.jpg'),
(8, 'Hyundai Ioniq', 'Hyundai', 'Ioniq', 2024, 112300, 156990.69, 'Hyundai Ioniq.jpg'),
(9, 'Volkswagen Arteon', 'Volkswagen', 'Arteon', 2016, 54400, 154435.76, 'VW Arteon.jpg'),
(10, 'Tesla Model 3', 'Tesla', 'Model 3', 2024, 120800, 77924.59, 'Tesla 3.jpg'),
(11, 'Kia Stinger', 'Kia', 'Stinger', 2018, 36900, 125525.30, 'Kia Stinger.jpg'),
(12, 'Mazda CX-3', 'Mazda', 'CX-3', 2023, 65800, 135184.30, 'Mazda CX3.jpg'),
(13, 'Hyundai Kona', 'Hyundai', 'Kona', 2023, 147900, 135681.55, 'Hyundai Kona.jpg'),
(76, 'Porsche GT3 RS', 'Porsche', 'GT3 RS', 2022, 110000, 1000000.00, 'Porsche gt3rs.jpg'),
(77, 'Lamborghini Urus', 'Lamborghini', 'Urus', 2022, 11000, 102300.00, 'Lamborghini Urus.jpg'),
(78, 'Audi R8', 'Audi', 'R8', 2019, 30000, 700888.00, 'Audi R8.jpg'),
(80, 'Proton Saga', 'Proton', 'Saga', 2021, 189200, 50000.00, 'Proton Saga.jpg'),
(81, 'Honda Prelude', 'Honda', 'Prelude', 1991, 543000, 20000.00, 'Honda Prelude.jpg'),
(82, 'Toyota Celica', 'Toyota', 'Celica', 1992, 403220, 70000.00, '6850514471916_Toyota Celica.jpg'),
(83, 'Toyota Supra MK5', 'Toyota', 'Supra MK5', 2017, 545098, 700000.00, '685057d82bedb_Toyota Supra MK5.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
