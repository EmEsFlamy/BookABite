using API.BackgroundServices;
using API.GlobalExceptionHandlers;
using APPLICATION;
using INFRASTRUCTURE;
using INFRASTRUCTURE.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "jwtToken_Auth_API",
        Version = "v1"
    });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT in bearer format like bearer[space] token"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[]{ }
        }
    });
});

builder.Services.AddHostedService<SetTableStatusJob>();
builder.Services.AddHostedService<ResetTableStatusJob>();
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

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
