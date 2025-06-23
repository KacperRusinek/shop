using Microsoft.EntityFrameworkCore;
using shop.Domain.Entities;
using Shop.Application.DTOs;
using Shop.Application.Interfaces;

namespace shop.Services
{
    public class ReviewService : IReviewService
    {
        private readonly AppDbContext _context;

        public ReviewService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ReviewDto> CreateAsync(ReviewDto dto)
        {
            var review = new Review(dto.CustomerId, dto.ProductId, dto.Rating, dto.Comment);
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return new ReviewDto
            {
                Id = review.Id,
                CustomerId = review.CustomerId,
                ProductId = review.ProductId,
                Rating = review.Rating,
                Comment = review.Comment,
                CreatedAt = review.CreatedAt
            };
        }
        public async Task<List<ReviewDto>> GetByProductIdAsync(int productId)
        {
            var reviews = await _context.Reviews
                .Where(r => r.ProductId == productId)
                .Select(r => new ReviewDto
                {
                    Id = r.Id,
                    CustomerId = r.CustomerId,
                    ProductId = r.ProductId,
                    Rating = r.Rating,
                    Comment = r.Comment,
                    CreatedAt = r.CreatedAt
                }).ToListAsync();

            return reviews;
        }

    }
}
