package ir.mb.demo.security;

import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;


@RestController
public class Login {
    private Log logger= LogFactory.getLog(getClass());

    @GetMapping("/login")
    public UserEntity user(Authentication authentication) {
        if(authentication==null)
            return null;
        User user = (User) authentication.getPrincipal();
        logger.info("user login : "+user.getUsername());
        List<Role> roles=new ArrayList<>();
        user.getAuthorities().forEach(grantedAuthority -> roles.add(new Role(grantedAuthority.getAuthority())));
        return new UserEntity(user.getUsername(), user.getFirstName(), user.getLastName(), user.getEmail(),
                "", user.isEnabled(), user.isAccountNonExpired(), roles);
    }


    @GetMapping("/isSession")
    public Boolean isSession(Authentication authentication){
        return authentication.isAuthenticated();
    }
}