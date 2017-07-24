/*
Navicat MySQL Data Transfer

Source Server         : local-test
Source Server Version : 50139
Source Host           : localhost:3306
Source Database       : my_house

Target Server Type    : MYSQL
Target Server Version : 50139
File Encoding         : 65001

Date: 2017-07-24 23:18:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `account` varchar(100) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for building
-- ----------------------------
DROP TABLE IF EXISTS `building`;
CREATE TABLE `building` (
  `id` int(10) NOT NULL,
  `address` varchar(1024) NOT NULL,
  `lng` varchar(100) DEFAULT NULL,
  `lat` varchar(100) DEFAULT NULL,
  `house` varchar(1024) NOT NULL,
  `name` varchar(1024) NOT NULL,
  `desc` varchar(1024) DEFAULT NULL,
  `img_url` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for house
-- ----------------------------
DROP TABLE IF EXISTS `house`;
CREATE TABLE `house` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `building_id` int(10) NOT NULL,
  `jwh` varchar(1024) DEFAULT NULL,
  `name` varchar(1024) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `desc` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `building_id` (`building_id`),
  CONSTRAINT `house_ibfk_2` FOREIGN KEY (`building_id`) REFERENCES `building` (`id`),
  CONSTRAINT `house_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) NOT NULL,
  `di_bao_id` varchar(1024) DEFAULT NULL,
  `house_id` int(10) NOT NULL,
  `phone_num` varchar(100) DEFAULT NULL,
  `dibao_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
