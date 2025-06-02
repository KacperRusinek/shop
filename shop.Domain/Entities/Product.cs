using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.Domain.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; private set; }         
        public string Description { get; private set; }  
        public decimal Price { get; private set; }
        public string ImageUrl { get; private set; }     
        public int StockQuantity { get; private set; }   

        public int CategoryId { get; private set; }
        public Category Category { get; private set; }

        private Product() { }

        public Product(string name, string description, decimal price, string imageUrl, int stockQuantity, int categoryId)
        {
            Name = name;
            Description = description;
            Price = price;
            ImageUrl = imageUrl;
            StockQuantity = stockQuantity;
            CategoryId = categoryId;
        }
    }

}
