

using INFRASTRUCTURE.Enums;

namespace INFRASTRUCTURE.Entities;

public class Menu
{
    public int Id { get; set; }

    public string FoodName { get; set; }

    public decimal Price { get; set; }

    public ICollection<MenuOrder> Order { get; } = new List<MenuOrder>();

    public FoodTypeEnum FoodType { get; set; }
}
