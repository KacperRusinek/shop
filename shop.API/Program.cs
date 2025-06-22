using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using shop.Domain.Entities;
using shop.Persistence; // poprawnie
using Shop.Application.Interfaces; // poprawnie
using Shop.Application.Services;  // poprawnie

var builder = WebApplication.CreateBuilder(args);

// Rejestracja us³ug
builder.Services.AddScoped<IProductService, ProductService>();

// Rejestracja DbContext z PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Kontrolery i Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Shop API", Version = "v1" });
});

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Shop API v1");
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
