/*
Navicat MySQL Data Transfer

Source Server         : local-test
Source Server Version : 50139
Source Host           : localhost:3306
Source Database       : my_house

Target Server Type    : MYSQL
Target Server Version : 50139
File Encoding         : 65001

Date: 2017-08-01 00:46:49
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('1', '123', '123');

-- ----------------------------
-- Table structure for building
-- ----------------------------
DROP TABLE IF EXISTS `building`;
CREATE TABLE `building` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `address` varchar(1024) NOT NULL,
  `lng` varchar(100) DEFAULT NULL,
  `lat` varchar(100) DEFAULT NULL,
  `house` varchar(1024) DEFAULT NULL,
  `name` varchar(1024) NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `img_url` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of building
-- ----------------------------
INSERT INTO `building` VALUES ('2', '中国四川省绵阳市游仙区绵山路64号', '104.75656986236572', '31.50078210882175', '1,2,3', '绵山路64号', '这就是描述', '/0070C63C67FEB9F72513B741F587FEC4.jpg');
INSERT INTO `building` VALUES ('3', '中国四川省绵阳市涪城区御中路68号', '104.72675442695618', '31.43719672749887', '1,2,3', '御中路68号', '这就是描述', '/0070C63C67FEB9F72513B741F587FEC4.jpg');
INSERT INTO `building` VALUES ('4', '中国四川省绵阳市涪城区西山南路7号', '104.72994089126587', '31.47377059067058', null, '西山南路7号', '感豆腐干地方', '/assets/0070C63C67FEB9F72513B741F587FEC4.jpg');
INSERT INTO `building` VALUES ('5', '中国四川省绵阳市涪城区绵兴东路68-8号', '104.68717575073242', '31.46530265453581', null, '兴东路68-8号', '古典风格', '/assets/0070C63C67FEB9F72513B741F587FEC4.jpg');
INSERT INTO `building` VALUES ('6', '中国四川省绵阳市涪城区青龙大道中段59号', '104.6967351436615', '31.53469070495892', null, '青龙大道中段59号', '这就是秒速', '/assets/0070C63C67FEB9F72513B741F587FEC4.jpg');
INSERT INTO `building` VALUES ('7', '中国四川省绵阳市涪城区石塘镇', '104.68254089355469', '31.423609526594593', null, '石塘镇', '广东分行个2', '/assets/0070C63C67FEB9F72513B741F587FEC4.jpg');
INSERT INTO `building` VALUES ('8', '中国四川省绵阳市涪城区', '104.6858024597168', '31.462959910438126', null, '这就是楼栋名称', '这就是秒速', '/assets/0070C63C67FEB9F72513B741F587FEC4.jpg');
INSERT INTO `building` VALUES ('9', '中国四川省绵阳市涪城区', '104.65730667114258', '31.481407433218763', null, '桃林进区', '过的风格合法化', '/assets/0070C63C67FEB9F72513B741F587FEC4.jpg');
INSERT INTO `building` VALUES ('10', '中国四川省绵阳市涪城区', '104.66314315795898', '31.440700918311883', null, '不会放过后', '13123123', '/assets/0070C63C67FEB9F72513B741F587FEC4.jpg');
INSERT INTO `building` VALUES ('11', '中国四川省绵阳市涪城区', '104.70193862915039', '31.468523831954318', null, '绵阳西街', '合肥国家和国家', '/assets/0070C63C67FEB9F72513B741F587FEC4.jpg');

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
  `description` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `building_id` (`building_id`),
  CONSTRAINT `house_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `house_ibfk_2` FOREIGN KEY (`building_id`) REFERENCES `building` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of house
-- ----------------------------
INSERT INTO `house` VALUES ('2', '4', '3', '这就是居委会', '1栋2单元3-5号', '2017-07-12 00:00:00', '2017-08-16 00:00:00', '反观对手犯规罚代管');
INSERT INTO `house` VALUES ('3', '1', '2', '这就是居委会', '1栋2单元3-1号', '2017-07-12 00:00:00', '2017-08-16 00:00:00', '反观对手犯规罚代管');
INSERT INTO `house` VALUES ('4', '5', '2', '古典风格', '1栋2单元3-3号', '2017-07-12 00:00:00', '2017-08-16 00:00:00', '反观对手犯规罚代管');
INSERT INTO `house` VALUES ('5', '6', '2', '古典风格', '1栋2单元3-2号', '2017-07-12 00:00:00', '2017-08-16 00:00:00', '反观对手犯规罚代管');
INSERT INTO `house` VALUES ('6', '7', '2', '古典风格', '1栋2单元2-2号', '2017-07-12 00:00:00', '2017-08-16 00:00:00', '反观对手犯规罚代管');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) NOT NULL,
  `dibao` varchar(1024) DEFAULT NULL,
  `house_id` int(10) DEFAULT '0',
  `phone_num` varchar(100) DEFAULT NULL,
  `id_card` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '郭豪', '绵阳涪城低保1', '0', '18500744641', '');
INSERT INTO `user` VALUES ('3', '张扬', '法国等国的风格', '0', '185626545689', '14235456478956465');
INSERT INTO `user` VALUES ('4', '辛佳洪', '大三大四的', '0', '15648974641', '123132456132123');
INSERT INTO `user` VALUES ('5', '何宇恒', '感豆腐干豆腐干', '0', '154489461651', '545645614');
INSERT INTO `user` VALUES ('6', '白杰', '大傻逼', '0', '1845465764', '21231564564');
INSERT INTO `user` VALUES ('7', '杨一', '二王子', '0', '182552057', '626+206+5+6');
INSERT INTO `user` VALUES ('8', '张扬傻逼', '打算房贷首付', '0', '51231231', '21515321231231');
