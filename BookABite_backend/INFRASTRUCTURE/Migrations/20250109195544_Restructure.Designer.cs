﻿// <auto-generated />
using System;
using INFRASTRUCTURE.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace INFRASTRUCTURE.Migrations
{
    [DbContext(typeof(BookABiteDbContext))]
    [Migration("20250109195544_Restructure")]
    partial class Restructure
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("INFRASTRUCTURE.Entities.Menu", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("FoodName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("FoodType")
                        .HasColumnType("integer");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric");

                    b.HasKey("Id");

                    b.ToTable("Menus");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            FoodName = "Mozzarella Sticks",
                            FoodType = 0,
                            Price = 6.99m
                        },
                        new
                        {
                            Id = 2,
                            FoodName = "Garlic Bread",
                            FoodType = 0,
                            Price = 4.99m
                        },
                        new
                        {
                            Id = 3,
                            FoodName = "Chicken Wings",
                            FoodType = 0,
                            Price = 7.99m
                        },
                        new
                        {
                            Id = 4,
                            FoodName = "Cheese Nachos",
                            FoodType = 0,
                            Price = 5.99m
                        },
                        new
                        {
                            Id = 5,
                            FoodName = "Loaded Potato Skins",
                            FoodType = 0,
                            Price = 6.50m
                        },
                        new
                        {
                            Id = 6,
                            FoodName = "Spring Rolls",
                            FoodType = 0,
                            Price = 4.99m
                        },
                        new
                        {
                            Id = 7,
                            FoodName = "Stuffed Mushrooms",
                            FoodType = 0,
                            Price = 6.99m
                        },
                        new
                        {
                            Id = 8,
                            FoodName = "Buffalo Cauliflower",
                            FoodType = 0,
                            Price = 5.50m
                        },
                        new
                        {
                            Id = 9,
                            FoodName = "Mini Tacos",
                            FoodType = 0,
                            Price = 5.99m
                        },
                        new
                        {
                            Id = 10,
                            FoodName = "Tomato Basil Soup",
                            FoodType = 2,
                            Price = 4.50m
                        },
                        new
                        {
                            Id = 11,
                            FoodName = "Chicken Noodle Soup",
                            FoodType = 2,
                            Price = 5.50m
                        },
                        new
                        {
                            Id = 12,
                            FoodName = "Minestrone Soup",
                            FoodType = 2,
                            Price = 4.75m
                        },
                        new
                        {
                            Id = 13,
                            FoodName = "French Onion Soup",
                            FoodType = 2,
                            Price = 5.25m
                        },
                        new
                        {
                            Id = 14,
                            FoodName = "Cream of Mushroom Soup",
                            FoodType = 2,
                            Price = 4.99m
                        },
                        new
                        {
                            Id = 15,
                            FoodName = "Lentil Soup",
                            FoodType = 2,
                            Price = 4.50m
                        },
                        new
                        {
                            Id = 16,
                            FoodName = "Clam Chowder",
                            FoodType = 2,
                            Price = 6.25m
                        },
                        new
                        {
                            Id = 17,
                            FoodName = "Grilled Salmon",
                            FoodType = 3,
                            Price = 15.99m
                        },
                        new
                        {
                            Id = 18,
                            FoodName = "Steak and Fries",
                            FoodType = 3,
                            Price = 19.99m
                        },
                        new
                        {
                            Id = 19,
                            FoodName = "Pasta Primavera",
                            FoodType = 3,
                            Price = 12.99m
                        },
                        new
                        {
                            Id = 20,
                            FoodName = "BBQ Ribs",
                            FoodType = 3,
                            Price = 17.99m
                        },
                        new
                        {
                            Id = 21,
                            FoodName = "Chicken Alfredo",
                            FoodType = 3,
                            Price = 14.50m
                        },
                        new
                        {
                            Id = 22,
                            FoodName = "Vegetarian Pizza",
                            FoodType = 3,
                            Price = 10.99m
                        },
                        new
                        {
                            Id = 23,
                            FoodName = "Margherita Pizza",
                            FoodType = 3,
                            Price = 9.99m
                        },
                        new
                        {
                            Id = 24,
                            FoodName = "Cheeseburger",
                            FoodType = 3,
                            Price = 11.50m
                        },
                        new
                        {
                            Id = 25,
                            FoodName = "Beef Tacos",
                            FoodType = 3,
                            Price = 8.99m
                        },
                        new
                        {
                            Id = 26,
                            FoodName = "Mini Cheeseburger",
                            FoodType = 4,
                            Price = 5.99m
                        },
                        new
                        {
                            Id = 27,
                            FoodName = "Chicken Fingers",
                            FoodType = 4,
                            Price = 4.99m
                        },
                        new
                        {
                            Id = 28,
                            FoodName = "Grilled Cheese",
                            FoodType = 4,
                            Price = 3.99m
                        },
                        new
                        {
                            Id = 29,
                            FoodName = "Kids Pizza",
                            FoodType = 4,
                            Price = 4.99m
                        },
                        new
                        {
                            Id = 30,
                            FoodName = "Pasta with Butter",
                            FoodType = 4,
                            Price = 3.50m
                        },
                        new
                        {
                            Id = 31,
                            FoodName = "Mac and Cheese",
                            FoodType = 4,
                            Price = 4.25m
                        },
                        new
                        {
                            Id = 32,
                            FoodName = "Caesar Salad",
                            FoodType = 5,
                            Price = 7.99m
                        },
                        new
                        {
                            Id = 33,
                            FoodName = "Greek Salad",
                            FoodType = 5,
                            Price = 8.99m
                        },
                        new
                        {
                            Id = 34,
                            FoodName = "House Salad",
                            FoodType = 5,
                            Price = 6.50m
                        },
                        new
                        {
                            Id = 35,
                            FoodName = "Cobb Salad",
                            FoodType = 5,
                            Price = 9.99m
                        },
                        new
                        {
                            Id = 36,
                            FoodName = "Coke",
                            FoodType = 1,
                            Price = 1.99m
                        },
                        new
                        {
                            Id = 37,
                            FoodName = "Fresh Orange Juice",
                            FoodType = 1,
                            Price = 2.99m
                        },
                        new
                        {
                            Id = 38,
                            FoodName = "House Wine",
                            FoodType = 6,
                            Price = 5.99m
                        },
                        new
                        {
                            Id = 39,
                            FoodName = "Craft Beer",
                            FoodType = 6,
                            Price = 4.50m
                        });
                });

            modelBuilder.Entity("INFRASTRUCTURE.Entities.MenuOrder", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("MenuId")
                        .HasColumnType("integer");

                    b.Property<int>("OrderId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("MenuId");

                    b.HasIndex("OrderId");

                    b.ToTable("MenuOrders");
                });

            modelBuilder.Entity("INFRASTRUCTURE.Entities.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("FullPrice")
                        .HasColumnType("numeric");

                    b.Property<int>("OrderStatus")
                        .HasColumnType("integer");

                    b.Property<int>("TableId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TableId")
                        .IsUnique();

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("INFRASTRUCTURE.Entities.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClientName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ClientPhoneNumber")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ClientSurname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("ReservationEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("ReservationStart")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("TableId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TableId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("INFRASTRUCTURE.Entities.Table", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Seats")
                        .HasColumnType("integer");

                    b.Property<string>("TableStatus")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Tables");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 2,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 3,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 4,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 5,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 6,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 7,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 8,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 9,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 10,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 11,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 12,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 13,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 14,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 15,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 16,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 17,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 18,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 19,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 20,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 21,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 22,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 23,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 24,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 25,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 26,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 27,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 28,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 29,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 30,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 31,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 32,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 33,
                            Seats = 4,
                            TableStatus = "Available"
                        },
                        new
                        {
                            Id = 34,
                            Seats = 4,
                            TableStatus = "Available"
                        });
                });

            modelBuilder.Entity("INFRASTRUCTURE.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<byte[]>("Password")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserType")
                        .HasColumnType("integer");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Admin",
                            Password = new byte[] { 123, 161, 77, 1, 153, 169, 114, 171, 249, 121, 81, 100, 99, 216, 165, 188, 220, 183, 44, 143, 64, 212, 94, 44, 66, 46, 198, 132, 56, 124, 131, 120 },
                            PasswordSalt = new byte[] { 5, 149, 150, 187, 63, 134, 154, 174, 33, 68, 204, 23, 30, 17, 69, 119 },
                            Surname = "Admin",
                            UserType = 0,
                            Username = "admin"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Waiter",
                            Password = new byte[] { 173, 108, 95, 162, 254, 161, 120, 91, 28, 198, 182, 43, 115, 252, 144, 18, 77, 120, 72, 204, 31, 65, 124, 66, 185, 240, 78, 14, 141, 173, 204, 224 },
                            PasswordSalt = new byte[] { 161, 120, 236, 166, 87, 29, 148, 155, 105, 136, 74, 208, 162, 103, 199, 176 },
                            Surname = "Waiter",
                            UserType = 1,
                            Username = "waiter"
                        });
                });

            modelBuilder.Entity("INFRASTRUCTURE.Entities.MenuOrder", b =>
                {
                    b.HasOne("INFRASTRUCTURE.Entities.Menu", "Menu")
                        .WithMany("Order")
                        .HasForeignKey("MenuId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("INFRASTRUCTURE.Entities.Order", "Order")
                        .WithMany("OrdersMenu")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Menu");

                    b.Navigation("Order");
                });

            modelBuilder.Entity("INFRASTRUCTURE.Entities.Order", b =>
                {
                    b.HasOne("INFRASTRUCTURE.Entities.Table", "Table")
                        .WithOne("Order")
                        .HasForeignKey("INFRASTRUCTURE.Entities.Order", "TableId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("INFRASTRUCTURE.Entities.User", "User")
                        .WithOne("Order")
                        .HasForeignKey("INFRASTRUCTURE.Entities.Order", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Table");

                    b.Navigation("User");
                });

            modelBuilder.Entity("INFRASTRUCTURE.Entities.Reservation", b =>
                {
                    b.HasOne("INFRASTRUCTURE.Entities.Table", "Table")
                        .WithMany("Reservations")
                        .HasForeignKey("TableId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Table");
                });

            modelBuilder.Entity("INFRASTRUCTURE.Entities.Menu", b =>
                {
                    b.Navigation("Order");
                });

            modelBuilder.Entity("INFRASTRUCTURE.Entities.Order", b =>
                {
                    b.Navigation("OrdersMenu");
                });

            modelBuilder.Entity("INFRASTRUCTURE.Entities.Table", b =>
                {
                    b.Navigation("Order");

                    b.Navigation("Reservations");
                });

            modelBuilder.Entity("INFRASTRUCTURE.Entities.User", b =>
                {
                    b.Navigation("Order");
                });
#pragma warning restore 612, 618
        }
    }
}
