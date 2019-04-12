package ir.mb.demo.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ArrayList<GrantedAuthority> authorities = new ArrayList<>();
        UserEntity user = userRepository.findByUsername(username);
        user.getRoles().forEach(item -> authorities.add(new SimpleGrantedAuthority(item.getName())));
        return new User(
                user.getUsername(),user.getPassword(), user.isEnabled(), true, true,
                true, authorities,user.getFirstName(),user.getLastName(),user.getEmail());
    }


}
