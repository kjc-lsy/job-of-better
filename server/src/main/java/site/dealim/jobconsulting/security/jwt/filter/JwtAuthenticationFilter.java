package site.dealim.jobconsulting.security.jwt.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.security.jwt.constants.JwtConstants;
import site.dealim.jobconsulting.security.jwt.provider.JwtTokenProvider;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * (/login)
 * client가 요청  ➡  이 클래스 필터  ➡  server가 받음
 * username, password을 사용하여 인증 시도  (attemptAuthentication 메소드)
 * ❌ 인증 실패 : response > status : 👩‍💼❌ 401 (UNAUTHORIZED)
 * ⭕ 인증 성공 (successfulAuthentication 메소드) ➡ JWT 생성
 * ➡ response안에 headers안에 authorization에 JWT 담기
 */
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    // 생성자
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        // 🔗 필터 URL 경로 설정 : /login
        setFilterProcessesUrl(JwtConstants.AUTH_LOGIN_URL);  // /login
    }

    /**
     * 🔐 인증 시도 메소드
     * : /login 경로로 요청하면, 필터로 걸러서 인증을 시도
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        log.info("username : " + username);
        log.info("password : " + password);

        // 사용자 인증 정보 객체 생성
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, password);

        // 사용자 인증 (로그인)
        // authenticate 메소드는 UserDetailService + PasswordEncoder를 사용해 인증을 확인함
        authentication = authenticationManager.authenticate(authentication);
        CustomMember customMember = (CustomMember) authentication.getPrincipal();
        log.info(customMember.getMember().getRoleList().toString());
        log.info("인증 여부 : " + authentication.isAuthenticated());

        if (!authentication.isAuthenticated()) {
            log.info("인증 실패");
            response.setStatus(401);
        }
        return authentication;
    }

    /**
     * 인증 성공 메소드
     * <p>
     * - JWT 을 생성
     * - JWT 를 응답 헤더에 설정
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authentication) throws IOException, ServletException {

        log.info("인증 성공...");

        CustomMember customMember = (CustomMember) authentication.getPrincipal();
        long idx = customMember.getMember().getIdx();
        String memberId = customMember.getMember().getUsername();

        List<String> roles = customMember.getMember().getRoleList().stream()
                .map((auth) -> auth.getRoleName())
                .collect(Collectors.toList());

        // 💍 JWT 토큰 생성 요청
        String jwt = jwtTokenProvider.createToken(idx, memberId, roles);

        // 💍 { Authorization : Bearer + {jwt} }
        response.addHeader(JwtConstants.TOKEN_HEADER, JwtConstants.TOKEN_PREFIX + jwt);
        response.setStatus(200);
    }
}
