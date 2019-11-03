package ir.mb.demo.security.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Collection;
@Data
@NoArgsConstructor
@ToString
@Entity
@Table(name = "sec_user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull(message = " نام کاربری ")
    @Column(unique = true)
    private String username;
    @NotNull(message = " نام  ")
    private String firstName;
    @NotNull(message = " فامیلی ")
    private String lastName;
    @Email(message = " ایمیل ")
    private String email;
    @NotNull(message = " رمز")
    private String password;
    private boolean enabled;
    private boolean tokenExpired;



    public UserEntity(String username, String firstName, String lastName, String email,
                      String password, boolean enabled, boolean tokenExpired, Collection<Role> roles) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.enabled = enabled;
        this.tokenExpired = tokenExpired;
        this.roles = roles;
    }
//    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles;
}
