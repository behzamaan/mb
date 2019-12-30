package ir.mb.demo.security.config;

import ir.mb.demo.security.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Order(1)
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true,securedEnabled = true,jsr250Enabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

//    @Autowired
//    private MyBasicAuthenticationEntryPoint authenticationEntryPoint;
@Autowired
UserDetailsServiceImpl myUserDetailsService;


    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.parentAuthenticationManager(authenticationManagerBean()).userDetailsService(myUserDetailsService);
    }



    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .requestMatchers()
                .antMatchers("/login", "/oauth/authorize")
                .antMatchers("/resources/static/**")
                .antMatchers("/", "/index", "/logout", "/error")
                .antMatchers("/*.js","/*.js.map","/*.png","/*.jpeg")

                .and()
                .authorizeRequests()
                .antMatchers("/oauth/authorize").permitAll()
                .antMatchers("/resources/**").permitAll()
                .antMatchers("/resources/static/**").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/", "/index", "/logout", "/error").permitAll()
                .antMatchers("/*.js","/*.js.map","/*.png","/*.jpeg").permitAll()
                .anyRequest().authenticated()
                .and()

                .formLogin().permitAll();

//        http.cors().configurationSource(corsConfigurationSource()).and().csrf().disable().
//                authorizeRequests()
//                .antMatchers("/", "/login", "/logout", "/error").permitAll()
//                .antMatchers("/resources/**").permitAll()
//                .antMatchers("/*.js").permitAll()
//                .anyRequest().authenticated()
//                .and().logout().logoutUrl("/logout").clearAuthentication(true).deleteCookies("JSESSIONID")
//                .and().httpBasic();
    }



    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
//
//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200", "http://localhost:8181"));
//        configuration.setAllowedMethods(Arrays.asList("GET","POST","DELETE"));
//        configuration.setAllowCredentials(false);
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }



}