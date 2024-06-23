using INFRASTRUCTURE.Enums;


namespace INFRASTRUCTURE.Entities;

public class Table
{   
    public int Id { get; set; }
    public int Seats { get; set; }
    public TableStatusEnum TableStatus { get; set; }
    public MenuOrder? MenuOrder { get; set; }

    public ICollection<Reservation> Reservations { get; set; }
}
