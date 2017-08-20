/*
Navicat MySQL Data Transfer

Source Server         : local-test
Source Server Version : 50139
Source Host           : localhost:3306
Source Database       : my_house

Target Server Type    : MYSQL
Target Server Version : 50139
File Encoding         : 65001

Date: 2017-08-20 22:41:48
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
  `name` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('1', '123', '123', '豪哥');
INSERT INTO `account` VALUES ('2', 'guohao', '123', '豪哥');

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
  `img_url` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of building
-- ----------------------------
INSERT INTO `building` VALUES ('43', '绵阳市平武县二零五省道', '104.558858871459', '32.40253782222', null, '东皋湾安居房1幢', '安置房', '/assets/6B8E4C35B7BFF084BDD92453BE7DC83F.png');
INSERT INTO `building` VALUES ('44', '中国四川省绵阳市平武县', '104.53645706176758', '32.412936267872574', null, '东皋湾安居房2幢', '安置房', '/assets/6B8E4C35B7BFF084BDD92453BE7DC83F.png');
INSERT INTO `building` VALUES ('45', '中国四川省绵阳市平武县龙安镇', '104.53542709350586', '32.39032627156788', null, '东皋湾安居房3幢', '安置房', '/assets/6B8E4C35B7BFF084BDD92453BE7DC83F.png');
INSERT INTO `building` VALUES ('46', '中国四川省绵阳市平武县龙安镇', '104.50521469116211', '32.40453064849855', null, '东皋湾安居房4幢', '安置房', '/assets/6B8E4C35B7BFF084BDD92453BE7DC83F.png');
INSERT INTO `building` VALUES ('47', '中国四川省绵阳市平武县龙安镇', '104.54675674438477', '32.42250033068955', null, '东皋湾安居房5幢', '安置房', '/assets/6B8E4C35B7BFF084BDD92453BE7DC83F.png');
INSERT INTO `building` VALUES ('48', '中国四川省绵阳市平武县龙安镇', '104.5103645324707', '32.413805770022265', null, '东皋湾安居房6幢', '安置房', '/assets/6B8E4C35B7BFF084BDD92453BE7DC83F.png');

-- ----------------------------
-- Table structure for house
-- ----------------------------
DROP TABLE IF EXISTS `house`;
CREATE TABLE `house` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) DEFAULT NULL,
  `building_id` int(10) DEFAULT NULL,
  `jwh` varchar(1024) DEFAULT NULL,
  `name` varchar(1024) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `building_id` (`building_id`),
  CONSTRAINT `house_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `house_ibfk_2` FOREIGN KEY (`building_id`) REFERENCES `building` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of house
-- ----------------------------
INSERT INTO `house` VALUES ('1', '11', '43', null, '1幢1单元5楼1号', '2016-12-07 00:00:00', '2017-09-01 00:00:00', '公租房申请');
INSERT INTO `house` VALUES ('2', '9', '43', null, '1幢1单元5楼2号', '2017-07-01 00:00:00', '2017-08-02 00:00:00', '火烧房子');
INSERT INTO `house` VALUES ('3', '13', '43', null, '1幢1单元6楼1号', '2016-12-09 00:00:00', '2019-01-11 00:00:00', '公租房申请');
INSERT INTO `house` VALUES ('4', '12', '43', null, '1幢1单元6楼2号', '2016-01-01 00:00:00', '2018-02-16 00:00:00', '公租房申请');
INSERT INTO `house` VALUES ('5', '14', '43', null, '1幢2单元1楼1号', '2016-11-10 00:00:00', '2018-12-13 00:00:00', '金色家园过渡安置');
INSERT INTO `house` VALUES ('6', '15', '43', null, '1幢2单元1楼2号', '2016-11-01 00:00:00', '2018-12-27 00:00:00', '金色家园过渡安置');
INSERT INTO `house` VALUES ('7', '10', '44', '绵阳二局', '这是新增楼栋', '2017-08-09 00:00:00', '2017-08-25 00:00:00', '啦啦');
INSERT INTO `house` VALUES ('8', null, null, null, '根深蒂固', null, null, null);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) NOT NULL,
  `dibao` varchar(1024) DEFAULT NULL,
  `phone_num` varchar(100) DEFAULT NULL,
  `id_card` varchar(100) DEFAULT NULL,
  `etc` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('9', '教体局', '', '', '', '置换安置');
INSERT INTO `user` VALUES ('10', '唐兴菊', '报恩寺', '', '510727196703200347', '公租房申请');
INSERT INTO `user` VALUES ('11', '谢本燕', '', '', '510727196208166612', '火烧房子');
INSERT INTO `user` VALUES ('12', '王国斌', '报恩寺', '', '510727196403260014', '公租房申请');
INSERT INTO `user` VALUES ('13', '张运贵', '政府街', '', '510727197104040016', '公租房申请');
INSERT INTO `user` VALUES ('14', '王明友', '南岸社区', '', '510727195501100319', '金色家园过渡安置');
INSERT INTO `user` VALUES ('15', '袁亮', '报恩寺', '', '510727197607310620', '公租房申请');
INSERT INTO `user` VALUES ('16', '潘源华', '西路', '', '510727196907166515', '公租房申请');
INSERT INTO `user` VALUES ('17', '吴杨', '西路', '', '510727198302223125', '公租房申请');
INSERT INTO `user` VALUES ('18', '曾明', '报恩寺', '', '510727198207176412', '公租房申请');
INSERT INTO `user` VALUES ('19', '苏正国', '政府街', '', '510727195610150032', '公租房申请');
INSERT INTO `user` VALUES ('20', '陈万兴', '报恩寺', '', '510727195503153916', '');
INSERT INTO `user` VALUES ('21', '董小林', '木座', '', '510727197412086411', '');
INSERT INTO `user` VALUES ('22', '柴他才里', '报恩寺', '', '510727198404050018', '公租房申请');
