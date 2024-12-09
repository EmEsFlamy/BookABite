using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Models
{
    public class Reservation
    {
        public int Id { get; set; }

        public DateTime ReservationStart { get; set; }
        public DateTime ReservationEnd { get; set; }

        public bool IsActive { get; set; }

        public bool IsCompleted { get; set; }

        public string ClientName { get; set; }

        public string ClientSurname { get; set; }

        public string ClientPhoneNumber { get; set; }

        public int TableId { get; set; } = -1;
    }
}
