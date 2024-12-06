
using DOMAIN.Enums;

namespace DOMAIN.Models;

public record UserRegistration(string Name, string Surname, string Username, string Password, UserTypeEnum UserType);

