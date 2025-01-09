using DOMAIN.Enums;

namespace DOMAIN.Models;

public class Order
{
    public int Id { get; set; }
    public decimal FullPrice { get; set; }
    public int TableId { get; set; }
    public int UserId { get; set; }
    public List<int> MenuIds { get; set; }
    public OrderStatusEnum OrderStatus { get; set; }
}
