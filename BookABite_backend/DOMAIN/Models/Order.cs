using DOMAIN.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Models
{
    public class Order
    {
        public int Id { get; set; }

        public decimal FullPrice { get; set; }

        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }

        public OrderStatusEnum OrderStatus { get; set; }
    }
}
