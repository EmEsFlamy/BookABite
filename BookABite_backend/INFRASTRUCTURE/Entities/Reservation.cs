
namespace INFRASTRUCTURE.Entities
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

        public int TableId { get; set; }

        public Table Table { get; set; } = null!;
    }
}
