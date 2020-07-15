package ir.is;

import ir.is.security.entity.Role;
import ir.is.security.entity.UserEntity;
import ir.is.security.repository.RoleRepository;
import ir.is.security.repository.UserRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

import javax.transaction.Transactional;
import java.util.Collections;


@SpringBootApplication(scanBasePackages = "ir.is")
@EnableResourceServer
public class ServerApplication implements ApplicationRunner {

    Log log= LogFactory.getLog(getClass());

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    public ServerApplication(RoleRepository roleRepository, UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }



    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
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

