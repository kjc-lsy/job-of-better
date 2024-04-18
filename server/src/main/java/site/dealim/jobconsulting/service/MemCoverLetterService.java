package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.MemberCoverLetter;
import site.dealim.jobconsulting.dto.CoverLetterDto;
import site.dealim.jobconsulting.mapper.ComCoverLetterMapper;
import site.dealim.jobconsulting.mapper.MemCoverLetterMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MemCoverLetterService {
    @Autowired
    private MemCoverLetterMapper userMapper;
    @Autowired
    private ComCoverLetterMapper comCoverLetterMapper;
    @Autowired
    private MemCoverLetterMapper memberCoverLetterMapper;


    public void userCoverLetterSave(List<MemberCoverLetter> values, long idx) {
        Map map = new HashMap<>();
        for (MemberCoverLetter item : values) {
            map.put("mclCclIdx", item.getMclCclIdx());
            map.put("mclMemberIdx", idx);
            map.put("mclAnswer", item.getMclAnswer());
            map.put("mclIsConfirm", item.getMclIsConfirm());
            map.put("mclTitle", item.getMclTitle());

            Long mclIdx = item.getMclIdx();
            if ( mclIdx > 0) {
                map.put("mclIdx", mclIdx);
                userMapper.userCoverLetterUpdate(map);
            } else {
                userMapper.userCoverLetterSave(map);
            }
        }

    }

    public List<CoverLetterDto> coverLetterInfo(long idx, Long pgIdx) {
        List<CoverLetterDto> coverLetterDtoList = new ArrayList<>();
        List<ComCoverLetter> ComcoverLetterInfo = comCoverLetterMapper.comCoverLetterInfo(pgIdx);
        for(ComCoverLetter ccl : ComcoverLetterInfo){
            MemberCoverLetter mcl = memberCoverLetterMapper.memCoverLetterInfo(ccl.getCclIdx());
            coverLetterDtoList.add(new CoverLetterDto(ccl,mcl));
        }
        return coverLetterDtoList;
    }
}