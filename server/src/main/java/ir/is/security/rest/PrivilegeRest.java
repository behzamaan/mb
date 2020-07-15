package ir.is.security.rest;

import ir.is.base.BaseRest;
import ir.is.security.entity.Privilege;
import ir.is.security.repository.PrivilegeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("privileges")
public class PrivilegeRest extends BaseRest<Privilege> {

    private PrivilegeRepository privilegeRepository;

    public PrivilegeRest(PrivilegeRepository privilegeRepository) {
        this.privilegeRepository = privilegeRepository;
    }

    @GetMapping("/")
    public List<Privilege> findAll() {
        List<Privilege> list = privilegeRepository.findAll();
        list.forEach(e -> e.getRoles().forEach(s -> {
                    s.setPrivileges(null);
                    s.getUsers().forEach(f-> {
                        f.setRoles(null);
                        f.setPassword(null);
                    });
                }));
        return list;
    }

    @GetMapping
    public List<Privilege> search(@RequestParam(value = "search") String search) {
        List<Privilege>  list = privilegeRepository.findAll(getSpecification(search));
        list.forEach(e -> e.getRoles().forEach(s -> {
            s.setPrivileges(null);
            s.setUsers(null);
        }));
        return list;
    }

    @GetMapping("/{id}")
    public Privilege findById(@PathVariable Long id) {
        Optional<Privilege> role = privilegeRepository.findById(id);
        return role.orElse(null);
    }

    @PostMapping
    public Privilege save(@RequestBody Privilege entity) {
        return privilegeRepository.save(entity);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        privilegeRepository.deleteById(id);
    }

}
