using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.Domain.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }         
        public string Description { get; set; }  
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }     
        public int StockQuantity { get; set; }   

        public int CategoryId { get; set; }
        public Category Category { get; set; }

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
