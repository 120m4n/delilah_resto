-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema delilah
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `delilah` ;

-- -----------------------------------------------------
-- Schema delilah
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `delilah` DEFAULT CHARACTER SET utf8mb4 ;
USE `delilah` ;

-- -----------------------------------------------------
-- Table `delilah`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`product` ;

CREATE TABLE IF NOT EXISTS `delilah`.`product` (
  `id_product` INT(11) NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NOT NULL,
  `price` FLOAT NOT NULL,
  `availability` BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`id_product`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `delilah`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`role` ;

CREATE TABLE IF NOT EXISTS `delilah`.`role` (
  `id_role` INT(11) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_role`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `delilah`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`user` ;

CREATE TABLE IF NOT EXISTS `delilah`.`user` (
  `id_user` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  `last_name` VARCHAR(60) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `id_role` INT(11) NOT NULL DEFAULT 2,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  INDEX `id_role_idx` (`id_role` ASC) ,
  CONSTRAINT `fk_id_role_user`
    FOREIGN KEY (`id_role`)
    REFERENCES `delilah`.`role` (`id_role`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `delilah`.`favorite`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`favorite` ;

CREATE TABLE IF NOT EXISTS `delilah`.`favorite` (
  `id_favorite` INT(11) NOT NULL AUTO_INCREMENT,
  `id_product` INT(11) NOT NULL,
  `id_user` INT(11) NOT NULL,
  PRIMARY KEY (`id_favorite`),
  INDEX `id_product_idx` (`id_product` ASC) ,
  INDEX `id_user_idx` (`id_user` ASC) ,
  CONSTRAINT `fk_id_product_favorite`
    FOREIGN KEY (`id_product`)
    REFERENCES `delilah`.`product` (`id_product`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_user_favorite`
    FOREIGN KEY (`id_user`)
    REFERENCES `delilah`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `delilah`.`payment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`payment` ;

CREATE TABLE IF NOT EXISTS `delilah`.`payment` (
  `id_payment` INT(11) NOT NULL AUTO_INCREMENT,
  `method` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_payment`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `delilah`.`order_state`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`order_state` ;

CREATE TABLE IF NOT EXISTS `delilah`.`order_state` (
  `id_state` INT(11) NOT NULL AUTO_INCREMENT,
  `order_state` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_state`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `delilah`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`orders` ;

CREATE TABLE IF NOT EXISTS `delilah`.`orders` (
  `id_order` INT(11) NOT NULL AUTO_INCREMENT,
  `id_user` INT(11) NOT NULL,
  `id_payment` INT(11) NOT NULL,
  `time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  `id_state` INT(11) NOT NULL,
  PRIMARY KEY (`id_order`),
  INDEX `id_user_idx` (`id_user` ASC) ,
  INDEX `id_payment_idx` (`id_payment` ASC) ,
  INDEX `id_state_idx` (`id_state` ASC) ,
  CONSTRAINT `fk_id_payment_order`
    FOREIGN KEY (`id_payment`)
    REFERENCES `delilah`.`payment` (`id_payment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_state_order`
    FOREIGN KEY (`id_state`)
    REFERENCES `delilah`.`order_state` (`id_state`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_user_order`
    FOREIGN KEY (`id_user`)
    REFERENCES `delilah`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `delilah`.`order_detail`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `delilah`.`order_detail` ;

CREATE TABLE IF NOT EXISTS `delilah`.`order_detail` (
  `id_order_detail` INT(11) NOT NULL AUTO_INCREMENT,
  `id_product` INT(11) NOT NULL,
  `quantity` INT(11) NOT NULL,
  `subtotal` FLOAT NOT NULL,
  `id_order` INT(11) NOT NULL,
  PRIMARY KEY (`id_order_detail`),
  INDEX `id_order_idx` (`id_order` ASC) ,
  INDEX `fk_id_product_detail_idx` (`id_product` ASC) ,
  CONSTRAINT `fk_id_order_detail`
    FOREIGN KEY (`id_order`)
    REFERENCES `delilah`.`orders` (`id_order`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_product_detail`
    FOREIGN KEY (`id_product`)
    REFERENCES `delilah`.`product` (`id_product`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Data for table `delilah`.`role`
-- -----------------------------------------------------
START TRANSACTION;
USE `delilah`;
INSERT INTO `delilah`.`role` (`id_role`, `description`) VALUES (1, 'ADMIN');
INSERT INTO `delilah`.`role` (`id_role`, `description`) VALUES (2, 'USER');

COMMIT;


-- -----------------------------------------------------
-- Data for table `delilah`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `delilah`;
INSERT INTO `delilah`.`user` (`id_user`, `username`,`password`, `name`, `last_name`,`email`, `address`, `phone`, `id_role`) VALUES (1, 'admin', 'admin', 'Roman', 'Sarmiento', 'admin@gmail.com', 'cra 27 15 94', '3001234567', 1);
INSERT INTO `delilah`.`user` (`id_user`, `username`,`password`, `name`, `last_name`,`email`, `address`, `phone`, `id_role`) VALUES (2, 'user',  'user', 'John',  'Doe', 'user@gmail.com', 'calle 20 24 28', '3009876543', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `delilah`.`product`
-- -----------------------------------------------------
START TRANSACTION;
USE `delilah`;
INSERT INTO `delilah`.`product` (`id_product`, `product_name`, `price`) VALUES (1, 'Falafel', 18500);
INSERT INTO `delilah`.`product` (`id_product`, `product_name`, `price`) VALUES (2, 'Hamburguesa', 8500);
INSERT INTO `delilah`.`product` (`id_product`, `product_name`, `price`) VALUES (3, 'Cervezas', 12500);
INSERT INTO `delilah`.`product` (`id_product`, `product_name`, `price`) VALUES (4, 'Foccacia', 13500);
INSERT INTO `delilah`.`product` (`id_product`, `product_name`, `price`) VALUES (5, 'Sandwich Veggie', 13500);
INSERT INTO `delilah`.`product` (`id_product`, `product_name`, `price`) VALUES (6, 'Hamburguesa Especial', 14500);
INSERT INTO `delilah`.`product` (`id_product`, `product_name`, `price`) VALUES (7, 'Pastas', 15500);
INSERT INTO `delilah`.`product` (`id_product`, `product_name`, `price`) VALUES (8, 'Veggie Verde', 16500);
INSERT INTO `delilah`.`product` (`id_product`, `product_name`, `price`) VALUES (9, 'Pizza Tradicional', 17500);
INSERT INTO `delilah`.`product` (`id_product`, `product_name`, `price`) VALUES (10, 'Agua Mineral', 18500);
INSERT INTO `delilah`.`product` (`id_product`, `product_name`, `price`) VALUES (11, 'Sandwich Queso', 19500);

COMMIT;


-- -----------------------------------------------------
-- Data for table `delilah`.`payment`
-- -----------------------------------------------------
START TRANSACTION;
USE `delilah`;
INSERT INTO `delilah`.`payment` (`id_payment`, `method`) VALUES (1, 'EFECTIVO');
INSERT INTO `delilah`.`payment` (`id_payment`, `method`) VALUES (2, 'TARJETA');
INSERT INTO `delilah`.`payment` (`id_payment`, `method`) VALUES (3, 'TRANSFERENCIA');

COMMIT;


-- -----------------------------------------------------
-- Data for table `delilah`.`order_state`
-- -----------------------------------------------------
START TRANSACTION;
USE `delilah`;
INSERT INTO `delilah`.`order_state` (`id_state`, `order_state`) VALUES (1, 'NUEVO');
INSERT INTO `delilah`.`order_state` (`id_state`, `order_state`) VALUES (2, 'CONFIRMADO');
INSERT INTO `delilah`.`order_state` (`id_state`, `order_state`) VALUES (3, 'PREPARANDO');
INSERT INTO `delilah`.`order_state` (`id_state`, `order_state`) VALUES (4, 'ENVIADO');
INSERT INTO `delilah`.`order_state` (`id_state`, `order_state`) VALUES (5, 'ENTREGADO');
INSERT INTO `delilah`.`order_state` (`id_state`, `order_state`) VALUES (6, 'CANCELADO');

COMMIT;


-- -----------------------------------------------------
-- Data for table `delilah`.`favorite`
-- -----------------------------------------------------
START TRANSACTION;
USE `delilah`;
INSERT INTO `delilah`.`favorite` (`id_favorite`, `id_product`, `id_user`) VALUES (1, 3, 2);

COMMIT;

