using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.DTOs;

public class ReservationDto
{
    public DateTime ReservationStart { get; set; }
    public DateTime ReservationEnd { get; set; }
    public int TableId { get; set; }
}


