package ir.mb.demo;

import ir.mb.demo.security.entity.Role;
import ir.mb.demo.security.entity.UserEntity;
import ir.mb.demo.security.repository.RoleRepository;
import ir.mb.demo.security.repository.UserRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.transaction.Transactional;
import java.util.Collections;


@SpringBootApplication
public class DemoApplication implements ApplicationRunner {

    Log log= LogFactory.getLog(getClass());

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    public DemoApplication(RoleRepository roleRepository,UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }



    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
//        createUserIfNotFound();
    }
    @Transactional
    void createUserIfNotFound() {
        UserEntity adminUser = userRepository.findByUsername("admin");
        if (adminUser == null) {
            UserEntity user = new UserEntity("admin","admin","admin","admin@admin.com",
                    encoder.encode("admin"),true,true,
                    Collections.singleton(createRoleIfNotFound("ROLE_ADMIN")));
            userRepository.save(user);
            log.info("create admin user ");
        }
    }

    @Transactional
    Role createRoleIfNotFound(
            String name) {

        Role role = roleRepository.findByName(name);
        if (role == null) {
            role = new Role(name);
            roleRepository.save(role);
        }
        return role;
    }
}

