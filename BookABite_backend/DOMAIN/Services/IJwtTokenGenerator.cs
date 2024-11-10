﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Services
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(int userId, string username);
    }
}
