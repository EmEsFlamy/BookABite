using DOMAIN.Enums;


namespace DOMAIN.Entities;

public class User
{   
    public string Id { get; set; }

    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public byte[] Password { get; set; }

    public UserTypeEnum UserType { get; set; }

}
