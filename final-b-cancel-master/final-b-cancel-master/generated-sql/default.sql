
# This is a fix for InnoDB in MySQL >= 4.1.x
# It "suspends judgement" for fkey relationships until are tables are set.
SET FOREIGN_KEY_CHECKS = 0;

-- ---------------------------------------------------------------------
-- enemy
-- ---------------------------------------------------------------------

DROP TABLE IF EXISTS `enemy`;

CREATE TABLE `enemy`
(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `priority` INTEGER DEFAULT 3 NOT NULL,
    `username` VARCHAR(64) NOT NULL,
    `justification` VARCHAR(1024),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

# This restores the fkey checks, after having unset them earlier
SET FOREIGN_KEY_CHECKS = 1;
