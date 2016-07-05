namespace NFKTest.Migrations
{
    using NFKTest.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<NFKTest.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(NFKTest.Models.ApplicationDbContext context)
        {
            var vendor1 = new Vendor { INN = "123456789012", Name = "ИП Альфа" };
            var vendor2 = new Vendor { INN = "12345678", Name = "AО Бета" };

            context.Vendors.AddOrUpdate(
              p => p.Name, vendor1, vendor2
            );

            context.Supplies.AddOrUpdate(
          s => s.Number, new Supply { Number = "П0001", Currency = "810", Total = 40000, Vendor = vendor1 },
          new Supply { Number = "П0002", Currency = "840", Total = 1200, Vendor = vendor1 },
           new Supply { Number = "П0003", Currency = "810", Total = 1000, Vendor = vendor1 },
            new Supply { Number = "i1-1", Currency = "810", Total = 23000, Vendor = vendor2 },
             new Supply { Number = "i1-2", Currency = "840", Total = 890, Vendor = vendor2 }
        );
            context.SaveChanges();
        }
    }
}
