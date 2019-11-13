package ir.mb.demo.security.config;

import ir.mb.demo.security.service.AuthenticationProviderImpl;
import ir.mb.demo.security.service.PEvaluator;
import ir.mb.demo.security.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true,securedEnabled = true,jsr250Enabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

//    @Autowired
//    private MyBasicAuthenticationEntryPoint authenticationEntryPoint;
@Autowired
UserDetailsServiceImpl myUserDetailsService;

    @Autowired
    AuthenticationProviderImpl authenticationProvider;

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
    auth.authenticationProvider(authenticationProvider).userDetailsService(myUserDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(corsConfigurationSource()).and().csrf().disable().
                authorizeRequests()
                .antMatchers("/", "/login", "/logout", "/error").permitAll()
                .antMatchers("/resources/**").permitAll()
                .antMatchers("/*.js").permitAll()
                .anyRequest().authenticated()
                .and().logout().logoutUrl("/logout").clearAuthentication(true).deleteCookies("JSESSIONID")
                .and().httpBasic();
    }



    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200", "http://localhost:8181"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","DELETE"));
        configuration.setAllowCredentials(false);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }



}