package ir.mb.demo.security;



import lombok.Data;

import javax.persistence.*;
import java.util.Collection;
@Data
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


}
