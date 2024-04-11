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

    /**
     * @return
     * 유저 권한만 가진 멤버 리스트
     */
    public List<Member> getMembersList() {
        return memberMapper.selectAllMembers();
    }

}