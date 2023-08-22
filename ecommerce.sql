-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2023 at 02:45 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `brand_type`
--

CREATE TABLE `brand_type` (
  `slno` int(11) NOT NULL,
  `type` text NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brand_type`
--

INSERT INTO `brand_type` (`slno`, `type`, `image`) VALUES
(1, 'Apple', 'http://localhost:8000/public/images/apple.jpg'),
(3, 'Huion', 'http://localhost:8000/public/images/huion.jpg'),
(4, 'Sony', 'http://localhost:8000/public/images/sony.jpg'),
(5, 'Samsung', 'http://localhost:8000/public/images/samsung.jpg'),
(6, 'Apache', 'http://localhost:8000/public/images/apache.jpg'),
(7, 'Pulsar', 'http://localhost:8000/public/images/pulsar.jpg'),
(8, 'Walton', 'http://localhost:8000/public/images/walton.jpg'),
(9, 'Realme', 'http://localhost:8000/public/images/realme.jpg'),
(10, 'Infinix', 'http://localhost:8000/public/images/infinix.jpg'),
(11, 'Havit', 'http://localhost:8000/public/images/havit.jpg'),
(12, 'Logitech', 'http://localhost:8000/public/images/logitech.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `slno` bigint(20) NOT NULL,
  `product_slno` bigint(20) NOT NULL,
  `user_slno` bigint(20) NOT NULL,
  `seller_slno` bigint(20) NOT NULL,
  `in_stock` bigint(20) NOT NULL,
  `event_or_not` text NOT NULL,
  `myamount` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`slno`, `product_slno`, `user_slno`, `seller_slno`, `in_stock`, `event_or_not`, `myamount`) VALUES
(38, 17, 7, 1, 123, '35% Off !!!', 3),
(39, 27, 7, 1, 6, 'not event', 2),
(40, 24, 7, 1, 6, 'not event', 1);

-- --------------------------------------------------------

--
-- Table structure for table `deliverystatus`
--

CREATE TABLE `deliverystatus` (
  `solno` bigint(20) NOT NULL,
  `event_or_not` text NOT NULL,
  `user_slno` bigint(20) NOT NULL,
  `product_slno` bigint(20) NOT NULL,
  `changedValue` text NOT NULL,
  `deliveryserial` bigint(20) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deliverystatus`
--

INSERT INTO `deliverystatus` (`solno`, `event_or_not`, `user_slno`, `product_slno`, `changedValue`, `deliveryserial`, `time`) VALUES
(1, 'not event', 5, 24, 'For Delivery', 23, '2023-08-19 04:57:08'),
(2, 'not event', 5, 24, 'Packaged', 23, '2023-08-19 04:57:08'),
(3, 'not event', 5, 27, 'For Delivery', 24, '2023-08-19 06:05:35'),
(4, 'not event', 5, 27, 'Delivered', 24, '2023-08-19 06:06:19'),
(5, '35% off!!!', 5, 17, 'Delivered', 22, '2023-08-19 16:52:44');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_order`
--

CREATE TABLE `delivery_order` (
  `slno` bigint(20) NOT NULL,
  `product_slno` bigint(20) NOT NULL,
  `user_slno` bigint(20) NOT NULL,
  `seller_slno` bigint(20) NOT NULL,
  `payment_option` text NOT NULL,
  `estimeted_delivery` date NOT NULL,
  `price` int(11) NOT NULL,
  `delivery_address` text NOT NULL,
  `delivery_status` text NOT NULL,
  `amount` bigint(20) NOT NULL,
  `event_or_not` text NOT NULL,
  `uuid` mediumtext NOT NULL,
  `name` text NOT NULL,
  `stripeToken` mediumtext NOT NULL,
  `reviewdone` text NOT NULL,
  `reportdone` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delivery_order`
--

INSERT INTO `delivery_order` (`slno`, `product_slno`, `user_slno`, `seller_slno`, `payment_option`, `estimeted_delivery`, `price`, `delivery_address`, `delivery_status`, `amount`, `event_or_not`, `uuid`, `name`, `stripeToken`, `reviewdone`, `reportdone`) VALUES
(22, 17, 5, 1, 'Cash On Delivery', '2023-08-23', 732, 'asdasdadas', 'Delivered', 3, '35% Off !!!', 'cfec8020-bb51-4955-bd22-0c2e26de7e19', 'Anime Figure Statue.', 'pi_3NgLdkSI10A4W78j0PPNeT3K', '', ''),
(23, 24, 5, 1, 'Cash On Delivery', '2023-08-23', 12, 'asdasdadas', 'Delivered', 1, 'not event', 'e829a75f-a0a1-4c51-a1e6-8dd52a993263', 'Winter Jacket', 'pi_3NgLdkSI10A4W78j0PPNeT3K', 'Done', ''),
(24, 27, 5, 1, 'Cash On Delivery', '2023-08-23', 24, 'asdasdadas', 'Packaged', 2, 'not event', '8cbc29cd-fcef-4121-a446-285d778c2405', 'Winter Jacket', 'pi_3NgLdkSI10A4W78j0PPNeT3K', 'Done', 'Done'),
(43, 3, 5, 1, 'Cash On Delivery', '2023-08-26', 36636, 'dhaka', 'On Process', 3, 'not event', 'ddef28be-6301-44fd-a577-bcf4a62e7c50', 'Mouse for Gaming', '', '', ''),
(44, 27, 5, 1, 'Cash On Delivery', '2023-08-26', 24, 'dhaka', 'On Process', 2, 'not event', 'e2f8e331-1d0e-47f8-9b51-5dbc1d659063', 'Winter Jacket', '', '', ''),
(45, 26, 5, 1, 'Cash On Delivery', '2023-08-26', 12, 'dhaka', 'On Process', 1, 'not event', '13af3bfb-dd50-4fa3-b7ef-9582514399a3', 'Chicken Curry', '', '', ''),
(46, 24, 5, 1, 'Cash On Delivery', '2023-08-26', 12, 'dhaka', 'On Process', 1, 'not event', '8406cd0d-3b64-478a-96f0-c73771434925', 'Winter Jacket', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `slno` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `address` text NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` text NOT NULL,
  `country` text NOT NULL,
  `nid` bigint(11) NOT NULL,
  `mobile` int(11) NOT NULL,
  `sallery` bigint(11) NOT NULL,
  `joined` date NOT NULL,
  `image` text NOT NULL,
  `designation` text NOT NULL,
  `pass` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`slno`, `name`, `email`, `address`, `date_of_birth`, `gender`, `country`, `nid`, `mobile`, `sallery`, `joined`, `image`, `designation`, `pass`) VALUES
(25, 'goku', 'gokus@gmail.com', 'elephant road, Dhaka.', '2023-07-30', 'Male', 'Japan', 123131231, 1231313, 12312313, '2023-08-02', 'http://localhost:8000/public/images/1691017099502-super-saiyan-son-goku-dragon-ball-z-4k-nv-2048x2048 (1) (1).jpg', 'Bee', '$2b$10$.JoLzwDTQNUKH608ZPEQlei/0vIWW1jJODXfRJNN0Kh3bLw22Y2y.');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `slno` bigint(20) NOT NULL,
  `event` text NOT NULL,
  `event_end` date NOT NULL,
  `event_image` text NOT NULL,
  `event_details` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`slno`, `event`, `event_end`, `event_image`, `event_details`) VALUES
(13, '35% Off !!!', '2090-08-15', 'http://localhost:8000/public/images/35offer.jpg', 'Why miss when everything is cheap !?'),
(14, 'Free Delivery !!!', '2090-08-14', 'http://localhost:8000/public/images/freedelivery.jpg', 'We Also Belive Time Is Valuable For Our Customers !!!'),
(15, 'Suits Season !!!', '2090-08-18', 'http://localhost:8000/public/images/mensuit.jpg', 'Who Doesn\'t Look Better In A Suit ?!');

-- --------------------------------------------------------

--
-- Table structure for table `event_products`
--

CREATE TABLE `event_products` (
  `slno` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `type` text NOT NULL,
  `brand` text NOT NULL,
  `seller_slno` bigint(20) NOT NULL,
  `amount_left` bigint(20) NOT NULL,
  `price` bigint(20) NOT NULL,
  `image1` text NOT NULL,
  `image2` text NOT NULL,
  `image3` text NOT NULL,
  `description` mediumtext NOT NULL,
  `rating` int(11) NOT NULL,
  `total_view` bigint(20) NOT NULL,
  `like_amount` bigint(20) NOT NULL,
  `dislike_amount` bigint(20) NOT NULL,
  `event_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_products`
--

INSERT INTO `event_products` (`slno`, `name`, `type`, `brand`, `seller_slno`, `amount_left`, `price`, `image1`, `image2`, `image3`, `description`, `rating`, `total_view`, `like_amount`, `dislike_amount`, `event_name`) VALUES
(2, 'Anime Figure Statue.', 'Pokimon card', 'Logitech', 1, 123, 244, 'http://localhost:8000/public/images/1691414456273-h2.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', '100 % authentic genuine material.\nSize is accurate.', 0, 0, 0, 0, '35% Off !!!'),
(3, 'Lil Balls', 'Medicine', 'Realme', 1, 12313, 12311, 'http://localhost:8000/public/images/1691419741500-h4.jpg', 'http://localhost:8000/public/images/1691419741501-h4.jpg', 'http://localhost:8000/public/images/1691419741512-h1.jpg', 'asdadasdadad', 0, 0, 0, 0, 'Free Delivery !!!'),
(4, 'aedadadasad', 'Clothings', 'Infinix', 3, 67, 676, 'http://localhost:8000/public/images/1691508920592-h3.jpg', 'http://localhost:8000/public/images/1691508920592-h2.jpg', 'http://localhost:8000/public/images/1691508920595-h4.jpg', 'qeqweqweqw', 0, 0, 0, 0, 'Suits Season !!!'),
(5, 'Anime Figure Statue.', 'Pokimon card', 'Logitech', 1, 123, 244, 'http://localhost:8000/public/images/1691414456273-h2.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', '100 % authentic genuine material.\r\nSize is accurate.', 0, 0, 0, 0, '35% Off !!!'),
(6, 'Lil Balls', 'Medicine', 'Realme', 1, 12313, 12311, 'http://localhost:8000/public/images/1691419741500-h4.jpg', 'http://localhost:8000/public/images/1691419741501-h4.jpg', 'http://localhost:8000/public/images/1691419741512-h1.jpg', 'asdadasdadad', 0, 0, 0, 0, 'Free Delivery !!!'),
(7, 'aedadadasad', 'Clothings', 'Infinix', 3, 67, 676, 'http://localhost:8000/public/images/1691508920592-h3.jpg', 'http://localhost:8000/public/images/1691508920592-h2.jpg', 'http://localhost:8000/public/images/1691508920595-h4.jpg', 'qeqweqweqw', 0, 0, 0, 0, 'Suits Season !!!'),
(8, 'Anime Figure Statue.', 'Pokimon card', 'Logitech', 1, 123, 244, 'http://localhost:8000/public/images/1691414456273-h2.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', '100 % authentic genuine material.\r\nSize is accurate.', 0, 0, 0, 0, '35% Off !!!'),
(9, 'Lil Balls', 'Medicine', 'Realme', 1, 12313, 12311, 'http://localhost:8000/public/images/1691419741500-h4.jpg', 'http://localhost:8000/public/images/1691419741501-h4.jpg', 'http://localhost:8000/public/images/1691419741512-h1.jpg', 'asdadasdadad', 0, 0, 0, 0, 'Free Delivery !!!'),
(10, 'aedadadasad', 'Clothings', 'Infinix', 3, 67, 676, 'http://localhost:8000/public/images/1691508920592-h3.jpg', 'http://localhost:8000/public/images/1691508920592-h2.jpg', 'http://localhost:8000/public/images/1691508920595-h4.jpg', 'qeqweqweqw', 0, 0, 0, 0, 'Suits Season !!!'),
(11, 'Anime Figure Statue.', 'Pokimon card', 'Logitech', 1, 123, 244, 'http://localhost:8000/public/images/1691414456273-h2.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', '100 % authentic genuine material.\r\nSize is accurate.', 0, 0, 0, 0, '35% Off !!!'),
(12, 'Lil Balls', 'Medicine', 'Realme', 1, 12313, 12311, 'http://localhost:8000/public/images/1691419741500-h4.jpg', 'http://localhost:8000/public/images/1691419741501-h4.jpg', 'http://localhost:8000/public/images/1691419741512-h1.jpg', 'asdadasdadad', 0, 0, 0, 0, 'Free Delivery !!!'),
(13, 'aedadadasad', 'Clothings', 'Infinix', 3, 67, 676, 'http://localhost:8000/public/images/1691508920592-h3.jpg', 'http://localhost:8000/public/images/1691508920592-h2.jpg', 'http://localhost:8000/public/images/1691508920595-h4.jpg', 'qeqweqweqw', 0, 0, 0, 0, 'Suits Season !!!'),
(14, 'Anime Figure Statue.', 'Pokimon card', 'Logitech', 1, 123, 244, 'http://localhost:8000/public/images/1691414456273-h2.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', '100 % authentic genuine material.\r\nSize is accurate.', 0, 0, 0, 0, '35% Off !!!'),
(15, 'Lil Balls', 'Medicine', 'Realme', 1, 12313, 12311, 'http://localhost:8000/public/images/1691419741500-h4.jpg', 'http://localhost:8000/public/images/1691419741501-h4.jpg', 'http://localhost:8000/public/images/1691419741512-h1.jpg', 'asdadasdadad', 0, 0, 0, 0, 'Free Delivery !!!'),
(16, 'aedadadasad', 'Clothings', 'Infinix', 3, 67, 676, 'http://localhost:8000/public/images/1691508920592-h3.jpg', 'http://localhost:8000/public/images/1691508920592-h2.jpg', 'http://localhost:8000/public/images/1691508920595-h4.jpg', 'qeqweqweqw', 0, 0, 0, 0, 'Suits Season !!!'),
(17, 'Anime Figure Statue.', 'Electronics', 'Logitech', 1, 123, 244, 'http://localhost:8000/public/images/1691414456273-h2.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', '100 % authentic genuine material.\r\nSize is accurate.', 3, 0, 1, 0, '35% Off !!!'),
(18, 'Lil Balls', 'Medicine', 'Realme', 1, 12313, 12311, 'http://localhost:8000/public/images/1691419741500-h4.jpg', 'http://localhost:8000/public/images/1691419741501-h4.jpg', 'http://localhost:8000/public/images/1691419741512-h1.jpg', 'asdadasdadad', 0, 0, 0, 0, 'Free Delivery !!!'),
(19, 'aedadadasad', 'Clothings', 'Infinix', 3, 67, 676, 'http://localhost:8000/public/images/1691508920592-h3.jpg', 'http://localhost:8000/public/images/1691508920592-h2.jpg', 'http://localhost:8000/public/images/1691508920595-h4.jpg', 'qeqweqweqw', 0, 0, 0, 0, 'Suits Season !!!'),
(20, 'Anime Figure Statue.', 'Pokimon card', 'Logitech', 1, 123, 244, 'http://localhost:8000/public/images/1691414456273-h2.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', '100 % authentic genuine material.\r\nSize is accurate.', 0, 0, 0, 0, '35% Off !!!'),
(21, 'Lil Balls', 'Medicine', 'Realme', 1, 12313, 12311, 'http://localhost:8000/public/images/1691419741500-h4.jpg', 'http://localhost:8000/public/images/1691419741501-h4.jpg', 'http://localhost:8000/public/images/1691419741512-h1.jpg', 'asdadasdadad', 0, 0, 0, 0, 'Free Delivery !!!'),
(22, 'aedadadasad', 'Clothings', 'Infinix', 3, 67, 676, 'http://localhost:8000/public/images/1691508920592-h3.jpg', 'http://localhost:8000/public/images/1691508920592-h2.jpg', 'http://localhost:8000/public/images/1691508920595-h4.jpg', 'qeqweqweqw', 0, 0, 0, 0, 'Suits Season !!!'),
(23, 'Anime Figure Statue.', 'Pokimon card', 'Logitech', 1, 123, 244, 'http://localhost:8000/public/images/1691414456273-h2.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', 'http://localhost:8000/public/images/1691414456274-h3.jpg', '100 % authentic genuine material.\r\nSize is accurate.', 0, 0, 0, 0, '35% Off !!!'),
(24, 'Lil Balls', 'Medicine', 'Realme', 1, 12313, 12311, 'http://localhost:8000/public/images/1691419741500-h4.jpg', 'http://localhost:8000/public/images/1691419741501-h4.jpg', 'http://localhost:8000/public/images/1691419741512-h1.jpg', 'asdadasdadad', 0, 0, 0, 0, 'Free Delivery !!!'),
(25, 'aedadadasad', 'Clothings', 'Infinix', 3, 67, 676, 'http://localhost:8000/public/images/1691508920592-h3.jpg', 'http://localhost:8000/public/images/1691508920592-h2.jpg', 'http://localhost:8000/public/images/1691508920595-h4.jpg', 'qeqweqweqw', 0, 0, 0, 0, 'Suits Season !!!');

-- --------------------------------------------------------

--
-- Table structure for table `event_product_comment`
--

CREATE TABLE `event_product_comment` (
  `slno` bigint(20) NOT NULL,
  `product_slno` bigint(20) NOT NULL,
  `user_slno` bigint(20) NOT NULL,
  `seller_slno` bigint(20) NOT NULL,
  `comment` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_product_comment`
--

INSERT INTO `event_product_comment` (`slno`, `product_slno`, `user_slno`, `seller_slno`, `comment`) VALUES
(1, 17, 5, 1, 'So, goddddddddddddddddddd. Well packaged also.'),
(2, 17, 5, 1, 'So, goddddddddddddddddddd. Well packaged also.'),
(3, 17, 5, 1, 'So, goddddddddddddddddddd. Well packaged also.'),
(4, 17, 5, 1, 'So, goddddddddddddddddddd. Well packaged also.'),
(5, 17, 5, 1, 'Aweosomeeeeeeeeee!');

-- --------------------------------------------------------

--
-- Table structure for table `event_product_dislike`
--

CREATE TABLE `event_product_dislike` (
  `slno` bigint(20) NOT NULL,
  `user_slno` bigint(20) NOT NULL,
  `product_slno` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_product_likes`
--

CREATE TABLE `event_product_likes` (
  `slno` bigint(20) NOT NULL,
  `product_slno` bigint(20) NOT NULL,
  `user_slno` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_product_rating`
--

CREATE TABLE `event_product_rating` (
  `slno` bigint(20) NOT NULL,
  `user_slno` bigint(20) NOT NULL,
  `product_slno` bigint(20) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_product_rating`
--

INSERT INTO `event_product_rating` (`slno`, `user_slno`, `product_slno`, `rating`) VALUES
(1, 5, 17, 3);

-- --------------------------------------------------------

--
-- Table structure for table `forgot_pass`
--

CREATE TABLE `forgot_pass` (
  `slno` bigint(20) NOT NULL,
  `otp` text NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forgot_pass`
--

INSERT INTO `forgot_pass` (`slno`, `otp`, `email`) VALUES
(1, '$2b$10$fmFTuYtv./ZZcsukcyWH4u5PfF5vh0GNQLkyGFQB9ETeyHHOqHzxi', 'arnobsamin95@gmail.com'),
(3, '$2b$10$UcdU.ON2h234sDwdJU/U5.4ryiIOiP2KbPv27WhK3Hx3YxOk3.Qfq', 'gohanichigouzmaki95@gmail.com'),
(4, '$2b$10$fDW05QrOy.EJ4ItJvcpbhe5nXWziY4Ugu9QTmdGmn8WmKUcSNnhQq', 'pinokio@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `forgot_pass_seller`
--

CREATE TABLE `forgot_pass_seller` (
  `slno` bigint(20) NOT NULL,
  `otp` mediumtext NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forgot_pass_seller`
--

INSERT INTO `forgot_pass_seller` (`slno`, `otp`, `email`) VALUES
(1, '$2b$10$/7yXBsFJjinL7u1MZMiwVu3dDIxFF/WB.p/ANzmvpnLxdI2Qi.7L.', 'arnobsamin95@gmail.com'),
(2, '$2b$10$/7yXBsFJjinL7u1MZMiwVu3dDIxFF/WB.p/ANzmvpnLxdI2Qi.7L.', 'arnobsamin95@gmail.com'),
(3, '$2b$10$.JoLzwDTQNUKH608ZPEQlei/0vIWW1jJODXfRJNN0Kh3bLw22Y2y.', 'borutouzm95@gmail.com'),
(4, '$2b$10$.JoLzwDTQNUKH608ZPEQlei/0vIWW1jJODXfRJNN0Kh3bLw22Y2y.', 'piccolo@gmail.com'),
(5, '$2b$10$4Tttm7uPtukWJFrfvLKH8OX/icJFjB0P1K5iFi.SECK7dWe5lDPei', 'gohan@gmail.com'),
(6, '$2b$10$.JoLzwDTQNUKH608ZPEQlei/0vIWW1jJODXfRJNN0Kh3bLw22Y2y.', 'arnobsamin95@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `slno` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `type` text NOT NULL,
  `brand` text NOT NULL,
  `seller_slno` bigint(20) NOT NULL,
  `amount_left` bigint(20) NOT NULL,
  `price` bigint(11) NOT NULL,
  `image1` text NOT NULL,
  `image2` text NOT NULL,
  `image3` text NOT NULL,
  `description` mediumtext NOT NULL,
  `rating` int(11) NOT NULL,
  `total_view` bigint(20) NOT NULL,
  `like_amount` bigint(20) NOT NULL,
  `dislike_amount` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`slno`, `name`, `type`, `brand`, `seller_slno`, `amount_left`, `price`, `image1`, `image2`, `image3`, `description`, `rating`, `total_view`, `like_amount`, `dislike_amount`) VALUES
(1, 'Winter Jacket', 'Clothings', 'Infinix', 1, 6, 12, 'http://localhost:8000/public/images/infinix.jpg', 'http://localhost:8000/public/images/infinix.jpg', 'http://localhost:8000/public/images/infinix.jpg', 'The jacket is almost exactly same as the image.\nThe color may vary a little.\n\nSize : xlasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', 0, 0, 0, 0),
(3, 'Mouse for Gaming', 'Electronics', 'Logitech', 1, 123, 12212, 'http://localhost:8000/public/images/logitech.jpg', 'http://localhost:8000/public/images/logitech.jpg', 'http://localhost:8000/public/images/logitech.jpg', 'A gaming mouse.\nWarrenty : 1 years.', 0, 0, 0, 0),
(9, 'Chicken Curry', 'Food', 'Havit', 1, 277, 12, 'http://localhost:8000/public/images/havit.jpg', 'http://localhost:8000/public/images/havit.jpg', 'http://localhost:8000/public/images/havit.jpg', 'Delecious Chicken Curry.\nDelivered within 2 hours.', 0, 0, 0, 0),
(14, 'Winter Jacket', 'Clothings', 'Infinix', 1, 6, 12, 'http://localhost:8000/public/images/infinix.jpg', 'http://localhost:8000/public/images/infinix.jpg', 'http://localhost:8000/public/images/infinix.jpg', 'The jacket is almost exactly same as the image.\r\nThe color may vary a little.\r\nSize : xl', 0, 0, 0, 0),
(15, 'Mouse for Gaming', 'Electronics', 'Logitech', 1, 123, 12212, 'http://localhost:8000/public/images/logitech.jpg', 'http://localhost:8000/public/images/logitech.jpg', 'http://localhost:8000/public/images/logitech.jpg', 'A gaming mouse.\r\nWarrenty : 1 years.', 0, 0, 0, 0),
(16, 'Chicken Curry', 'Food', 'Havit', 1, 277, 12, 'http://localhost:8000/public/images/havit.jpg', 'http://localhost:8000/public/images/havit.jpg', 'http://localhost:8000/public/images/havit.jpg', 'Delecious Chicken Curry.\r\nDelivered within 2 hours.', 0, 0, 0, 0),
(17, 'Winter Jacket', 'Clothings', 'Infinix', 1, 6, 12, 'http://localhost:8000/public/images/infinix.jpg', 'http://localhost:8000/public/images/infinix.jpg', 'http://localhost:8000/public/images/infinix.jpg', 'The jacket is almost exactly same as the image.\r\nThe color may vary a little.\r\nSize : xl', 0, 0, 0, 0),
(18, 'Mouse for Gaming', 'Electronics', 'Logitech', 1, 123, 12212, 'http://localhost:8000/public/images/logitech.jpg', 'http://localhost:8000/public/images/logitech.jpg', 'http://localhost:8000/public/images/logitech.jpg', 'A gaming mouse.\r\nWarrenty : 1 years.', 0, 0, 0, 0),
(19, 'Chicken Curry', 'Food', 'Havit', 1, 277, 12, 'http://localhost:8000/public/images/havit.jpg', 'http://localhost:8000/public/images/havit.jpg', 'http://localhost:8000/public/images/havit.jpg', 'Delecious Chicken Curry.\r\nDelivered within 2 hours.', 0, 0, 0, 0),
(20, 'Winter Jacket', 'Clothings', 'Infinix', 1, 6, 12, 'http://localhost:8000/public/images/infinix.jpg', 'http://localhost:8000/public/images/infinix.jpg', 'http://localhost:8000/public/images/infinix.jpg', 'The jacket is almost exactly same as the image.\r\nThe color may vary a little.\r\nSize : xl', 0, 0, 0, 0),
(21, 'Mouse for Gaming', 'Electronics', 'Logitech', 1, 123, 12212, 'http://localhost:8000/public/images/logitech.jpg', 'http://localhost:8000/public/images/logitech.jpg', 'http://localhost:8000/public/images/logitech.jpg', 'A gaming mouse.\r\nWarrenty : 1 years.', 0, 0, 0, 0),
(22, 'Chicken Curry', 'Food', 'Havit', 1, 277, 12, 'http://localhost:8000/public/images/havit.jpg', 'http://localhost:8000/public/images/havit.jpg', 'http://localhost:8000/public/images/havit.jpg', 'Delecious Chicken Curry.\r\nDelivered within 2 hours.', 0, 0, 0, 0),
(23, 'Chicken Curry', 'Food', 'Havit', 1, 277, 12, 'http://localhost:8000/public/images/havit.jpg', 'http://localhost:8000/public/images/havit.jpg', 'http://localhost:8000/public/images/havit.jpg', 'Delecious Chicken Curry.\r\nDelivered within 2 hours.', 0, 0, 0, 0),
(24, 'Winter Jacket', 'Clothings', 'Infinix', 1, 6, 12, 'http://localhost:8000/public/images/infinix.jpg', 'http://localhost:8000/public/images/infinix.jpg', 'http://localhost:8000/public/images/infinix.jpg', 'The jacket is almost exactly same as the image.\r\nThe color may vary a little.\r\nSize : xl', 5, 0, 1, 0),
(25, 'Mouse for Gaming', 'Electronics', 'Logitech', 1, 123, 12212, 'http://localhost:8000/public/images/logitech.jpg', 'http://localhost:8000/public/images/logitech.jpg', 'http://localhost:8000/public/images/logitech.jpg', 'A gaming mouse.\r\nWarrenty : 1 years.', 0, 0, 0, 0),
(26, 'Chicken Curry', 'Food', 'Havit', 1, 277, 12, 'http://localhost:8000/public/images/havit.jpg', 'http://localhost:8000/public/images/havit.jpg', 'http://localhost:8000/public/images/havit.jpg', 'Delecious Chicken Curry.\r\nDelivered within 2 hours.', 0, 0, 0, 0),
(27, 'Winter Jacket', 'Clothings', 'Infinix', 1, 6, 12, 'http://localhost:8000/public/images/infinix.jpg', 'http://localhost:8000/public/images/infinix.jpg', 'http://localhost:8000/public/images/infinix.jpg', 'The jacket is almost exactly same as the image.\r\nThe color may vary a little.\r\nSize : xl', 5, 0, 0, 1),
(28, 'Mouse for Gaming', 'Electronics', 'Logitech', 1, 123, 12212, 'http://localhost:8000/public/images/logitech.jpg', 'http://localhost:8000/public/images/logitech.jpg', 'http://localhost:8000/public/images/logitech.jpg', 'A gaming mouse.\r\nWarrenty : 1 years.', 0, 0, 0, 0),
(29, 'Chicken Curry', 'Food', 'Havit', 1, 277, 12, 'http://localhost:8000/public/images/havit.jpg', 'http://localhost:8000/public/images/havit.jpg', 'http://localhost:8000/public/images/havit.jpg', 'Delecious Chicken Curry.\r\nDelivered within 2 hours.', 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_comment`
--

CREATE TABLE `product_comment` (
  `slno` bigint(20) NOT NULL,
  `product_slno` bigint(20) NOT NULL,
  `seller_slno` bigint(20) NOT NULL,
  `user_slno` bigint(20) NOT NULL,
  `comment` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_comment`
--

INSERT INTO `product_comment` (`slno`, `product_slno`, `seller_slno`, `user_slno`, `comment`) VALUES
(1, 29, 1, 5, 'The product was really good.\r\nBut, the packaging was a lil bit weak.\r\nIt, could be better.\r\nAlso the delivery was a lot delayed.\r\nHoping it won\'t be like this next time.\r\n'),
(2, 29, 1, 5, 'The product was really good.\r\nBut, the packaging was a lil bit weak.\r\nIt, could be better.\r\nAlso the delivery was a lot delayed.\r\nHoping it won\'t be like this next time.\r\n'),
(3, 29, 1, 5, 'The product was really good.\r\nBut, the packaging was a lil bit weak.\r\nIt, could be better.\r\nAlso the delivery was a lot delayed.\r\nHoping it won\'t be like this next time.\r\n'),
(4, 29, 1, 5, 'The product was really good.\r\nBut, the packaging was a lil bit weak.\r\nIt, could be better.\r\nAlso the delivery was a lot delayed.\r\nHoping it won\'t be like this next time.\r\n'),
(5, 29, 1, 5, 'The product was really good.\r\nBut, the packaging was a lil bit weak.\r\nIt, could be better.\r\nAlso the delivery was a lot delayed.\r\nHoping it won\'t be like this next time.\r\n'),
(6, 29, 1, 5, 'The product was really good.\r\nBut, the packaging was a lil bit weak.\r\nIt, could be better.\r\nAlso the delivery was a lot delayed.\r\nHoping it won\'t be like this next time.\r\n'),
(7, 29, 1, 5, 'The product was really good.\r\nBut, the packaging was a lil bit weak.\r\nIt, could be better.\r\nAlso the delivery was a lot delayed.\r\nHoping it won\'t be like this next time.\r\n'),
(8, 29, 1, 5, 'The product was really good.\r\nBut, the packaging was a lil bit weak.\r\nIt, could be better.\r\nAlso the delivery was a lot delayed.\r\nHoping it won\'t be like this next time.\r\n'),
(9, 24, 1, 5, 'Its really great.'),
(10, 27, 1, 5, 'coollll !!!');

-- --------------------------------------------------------

--
-- Table structure for table `product_dislike`
--

CREATE TABLE `product_dislike` (
  `slno` bigint(20) NOT NULL,
  `user_slno` bigint(20) NOT NULL,
  `product_slno` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_likes`
--

CREATE TABLE `product_likes` (
  `slno` bigint(20) NOT NULL,
  `user_slno` bigint(20) NOT NULL,
  `product_slno` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_rating`
--

CREATE TABLE `product_rating` (
  `slno` bigint(20) NOT NULL,
  `rating` int(11) NOT NULL,
  `user_slno` bigint(20) NOT NULL,
  `product_slno` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_rating`
--

INSERT INTO `product_rating` (`slno`, `rating`, `user_slno`, `product_slno`) VALUES
(1, 5, 5, 24),
(2, 5, 5, 27);

-- --------------------------------------------------------

--
-- Table structure for table `product_type`
--

CREATE TABLE `product_type` (
  `slno` bigint(20) NOT NULL,
  `type` text NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_type`
--

INSERT INTO `product_type` (`slno`, `type`, `image`) VALUES
(1, 'Electronics', 'http://localhost:8000/public/images/electronics.jpg'),
(2, 'Clothings', 'http://localhost:8000/public/images/clothing.jpg'),
(3, 'Food', 'http://localhost:8000/public/images/food.jpg'),
(4, 'Fruits', 'http://localhost:8000/public/images/fruit.jpg'),
(5, 'Drinks', 'http://localhost:8000/public/images/drinks.jpg'),
(14, 'Kitchen Tools', 'http://localhost:8000/public/images/kitchen.jpg'),
(15, 'Shoes', 'http://localhost:8000/public/images/shoes.jpg'),
(16, 'Medicine', 'http://localhost:8000/public/images/medicine.jpg'),
(19, 'Vehicles', 'http://localhost:8000/public/images/vehicle.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `slno` bigint(20) NOT NULL,
  `user_slno` bigint(20) NOT NULL,
  `product_slno` bigint(20) NOT NULL,
  `seller_slno` bigint(20) NOT NULL,
  `event_or_not` text NOT NULL,
  `deliveryserial` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`slno`, `user_slno`, `product_slno`, `seller_slno`, `event_or_not`, `deliveryserial`) VALUES
(2, 5, 27, 1, 'not event', 24),
(4, 5, 27, 1, 'not event', 24),
(5, 5, 27, 1, 'not event', 24),
(6, 5, 27, 1, 'not event', 24),
(7, 5, 27, 1, 'not event', 24),
(8, 5, 27, 1, 'not event', 24);

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `slno` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `country` text NOT NULL,
  `age` int(11) NOT NULL,
  `gender` text NOT NULL,
  `mobile` text NOT NULL,
  `nid_image` text NOT NULL,
  `address` text NOT NULL,
  `date_of_birth` date NOT NULL,
  `image` text NOT NULL,
  `pass` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`slno`, `name`, `email`, `country`, `age`, `gender`, `mobile`, `nid_image`, `address`, `date_of_birth`, `image`, `pass`) VALUES
(3, 'samin', 'arnobsamin9@gmail.com', 'asda', 21, 'Male', '124', 'http://localhost:8000/public/images/1690989311229-super-saiyan-son-goku-dragon-ball-z-4k-nv-2048x2048 (1) (1).jpg', 'asdasdasd', '1996-02-08', 'http://localhost:8000/public/images/1690989311236-super-saiyan-son-goku-dragon-ball-z-4k-nv-2048x2048 (1) (1).jpg', '$2b$10$.JoLzwDTQNUKH608ZPEQlei/0vIWW1jJODXfRJNN0Kh3bLw22Y2y.'),
(4, 'Boruto Uzmaki', 'borutouzm95@gmail.com', 'Japan', 21, 'Male', '01823115151', 'http://localhost:8000/public/images/1690989311229-super-saiyan-son-goku-dragon-ball-z-4k-nv-2048x2048 (1) (1).jpg', 'konoha,25,street-20', '2023-08-02', 'http://localhost:8000/public/images/1690989311236-super-saiyan-son-goku-dragon-ball-z-4k-nv-2048x2048 (1) (1).jpg', '$2b$10$.JoLzwDTQNUKH608ZPEQlei/0vIWW1jJODXfRJNN0Kh3bLw22Y2y.'),
(5, 'Piccolo', 'piccolo@gmail.com', 'Japan', 21, 'Male', '0236272723', 'http://localhost:8000/public/images/1690989311229-super-saiyan-son-goku-dragon-ball-z-4k-nv-2048x2048 (1) (1).jpg', '44/2 HJapan', '2023-08-07', 'http://localhost:8000/public/images/1690989311229-super-saiyan-son-goku-dragon-ball-z-4k-nv-2048x2048 (1) (1).jpg', '$2b$10$.JoLzwDTQNUKH608ZPEQlei/0vIWW1jJODXfRJNN0Kh3bLw22Y2y.'),
(6, 'Gohan', 'gohan@gmail.com', 'Japan', 21, 'Male', '0182414151', 'http://localhost:8000/public/images/1692617149260-cashdel.jpg', '33,4 something', '2023-08-09', 'http://localhost:8000/public/images/1692617149260-stripe.jpg', '$2b$10$4Tttm7uPtukWJFrfvLKH8OX/icJFjB0P1K5iFi.SECK7dWe5lDPei'),
(7, 'Badruddoza', 'arnobsamin95@gmail.com', 'Bd', 21, 'Male', '0182414151', 'http://localhost:8000/public/images/1690989311229-super-saiyan-son-goku-dragon-ball-z-4k-nv-2048x2048 (1) (1).jpg', '22,5 german asda', '2023-08-08', 'http://localhost:8000/public/images/1690989311236-super-saiyan-son-goku-dragon-ball-z-4k-nv-2048x2048 (1) (1).jpg', '$2b$10$.JoLzwDTQNUKH608ZPEQlei/0vIWW1jJODXfRJNN0Kh3bLw22Y2y.');

-- --------------------------------------------------------

--
-- Table structure for table `seller_verify`
--

CREATE TABLE `seller_verify` (
  `slno` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `country` text NOT NULL,
  `age` int(11) NOT NULL,
  `gender` text NOT NULL,
  `mobile` text NOT NULL,
  `nid_image` text NOT NULL,
  `address` text NOT NULL,
  `date_of_birth` date NOT NULL,
  `image` text NOT NULL,
  `pass` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tokendb`
--

CREATE TABLE `tokendb` (
  `slno` bigint(20) NOT NULL,
  `email` text NOT NULL,
  `token` mediumtext NOT NULL,
  `user_type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokendb`
--

INSERT INTO `tokendb` (`slno`, `email`, `token`, `user_type`) VALUES
(16, 'samin@gmail.com', 'eb7acd4f-aa3b-46e5-a79b-ad4e632f45cc', 'Employee'),
(115, 'arnobsamin95@gmail.com', '5410d3c7-51de-4c74-9d6e-ca3af5fc2dcf', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `slno` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `date_of_birth` date NOT NULL,
  `country` text NOT NULL,
  `gender` text NOT NULL,
  `mobile` text NOT NULL,
  `email` text NOT NULL,
  `image` text NOT NULL,
  `age` int(11) NOT NULL,
  `address` text NOT NULL,
  `delivery_address` text NOT NULL,
  `pass` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`slno`, `name`, `date_of_birth`, `country`, `gender`, `mobile`, `email`, `image`, `age`, `address`, `delivery_address`, `pass`) VALUES
(5, 'goku ', '1996-02-06', 'BA', 'Male', '91231312312', 'arnobsamin95@gmail.com', 'http://localhost:8000/public/images/1691017099502-super-saiyan-son-goku-dragon-ball-z-4k-nv-2048x2048 (1) (1).jpg', 34, 'asdasda', 'dhaka', '$2b$10$FZkA4S/L10rjN8iW7d85x.fnnbHca2Xt966qGBhZODiZEuDfS4YtG'),
(6, 'Vizita', '1996-02-07', 'BA', 'Male', '91231312312', 'vizita123456789123456789@gmail.com', 'http://localhost:8000/public/images/1691139863848-OIP.jpg', 34, 'asdasda', 'asdasdadas', '$2b$10$FZkA4S/L10rjN8iW7d85x.fnnbHca2Xt966qGBhZODiZEuDfS4YtG'),
(7, 'Gohan', '1999-09-21', 'Japan', 'Male', '01867261711', 'gohanichigouzmaki95@gmail.com', 'http://localhost:8000/public/images/1692028470375-pulsar.jpg', 21, '33,2 asdasdasdasd, dhaka', 'same', '$2b$10$UcdU.ON2h234sDwdJU/U5.4ryiIOiP2KbPv27WhK3Hx3YxOk3.Qfq'),
(8, 'Pinokio', '2023-08-17', 'Bangladesh', 'Male', '01251516171', 'pinokio@gmail.com', 'http://localhost:8000/public/images/1692616881159-stripe.jpg', 25, '33/2, Maniknagar, Dhaka-1203', '33/2, Maniknagar, Dhaka-1203', '$2b$10$fDW05QrOy.EJ4ItJvcpbhe5nXWziY4Ugu9QTmdGmn8WmKUcSNnhQq');

-- --------------------------------------------------------

--
-- Table structure for table `user_verify`
--

CREATE TABLE `user_verify` (
  `slno` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `date_of_birth` date NOT NULL,
  `country` text NOT NULL,
  `gender` text NOT NULL,
  `mobile` text NOT NULL,
  `image` text NOT NULL,
  `address` text NOT NULL,
  `delivery_address` text NOT NULL,
  `pass` text NOT NULL,
  `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_verify`
--

INSERT INTO `user_verify` (`slno`, `name`, `email`, `date_of_birth`, `country`, `gender`, `mobile`, `image`, `address`, `delivery_address`, `pass`, `age`) VALUES
(14, 'samin', 'tolol@gmail.com', '1998-02-02', 'asdad', 'Male', '12313123', 'http://localhost:8000/public/images/1691079989897-OIP.jpg', 'adad', 'asdad', '$2b$10$.JoLzwDTQNUKH608ZPEQlei/0vIWW1jJODXfRJNN0Kh3bLw22Y2y.', 21);

-- --------------------------------------------------------

--
-- Table structure for table `user_verify_code`
--

CREATE TABLE `user_verify_code` (
  `slno` bigint(20) NOT NULL,
  `email` text NOT NULL,
  `otp` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_verify_code`
--

INSERT INTO `user_verify_code` (`slno`, `email`, `otp`) VALUES
(14, 'tolol@gmail.com', 'pqR1iNdJPoanJ8y');

-- --------------------------------------------------------

--
-- Table structure for table `website_review`
--

CREATE TABLE `website_review` (
  `slno` bigint(20) NOT NULL,
  `user_slno` bigint(20) NOT NULL,
  `comment` mediumtext NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `website_review`
--

INSERT INTO `website_review` (`slno`, `user_slno`, `comment`, `rating`) VALUES
(2, 6, 'Well, this is a controversial one. Just like the new Toyota Supra, the latest Subaru WRX is being attacked on all fronts by enthusiasts.\n\nWhen launched, it came in a high contrast pumpkin orange colour that proudly showed off a body dressed in a lot of plastic.\n\nThere’s no higher powered STI model announced for this generation, and the power has only slightly increased.\n\nAfter having some time to digest what this car looks like, I was given a press car to review on my birthday. It was this Subaru WRX RS and it was a manual!\n\nIt misses out on some of the tech and safety features that the most expensive TS model gets, but that’s fine, since that model is CVT automatic only.\n\nThis was the first WRX I’ve ever driven, and I can tell you now, it’s a car I’d consider owning if I needed a brand new AWD sports car.', 4),
(12, 6, 'Probably Best Place To Buy Electronics But, I Found the package lil bit of weak from the dealer.\r\nThe product was ok but the package could be better !!!', 4),
(14, 5, 'Niceeeeeeeeeeeeeeee', 5),
(15, 6, 'Well, this is a controversial one. Just like the new Toyota Supra, the latest Subaru WRX is being attacked on all fronts by enthusiasts.\r\n\r\nWhen launched, it came in a high contrast pumpkin orange colour that proudly showed off a body dressed in a lot of plastic.\r\n\r\nThere’s no higher powered STI model announced for this generation, and the power has only slightly increased.\r\n\r\nAfter having some time to digest what this car looks like, I was given a press car to review on my birthday. It was this Subaru WRX RS and it was a manual!\r\n\r\nIt misses out on some of the tech and safety features that the most expensive TS model gets, but that’s fine, since that model is CVT automatic only.\r\n\r\nThis was the first WRX I’ve ever driven, and I can tell you now, it’s a car I’d consider owning if I needed a brand new AWD sports car.', 4),
(16, 6, 'Probably Best Place To Buy Electronics But, I Found the package lil bit of weak from the dealer.\r\nThe product was ok but the package could be better !!!', 4),
(17, 5, 'Niceeeeeeeeeeeeeeee', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brand_type`
--
ALTER TABLE `brand_type`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `deliverystatus`
--
ALTER TABLE `deliverystatus`
  ADD PRIMARY KEY (`solno`);

--
-- Indexes for table `delivery_order`
--
ALTER TABLE `delivery_order`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `event_products`
--
ALTER TABLE `event_products`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `event_product_comment`
--
ALTER TABLE `event_product_comment`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `event_product_dislike`
--
ALTER TABLE `event_product_dislike`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `event_product_likes`
--
ALTER TABLE `event_product_likes`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `event_product_rating`
--
ALTER TABLE `event_product_rating`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `forgot_pass`
--
ALTER TABLE `forgot_pass`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `forgot_pass_seller`
--
ALTER TABLE `forgot_pass_seller`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `product_comment`
--
ALTER TABLE `product_comment`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `product_dislike`
--
ALTER TABLE `product_dislike`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `product_likes`
--
ALTER TABLE `product_likes`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `product_rating`
--
ALTER TABLE `product_rating`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `seller_verify`
--
ALTER TABLE `seller_verify`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `tokendb`
--
ALTER TABLE `tokendb`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `user_verify`
--
ALTER TABLE `user_verify`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `user_verify_code`
--
ALTER TABLE `user_verify_code`
  ADD PRIMARY KEY (`slno`);

--
-- Indexes for table `website_review`
--
ALTER TABLE `website_review`
  ADD PRIMARY KEY (`slno`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brand_type`
--
ALTER TABLE `brand_type`
  MODIFY `slno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `deliverystatus`
--
ALTER TABLE `deliverystatus`
  MODIFY `solno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `delivery_order`
--
ALTER TABLE `delivery_order`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `slno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `event_products`
--
ALTER TABLE `event_products`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `event_product_comment`
--
ALTER TABLE `event_product_comment`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `event_product_dislike`
--
ALTER TABLE `event_product_dislike`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_product_likes`
--
ALTER TABLE `event_product_likes`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_product_rating`
--
ALTER TABLE `event_product_rating`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `forgot_pass`
--
ALTER TABLE `forgot_pass`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `forgot_pass_seller`
--
ALTER TABLE `forgot_pass_seller`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `product_comment`
--
ALTER TABLE `product_comment`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `product_dislike`
--
ALTER TABLE `product_dislike`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_likes`
--
ALTER TABLE `product_likes`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_rating`
--
ALTER TABLE `product_rating`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product_type`
--
ALTER TABLE `product_type`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `seller`
--
ALTER TABLE `seller`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `seller_verify`
--
ALTER TABLE `seller_verify`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tokendb`
--
ALTER TABLE `tokendb`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_verify`
--
ALTER TABLE `user_verify`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_verify_code`
--
ALTER TABLE `user_verify_code`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `website_review`
--
ALTER TABLE `website_review`
  MODIFY `slno` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
