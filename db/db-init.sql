USE lmg;

CREATE TABLE `meetingnotes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `StartDate` datetime NOT NULL,
  `ApprovedDate` datetime DEFAULT NULL,
  `Location` varchar(100) NOT NULL,
  `MembersPresent` varchar(200) DEFAULT NULL,
  `MembersAbsent` varchar(200) DEFAULT NULL,
  `TreasurersReport` varchar(4000) DEFAULT NULL,
  `SubmittedBy` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `id_UNIQUE` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `announcements` (
  `OrderKey` int(11) NOT NULL,
  `MeetingID` int(11) NOT NULL,
  `AnnouncedBy` varchar(45) NOT NULL,
  `Description` varchar(4000) NOT NULL,
  PRIMARY KEY (`OrderKey`,`MeetingID`),
  KEY `meetingnotes_announcements_fk_idx` (`MeetingID`),
  CONSTRAINT `meetingnotes_announcements_fk` FOREIGN KEY (`MeetingID`) REFERENCES `meetingnotes` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='			';

CREATE TABLE `motions` (
  `OrderKey` int(11) NOT NULL,
  `MeetingID` int(11) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Approved` tinyint(1) NOT NULL DEFAULT '0',
  `Dissented` varchar(100) DEFAULT NULL,
  `MotionedBy` varchar(45) NOT NULL,
  PRIMARY KEY (`MeetingID`,`OrderKey`),
  CONSTRAINT `meetingnotes_motions_fk` FOREIGN KEY (`MeetingID`) REFERENCES `meetingnotes` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
