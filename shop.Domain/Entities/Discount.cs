using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.Domain.Entities
{
    public class Discount : BaseEntity
    {
        public string Name { get; private set; }
        public decimal Value { get; private set; }
        public bool IsPercentage { get; private set; }
        public DateTime? StartDate { get; private set; }
        public DateTime? EndDate { get; private set; }

        public ICollection<Product> Products { get; private set; }

        private Discount() { }

        public Discount(string name, decimal value, bool isPercentage, DateTime? start, DateTime? end)
        {
            Name = name;
            Value = value;
            IsPercentage = isPercentage;
            StartDate = start;
            EndDate = end;
            Products = new List<Product>();
        }

        public bool IsActive() =>
            (!StartDate.HasValue || StartDate.Value <= DateTime.UtcNow) &&
            (!EndDate.HasValue || EndDate.Value >= DateTime.UtcNow);
    }

}
