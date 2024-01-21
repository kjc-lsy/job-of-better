package site.dealim.jobconsulting.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.repository.MemberRepository;

@Slf4j
@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public Member insert(Member member) {
        // 비밀번호 암호화
        String memberPwd = member.getPassword();
        String encodedPwd = passwordEncoder.encode(memberPwd);
        member.setPassword(encodedPwd);

        return memberRepository.save(member);
    }

    @Override
    public Member update(Member member) throws Exception {
        // 회원 존재 여부 확인
        Member existingMember = memberRepository.findByMemberId(member.getMemberId())
                .orElseThrow(() -> new Exception("Member를 조회할 수 없습니다."));

        // 수정할 값 업데이트
        if (member.getName() != null) {
            existingMember.setName(member.getName());
        }
        if (member.getEmail() != null) {
            existingMember.setEmail(member.getEmail());
        }

        return memberRepository.save(existingMember);
    }

    @Override
    public void delete(String memberId) throws Exception {
        //회원 존재 여부 확인
        Member deleteMember = memberRepository.findByMemberId(memberId).orElseThrow(() -> new Exception("Member를 조회 할 수 없습니다"));

        //회원 삭제
        memberRepository.delete(deleteMember);
    }

    @Override
    public Member select(String memberId) throws Exception {
        return memberRepository.findByMemberId(memberId).orElseThrow(() -> new Exception("Member를 조회할 수 없습니다."));
    }

    @Override
    public void login(Member member, HttpServletRequest request) throws Exception {
        String username = member.getMemberId();
        String password = member.getPassword();

        // AuthenticationManager
        // 아이디, 패스워드 인증 토큰 생성
        UsernamePasswordAuthenticationToken token
                = new UsernamePasswordAuthenticationToken(username, password);

        // 토큰에 요청정보 등록(아이디, 비밀번호, request 정보값을 묶어 보냄)
        token.setDetails(new WebAuthenticationDetails(request));

        // auth manager에 로그인 요청
        Authentication authentication = authenticationManager.authenticate(token);
        log.info("인증 여부 : " + authentication.isAuthenticated());

        // auth 객체에서 인증된 유저 정보 가져오기
        User authUser = (User) authentication.getPrincipal();
        log.info("인증된 사용자 아이디 : " + authUser.getUsername());

        // 시큐리티 컨텍스트에 인증정보 등록
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
