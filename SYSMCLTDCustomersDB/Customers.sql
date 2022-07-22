CREATE TABLE [dbo].[Customers]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [IsDeleted] BIT NOT NULL DEFAULT 0, 
    [Created] DATETIME NOT NULL DEFAULT GETDATE(), 
    [Name] NVARCHAR(50) NOT NULL, 
    [CustomerNumber] INT NOT NULL 
)
