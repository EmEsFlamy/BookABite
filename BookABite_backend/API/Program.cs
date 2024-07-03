using API.GlobalExceptionHandlers;
using APPLICATION;
using INFRASTRUCTURE;
using INFRASTRUCTURE.Database;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddApplication();
builder.Services.AddControllers();



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<BookABiteDbContext>();
    db.Database.Migrate();
}

app.UseExceptionHandler(opt => { });

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
