using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.Domain.Entities
{
    public class Order : BaseEntity
    {
        public DateTime CreatedAt { get; private set; }
        public decimal TotalPrice => OrderItems.Sum(item => item.TotalPrice);

        public string CustomerEmail { get; private set; }
        public string ShippingAddress { get; private set; }

        public List<OrderItem> OrderItems { get; private set; }

        private Order() { }

        public Order(string customerEmail, string shippingAddress, List<OrderItem> items)
        {
            CreatedAt = DateTime.UtcNow;
            CustomerEmail = customerEmail;
            ShippingAddress = shippingAddress;
            OrderItems = items ?? new List<OrderItem>();
        }
    }

}
