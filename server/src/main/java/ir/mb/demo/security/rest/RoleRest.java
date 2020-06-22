package ir.mb.demo.security.rest;

import ir.mb.demo.base.BaseRest;
import ir.mb.demo.security.entity.Role;
import ir.mb.demo.security.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("roles")
@RequiredArgsConstructor
public class RoleRest extends BaseRest<Role> {

    @Autowired
    RoleRepository roleRepository;

    @GetMapping("/")
    public List<Role> findAll() {
        List<Role> all=new ArrayList<>();
        roleRepository.findAll().forEach(role->{
            role.setUsers(null);
            role.setPrivileges(null);
            all.add(role);
        });
        return  all;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('READ')")
    public List<Role> search(@RequestParam(value = "search") String search) {
        List<Role> list = new ArrayList<>();
        roleRepository.findAll(getSpecification(search)).forEach(e->{
            Role entity= (Role) e;
            entity.setPrivileges(null);
            entity.setUsers(null);
            list.add(entity);
        });
        return list;
    }

    @GetMapping("/{id}")
//    @Secured("READ")
    public Role findById(@PathVariable Long id) {
        Optional<Role> role = roleRepository.findById(id);
        Role r = role.get();
        r.setUsers(null);
        r.getPrivileges().forEach(e-> e.setRoles(null));
        return r;
    }

    @PostMapping
    public Role save(@RequestBody Role role) {

        return roleRepository.save(role);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        roleRepository.deleteById(id);
    }

}
