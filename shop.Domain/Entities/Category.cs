using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.Domain.Entities
{
    public class Category : BaseEntity
    {
        public int Id { get; set; }
        public string Name { get; private set; } 

        public ICollection<Product> Products { get; private set; }

        private Category() { }

        public Category(string name)
        {
            Name = name;
            Products = new List<Product>();
        }
    }
}
