package ir.mb.demo.security;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Collection;
@Data
@Entity
@Table(name = "sec_user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Min(6)
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    @NotNull
    private String password;
    private boolean enabled;
    private boolean tokenExpired;

    public UserEntity() {
    }

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

    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles;
}
