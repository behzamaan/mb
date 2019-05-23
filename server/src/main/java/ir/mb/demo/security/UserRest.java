package ir.mb.demo.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserRest {
    @Autowired
    UserRepository userRepository;

    @GetMapping("/")
    public List<UserEntity> findAll() {
        List<UserEntity> all=new ArrayList<>();
        userRepository.findAll().forEach(c->{
            c.setRoles(null);
            c.setPassword(null);
            all.add(c);
        });
        return  all;
    }

    @GetMapping("/{id}")
    public UserEntity findById(@PathVariable Long id) {
        Optional<UserEntity> userEntity = userRepository.findById(id);
        UserEntity userEntity1 = userEntity.get();
        userEntity1.setRoles(null);
        userEntity1.setPassword(null);


        return userEntity1;
    }

    @PostMapping
    public UserEntity save(@RequestBody UserEntity entity) {
        return userRepository.save(entity);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
         userRepository.deleteById(id);
    }





}
