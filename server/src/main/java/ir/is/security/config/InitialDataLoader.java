package ir.is.security.config;

import ir.is.security.entity.Privilege;
import ir.is.security.entity.Role;
import ir.is.security.entity.UserEntity;
import ir.is.security.repository.PrivilegeRepository;
import ir.is.security.repository.RoleRepository;
import ir.is.security.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Component
public class InitialDataLoader implements
        ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if (alreadySetup)
            return;
        Privilege readPrivilege
                = createPrivilegeIfNotFound("READ");
        Privilege writePrivilege
                = createPrivilegeIfNotFound("WRITE");
        Privilege deletePrivilege
                = createPrivilegeIfNotFound("DELETE");


        List<Privilege> adminPrivileges = Arrays.asList(
                readPrivilege, writePrivilege,deletePrivilege);
        createRoleIfNotFound("ROLE_ADMIN", adminPrivileges);
        createRoleIfNotFound("ROLE_USER", Arrays.asList(readPrivilege));

        Role adminRole = roleRepository.findByName("ROLE_ADMIN");
        UserEntity adminUser = userRepository.findByUsername("admin");
        if (adminUser == null) {
            UserEntity user = new UserEntity();
            user.setFirstName("admin");
            user.setUsername("admin");
            user.setLastName("admin");
            user.setPassword(passwordEncoder.encode("admin"));
            user.setEmail("test@test.com");
            user.setRoles(Arrays.asList(adminRole));
            user.setEnabled(true);
            userRepository.save(user);
        }

        alreadySetup = true;
    }



    @Transactional
    Privilege createPrivilegeIfNotFound(String name) {

        Privilege privilege = privilegeRepository.findByName(name);
        if (privilege == null) {
            privilege = new Privilege(name);
            privilegeRepository.save(privilege);
        }
        return privilege;
    }

    @Transactional
    Role createRoleIfNotFound(
            String name, Collection<Privilege> privileges) {

        Role role = roleRepository.findByName(name);
        if (role == null) {
            role = new Role(name);
            role.setPrivileges(privileges);
            roleRepository.save(role);
        }
        return role;
    }
}
