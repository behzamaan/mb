package ir.is.security.service;

import ir.is.security.entity.Privilege;
import ir.is.security.entity.Role;
import ir.is.security.entity.UserEntity;
import ir.is.security.model.User;
import ir.is.security.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUsername(username);
        return new User(user.getUsername(),user.getPassword(), user.isEnabled(), true, true,
                true, getAuthorities(user.getRoles()),user.getFirstName(),user.getLastName(),user.getEmail());
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Collection<Role> roles) {
        List<GrantedAuthority> grantedAuthorities = getGrantedAuthorities(getPrivileges(roles));
        for (Role role : roles) {
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return grantedAuthorities;
    }

    private List<String> getPrivileges(Collection<Role> roles) {
        List<Privilege> collection = new ArrayList<>();
        roles.stream().map(Role::getPrivileges).forEach(collection::addAll);
        return collection.stream().map(Privilege::getName).collect(Collectors.toList());
    }

    private List<GrantedAuthority> getGrantedAuthorities(List<String> privileges) {
        return privileges.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

}
