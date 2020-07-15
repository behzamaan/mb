package ir.is.security.rest;

import ir.is.base.*;
import ir.is.security.entity.UserEntity;
import ir.is.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserRest extends BaseRest<UserEntity> {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @GetMapping("/")
//    @PreAuthorize("hasAuthority('READ')")
    public List<UserEntity> findAll() {
        List<UserEntity> all=new ArrayList<>();
        userRepository.findAll().forEach(c->{
            c.getRoles().forEach(r->r.setUsers(null));
            c.getRoles().forEach(r->r.getPrivileges().forEach(privilege -> privilege.setRoles(null)));
            c.setPassword(null);
            all.add(c);
        });
        return  all;
    }

    @GetMapping
//    @PreAuthorize("hasAuthority('READ')")
    public List<UserEntity> search(@RequestParam(value = "search") String search) {
        List<UserEntity> list = new ArrayList<>();
        userRepository.findAll(getSpecification(search)).forEach(e->{
            UserEntity entity= (UserEntity) e;
            entity.getRoles().forEach(r->r.setUsers(null));
            list.add(entity);
        });
        return list;
    }


//    @PreAuthorize("hasAuthority('READ')")
    @GetMapping("/{id}")
    public UserEntity findById(@PathVariable Long id) {
        Optional<UserEntity> userEntity = userRepository.findById(id);
        UserEntity userEntity1 = userEntity.get();
        userEntity1.getRoles().forEach(r->{
            r.getPrivileges().forEach(p->p.setRoles(null));
            r.setUsers(null);
        });
        userEntity1.setPassword(null);
        return userEntity1;
    }

    @PostMapping
//    @PreAuthorize("hasAuthority('WRITE')")
    public UserEntity save(@RequestBody UserEntity entity) {
        if (entity.getPassword() !=null && !entity.getPassword().equals(""))
            entity.setPassword(encoder.encode(entity.getPassword()));
        return userRepository.save(entity);
    }

    @DeleteMapping("/{id}")
//    @PreAuthorize("hasAuthority('DELETE')")
    public void deleteById(@PathVariable Long id) {
         userRepository.deleteById(id);
    }





}
