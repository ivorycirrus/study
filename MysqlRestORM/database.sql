CREATE TABLE IF NOT EXISTS `rest`.`todo` (
  `todo_id` INT(70) NOT NULL AUTO_INCREMENT,
  `todo` VARCHAR(1000) NULL,
  `status` VARCHAR(10) NULL,
  `due` TIMESTAMP NULL,
  PRIMARY KEY (`todo_id`)
 );