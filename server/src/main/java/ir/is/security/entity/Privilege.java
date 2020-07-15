package ir.is.security.entity;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@Entity
@Data
@RequiredArgsConstructor
@ToString
public class Privilege {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String name;

    @ManyToMany(mappedBy = "privileges")
    private Collection<Role> roles;

    @ManyToMany(mappedBy = "privileges")
    private Collection<Division> divisions;

    public Privilege(@NotNull String name) {
        this.name = name;
    }
}

