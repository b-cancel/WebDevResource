-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2018 at 06:32 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipe_site`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `prep_time` int(11) NOT NULL,
  `total_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`id`, `image_url`, `name`, `description`, `prep_time`, `total_time`) VALUES
(1, 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/7/21/1/HE_Overnight-Oats-2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1437508212948.jpeg', 'OverNight Oats', 'oats soaked in milk, with your choice of fruit', 0, 1),
(2, 'https://s.aolcdn.com/dims-shared/dims3/GLOB/crop/6016x4016+0+0/resize/900x601!/format/jpg/quality/85/https://s.aolcdn.com/hss/storage/midas/6c04149e111f13854187cffc8b47d92c/204968798/639755524.jpg', 'Toast with Cheese and Fruit', 'Toast, you spread some cheese on it, and you put some slice fruit over the cheese', 0, 2),
(3, 'https://s.aolcdn.com/dims-shared/dims3/GLOB/crop/4772x3744+843+0/resize/900x706!/format/jpg/quality/85/https://s.aolcdn.com/hss/storage/midas/70a081138e3e581c9a55ac6295753da5/204968806/502708516.jpg', 'Pasta', 'cheap pasta, and pasta sauce. Cook pasta al dente and stir the heated sauce.', 0, 15),
(4, 'https://s.aolcdn.com/dims-shared/dims3/GLOB/crop/3610x3000+390+0/resize/900x748!/format/jpg/quality/85/https://s.aolcdn.com/hss/storage/midas/bf9a197c89ead88d9a1cc917c4e1db79/204968874/576590866.jpg', 'Black Beans Burgers', 'Burger with Black Beans, sweet potato, and whatever else you want to toss in there', 10, 15),
(5, 'https://s.aolcdn.com/dims-shared/dims3/GLOB/crop/5237x3809+0+0/resize/900x655!/format/jpg/quality/85/https://s.aolcdn.com/hss/storage/midas/e7f0601ba4eca6c1378b39187da669de/204968813/478865684.jpg', 'Lentil Curry', 'Dried red lentils with a curry of potatoes, grated veggies and some spices', 10, 20);

-- --------------------------------------------------------

--
-- Table structure for table `steps`
--

CREATE TABLE `steps` (
  `id` int(11) NOT NULL,
  `step_number` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `steps`
--

INSERT INTO `steps` (`id`, `step_number`, `description`, `recipe_id`) VALUES
(1, 1, 'find your oats', 1),
(2, 2, 'find your milk', 1),
(3, 3, 'soak the oats in milk', 1),
(4, 4, 'find your toppings', 1),
(5, 5, 'add your toppings', 1),
(6, 1, 'find your bread', 2),
(7, 2, 'toast your bread', 2),
(8, 3, 'find your cheese', 2),
(9, 4, 'spread your cheese on your toast', 2),
(10, 5, 'find your fruits', 2),
(11, 6, 'slice your fruits', 2),
(12, 7, 'place your fruits on the side of the toast that has the cheese', 2),
(13, 1, 'find your pasta', 3),
(14, 2, 'find your pot', 3),
(15, 3, 'find 2 cups of water', 3),
(16, 4, 'find salt', 3),
(17, 5, 'place water and salt into pot', 3),
(18, 6, 'put the pot on the stove', 3),
(19, 7, 'turn on the stove', 3),
(20, 8, 'let the water boil', 3),
(21, 9, 'wait until the pasta is soft but sticky', 3),
(22, 10, 'remove the pasta', 3),
(23, 11, 'find the sauce', 3),
(24, 12, 'heat up the sauce', 3),
(25, 13, 'mix the pasta with the sauce', 3),
(26, 1, 'turn on the grill, place a sheet of aluminium foil over it, and lightly oil the sheet', 4),
(27, 2, 'mash black beans until thick and pasty', 4),
(28, 3, 'use a food processor to mix the paste of black beans with any veggies you want such as bell pepper, onion, or garlic', 4),
(29, 4, 'stir that mix together with an egg, chili powder, cumin, and chili sauce', 4),
(30, 5, 'mix in bread crumbs until the mixture is stick and holds together', 4),
(31, 6, 'divide the mixture into multiple patties', 4),
(32, 7, 'grill the patties for about 8 minutes each', 4),
(33, 8, 'assemble the patties between 2 buns and add anything else you would like between the buns', 4),
(35, 1, 'was lentils in cold water until clear. put lentils in pot with enough water to cover. bring to boil', 5),
(36, 2, 'place a cover on pot, reduce heat to medium low, simmer, add water to keep lentils covered, cook until tender, then drain', 5),
(37, 3, 'Heat vegetable oil in a large skillet over medium heat; cook and stir onions in hot oil until caramelized, about 20 minutes.', 5),
(38, 4, 'Mix curry paste, curry powder, turmeric, cumin, chili powder, salt, sugar, garlic, and ginger together in a large bowl; stir into the onions. Increase heat to high and cook, stirring constantly, until fragrant, 1 to 2 minutes.', 5),
(39, 5, 'Stir in the tomato puree, remove from heat and stir into the lentils.', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `steps`
--
ALTER TABLE `steps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_to_steps` (`recipe_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `steps`
--
ALTER TABLE `steps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `steps`
--
ALTER TABLE `steps`
  ADD CONSTRAINT `recipe_to_steps` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
