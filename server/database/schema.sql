SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Portfolio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Portfolio` DEFAULT CHARACTER SET utf8 ;
USE `Portfolio` ;

-- -----------------------------------------------------
-- Table `Portfolio`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Portfolio`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `is_admin` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Portfolio`.`Project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Portfolio`.`Project` (
  `idProject` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `image` TEXT NOT NULL,
  `repoGitHub` VARCHAR(255) NULL,
  `projectLink` VARCHAR(255) NULL,
  `user_iduser` INT NOT NULL,
  PRIMARY KEY (`idProject`, `user_iduser`),
  INDEX `fk_Project_user_idx` (`user_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_Project_user`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `Portfolio`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Portfolio`.`Stack`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Portfolio`.`Stack` (
  `idStack` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `icon` TEXT NOT NULL, 
  PRIMARY KEY (`idStack`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Portfolio`.`Project_Stack`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Portfolio`.`Project_Stack` (
  `idProject` INT NOT NULL,
  `idStack` INT NOT NULL,
  PRIMARY KEY (`idProject`, `idStack`),
  INDEX `fk_Project_Stack_Project_idx` (`idProject` ASC) VISIBLE,
  INDEX `fk_Project_Stack_Stack_idx` (`idStack` ASC) VISIBLE,
  CONSTRAINT `fk_Project_Stack_Project`
    FOREIGN KEY (`idProject`)
    REFERENCES `Portfolio`.`Project` (`idProject`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Project_Stack_Stack`
    FOREIGN KEY (`idStack`)
    REFERENCES `Portfolio`.`Stack` (`idStack`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
