package ir.mb.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "users")
public class UserRest {
    @Autowired
    UserRepository userRepository;

    @GetMapping("/")
    public List<UserEntity> users() {
        List<UserEntity> all=new ArrayList<>();
        userRepository.findAll().forEach(c->{
            c.setRoles(null);
            c.setPassword(null);
            all.add(c);
        });
        return  all;
    }

    @GetMapping("/{id}")
    public UserEntity getUser(@PathVariable Long id) {
        Optional<UserEntity> userEntity = userRepository.findById(id);
        UserEntity userEntity1 = userEntity.get();
        userEntity1.setRoles(null);
        userEntity1.setPassword(null);


        return userEntity1;
    }


    public UserEntity save(@RequestBody UserEntity entity) {
        return userRepository.save(entity);
    }

    @DeleteMapping("/{id}")
    public void remove(@PathVariable Long id) {
         userRepository.deleteById(id);
    }





}
