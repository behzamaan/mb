package ir.mb.demo.security.rest;

import ir.mb.demo.base.*;
import ir.mb.demo.security.entity.UserEntity;
import ir.mb.demo.security.model.User;
import ir.mb.demo.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserRest extends BaseRest<UserEntity> {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/")
    @PreAuthorize("hasAuthority('READ')")
    public List<UserEntity> findAll() {
        List<UserEntity> all=new ArrayList<>();
        userRepository.findAll().forEach(c->{
            c.setRoles(null);
            c.setPassword(null);
            all.add(c);
        });
        return  all;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('READ')")
    public List<UserEntity> search(@RequestParam(value = "search") String search) {
        List<UserEntity> list = new ArrayList<>();
        userRepository.findAll(getSpecification(search)).forEach(e->{
            UserEntity entity= (UserEntity) e;
            entity.setRoles(null);
            list.add(entity);
        });
        return list;
    }


    @PreAuthorize("hasAuthority('READ')")
    @GetMapping("/{id}")
    public UserEntity findById(@PathVariable Long id) {
        Optional<UserEntity> userEntity = userRepository.findById(id);
        UserEntity userEntity1 = userEntity.get();
        userEntity1.setRoles(null);
        userEntity1.setPassword(null);
        return userEntity1;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('WRITE')")
    public UserEntity save(@Valid @RequestBody UserEntity entity) {
        return userRepository.save(entity);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DELETE')")
    public void deleteById(@PathVariable Long id) {
         userRepository.deleteById(id);
    }





}
