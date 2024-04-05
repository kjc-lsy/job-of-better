package site.dealim.jobconsulting.security.custom;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.mapper.MemberMapper;

@Slf4j
@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private MemberMapper MemberMapper;

    @Override
    public UserDetails loadUserByUsername(String username) {
        log.info("로그인 시도 - loadUserByUsername : " + username);
        Member member = MemberMapper.login(username);

        if (member == null) {
            log.info("로그인 시도 - 사용자 없음");
            throw new UsernameNotFoundException("로그인 시도 - 사용자 없음");
        }
        return new CustomMember(member);
    }
}
