using INFRASTRUCTURE.Enums;
using System.ComponentModel.DataAnnotations.Schema;


namespace INFRASTRUCTURE.Entities;

public class Order
{
    public int Id { get; set; }
    public decimal FullPrice { get; set; }
    public DateTime TimeStart { get; set; }
    public DateTime TimeEnd { get; set; }
    public OrderStatusEnum OrderStatus { get; set; }
    public ICollection<MenuOrder> OrdersMenu { get; set; }


}
