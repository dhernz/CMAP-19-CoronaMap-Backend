-- MySQL Workbench Synchronization
-- Generated: 2020-03-18 19:39
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Jaime

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `reporting_test` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `reporting_test`.`reports` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `latitude` FLOAT(11) NOT NULL,
  `longitude` FLOAT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_id_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `reporting_test`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `reporting_test`.`symptoms` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `reporting_test`.`symptoms_x_users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `symptom_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `user_id`, `symptom_id`),
  INDEX `user_id_idx` (`user_id` ASC),
  INDEX `symptom_id_idx` (`symptom_id` ASC),
  CONSTRAINT `symptom_id`
    FOREIGN KEY (`symptom_id`)
    REFERENCES `reporting_test`.`symptoms` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `reporting_test`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `reporting_test`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `identity` VARCHAR(25) NOT NULL,
  `device_id` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `country_code` VARCHAR(15) NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `mac_address` VARCHAR(12) NOT NULL,
  `ip_address` VARCHAR(15) NOT NULL,
  `status_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `identity_UNIQUE` (`identity` ASC),
  INDEX `status_id_idx` (`status_id` ASC),
  CONSTRAINT `status_id`
    FOREIGN KEY (`status_id`)
    REFERENCES `reporting_test`.`status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `reporting_test`.`status` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  `icon_asset_url` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

