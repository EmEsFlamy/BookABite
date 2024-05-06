using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Entities;

public class Order
{
    public int Id { get; set; }

    public decimal FullPrice { get; set; }

    public ICollection<MenuOrder> OrdersMenu { get; set; }

    
}
