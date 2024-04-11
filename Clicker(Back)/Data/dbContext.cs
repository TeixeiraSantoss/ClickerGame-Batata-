using Clicker_Back_.Models;
using Microsoft.EntityFrameworkCore;

namespace Clicker_Back_.Data
{
    public class dbContext: DbContext
    {
        
        public dbContext(DbContextOptions<dbContext> options) : base(options) {}
        
        //Nesse trecho, é feito a referencia do meu Modelo "Batata", a uma tabela que se terá o nome "Batatas"
        public DbSet<Batata> Batatas { get; set; }
        public DbSet<Upgrade> Upgrades { get; set; }
    }
}