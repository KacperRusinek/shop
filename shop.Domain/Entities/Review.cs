using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.Domain.Entities
{
    public class Review : BaseEntity
    {
        public int CustomerId { get; private set; }
        public Customer Customer { get; private set; }

        public int ProductId { get; private set; }
        public Product Product { get; private set; }

        [Range(1,5)]
        public int Rating { get; private set; } 
        public string Comment { get; private set; }

        public DateTime CreatedAt { get; private set; }

        private Review() { }

        public Review(int customerId, int productId, int rating, string comment)
        {
            CustomerId = customerId;
            ProductId = productId;
            Rating = rating;
            Comment = comment;
            CreatedAt = DateTime.UtcNow;
        }
    }

}
