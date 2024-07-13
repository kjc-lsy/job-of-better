package site.dealim.jobconsulting.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.MemberCoverLetter;
import site.dealim.jobconsulting.dto.CoverLetterDto;
import site.dealim.jobconsulting.mapper.ComCoverLetterMapper;
import site.dealim.jobconsulting.mapper.MemCoverLetterMapper;
import site.dealim.jobconsulting.mapper.MemberMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class MemCoverLetterService {
    @Autowired
    private ComCoverLetterMapper comCoverLetterMapper;
    @Autowired
    private MemCoverLetterMapper memberCoverLetterMapper;
    @Autowired
    private MemberMapper memberMapper;

    public void userCoverLetterSave(List<MemberCoverLetter> values, long idx) {
        log.info("member 자소서 상태 업데이트...");
        memberMapper.updateCoverLetterStatus(idx, "Writing"); // TODO : 작성중/작성완료 상태 업데이트 로직 짤것

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
                memberCoverLetterMapper.userCoverLetterUpdate(map);
            } else {
                memberCoverLetterMapper.userCoverLetterSave(map);
            }
        }

    }

    public List<CoverLetterDto> coverLetterInfo(Long memIdx,Long pgIdx) {
        List<CoverLetterDto> coverLetterDtoList = new ArrayList<>();
        List<ComCoverLetter> ComcoverLetterInfo = comCoverLetterMapper.comCoverLetterInfo(pgIdx);

        for(ComCoverLetter ccl : ComcoverLetterInfo){
            MemberCoverLetter mcl = memberCoverLetterMapper.memCoverLetterInfo(memIdx, ccl.getCclIdx());
            //.out.println("mcl = " + mcl + ", ccl = " + ccl);
            coverLetterDtoList.add(new CoverLetterDto(ccl,mcl));
        }
        return coverLetterDtoList;
    }

    public List<CoverLetterDto> coverLetterInfo(Long memIdx) {
        Long pgIdx = memberMapper.getPgIdxByIdx(memIdx);
        List<CoverLetterDto> coverLetterDtoList = new ArrayList<>();
        List<ComCoverLetter> ComcoverLetterInfo = comCoverLetterMapper.comCoverLetterInfo(pgIdx);
        for(ComCoverLetter ccl : ComcoverLetterInfo){
            MemberCoverLetter mcl = memberCoverLetterMapper.memCoverLetterInfo(memIdx, ccl.getCclIdx());
            coverLetterDtoList.add(new CoverLetterDto(ccl,mcl));
        }
        return coverLetterDtoList;
    }
}