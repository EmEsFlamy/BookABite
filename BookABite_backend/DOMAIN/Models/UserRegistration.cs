﻿
using DOMAIN.Enums;

namespace DOMAIN.Models;

public record UserRegistration(string Name, string Surname, string Email, string Password, UserTypeEnum UserType);

