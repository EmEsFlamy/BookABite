

namespace DOMAIN.Models;

public class MenuOrder
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;
    public int MenuId { get; set; }
    public Menu Menu { get; set; } = null!;
    public int Quantity { get; set; }

}
