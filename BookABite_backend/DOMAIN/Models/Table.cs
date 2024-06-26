﻿using DOMAIN.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Models
{
    public class Table
    {
        public int Id { get; set; }
        public int Seats { get; set; }
        public TableStatusEnum TableStatus { get; set; }
    }
}
