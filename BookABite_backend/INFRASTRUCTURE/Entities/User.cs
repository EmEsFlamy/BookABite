using INFRASTRUCTURE.Enums;


namespace INFRASTRUCTURE.Entities;

public class User
{   
    public int Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Username { get; set; }
    public byte[] Password { get; set; }
    public byte[] PasswordSalt { get; set; }
    public UserTypeEnum UserType { get; set; }
    public MenuOrder? MenuOrder { get; set; }

}
