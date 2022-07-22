﻿/*
Deployment script for SYSMCLTDCustomersDB

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "SYSMCLTDCustomersDB"
:setvar DefaultFilePrefix "SYSMCLTDCustomersDB"
:setvar DefaultDataPath "C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\"
:setvar DefaultLogPath "C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\"

GO
:on error exit
GO
/*
Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
To re-enable the script after enabling SQLCMD mode, execute the following:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO
/*
The type for column CustomerNumber in table [dbo].[Customers] is currently  NUMERIC (18) NOT NULL but is being changed to  INT NOT NULL. Data loss could occur and deployment may fail if the column contains data that is incompatible with type  INT NOT NULL.
*/

IF EXISTS (select top 1 1 from [dbo].[Customers])
    RAISERROR (N'Rows were detected. The schema update is terminating because data loss might occur.', 16, 127) WITH NOWAIT

GO
PRINT N'Altering Table [dbo].[Customers]...';


GO
ALTER TABLE [dbo].[Customers] ALTER COLUMN [CustomerNumber] INT NOT NULL;


GO
PRINT N'Creating Table [dbo].[Addresses]...';


GO
CREATE TABLE [dbo].[Addresses] (
    [Id]         INT           NOT NULL,
    [IsDeleted]  BIT           NOT NULL,
    [Created]    DATETIME      NOT NULL,
    [City]       NVARCHAR (50) NOT NULL,
    [Street]     NVARCHAR (50) NOT NULL,
    [CustomerId] INT           NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[Addresses]...';


GO
ALTER TABLE [dbo].[Addresses]
    ADD DEFAULT GETDATE() FOR [Created];


GO
PRINT N'Creating Foreign Key [dbo].[FK_Addresses_ToCustomers]...';


GO
ALTER TABLE [dbo].[Addresses] WITH NOCHECK
    ADD CONSTRAINT [FK_Addresses_ToCustomers] FOREIGN KEY ([CustomerId]) REFERENCES [dbo].[Customers] ([Id]);


GO
PRINT N'Checking existing data against newly created constraints';


GO
USE [$(DatabaseName)];


GO
ALTER TABLE [dbo].[Addresses] WITH CHECK CHECK CONSTRAINT [FK_Addresses_ToCustomers];


GO
PRINT N'Update complete.';


GO