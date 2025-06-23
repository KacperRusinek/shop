using Shop.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Interfaces
{
    public interface IReviewService
    {
        Task<ReviewDto> CreateAsync(ReviewDto dto);
        Task<List<ReviewDto>> GetByProductIdAsync(int productId);


    }
}
