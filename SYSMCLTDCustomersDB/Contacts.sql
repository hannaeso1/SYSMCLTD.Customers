CREATE TABLE [dbo].[Contacts]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [IsDeleted] BIT NOT NULL DEFAULT 0, 
    [Created] DATETIME NOT NULL DEFAULT  GETDATE(), 
    [FullName] NVARCHAR(50) NOT NULL, 
    [OfficeNumber] NVARCHAR(18) NULL, 
    [Email] NVARCHAR(50) NULL, 
    [CustomerId] INT NOT NULL, 
    CONSTRAINT [FK_Contacts_ToCustomers] FOREIGN KEY ([CustomerId]) REFERENCES [Customers]([ID]), 
)
