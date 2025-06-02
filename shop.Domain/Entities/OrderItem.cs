using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.Domain.Entities
{
    public class OrderItem : BaseEntity
    {
        public int ProductId { get; private set; }
        public Product Product { get; private set; }

        public int Quantity { get; private set; }
        public decimal UnitPrice { get; private set; }

        public decimal TotalPrice => UnitPrice * Quantity;

        private OrderItem() { }

        public OrderItem(int productId, decimal unitPrice, int quantity)
        {
            ProductId = productId;
            UnitPrice = unitPrice;
            Quantity = quantity;
        }
    }

}
