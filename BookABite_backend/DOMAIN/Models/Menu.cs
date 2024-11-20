using DOMAIN.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Models
{
    public class Menu
    {
        public int Id { get; set; }

        public string FoodName { get; set; }

        public decimal Price { get; set; }

        public FoodTypeEnum FoodType { get; set; }
    }
}
