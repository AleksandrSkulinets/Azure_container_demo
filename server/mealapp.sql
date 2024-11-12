-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: Nov 02, 2024 at 06:11 PM
-- Server version: 8.0.40
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mealapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password_hash`) VALUES
(1, 'admin', '$2b$10$4RJvP/IXfhJE.S8TjaZ7d.KvRc12nMCOTumzvgcTbDFtmwaAjEPfi');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `cat_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `color` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cat_id`, `name`, `description`, `color`) VALUES
(1, 'Italian', 'Delicious Italian cuisine with a variety of pasta, pizzas, and traditional dishes.', '#7b2488'),
(2, 'Quick & Easy', 'Fast and easy-to-prepare meals for busy days.', '#ba382d'),
(3, 'Hamburgers', 'All about hamburgers, from classic to gourmet.', '#c77906'),
(4, 'German', 'Authentic German dishes with hearty flavors.', '#ce9c0b'),
(5, 'Light & Lovely', 'Light and fresh meals that are easy on the calories.', '#2177bb'),
(6, 'Exotic', 'Explore exotic flavors and unique ingredients.', '#408741'),
(7, 'Asian', 'Rich Asian cuisine, from sushi to stir-fries.', '#0c7eb2'),
(8, 'French', 'Classic and elegant French dishes.', '#6f973d'),
(9, 'Summer', 'Perfect dishes for hot, sunny days.', '#b61d50');

-- --------------------------------------------------------

--
-- Table structure for table `filter`
--

CREATE TABLE `filter` (
  `filter_id` int NOT NULL,
  `filter_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `filter`
--

INSERT INTO `filter` (`filter_id`, `filter_name`) VALUES
(1, 'Vegetarian'),
(2, 'Lactose-free'),
(3, 'Gluten-free'),
(4, 'Vegan');

-- --------------------------------------------------------

--
-- Table structure for table `filtered_recipes`
--

CREATE TABLE `filtered_recipes` (
  `filter_id` int NOT NULL,
  `recipe_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `filtered_recipes`
--

INSERT INTO `filtered_recipes` (`filter_id`, `recipe_id`) VALUES
(4, 1),
(1, 5),
(2, 5),
(1, 6),
(2, 6),
(4, 6),
(3, 7),
(1, 11),
(3, 11),
(4, 11),
(3, 12),
(2, 15),
(2, 18),
(1, 20),
(3, 20),
(4, 20),
(1, 22),
(3, 24),
(2, 30),
(4, 30);

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `prep` text,
  `time` time DEFAULT NULL,
  `image` varchar(255) DEFAULT '/images/pic.jpg',
  `category_id` int DEFAULT NULL,
  `price` enum('cheap','affordable','pricey') NOT NULL DEFAULT 'affordable',
  `difficulty` enum('simple','medium','hard') NOT NULL DEFAULT 'medium'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`id`, `name`, `description`, `prep`, `time`, `image`, `category_id`, `price`, `difficulty`) VALUES
(1, 'Spaghetti Carbonara', 'Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.', 'Boil pasta, cook pancetta, mix with eggs and cheese.', '00:20:00', '/images/1.jpg', 1, 'affordable', 'medium'),
(2, 'Margherita Pizza', 'Traditional pizza with tomatoes, mozzarella, and basil.', 'Prepare dough, add toppings, bake.', '00:30:00', '/images/2.jpg', 1, 'affordable', 'medium'),
(3, 'Lasagna', 'Layered pasta with cheese, meat, and tomato sauce.', 'Layer ingredients, bake.', '01:00:00', '/images/3.jpg', 1, 'affordable', 'medium'),
(4, 'Risotto alla Milanese', 'Creamy risotto with saffron.', 'Cook rice with broth and saffron.', '00:45:00', '/images/4.jpg', 1, 'affordable', 'medium'),
(5, 'Bruschetta', 'Toasted bread with tomatoes, basil, and garlic.', 'Toast bread, add toppings.', '00:15:00', '/images/5.jpg', 1, 'cheap', 'medium'),
(6, 'Avocado Toast', 'Simple and delicious toast topped with avocado.', 'Mash avocado, spread on toast.', '00:05:00', '/images/6.jpg', 2, 'cheap', 'medium'),
(7, 'Chicken Salad', 'Healthy salad with chicken, lettuce, and dressing.', 'Mix ingredients together.', '00:10:00', '/images/7.jpg', 2, 'affordable', 'medium'),
(8, 'Veggie Stir Fry', 'Mixed vegetables stir-fried with soy sauce.', 'Stir-fry veggies, add sauce.', '00:15:00', '/images/8.jpg', 2, 'affordable', 'medium'),
(9, 'Grilled Cheese', 'Classic grilled cheese sandwich.', 'Butter bread, add cheese, grill.', '00:10:00', '/images/9.jpg', 2, 'cheap', 'medium'),
(10, 'Pasta Aglio e Olio', 'Quick pasta with garlic and olive oil.', 'Cook pasta, add garlic and oil.', '00:15:00', '/images/10.jpg', 2, 'affordable', 'medium'),
(11, 'Classic Cheeseburger', 'Juicy burger with cheese, lettuce, and tomato.', 'Grill patty, assemble burger.', '00:20:00', '/images/11.jpg', 3, 'affordable', 'medium'),
(12, 'BBQ Bacon Burger', 'Burger with BBQ sauce, bacon, and cheddar cheese.', 'Grill patty, add toppings.', '00:25:00', '/images/12.jpg', 3, 'pricey', 'medium'),
(13, 'Veggie Burger', 'Healthy burger made with a veggie patty.', 'Grill veggie patty, assemble.', '00:15:00', '/images/13.jpg', 3, 'affordable', 'medium'),
(14, 'Mushroom Swiss Burger', 'Burger with sautéed mushrooms and Swiss cheese.', 'Grill patty, add toppings.', '00:25:00', '/images/14.jpg', 3, 'pricey', 'medium'),
(15, 'Spicy Jalapeño Burger', 'Burger with jalapeños, pepper jack cheese, and spicy sauce.', 'Grill patty, add toppings.', '00:20:00', '/images/15.jpg', 3, 'affordable', 'medium'),
(16, 'Schnitzel', 'Breaded and fried meat cutlet.', 'Bread meat, fry in oil.', '00:30:00', '/images/16.jpg', 4, 'affordable', 'medium'),
(17, 'Bratwurst', 'Grilled German sausage.', 'Grill sausage, serve with mustard.', '00:20:00', '/images/17.jpg', 4, 'affordable', 'medium'),
(18, 'Sauerkraut', 'Fermented cabbage side dish.', 'Prepare cabbage, ferment.', '00:10:00', '/images/18.jpg', 4, 'cheap', 'medium'),
(19, 'Pretzel', 'Traditional German soft pretzel.', 'Shape dough, bake.', '00:45:00', '/images/19.jpg', 4, 'affordable', 'medium'),
(20, 'Kartoffelsalat', 'German potato salad with vinegar and mustard.', 'Boil potatoes, mix ingredients.', '00:25:00', '/images/20.jpg', 4, 'affordable', 'medium'),
(21, 'Fruit Salad', 'Refreshing mix of seasonal fruits.', 'Chop fruits, mix together.', '00:10:00', '/images/21.jpg', 5, 'cheap', 'medium'),
(22, 'Greek Salad', 'Salad with cucumber, tomato, olives, and feta cheese.', 'Chop veggies, add dressing.', '00:15:00', '/images/22.jpg', 5, 'affordable', 'medium'),
(23, 'Zucchini Noodles', 'Healthy alternative to pasta.', 'Spiralize zucchini, add sauce.', '00:10:00', '/images/23.jpg', 5, 'cheap', 'medium'),
(24, 'Quinoa Bowl', 'Nourishing bowl with quinoa, veggies, and dressing.', 'Cook quinoa, mix ingredients.', '00:20:00', '/images/24.jpg', 5, 'affordable', 'medium'),
(25, 'Smoothie Bowl', 'Smoothie topped with fresh fruit and granola.', 'Blend smoothie, add toppings.', '00:05:00', '/images/25.jpg', 5, 'cheap', 'medium'),
(26, 'Pad Thai', 'Thai stir-fried noodles with shrimp.', 'Cook noodles, stir-fry with sauce.', '00:30:00', '/images/26.jpg', 6, 'affordable', 'medium'),
(27, 'Chicken Tikka Masala', 'Indian spiced chicken in a creamy tomato sauce.', 'Cook chicken, add sauce.', '00:45:00', '/images/27.jpg', 6, 'affordable', 'medium'),
(28, 'Moroccan Tagine', 'Slow-cooked stew with spices and dried fruit.', 'Combine ingredients, slow-cook.', '01:30:00', '/images/28.jpg', 6, 'affordable', 'medium'),
(29, 'Falafel', 'Middle Eastern chickpea balls served with pita.', 'Shape falafel, fry.', '00:30:00', '/images/29.jpg', 6, 'affordable', 'medium'),
(30, 'Bibimbap', 'Korean rice bowl with vegetables and egg.', 'Prepare toppings, mix with rice.', '00:25:00', '/images/30.jpg', 6, 'affordable', 'medium'),
(31, 'Sushi Rolls', 'Rice and seafood rolled in seaweed.', 'Prepare ingredients, roll sushi.', '00:40:00', '/images/31.jpg', 7, 'affordable', 'medium'),
(32, 'Ramen', 'Japanese noodle soup with broth, egg, and toppings.', 'Cook noodles, prepare broth.', '00:30:00', '/images/32.jpg', 7, 'affordable', 'medium'),
(33, 'Stir-Fried Noodles', 'Chinese noodles with veggies and sauce.', 'Cook noodles, stir-fry with sauce.', '00:20:00', '/images/33.jpg', 7, 'affordable', 'medium'),
(34, 'Thai Green Curry', 'Spicy Thai curry with coconut milk and vegetables.', 'Cook curry, add vegetables.', '00:30:00', '/images/34.jpg', 7, 'affordable', 'medium'),
(35, 'Dim Sum', 'Assorted Chinese dumplings.', 'Prepare fillings, steam dumplings.', '00:35:00', '/images/35.jpg', 7, 'affordable', 'medium'),
(36, 'Coq au Vin', 'French braised chicken in red wine.', 'Sear chicken, braise in wine.', '01:20:00', '/images/36.jpg', 8, 'affordable', 'medium'),
(37, 'Quiche Lorraine', 'Savory pie with bacon, cheese, and eggs.', 'Prepare filling, bake.', '00:45:00', '/images/37.jpg', 8, 'affordable', 'medium'),
(38, 'Ratatouille', 'Vegetable medley with herbs.', 'Layer vegetables, bake.', '00:50:00', '/images/38.jpg', 8, 'affordable', 'medium'),
(39, 'Croissants', 'Classic buttery French pastry.', 'Roll dough, bake.', '02:00:00', '/images/39.jpg', 8, 'affordable', 'medium'),
(40, 'Crème Brûlée', 'Custard dessert with caramelized sugar topping.', 'Bake custard, torch sugar.', '00:45:00', '/images/40.jpg', 8, 'affordable', 'medium'),
(41, 'Caprese Salad', 'Fresh salad with tomatoes, mozzarella, and basil.', 'Slice ingredients, arrange on plate.', '00:10:00', '/images/41.jpg', 9, 'affordable', 'medium'),
(42, 'Grilled Veggie Skewers', 'Colorful vegetable skewers perfect for grilling.', 'Skewer veggies, grill.', '00:20:00', '/images/42.jpg', 9, 'affordable', 'medium'),
(43, 'Ceviche', 'Marinated seafood with lime and vegetables.', 'Marinate seafood, add veggies.', '00:25:00', '/images/43.jpg', 9, 'affordable', 'medium'),
(44, 'Watermelon Feta Salad', 'Refreshing summer salad with watermelon and feta.', 'Chop ingredients, mix together.', '00:10:00', '/images/44.jpg', 9, 'affordable', 'medium'),
(45, 'BBQ Ribs', 'Juicy ribs with barbecue sauce.', 'Marinate ribs, grill.', '01:30:00', '/images/45.jpg', 9, 'affordable', 'medium');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `filter`
--
ALTER TABLE `filter`
  ADD PRIMARY KEY (`filter_id`);

--
-- Indexes for table `filtered_recipes`
--
ALTER TABLE `filtered_recipes`
  ADD PRIMARY KEY (`filter_id`,`recipe_id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_category` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `cat_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `filter`
--
ALTER TABLE `filter`
  MODIFY `filter_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `filtered_recipes`
--
ALTER TABLE `filtered_recipes`
  ADD CONSTRAINT `filtered_recipes_ibfk_1` FOREIGN KEY (`filter_id`) REFERENCES `filter` (`filter_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `filtered_recipes_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `recipe`
--
ALTER TABLE `recipe`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`cat_id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
