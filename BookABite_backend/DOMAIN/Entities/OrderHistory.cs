using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Entities;

public class OrderHistory
{
    public int Id { get; set; }

    public DateTime Time { get; set; }
    public decimal FullPrice { get; set; }
}
