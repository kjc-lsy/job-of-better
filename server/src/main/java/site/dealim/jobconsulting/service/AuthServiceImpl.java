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
import site.dealim.jobconsulting.domain.Company;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.domain.MemberRole;
import site.dealim.jobconsulting.mapper.CompanyMapper;
import site.dealim.jobconsulting.mapper.MemberMapper;

@Slf4j
@Service
public class AuthServiceImpl {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private MemberMapper memberMapper;
    @Autowired
    private CompanyMapper companyMapper;
    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * 회원 등록 (회원 가입)
     * 1. 비밀번호 암호화
     * 2. 회원 등록
     * 3. 권한 등록
     */
    public Long insert(Member member) {
        // 비밀번호 암호화
        String memberPwd = member.getPassword();
        String encodedPwd = passwordEncoder.encode(memberPwd);
        member.setPassword(encodedPwd);

        //회원 등록
        Long result = memberMapper.insertMember(member);

        //권한 등록
        if (result > 0) {
            MemberRole memberRole = new MemberRole();
            memberRole.setUsername(member.getUsername());
            memberRole.setRoleName("ROLE_USER"); // 기본 권한 : 사용자 권한 (ROLE_USER)
            result = memberMapper.insertMemberRole(memberRole);
        }

        return result;
    }

    
    public int update(Member member) {
        String memberPwd = member.getPassword();
        String encondedPwd = passwordEncoder.encode(memberPwd);
        member.setPassword(encondedPwd);

        return memberMapper.updateMember(member);
    }

    /**
     * 회원 삭제 (회원 탈퇴)
     */
    
    public int delete(String username) {
        return memberMapper.deleteMember(username);
    }

    /**
     * idx로 회원 조회
     */
    
    public Member select(long idx) {
        return memberMapper.selectMember(idx);
    }

    
    public void login(Member member, HttpServletRequest request) {
        String username = member.getUsername();
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

    public boolean checkDuplicateUsername(String username) {
        return memberMapper.checkDuplicateUsername(username) > 0;
    }


    public void companyJoin(long idx, Company company) {
        company.setComMemIdx(idx);
       /* HashMap map = new HashMap();
        map.put("idx", idx);
        map.put("comName", company.getComName());
        map.put("comCeoName", company.getComCeoName());
        map.put("comLicenseNum", company.getComLicenseNum());
        map.put("comAddress", company.getComAddress());
        map.put("comZipcode", company.getComZipcode());*/
        companyMapper.companyJoin(company);

    }

    public Long MemberInsert(Member member) {
        // 비밀번호 암호화
        String memberPwd = member.getPassword();
        String encodedPwd = passwordEncoder.encode(memberPwd);
        member.setPassword(encodedPwd);

        Long result = memberMapper.insertMember(member);

        if(result > 0) {
            MemberRole memberRole = new MemberRole();
            memberRole.setUsername(member.getUsername());
            memberRole.setRoleName("ROLE_USER"); // 기본 권한 : 사용자 권한 (ROLE_USER)
            memberMapper.insertMemberRole(memberRole);

            memberRole.setUsername(member.getUsername());
            memberRole.setRoleName("ROLE_COMPANY"); // 기본 권한 : 사용자 권한 (ROLE_COMPANY)
            memberMapper.insertMemberRole(memberRole);
        }

        return result;
    }

    public boolean checkDuplicateBno(String comLicenseNum) {
        return companyMapper.checkDuplicateBno(comLicenseNum) > 0;
    }
}
