-- Teachers Table
CREATE TABLE `artfrog`.`teachers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `bio` TEXT NULL,
  PRIMARY KEY (`id`));
   
-- Classes Table
CREATE TABLE `artfrog`.`classes` (
  `class_id` INT NOT NULL AUTO_INCREMENT,
  `class_name` VARCHAR(90) NULL,
  `class_time` DATETIME NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`class_id`));

-- Students Table
CREATE TABLE `artfrog`.`students` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `guardian_first_name` VARCHAR(45) NULL,
  `guardian_last_name` VARCHAR(45) NULL,
  `student_DOB` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `zip` VARCHAR(45) NULL,
  `alt_first_name` VARCHAR(45) NULL,
  `alt_last_name` VARCHAR(45) NULL,
  `alt_phone` VARCHAR(45) NULL,
  `photo_permission` TINYINT(1) NULL,
  `class_id` INT NULL,
  PRIMARY KEY (`id`));
