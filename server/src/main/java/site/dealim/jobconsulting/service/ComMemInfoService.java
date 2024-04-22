package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.mapper.MemberMapper;

import java.util.*;

@Service
public class ComMemInfoService {
    @Autowired
    MemberMapper memberMapper;

    public Map<String,Object> getUserCount(Long pgIdx) {
        Map<String,Object> map = new HashMap<>();
        map.put("user", memberMapper.getUserCount(pgIdx));
        map.put("resume", memberMapper.getResumeCount(pgIdx));
        map.put("coverLetter", memberMapper.getCoverLetterCount(pgIdx));
        map.put("regUser", memberMapper.getRegUserCount(pgIdx));
        System.out.println("map = " + map);
        return map;
    }

    public List<Map<String, Object>> getRegUserCount(Long pgIdx) {
        return memberMapper.getRegUserCount(pgIdx);
    }
}
