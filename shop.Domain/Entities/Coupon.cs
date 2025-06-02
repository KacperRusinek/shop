using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace shop.Domain.Entities
{
    public class Coupon : BaseEntity
    {
        public string Code { get; private set; }
        public decimal DiscountValue { get; private set; } // np. 10 zł lub 10%
        public bool IsPercentage { get; private set; } // true = %, false = zł

        public DateTime ExpiryDate { get; private set; }

        private Coupon() { }

        public Coupon(string code, decimal discountValue, bool isPercentage, DateTime expiryDate)
        {
            Code = code;
            DiscountValue = discountValue;
            IsPercentage = isPercentage;
            ExpiryDate = expiryDate;
        }

        public bool IsValid() => DateTime.UtcNow <= ExpiryDate;
    }
}

