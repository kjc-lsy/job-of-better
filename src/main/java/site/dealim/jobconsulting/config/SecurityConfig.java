package site.dealim.jobconsulting.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import site.dealim.jobconsulting.security.custom.CustomUserDetailsService;
import site.dealim.jobconsulting.security.jwt.filter.JwtAuthenticationFilter;
import site.dealim.jobconsulting.security.jwt.filter.JwtRequestFilter;
import site.dealim.jobconsulting.security.jwt.provider.JwtTokenProvider;

@Slf4j
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Bean
    SecurityFilterChain filter(HttpSecurity http) throws Exception {
        log.info("시큐리티 설정 시작...");

        // 폼 기반 로그인 비활성화
        http.formLogin(login -> login.disable());

        // HTTP 기본 인증 비활성화
        http.httpBasic(basic -> basic.disable());

        // CSRF(Cross-Site Request Forgery) 공격 방어 기능 비활성화
        http.csrf(csrf -> csrf.disable());

        // 필터 설정 ✅
        http.addFilterAt(new JwtAuthenticationFilter(authenticationManager, jwtTokenProvider)
                        , UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JwtRequestFilter(jwtTokenProvider)
                        , UsernamePasswordAuthenticationFilter.class);

        // 인증 방식 설정
        http.userDetailsService(customUserDetailService);

        // 인가 설정 ✅
        http.authorizeHttpRequests((authorizeRequests) ->
                authorizeRequests
                        .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/auth/**")).permitAll()
                        .requestMatchers("/user/**").hasAnyRole("USER")
                        .requestMatchers("/admin/**").hasAnyRole("ADMIN")
                        .anyRequest().authenticated()
        );

//        http
//                .authorizeHttpRequests((authorize) -> authorize
//                        .requestMatchers("/**").permitAll() // 개발 동안 모든 경로 허용
//                        .requestMatchers("/img/**", "/css/**", "/login", "/", "/auth/**").permitAll()
//                        .requestMatchers("/user").hasAnyRole("USER")
//                        .requestMatchers("/admin").hasAnyRole("ADMIN")
//                        .anyRequest().authenticated()
//                )
//                .formLogin(login -> login
//                        .usernameParameter("username")
//                        .passwordParameter("password")
//                        .loginPage("/auth/login")
//                        .failureUrl("/auth/login?failure")
//                        .loginProcessingUrl("/auth/login/process")
//                        .defaultSuccessUrl("/", false) // 로그인 성공 시 보고있던 원래 페이지로 이동
//                        .permitAll())
//                .logout(logout -> logout.logoutSuccessUrl("/")
//                        .permitAll())
//                .exceptionHandling(exception -> exception
//                        .accessDeniedPage("/exception"));
        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // AuthenticationManager 빈 등록
    private AuthenticationManager authenticationManager;

    @Bean
    public AuthenticationManager authenticationManager
            (AuthenticationConfiguration authenticationConfiguration) throws Exception {
        this.authenticationManager = authenticationConfiguration.getAuthenticationManager();
        return authenticationManager;
    }

}