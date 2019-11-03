package ir.mb.demo.security.entity;



import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;
@Data
@ToString
@Entity
@Table(name = "sec_role")
public class Role {

    public Role() {
    }

    public Role(String name) {
        this.name = name;
    }

    public Role(String name, Collection<UserEntity> users) {
        this.name = name;
        this.users = users;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "roles")
    private Collection<UserEntity> users;


    @ManyToMany
    @JoinTable(
            name = "roles_privileges",
            joinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "privilege_id", referencedColumnName = "id"))
    private Collection<Privilege> privileges;


}
