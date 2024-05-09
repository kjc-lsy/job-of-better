package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.mapper.CompanyMapper;
import site.dealim.jobconsulting.mapper.MemberMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ComMemInfoService {
    @Autowired
    MemberMapper memberMapper;

    @Autowired
    CompanyMapper companyMapper;

    public Map<String,Object> getUserCount(Long pgIdx) {
        Map<String,Object> map = new HashMap<>();
        map.put("user", memberMapper.getUserCount(pgIdx));
        map.put("resume", memberMapper.getResumeCount(pgIdx));
        map.put("coverLetter", memberMapper.getCoverLetterCount(pgIdx));
        map.put("regUser", memberMapper.getRegUserCount(pgIdx));

        return map;
    }

    public Long getComIdxByMemIdx(Long idx) {
        return companyMapper.selectComIdxByMemIdx(idx);
    }

    public List<Map<String, Object>> getRegUserCount(Long pgIdx) {
        return memberMapper.getRegUserCount(pgIdx);
    }
}
