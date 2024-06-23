using INFRASTRUCTURE.Enums;
using System.ComponentModel.DataAnnotations.Schema;


namespace INFRASTRUCTURE.Entities;

public class Order
{
    public int Id { get; set; }

    public decimal FullPrice { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime Time { get; set; }
    public OrderStatus OrderStatus { get; set; }

    public ICollection<MenuOrder> OrdersMenu { get; set; }


}
