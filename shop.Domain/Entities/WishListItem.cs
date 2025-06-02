using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.Domain.Entities
{
    //chyba ulubione
    public class WishlistItem : BaseEntity
    {
        public int CustomerId { get; private set; }
        public Customer Customer { get; private set; }

        public int ProductId { get; private set; }
        public Product Product { get; private set; }

        private WishlistItem() { }

        public WishlistItem(int customerId, int productId)
        {
            CustomerId = customerId;
            ProductId = productId;
        }
    }

}
