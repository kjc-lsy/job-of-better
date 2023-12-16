package site.dealim.jobseeker.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain filter(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/css/**", "/images", "/login", "/").permitAll()
                        .requestMatchers("/user").hasAnyRole("USER")
                        .requestMatchers("/admin").hasAnyRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .formLogin(login -> login
                        .usernameParameter("username")
                        .passwordParameter("password")
                        .loginPage("/auth/login")
                        .failureUrl("/auth/login?failure")
                        .loginProcessingUrl("/auth/login/process")
                        .defaultSuccessUrl("/", false) // 로그인 성공 시 보고있던 원래 페이지로 이동
                        .permitAll())
                .logout(logout -> logout.logoutSuccessUrl("/")
                        .permitAll())
                .exceptionHandling(exception -> exception
                        .accessDeniedPage("/exception"));
        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


    // TODO: DB와 연동하여 로그인 인증 및 처리 구현해볼것
    @Bean
    UserDetailsManager inMemoryUserDetailsManager() {
        var user1 = User.withUsername("user").password(passwordEncoder().encode("user")).roles("USER").build();
        var user2 = User.withUsername("admin").password(passwordEncoder().encode("admin")).roles("USER", "ADMIN").build();
        return new InMemoryUserDetailsManager(user1, user2);
    }
}