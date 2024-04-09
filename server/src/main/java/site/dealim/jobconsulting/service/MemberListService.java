package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.mapper.MemberMapper;

import java.util.List;

@Service
public class MemberListService {
    @Autowired
    private MemberMapper memberMapper;
    public List<Member> getMembersList() {
        return memberMapper.selectAllMembers().stream()
                .filter(member -> member.getRoleList().stream()
                        .anyMatch(role -> "ROLE_USER".equals(role.getRoleName())))
                .toList();
    }

}
