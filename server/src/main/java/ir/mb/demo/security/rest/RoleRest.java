package ir.mb.demo.security.rest;

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
public class RoleRest {

    @Autowired
    RoleRepository roleRepository;

    @GetMapping("/")
    public List<Role> findAll() {
        List<Role> all=new ArrayList<>();
        roleRepository.findAll().forEach(role->{
            role.setUsers(null);
            all.add(role);
        });
        return  all;
    }

    @GetMapping("/{id}")
    @Secured("READ_PRIVILEGE")
    public Role findById(@PathVariable Long id) {
        Optional<Role> role = roleRepository.findById(id);
        Role r = role.get();
        r.setUsers(null);
        return r;
    }

    @PostMapping
    public Role save(@RequestBody Role entity) {
        return roleRepository.save(entity);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        roleRepository.deleteById(id);
    }

}
