package ir.mb.demo.security.service;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationProviderImpl implements AuthenticationProvider {
    private Log log= LogFactory.getLog(getClass());

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        log.info(authentication.getPrincipal());

        return authentication;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return false;
    }
}
