using DOMAIN.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Entities;

public class Order
{
    public int Id { get; set; }

    public decimal FullPrice { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
    public DateTime Time { get; set; }
    public OrderStatus OrderStatus { get; set; }

    public ICollection<MenuOrder> OrdersMenu { get; set; }

    
}
