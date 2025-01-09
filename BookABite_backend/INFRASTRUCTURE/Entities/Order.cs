using INFRASTRUCTURE.Enums;
using System.ComponentModel.DataAnnotations.Schema;


namespace INFRASTRUCTURE.Entities;

public class Order
{
    public int Id { get; set; }
    public decimal FullPrice { get; set; }
    public OrderStatusEnum OrderStatus { get; set; }
    public int TableId { get; set; }
    public Table Table { get; set; } = null!;
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public ICollection<MenuOrder> OrdersMenu { get; set; }

}
