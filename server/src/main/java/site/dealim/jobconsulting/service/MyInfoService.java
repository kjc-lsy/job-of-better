package site.dealim.jobconsulting.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.dealim.jobconsulting.domain.*;
import site.dealim.jobconsulting.dto.ProgramCompanyDto;
import site.dealim.jobconsulting.error.exception.SlotFullException;
import site.dealim.jobconsulting.mapper.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
    @Autowired
    private AwsService awsServie;

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
            log.info("슬롯이 이미 존재합니다");
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
    public List<String> uploadProfileImg(Member member , List<File> files) {
        List<String> imgList = new ArrayList<>();
        for(File file : files) {
            log.info("1. 파일 업로드...");
            fileMapper.upload(file);

            log.info("member.getProfileImg() = " + member.getProfileImg());
            if(member.getProfileImg() != null && !member.getProfileImg().equals("")) {
                log.info("1-1. 기존 aws 파일 삭제...");
                awsServie.deleteFile(fileMapper.getFileName(member.getIdx(), "profile", member.getProfileImg()));

                log.info("1-2. 기존 file 파일 삭제...");
                fileMapper.deleteFile(member.getIdx(), "profile", member.getProfileImg());
            }

            log.info("2. 맴버 프로필 수정...");
            member.setProfileImg(file.getUploadFileUrl());
            memberMapper.updateProfileImg(member);
            imgList.add(member.getProfileImg());
        }
        return imgList;
    }

    @Transactional
    public List<String> uploadResumeFile(Member member , List<File> files) {
        List<String> resumeList = new ArrayList<>();
        for(File file : files) {
            log.info("1. 파일 테이블 업로드...");
            fileMapper.upload(file);
            resumeList.add(file.getUploadFileUrl());
        }
        return resumeList;
    }

    public List<File> getFileList(Long memIdx, String path) {
        return fileMapper.getFiles(memIdx, path);
    }


}