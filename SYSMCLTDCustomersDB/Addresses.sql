CREATE TABLE [dbo].[Addresses]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [IsDeleted] BIT NOT NULL DEFAULT 0, 
    [Created] DATETIME NOT NULL DEFAULT  GETDATE(), 
    [City] NVARCHAR(50) NOT NULL, 
    [Street] NVARCHAR(50) NOT NULL, 
    [CustomerId] INT NOT NULL, 
    CONSTRAINT [FK_Addresses_ToCustomers] FOREIGN KEY ([CustomerId]) REFERENCES [Customers]([ID]) 
)
