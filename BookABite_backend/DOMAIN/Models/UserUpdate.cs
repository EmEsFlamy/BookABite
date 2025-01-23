using DOMAIN.Enums;


namespace DOMAIN.Models;

public record UserUpdate(string Name, string Surname, string Username, UserTypeEnum UserType);
