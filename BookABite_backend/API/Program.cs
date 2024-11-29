using API.GlobalExceptionHandlers;
using APPLICATION;
using INFRASTRUCTURE;
using INFRASTRUCTURE.Database;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddCustomServices();
builder.Services.AddAuth(builder.Configuration);
builder.Services.AddApplication();
builder.Services.AddControllers();
builder.Host.UseSerilog((ctx, conf) =>
{
    conf.ReadFrom.Configuration(ctx.Configuration);
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(b =>
    {
        b
        .WithOrigins(builder.Configuration["CorsSettings:DefaultOrigin"]!)
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});


var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();


app.ApplyMigrations();    

app.UseExceptionHandler(opt => { });

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.UseCors();

app.Run();
