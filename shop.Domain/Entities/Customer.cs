using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.Domain.Entities
{
    public class Customer : BaseEntity
    {
        public string Email { get; private set; }
        public string FullName { get; private set; }

        public ICollection<Order> Orders { get; private set; } = new List<Order>();
        public ICollection<Review> Reviews { get; private set; } = new List<Review>();
        public ICollection<WishlistItem> Wishlist { get; private set; } = new List<WishlistItem>();

        private Customer() { }

        public Customer(string email, string fullName)
        {
            Email = email;
            FullName = fullName;
        }
    }

}
