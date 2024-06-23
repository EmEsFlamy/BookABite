


namespace INFRASTRUCTURE.Entities;

public class MenuOrder
{
    public int Id { get; set; }
    public int TableId { get; set; }
    public Table Table { get; set; } = null!;
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;
    public int MenuId { get; set; }
    public Menu Menu { get; set; } = null!;

}
