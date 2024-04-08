package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.domain.Program;
import site.dealim.jobconsulting.dto.ProgramCompanyDto;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.MemCoverLetterService;
import site.dealim.jobconsulting.service.MyInfoService;

import java.util.List;

@RestController
@RequestMapping("/api/user/")
@Slf4j
public class MyInfoController {
    @Autowired
    MyInfoService myinfoService;

    @GetMapping("/user-profile-info")
    public Member userProfileInfo(@AuthenticationPrincipal CustomMember customMember) {
        log.info("사용자 정보 불러오기");
        Member user = customMember.getMember();
        return myinfoService.userProfileInfo(user.getUsername());
    }

    @GetMapping("/pg-info")
    public ProgramCompanyDto pgInfo(@AuthenticationPrincipal CustomMember customMember) {
        log.info("사용자 지정 프로그램 정보 불러오기");
        Member user = customMember.getMember();
        ProgramCompanyDto pgInfo = myinfoService.pgInfo(user.getPgIdx());
        //System.out.println("pgInfo = " + pgInfo);
        return pgInfo;
    }

    @GetMapping("/cover-letter-info")
    public int[] coverLetterInfo(@AuthenticationPrincipal CustomMember customMember) {
        log.info("자소서 항목 불러오기");
        Member user = customMember.getMember();
        return myinfoService.coverLetterInfo(user.getIdx(),user.getPgIdx());
    }

    @PostMapping("/interview-time-save")
    public void interviewTimeSave(@RequestParam("desiredInterviewDate") String desiredInterviewDate, @AuthenticationPrincipal CustomMember customMember) {
        log.info("면접시간 저장");
        Member user = customMember.getMember();
        //System.out.println("desiredInterviewDate = " + desiredInterviewDate);
        myinfoService.interviewTimeSave(desiredInterviewDate,user.getIdx());
    }

}
