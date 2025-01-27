using DOMAIN.Enums;


namespace DOMAIN.Models;

public record UserUpdate(int UserId, string Name, string Surname, string Username, UserTypeEnum UserType);
