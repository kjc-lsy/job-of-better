package site.dealim.jobconsulting.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import site.dealim.jobconsulting.domain.*;
import site.dealim.jobconsulting.dto.FileDto;
import site.dealim.jobconsulting.dto.ProgramCompanyDto;
import site.dealim.jobconsulting.error.exception.SlotFullException;
import site.dealim.jobconsulting.mapper.*;
import site.dealim.jobconsulting.security.custom.CustomMember;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class MyInfoService {
    @Autowired
    private MemberMapper memberMapper;
    @Autowired
    private ProgramMapper programMapper;
    @Autowired
    private ComCoverLetterMapper comCoverLetterMapper;
    @Autowired
    private MemCoverLetterMapper memberCoverLetterMapper;
    @Autowired
    private InterviewSlotMapper interviewSlotMapper;
    @Autowired
    private InterviewScheduleMapper interviewScheduleMapper;
    @Autowired
    private FileMapper fileMapper;

    public Member userProfileInfo(String username) {
        return memberMapper.login(username);
    }

    public ProgramCompanyDto pgInfo(Long pgIdx) {
        return programMapper.pgInfo(pgIdx);
    }

    public int[] coverLetterInfo(long idx, Long pgIdx) {
        int[] coverLetterInfo = new int[2];
        coverLetterInfo[0] = (comCoverLetterMapper.userCoverLetterInfo(pgIdx)).size();
        coverLetterInfo[1] = (memberCoverLetterMapper.coverLetterInfo(idx,pgIdx)).size();
        return coverLetterInfo;
    }

    @Transactional
    public void registerInterview(LocalDateTime registeredInterviewDate, Long memIdx, Long pgIdx) {
        log.info("회원 면접 날짜 업데이트...");
        memberMapper.registerInterview(registeredInterviewDate, memIdx);
        memberMapper.updateInterviewStatus("Registered", memIdx);

        log.info("슬롯, 프로그램 조회...");
        InterviewSlot existingSlot = interviewSlotMapper.selectSlotByStartTime(registeredInterviewDate);
        Program program = programMapper.selectByPgIdx(pgIdx);

        if (existingSlot == null) {
            log.info("새로운 슬롯 생성...");
            existingSlot = InterviewSlot.builder()
                    .slotStartDatetime(registeredInterviewDate)
                    .slotEndDatetime(registeredInterviewDate.plusMinutes(Long.parseLong(program.getPgInterviewUnitTime())))
                    .slotMaxOccupancy(program.getPgMaxIntervieweesPerUnit())
                    .slotPgIdx(program.getPgIdx())
                    .slotIsAvailable(true)
                    .build();
            interviewSlotMapper.insertSlot(existingSlot);
        } else {
            log.info("슬롯이 이미 존재합니다...");
        }

        log.info("슬롯 사용 가능여부 확인...");
        if(!existingSlot.getSlotIsAvailable()) {
            throw new SlotFullException("예약 슬롯이 가득 찼습니다");
        }

        log.info("학생 스케줄 검색...");
        InterviewSchedule existingSchedule = interviewScheduleMapper.selectScheduleByMemIdx(memIdx);

        if (existingSchedule == null) {
            log.info("학생 스케줄 새로 등록...");
            interviewScheduleMapper.insertSchedule(InterviewSchedule.builder()
                    .registeredDate(LocalDateTime.now())
                    .memIdx(memIdx)
                    .slotIdx(existingSlot.getSlotIdx())
                    .build());
        } else {
            log.info("학생 스케줄이 이미 존재하여 변경합니다 : 기존 슬롯 - {}, 변경 슬롯 - {}", existingSchedule.getSlotIdx(), existingSlot.getSlotIdx());
            interviewScheduleMapper.updateSlot(existingSchedule.getScheduleIdx(), existingSlot.getSlotIdx());

            log.info("기존 슬롯 업데이트...");
            updateCurrentOccupancy(existingSchedule.getSlotIdx());
        }

        log.info("현재 슬롯 업데이트...");
        updateCurrentOccupancy(existingSlot.getSlotIdx());

        log.info("면접 신청 완료!");
    }

    @Transactional
    public Integer updateCurrentOccupancy(Long slotIdx) {
        Integer currentOccupancy = interviewScheduleMapper.getCntBySlotIdx(slotIdx);
        interviewSlotMapper.updateCurrentOccupancy(slotIdx, currentOccupancy);

        return currentOccupancy;
    }

    public List<MemberCoverLetter> coverLetterList(long idx, Long pgIdx) {
        return memberCoverLetterMapper.coverLetterInfo(idx,pgIdx);
    }

    public Integer getCurrOccup(LocalDateTime slotStartDatetime, Long slotPgIdx) {
        return interviewSlotMapper.selectCurrOccupByStartDateAndPgIdx(slotStartDatetime, slotPgIdx);
    }

    @Transactional
    public String upload(CustomMember member , List<File> file) {
        Member user = member.getMember();
        for(File f : file) {
            if(f.getFileIdx() == null) {
                fileMapper.upload(f);
                log.info("파일 업로드 완료");
            }else {
                fileMapper.updateUpload(f);
            }
            user.setProfileImg(f.getUploadFileUrl());
            memberMapper.updateProfileImg(user);
            log.info("멤버 프로필 완료");
        }
        return user.getProfileImg();
    }

}